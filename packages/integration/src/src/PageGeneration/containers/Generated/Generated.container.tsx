import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { setGeneratedListPagination, tryGetGeneratedList } from "src/PageGeneration/store/generated.epic";
import makeStyles from "@mui/styles/makeStyles";
import { useScrollTop } from "src/hooks/useScrollTop";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { TemplateDateRange } from "../../components/TemplateDateRange/TemplateDateRange.component";
import { TemplateSortBtn } from "../../components/TemplateSortBtn/TemplateSortBtn.component";
import { ENUM_SORT_TEMPLATE_MODELS } from "../../model";
import { TemplateGeneratedPaginatedList } from "../../components/TemplateGeneratedPaginatedList/TemplateGeneratedPaginatedList.component";

import {
  isQParamsValid,
  qStringToObject,
  queryParamsToStr,
  searchParamsToObject
} from "../../../components/AppPaginator/AppPaginator.component";
import { DEFAULT_PAGINATION_DATE_SORT } from "../../../api/routes/api_routes";
import { ParamsState } from "../../../model";

interface GeneratedPageProps {}

const useStyles = makeStyles({
  root: {
    width: "90%",
    margin: "0 auto"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0"
  },
  btn: {
    height: 20
  },
  actionsAction: {
    display: "flex"
  }
});

export default function GeneratedPage(_props: GeneratedPageProps) {
  const classes = useStyles({});

  const query = useSelector((state: StoreState) => state.pageGenerated.queryStr);

  const paramsState = useSelector((state: StoreState) => state.pageGenerated.queryState);
  const dispatch = useDispatch();

  useEffect(() => {
    const _urlSearParams = new URL(window.location.href as string).searchParams;

    const VALID_PARAMS = ["offset", "limit", "sort_order", "sort_criteria", "start_date", "end_date"];
    const isSearchValid = isQParamsValid(_urlSearParams, VALID_PARAMS);

    if(query) {
      if(!isSearchValid) {
        // the store has a previous valid query. juste update the url

        const { limit, offset, sort_order, sort_criteria, start_date, end_date } = qStringToObject(query);
        const newRelativePathQuery = window.location.pathname + queryParamsToStr({
          sort_order,
          sort_criteria,
          start_date,
          end_date,
          limit,
          offset
        });
        window.history.replaceState(null, "", newRelativePathQuery);
      }
      dispatch(tryGetGeneratedList(query));
    } else {
      // if no q. date is not fetched. either use url params if is valid or fallback to default.
      const payload: unknown = isSearchValid ? searchParamsToObject(_urlSearParams) : DEFAULT_PAGINATION_DATE_SORT;

      dispatch(
        setGeneratedListPagination({
          qState: payload as ParamsState,
          qStr: queryParamsToStr(payload as ParamsState)
        })
      );
    }
  }, [query, dispatch]);

  useScrollTop("container_top", query as string);

  function handleAction(payload: unknown) {
    // dispatch(tryInitGeneratedList({req: payload, opt: {}}));
    setGeneratedListPagination({
      qState: payload as ParamsState,
      qStr: queryParamsToStr(payload as ParamsState)
    });
  }

  return (
    <section className={classes.root}>
      <div className={classes.actions}>
        <div className={classes.actionsAction}>
          <TemplateDateRange onDateChange={handleAction} reqState={paramsState}/>
          <TemplateSortBtn
            sortList={ENUM_SORT_TEMPLATE_MODELS.default}
            onSort={handleAction}
            reqState={paramsState}
          />
        </div>
        <AppBtn classes={{ root: classes.btn }}
          variant="contained"
          color="secondary">
          {TRANSLATE.shared.createTemplate}
        </AppBtn>

      </div>

      <TemplateGeneratedPaginatedList limit={paramsState.limit}/>
    </section>
  );
}
