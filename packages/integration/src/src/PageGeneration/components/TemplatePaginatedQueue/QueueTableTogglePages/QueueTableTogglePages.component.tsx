import { ChangeEvent as ReactChangeEvent } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { FormControlLabel } from "src/deps";
import { useDispatch, useSelector } from "react-redux";
import {
  patchSelectableValue,
  setIsSelectAllAction,
  setSelectionQueueAction,
  tryPatchGetTemplateQueueKwdAction
} from "src/PageGeneration/store/queue.epic";
import { SelectableKwdPages, StoreState } from "src/model";
import { OutlinedCheckboxCheckedIcon, OutlinedCheckboxIcon } from "src/PageGeneration/shared/style";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { PAGE_GEN_RULES, CHEAT_PAGINATION } from "src/api/routes/api_routes";
import { TemplatePageRuleListApi } from "../../../model";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "inherit"
  },
  label: {
    color: theme.palette.grey.dark
  }
}));

interface QueueTableTogglePagesProps {

}

export function QueueTableToggle(_props: QueueTableTogglePagesProps) {
  const classes = useStyles({});
  const isSelectAll: boolean = useSelector((state: StoreState) => state.pageQueue.isSelectAll);
  const selectedPages: SelectableKwdPages = useSelector((state: StoreState) => state.pageQueue.selectedKeywords);
  const dispatch = useDispatch();
  const allPages: TemplatePageRuleListApi[] = useSelector((state: StoreState) => state.pageQueue.list.results);

  const handleChange = (event: ReactChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    const ruleWithEmptyKwd = allPages.filter(p => p.keywords.length === 0).map(p => p.id);

    if(ruleWithEmptyKwd.length === 0) {
      // all keywords are already loaded
      const patch = patchSelectableValue(selectedPages, value);
      dispatch(setSelectionQueueAction(patch));
      dispatch(setIsSelectAllAction(value));
      return;
    }

    const queries = ruleWithEmptyKwd.map(id => ({
      query: `${PAGE_GEN_RULES}${id.toString()}/pages/?${CHEAT_PAGINATION}`,
      id
    }));

    dispatch(tryPatchGetTemplateQueueKwdAction({ queries, nextSelectValue: value }));
  };
  return (
    <FormControlLabel
      classes={{
        root: classes.root,
        label: classes.label
      }}
      control={
        <AppCheckbox
        whiteBg
          checked={isSelectAll}
          onChange={handleChange}
          name="toggle page selection"
          color="primary"
          icon={<OutlinedCheckboxIcon size="sm"/>}
          checkedIcon={<OutlinedCheckboxCheckedIcon size="sm"/>}
          inputProps={{ "aria-label": "select_all_label" }}

        />
      }
      labelPlacement="end"
      label={TRANSLATE.selectAll}
    />

  );
}
