import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ParamsState, StoreState } from "src/model";
import { TemplateDateRange } from "src/PageGeneration/components/TemplateDateRange/TemplateDateRange.component";
import makeStyles from "@mui/styles/makeStyles";
import { ENUM_SORT_TEMPLATE_MODELS } from "src/PageGeneration/model";
import { TemplateSortBtn } from "src/PageGeneration/components/TemplateSortBtn/TemplateSortBtn.component";
import { setRuleListPagination, tryGetTemplateList } from "src/PageGeneration/store/template.epic";
import { DEFAULT_PAGINATION_DATE_SORT } from "src/api/routes/api_routes";
import { getTemplateList } from "src/api/react-query/templateList.store";
import { useQuery } from "react-query";
import { useScrollTop } from "../../../hooks/useScrollTop";
import {
  isQParamsValid,
  qStringToObject,
  queryParamsToStr,
  searchParamsToObject
} from "../../../components/AppPaginator/AppPaginator.component";
import { TemplatePaginatedList } from "../../components/TemplatePaginatedList/TemplatePaginatedList.component";

const useStyles = makeStyles({
  root: {
    width: "90%",
    margin: "0 auto"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0"
  }
});

interface TemplatePageProps {}

export default function TemplateListPage(_props: TemplatePageProps) {
  const classes = useStyles({});

  const dispatch = useDispatch();

  const query = useSelector((state: StoreState) => state.ruleList.queryStr);
  // const {data: templateList} = useQuery(['getTemplateList'], getTemplateList(query));

  const paramsState = useSelector((state: StoreState) => state.ruleList.queryState);

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
      // dispatch(tryGetTemplateList(query));
    } else {
      // if no q. date is not fetched. either use url params if is valid or fallback to default.
      const payload: unknown = isSearchValid ? searchParamsToObject(_urlSearParams) : DEFAULT_PAGINATION_DATE_SORT;

      dispatch(
        setRuleListPagination({
          qState: payload as ParamsState,
          qStr: queryParamsToStr(payload as ParamsState)
        })
      );
    }
  }, [query, dispatch]);

  useScrollTop("container_top", query as string);

  function handleAction(payload: unknown) {
    dispatch(
      setRuleListPagination({
        qState: payload as ParamsState,
        qStr: queryParamsToStr(payload as ParamsState)
      })
    );
  }

  return (
    <section className={classes.root}>
      <div className={classes.actions}>
        <TemplateDateRange
          onDateChange={handleAction}
          reqState={paramsState}
        />

        <TemplateSortBtn sortList={ENUM_SORT_TEMPLATE_MODELS.default}
          onSort={handleAction}
          reqState={paramsState}/>

      </div>

      <TemplatePaginatedList limit={paramsState.limit}/>

    </section>
  );
}
