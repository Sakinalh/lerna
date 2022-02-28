import { MouseEvent as ReactMouseEvent, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectionSource, tryGetVarSourceAction } from "src/PageGeneration/store/variableSources.epic";
import { StoreState } from "src/model";
import { DEFAULT_PAGINATION_PARAMS } from "src/api/routes/api_routes";
import { ActionsPagination } from "../../../shared/ActionsPagination/ActionsPagination.component";
import { VariablesSourceList } from "./VariablesSourceList/VariablesSourceList.component";
import { SourceUploadFile } from "./SourceUploadFile/SourceUploadFile.component";
import { VariablesUpdateBtn } from "./VariablesUpdateBtn/VariablesUpdateBtn.component";
import { GenerationCancelBtn } from "../../../shared/GenerationCancelBtn/GenerationCancelBtn.component";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "30px 40px",
    backgroundColor: "white"
  },
  content: {
    padding: 15,
    border: heme.shape.border.solidGrey,
    borderRadius: theme.shape.border.radiusMin
  },
  actions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "flex-end",
    color: "white"
  }
}));

interface VariablesSourceActionsProps {
    isFocused: boolean;
}

export function VariablesSourceActions({ isFocused }: VariablesSourceActionsProps) {
  const classes = useStyles({});
  const { limit, offset } = useSelector((state: StoreState) => state.ruleDetail.variableData.sources.pagination);
  const { list, selected } = useSelector((state: StoreState) => state.ruleDetail.variableData.sources);
  const { data: { results, ...rest } } = list;

  const dispatch = useDispatch();
  useEffect(() => {
    if(isFocused) {
      // ugly, invalidate cheat pagination
      const patchLimit = limit === DEFAULT_PAGINATION_PARAMS.limit ? "50" : limit;
      dispatch(tryGetVarSourceAction({ limit: patchLimit, offset }));
    }
  }, [dispatch, limit, offset, isFocused]);

  function onCancel(e: ReactMouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(resetSelectionSource({ state: selected, value: false }));
  }

  return (
    <article className={classes.root}>
      <main className={classes.content}>
        <SourceUploadFile/>
        <div>
          <VariablesSourceList data={results}/>

          <ActionsPagination pagination={rest}
            count={results.length}
            dispatcherCb={tryGetVarSourceAction}/>
        </div>
      </main>
      <footer className={classes.actions}>

        <GenerationCancelBtn onClick={onCancel}/>

        <VariablesUpdateBtn/>
      </footer>

    </article>
  );
}
