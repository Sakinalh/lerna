import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { setPageQueuePaginationAction, tryGetTemplateQueueAction } from "src/PageGeneration/store/queue.epic";
import { useScrollTop } from "src/hooks/useScrollTop";
import { TemplatePaginatedQueue } from "src/PageGeneration/components/TemplatePaginatedQueue/TemplatePaginatedQueue.component";
import { QueueTableToggle } from "src/PageGeneration/components/TemplatePaginatedQueue/QueueTableTogglePages/QueueTableTogglePages.component";
import makeStyles from "@mui/styles/makeStyles";
import { QueueTablePublishBtn } from "src/PageGeneration/components/TemplatePaginatedQueue/QueueTablePublishBtn/QueueTablePublishBtn.component";
import {
  isQParamsValid,
  qStringToObject,
  queryParamsToStr,
  searchParamsToObject
} from "src/components/AppPaginator/AppPaginator.component";
import { useQuery } from "react-query";
import { getTemplateQueue } from "src/api/react-query/queue.store";
import { LoadingQueuePagesModal } from "../../components/TemplatePaginatedQueue/LoadingQueuePagesModal/LoadingQueuePagesModal.component";
import { ConfirmActionModal } from "../../components/ConfirmActionModal/ConfirmActionModal.component";
import { DismissAllBtn } from "../../components/TemplatePaginatedQueue/QueueDismissAllBtn/QueueDismissAllBtn.component";
import { ParamsState } from "../../../model";
import {DEFAULT_PAGINATION_PARAMS, PAGE_GEN_RULES} from "../../../api/routes/api_routes";

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    padding: "0 15px 0 15px",
    margin: "0 auto",
    fontSize: 10,
    contentVisibility: "auto",
    containIntrinsicSize: 3000
  },
  actions: {
    display: "grid",
    gridTemplateColumns: "20%  40%",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.2em",
    paddingLeft: 5
  },
  cta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

interface QueuePageProps {}

export default function QueuePage(_props: QueuePageProps) {
  const classes = useStyles({});

  const dispatch = useDispatch();
  // const state = useSelector((state: StoreState ) => state);
  const query = useSelector((state: StoreState) => state.pageQueue.queryStr);
  const paramsState = useSelector((state: StoreState) => state.pageQueue.queryState);
  const { data: data = {} } = useQuery(["getTemplateQueue", query], getTemplateQueue);
  // console.log(data)

  useEffect(() => {
    const _urlSearParams = new URL(window.location.href as string).searchParams;

    const VALID_PARAMS = ["offset", "limit", "rule", "campain"];
    const isSearchValid = isQParamsValid(_urlSearParams, VALID_PARAMS);

    if(query) {
      // if (!isSearchValid) {
      //   console.log('IS INVALID')

      //   // the store has a previous valid query. juste update the url

      //   const { limit, offset } = qStringToObject(query);
      //   const newRelativePathQuery = window.location.pathname + queryParamsToStr({
      //     limit,
      //     offset
      //   });
      //   window.history.replaceState(null, "", newRelativePathQuery);
      // }
      dispatch(tryGetTemplateQueueAction(query));
    } else {
      // if no q. date is not fetched. either use url params if is valid or fallback to default.
      const payload: unknown = isSearchValid ? searchParamsToObject(_urlSearParams) : DEFAULT_PAGINATION_PARAMS;
      dispatch(
        setPageQueuePaginationAction({
          qState: payload as ParamsState,
          qStr: queryParamsToStr(payload as ParamsState)
        })
      );
    }
  }, [query, dispatch]);

  useScrollTop("container_top", query as string);

  return (
    <div className={classes.root}>
      {/* <div className={classes.actions}>
        <QueueTableToggle/>
        <div className={classes.cta}>
          <DismissAllBtn/>
          <QueueTablePublishBtn/>
        </div>

      </div> */}

      {/* <TabsListWrapper/> */}
      {/* <AppSearch/> */}
      {data &&
      <TemplatePaginatedQueue limit={paramsState.limit}/>
      }
      <LoadingQueuePagesModal/>
      <ConfirmActionModal/>

    </div>
  );
}
