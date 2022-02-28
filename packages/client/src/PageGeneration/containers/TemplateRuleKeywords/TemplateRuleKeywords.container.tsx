import * as React from "react";
import { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { TemplateStepper } from "src/PageGeneration/components/shared/TemplateStepper/TemplateStepper.component";
import * as TRANSLATE from "src/shared/translation/en.json";
import { CollectionNameApi } from "src/PageGeneration/model";
import { DetailQuerySelect } from "src/PageGeneration/components/TemplateDetail/DetailQuerySelect/DetailQuerySelect.component";
import { DetailQueryKeyword } from "src/PageGeneration/components/TemplateDetail/DetailQueryKeyword/DetailQueryKeyword.component";
import { DetailMessageMatch } from "src/PageGeneration/components/TemplateDetail/DetailMessageMatch/DetailMessageMatch.component";
import { parsePathRouteParams } from "src/shared/utils";
import { patchSelectTemplateQueries } from "src/PageGeneration/store/rule.epic";
import { StoreState } from "src/model";
import { AppText } from "src/components/AppText/AppText.component";
import { TemplateRuleUpdateBtn } from "../../components/TemplateRuleUpdateBtn/TemplateRuleUpdateBtn.component";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    paddingBottom: 20,
    color: theme.palette.grey.middle2
  },
  row: {
    display: "grid",
    gridTemplateColumns: "75% 25%",
    gridColumnGap: 35,
    width: "80%",
    margin: "0 auto"
  },
  templateName: {
    color: theme.palette.grey.light,
    boxShadow: theme.shape.objectShadow.boxShadowAll,
    border: theme.shape.border.solidGrey,
    borderRadius: theme.shape.border.radiusMin,
    padding: 30
  },
  sectionTitle: {
    padding: "20px 0",
    fontSize: "1.2em"
  },
  btn: {
    marginTop: 30,
    width: "100%",
    borderRadius: theme.shape.border.radiusMin
  }
}));

interface TemplateRuleKeywordsProps {
  pathModel: string
}

export default function TemplateRuleKeywords(_props: TemplateRuleKeywordsProps) {
  const classes = useStyles({});

  const dispatch = useDispatch();
  const [querySelect, setQuerySelect] = useState({});

  const name: string = useSelector((state: StoreState) => state.ruleDetail.rule.datum.name);

  const url: string = useSelector((state: StoreState) => state.ruleDetail.templateDetail.url);
  const {
    params: {
      templateId,
      ruleId
    }
  } = parsePathRouteParams(window.location.pathname, "generation/template/:templateId/rule/:ruleId/keywords/");

  function handleSelectQ(payload: { selection: Record<string, boolean>; data: CollectionNameApi[] }) {
    dispatch(patchSelectTemplateQueries<CollectionNameApi>({ key: "queries", value: payload.data }));
    setQuerySelect(payload.selection);
  }

  return (
    <section className={classes.root}>
      <div className={classes.row}>
        <AppText text={TRANSLATE.editTemplate.media}
          capitalize="first"
          themeColor="neutralColor"
          props={{ classes: { root: classes.sectionTitle } }}

        />
        <AppText text={TRANSLATE.editTemplate.selection}
          capitalize="first"
          themeColor="neutralColor"
          props={{ classes: { root: classes.sectionTitle } }}

        />

      </div>
      <div className={classes.row}>
        <main>
          <TemplateStepper label="rule name"
            nameValue={name}
            previewUrl={url}
            editLink={`/generation/template/${templateId}/rule/${ruleId}/edit/`}
            overrideClasses={classes.templateName} />
          <DetailQuerySelect
            selectQ={querySelect}
            onSelect={handleSelectQ}
          />
          <DetailQueryKeyword />
        </main>
        <aside>
          <DetailMessageMatch />

          <TemplateRuleUpdateBtn />
        </aside>
      </div>

    </section>
  );
}
