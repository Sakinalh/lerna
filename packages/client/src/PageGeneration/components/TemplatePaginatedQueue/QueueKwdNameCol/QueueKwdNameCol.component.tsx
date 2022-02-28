import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { SelectableKwdPages, StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { patchSelectionQueueAction } from "src/PageGeneration/store/queue.epic";
import { TemplateKeywordApi } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppText } from "src/components/AppText/AppText.component";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { QueueRow } from "../../QueueRow/QueueRow.component";
import { QueueTableCol } from "../QueueTableCol/QueueTableCol.component";

const useStyles = makeStyles(theme => ({
  root: {
    borderRight: theme.shape.border.solidGrey,
    paddingRight: 5,
    fontSize: "1.1em",
    fontWeight: "lighter"
  },
  cell: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  checkbox: {}
}));

interface QueueKwdNameColProps {
  keywords: TemplateKeywordApi[];
}

export function QueueKwdNameCol(props: QueueKwdNameColProps) {
  const classes = useStyles({});
  const { keywords } = props;
  const selectedPages: SelectableKwdPages = useSelector(
    (state: StoreState) => state.pageQueue.selectedKeywords
  );
  const dispatch = useDispatch();

  function handleClick(event: React.MouseEvent<unknown>, kwdId: number) {
    const value = (event.target as HTMLInputElement).checked;
    dispatch(
      patchSelectionQueueAction({ key: kwdId, value: { isSelected: value } })
    );
  }

  function checkBoxValue(kwdId: number) {
    // in case kdw id is not defined for some reason
    if(selectedPages[kwdId]) {
      return kwdId ? selectedPages[kwdId].isSelected : false;
    }

    return false;
  }

  return (
    <QueueTableCol colName={TRANSLATE.shared.kwd}>
      <ul className={classes.root}>
        {keywords && keywords.map((kwd, idx) => (
          <QueueRow
              key={`${kwd.keyword_id}__${idx}`}
              pageCount={kwd.pages.length}
            >
            <AppCheckbox
                whiteBg
                onClick={event => handleClick(event, kwd.keyword_id)}
                disabled={kwd.pages.length === 0}
                checked={checkBoxValue(kwd.keyword_id)}
                size="small"
                color="primary"
                inputProps={{ "aria-label": "labelId" }}
                classes={{ root: classes.checkbox }}
              />

            <AppText
                themeColor="initial"
                text={kwd.keyword_name}
                capitalize="first"
              />
          </QueueRow>
        ))}
      </ul>
    </QueueTableCol>
  );
}
