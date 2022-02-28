import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TemplateKeywordApi } from "src/PageGeneration/model";
import { shared } from "src/shared/translation/en.json";
import { QueueTableCol } from "../QueueTableCol/QueueTableCol.component";
import { QueueCell } from "../../QueueCell/QueueCell.component";
import { AppText } from "../../../../components/AppText/AppText.component";

const useStyles = makeStyles({
  root: {
    position: "relative"
  },
  cell: {
    borderLeft: "1px solid #F2F2F2",
    display: "flex",
    color: "black",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  textMessage: {
    paddingTop: 5
  }
});

interface QueueKwdScoreColProps {
    keywords: TemplateKeywordApi[];
}

export function QueueKwdScoreCol(props: QueueKwdScoreColProps) {
  const classes = useStyles({});
  const { keywords } = props;
  return (
    <QueueTableCol colName={shared.messageScore}>
      <ul className={classes.root}>
        {keywords && keywords.map((k, _idx) => k.pages && k.pages.map((page, _p_idx) => (
          <QueueCell
                customStyle={classes.cell}
                key={`${page.page_id}_score_${_p_idx}`}
              >
            <AppText text={`${page.message_match}%`}/>

            <AppText text={"message match"}
                  capitalize="lowercase"
                  props={{
                    classes: { root: classes.textMessage }
                  }}
                />
          </QueueCell>
        )))}
      </ul>
    </QueueTableCol>
  );
}
