import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaginatedListApi, StoreState } from "src/model";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { SKELETON } from "src/shared/style";
import { setRuleListPagination } from "src/PageGeneration/store/template.epic";
import { useQuery } from "react-query";
import { getTemplateList } from "src/api/react-query/templateList.store";
import { AppPaginator } from "../../../components/AppPaginator/AppPaginator.component";
import { TemplateListItemApi } from "../../model";
import { TemplatePaginatedRow } from "./TemplatePaginatedRow/TemplatePaginatedRow.component";
const useStyles = makeStyles({
  root: {},

  loading: {
    pointerEvents: "none",
    "& ul>li article div": {
      position: "relative",
      height: 30,
      width: "60%",
      margin: "0 auto",
      borderRadius: 6,
      "& *": {
        opacity: 0
      },

      ...SKELETON.applyAnimation
    }

  },
  ...SKELETON.animation

});

interface TemplatePaginatedListProps { limit: string }

export function TemplatePaginatedList({ limit }: TemplatePaginatedListProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();
  // const {
  //   results,
  //   ...rest
  // }: PaginatedListApi<TemplateListItemApi> = useSelector((state: StoreState) => state.ruleList);
  // console.log("results",results)
  // const dataState = useSelector((state: StoreState) => state.ruleList.dataState);
  const query = useSelector((state: StoreState) => state.ruleList.queryStr);
  const { data: {results, ...rest } = {}, isSuccess } = useQuery(["getTemplateList", query], getTemplateList);
  return (

    <div className={clsx(classes.root, {
      [classes.loading]: !isSuccess
    })}
    >
      <ul>
        {
           isSuccess && results.map((d, idx) => (
             <TemplatePaginatedRow key={`${d.name}_${idx}`}
              datum={d} />
           ))
        }
      </ul>
      {isSuccess && <AppPaginator
        pagination={rest}
        count={rest.count}
        dispatcherCb={setRuleListPagination}
        chunkSize={limit}
      />}

    </div>
  );
}
