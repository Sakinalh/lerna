import makeStyles from "@mui/styles/makeStyles";
import { TemplateKeywordApi } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { QueueTableCol } from "../QueueTableCol/QueueTableCol.component";
import { QueueCtaBtn } from "../QueueCtaBtn/QueueCtaBtn.component";
import { QueueCell } from "../../QueueCell/QueueCell.component";

const useStyles = makeStyles({
  root: {
    position: "relative",
    fontSize: "1.15em"
  }

});

interface QueueKwdActionsColProps {
    keywords: TemplateKeywordApi[];
    ruleId: number;
}

export function QueueKwdActionsCol({
  keywords,
  ruleId
}: QueueKwdActionsColProps) {
  const classes = useStyles({});

  return (
    <QueueTableCol colName={TRANSLATE.shared.actions}>
      <ul className={classes.root}>
        {keywords && keywords.map((k, _idx) => k.pages && k.pages.map((page, _p_idx) => (
          <QueueCell
                key={`${page.page_id}_action_${_p_idx}`}
              >

            <QueueCtaBtn
                  keyword_id={k.keyword_id}
                  keyword={k}
                  ruleId={ruleId}
                  page={page}
                />
          </QueueCell>
        )))}
      </ul>
    </QueueTableCol>
  );
}
