import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Pagination } from "src/deps";
import { useDispatch } from "react-redux";

const DEV_ROW_PER_PAGE = 2;
const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 0"
  }
});

function urlQueriesInObj(
  url: string,
  pageNumber: number
): { qObject: { [key: string]: string }; qStr: string } {
  const params = url.split("?")[1];
  if(!params) {
    return {
      qObject: {},
      qStr: ""
    };
  }
  const _urlSearParams = new URLSearchParams(params);
  // sort are handle in another action. remove them as query params
  // the idea is to keep only filtering params
  _urlSearParams.delete("sort_criteria");
  const limitValue = _urlSearParams.get("limit")
    ? parseInt(_urlSearParams.get("limit") as string, 10)
    : DEV_ROW_PER_PAGE;
  const offset = limitValue * pageNumber;
  _urlSearParams.set("offset", offset.toString());

  let u = {};
  _urlSearParams.forEach((value, key) => {
    u = { ...u, ...{ [key]: encodeURIComponent(value) } };
  });

  return {
    qObject: u,
    qStr: "?".concat(_urlSearParams.toString())
  };
}

function getOffsetValue(
  nextUrl: string | null,
  previousUrl: string | null,
  max: number
) {
  // the list < pagination threshold
  if(!nextUrl && !previousUrl) {
    return 1;
  }
  // the list has no more item

  if(!nextUrl && previousUrl) {
    return max;
  }
  // guess current page
  const _urlSearParams = new URL(nextUrl as string).searchParams;
  const offsetValue = _urlSearParams.get("offset")
    ? parseInt(_urlSearParams.get("offset") as string, 10)
    : 0;
  const limitValue = _urlSearParams.get("limit")
    ? parseInt(_urlSearParams.get("limit") as string, 10)
    : DEV_ROW_PER_PAGE;
    // the value is guessed for next. ->what is previous value

  const currentOffsetValue = offsetValue - limitValue;
  return currentOffsetValue / limitValue + 1;
}

interface ActionsPaginationProps {
    pagination: {
        next: string | null;
        previous: string | null;
    };
    count: number;
    children?: React.ReactElement<any> | null;
    dispatcherCb: Function;
}

export function ActionsPagination(
  props: ActionsPaginationProps
): JSX.Element {
  const {
    count,
    pagination: { next, previous },
    children,
    dispatcherCb
  } = props;

  const classes = useStyles(props);

  const dispatch = useDispatch();
  const chunks = Math.ceil(count / DEV_ROW_PER_PAGE);

  const activePage = getOffsetValue(next, previous, chunks);

  function getBatch(url: string, pageNumber: number) {
    const qPayload: {
            qObject: { [key: string]: string };
            qStr: string;

        } = urlQueriesInObj(url, pageNumber);
    if(qPayload.qStr.length > 1) {
      const { qObject } = qPayload;

      dispatch(dispatcherCb.call(null, qObject));
    }
  }

  function handleOnChange(e, pageNumber) {
    const url = next === null ? previous : next;
    if(url) {
      // offset pagination.starts at 0
      getBatch(url, pageNumber - 1);
    }
  }

  return (
    <div className={classes.root}>
      <div>{children}</div>
      <Pagination
        count={chunks}
        page={activePage}
        shape="rounded"
        size="small"
        onChange={handleOnChange}
      />
    </div>
  );
}
