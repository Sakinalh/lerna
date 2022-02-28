import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TemplateKeywordApi } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { QueueTableCol } from "../QueueTableCol/QueueTableCol.component";
import { LinkExt } from "../../../../components/LinkExt/LinkExt.component";
import { QueueCell } from "../../QueueCell/QueueCell.component";

const useStyles = makeStyles({

  cell: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    "&::before": {
      content: "''",
      borderTop: "1px solid #F2F2F2",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0
    }
  }
});

interface QueueKwdPageColProps {
    keywords: TemplateKeywordApi[];
}

export function QueueKwdPageCol({ keywords }: QueueKwdPageColProps) {
  const classes = useStyles({});

  return (
    <QueueTableCol colName={TRANSLATE.shared.pageInfo}>
      <ul>
        {keywords && keywords.map((k, _idx) => k.pages && k.pages.map((page, _p_idx) => (
          <QueueCell
                customStyle={classes.cell}
                key={`${k.keyword_id}_score_${page.page_id}`}
              >
            <LinkExt label={page.page_name}
                  link={page.page_url}/>

          </QueueCell>
        )))}
      </ul>
    </QueueTableCol>
  );
}
