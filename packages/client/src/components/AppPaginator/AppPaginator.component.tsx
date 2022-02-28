import makeStyles from "@mui/styles/makeStyles";
import { Pagination } from "src/deps";
import { useDispatch } from "react-redux";
import { DEFAULT_PAGINATION_PARAMS } from "src/api/routes/api_routes";
import { ReactNode } from "react";
import isDate from "date-fns/isDate";
import parse from "date-fns/parse";
import { PaginationQuery, PaginationQueryDateRange } from "../../model";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 0"
  }
});

/* query params helpers */
export function paginationHasDateRange(item): item is PaginationQueryDateRange {
  return item.hasOwnProperty("start_date") && item.hasOwnProperty("end_date");
}

export function isPaginationValid(item): item is PaginationQuery {
  return item.hasOwnProperty("limit") && item.hasOwnProperty("offset");
}

export function isValidRangeValue(d: string) {
  return isDate(parse(d, "yyyy-MM-dd", new Date()));
}

/**
 * this function  is key in fetching on paginated list.
 * the dispatch action is based on query( query params. aka ?id=re&re= )changes.
 * so to avoid over fetching, a query params with same key && value should be sorted in the same order
 * So that when making the quel query ( a string), the result would be the same.
 * At first tried with url changes, but failed. because URL SearchParams ->infinite render or effect didn't fire at all
 * so as a workaround, each dispatch mutate a string used to send the query
 * @param searchParams
 */
export function paramsKeys(searchParams: Object) {
  return Object.keys(searchParams)
    .sort();
}

export function searchParamsToObject(searchParams: URLSearchParams) {
  let _temp = {};
  searchParams.forEach((value, key) => {
    _temp = { ..._temp, ...{ [key]: value } };
  });
  return _temp;
}

/**
 * for now looking to save only limit/offset/start_date/end_date in url
 * maybe later the whole stuff
 * even valid search like adgroup_name is just disregarded now
 * @param searchParams
 * @param validKeys
 */

export function isQParamsValid(searchParams: URLSearchParams, validKeys: string[]) {
  const q = searchParamsToObject(searchParams);
  // if (Object.values(q).length !== validKeys.length) {
  //   return false;
  // }
  for(const qKey in q) {
    // if (!validKeys.find(k => k === qKey)) {
    //   return false;
    // }
  }

  if(paginationHasDateRange(q)) {
    const { start_date, end_date } = q;
    if(!isValidRangeValue(start_date) || !isValidRangeValue(end_date)) {
      return false;
    }
  }
  return isPaginationValid(q) && !(Boolean(isNaN(parseInt(q.limit, 10)))); /* && !(isNaN(parseInt(q.offset))) */
}

export function qStringToObject(qStr: string): Record<any, string> {
  const _norm = qStr[0] === "?" ? qStr.slice(1) : qStr;
  return _norm.split("&").reduce((acc: unknown, curr) => {
    const [key, value] = curr.split("=");

    return { ...acc as any, [key]: value };
  }, {});
}

/**
 * the sort is key
 * @param searchParams
 * @param isStart
 */
export function queryParamsToStr(searchParams: Object, isStart: boolean = true): string {
  return paramsKeys(searchParams)
    .reduce((acc, curr) => acc.concat(curr, "=", searchParams[curr], "&"), isStart ? "?" : "&").slice(0, -1);
}

export function urlQueriesInObj(
  url: string,
  pageNumber: number,
  chunkSize: string
): { qState: Object; qStr: string } {
  const params = url.split("?")[1];
  if(!params) {
    return {
      qState: {},
      qStr: ""
    };
  }
  const _urlSearParams = new URLSearchParams(params);

  const _limit = _urlSearParams.get("limit");
  const limitValue = _limit
    ? parseInt(_limit, 10)
    : parseInt(chunkSize, 10);
  const offset = limitValue * pageNumber;
  _urlSearParams.set("offset", offset.toString());

  const u = searchParamsToObject(_urlSearParams);

  return {
    qState: u,
    qStr: queryParamsToStr(u)
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

  const _offset: any = _urlSearParams.get("offset");

  const offsetValue = _offset
    ? parseInt(_offset, 10)
    : 0;

  const _limit = _urlSearParams.get("limit");

  const limitValue = _limit
    ? parseInt(_limit, 10)
    : parseInt(DEFAULT_PAGINATION_PARAMS.limit, 10);
    // the value is guessed for next. ->what is previous value

  // from the next position, retrieve limit value to guess current position

  const currentOffsetValue = offsetValue - limitValue;

  return ((currentOffsetValue / limitValue) + (1));
}

interface AppPaginatorProps {
    pagination: {
        next: string | null;
        previous: string | null;
    };
    count: number;
    children?: ReactNode | null;
    dispatcherCb: Function;
    chunkSize: string;// needed to sync whatever changes from url/store
}

export function AppPaginator(
  props: AppPaginatorProps
): JSX.Element {
  const {
    count,
    pagination: { next, previous },
    children,
    dispatcherCb,
    chunkSize = DEFAULT_PAGINATION_PARAMS.limit
  } = props;

  const classes = useStyles(props);

  const dispatch = useDispatch();

  const chunks = Math.ceil(count / parseInt(chunkSize, 10));

  const activePage = getOffsetValue(next, previous, chunks);

  function getBatch(url: string, pageNumber: number) {
    const qPayload = urlQueriesInObj(url, pageNumber, chunkSize);
    dispatch(dispatcherCb.call(null, qPayload));
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
      {children}
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
