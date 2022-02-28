import * as React from "react";
import { useSelector } from "react-redux";
import { ListLoadState, PaginatedListApi, StoreState } from "src/model";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { SKELETON } from "src/shared/style";
import { setGeneratedListPagination } from "src/PageGeneration/store/generated.epic";
import { TemplatePageKdwApi } from "../../model";
import { GeneratedPageRow } from "./GeneratedPageRow/GeneratedPageRow.component";
import { AppPaginator } from "../../../components/AppPaginator/AppPaginator.component";

const useStyles = makeStyles({
  root: {},
  table: {
    display: "grid",
    gridTemplateColumns: "20% 80%"
  },

  loading: {
    pointerEvents: "none",
    "& ul>li div": {
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

interface TemplatePaginatedListProps {limit: string}

export function TemplateGeneratedPaginatedList(
  { limit }: TemplatePaginatedListProps
) {
  const classes = useStyles({});

  const data: PaginatedListApi<TemplatePageKdwApi> = useSelector(
    (state: StoreState) => state.pageGenerated.list
  );
  const dataState: ListLoadState = useSelector(
    (state: StoreState) => state.pageGenerated.dataState
  );
  const { results, ...rest } = data;

  return (
    <div
      className={clsx(classes.root, {
        [classes.loading]: dataState !== "complete"
      })}
    >
      {results.map((pg, idx) => (
        <GeneratedPageRow datum={pg} key={`${pg.page_id}__${idx}`}/>
      ))}

      <AppPaginator
        pagination={rest}
        count={rest.count}
        dispatcherCb={setGeneratedListPagination} chunkSize={limit}/>

    </div>
  );
}
