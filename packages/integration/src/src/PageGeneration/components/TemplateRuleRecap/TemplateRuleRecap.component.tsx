import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TemplateStepper } from "src/PageGeneration/components/shared/TemplateStepper/TemplateStepper.component";
import { FormState, ListLoadState, StoreState } from "src/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { StateActionSubmit } from "src/components/StateActionSubmit/StateActionSubmit.component";
import { parsePathRouteParams } from "src/shared/utils";
import {
  PageKwdInterfaceView,
  RuleKeyword,
  TemplateListItemApi,
  TemplateRuleNormalizedApi
} from "src/PageGeneration/model";
import { ArrowBack } from "@mui/icons-material/";
import { AppLink } from "src/components/AppLink/AppLink";
import { AppText } from "src/components/AppText/AppText.component";
import { patchRuleKeywordsAction } from "../../store/rule.epic";
import { GlobalRulesRecap } from "./GlobalRulesRecap/GlobalRulesRecap.component";
import { AreasRecap } from "./AreasRecap/AreasRecap.component";
import { ActionTagList } from "../shared/ActionTagList/ActionTagList.component";
import { coerceKwd } from "../TemplateDetail/DetailQueryKeyword/DetailQueryKeyword.component";
import { denormalizeRulePayload } from "../../shared/helper";
import { tryPostGeneratePagesAction } from "../../store/generate.epic";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.white,
    width: "70%",
    margin: "10px auto",
    padding: "10px 50px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  content: {
    border: theme.shape.border.solidGrey,
    padding: 20,
    marginTop: 20,
    borderRadius: 4
  },
  title: {
    fontSize: "1.2em",
    paddingLeft: 20
  },
  section_title: {
    padding: "20px 0",
    fontSize: "1.2em"
  },
  btnLink: {
    textDecoration: "underline"
  },
  link: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.blue.main
  },
  label: {
    fontSize: "1.4em"
  }
}));

const useStateBtnStyles = makeStyles(theme => ({
  btnRoot: {
    fontSize: 10
  },
  idle: {
    backgroundColor: theme.palette.blue.main,
    borderRadius: 4,
    width: "20%"
  },
  valid: {
    backgroundColor: theme.palette.blue.main,
    borderRadius: 4,
    width: "20%"
  }
}));

interface TemplateRuleRecapProps {
}

export function TemplateRuleRecap(_props: TemplateRuleRecapProps): JSX.Element {
  const classes = useStyles({});
  const stateBtnClasses = useStateBtnStyles({});
  const dispatch = useDispatch();

  const templateDetail: TemplateListItemApi = useSelector(
    (state: StoreState) => state.ruleDetail.templateDetail
  );
  const ruleDetail: TemplateRuleNormalizedApi = useSelector(
    (state: StoreState) => state.ruleDetail.rule.datum
  );

  const formState: FormState = useSelector(
    (state: StoreState) => state.ruleDetail.formState
  );
  const dataState: ListLoadState = useSelector(
    (state: StoreState) => state.ruleDetail.dataState
  );

  const [hasStarted, setHasStarted] = useState(false);
  const {
    params: {
      templateId,
      ruleId
    }
  } = parsePathRouteParams(window.location.pathname, "generation/template/:templateId/rule/:ruleId/recap/");

  function handleSubmit() {
    setHasStarted(true);
    //       dispatch(tryPostRuleDetailAction(denormalizeRulePayload(ruleDetail)));

    dispatch(tryPostGeneratePagesAction({
      id: ruleId,
      data: denormalizeRulePayload(ruleDetail)
    }));
  }

  function handleSelectValue(payload: PageKwdInterfaceView) {
    dispatch(patchRuleKeywordsAction(coerceKwd(payload)));
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.link}>

          <AppLink
            path="../keywords"
            customclass={classes.btnLink}
            iconBefore={<ArrowBack/>}
            label={TRANSLATE.btn.backPageMedia}/>
          <AppText text={TRANSLATE.templateRecap.pageTitle}
            themeColor="neutralColor"
            props={{ classes: { root: classes.title } }}
          />
        </div>

        <StateActionSubmit formState={formState}
          disable={""}
          onClick={handleSubmit}
          overrideClass={stateBtnClasses}
          overrideProps={{ type: "button" }}>

          <AppText text={dataState === "complete" && hasStarted ? "created" : "start generation"}
            props={{ variant: "caption", classes: { root: classes.label } }}
          />

        </StateActionSubmit>

      </div>
      <div className={classes.content}>
        <TemplateStepper label="template name"
          nameValue={templateDetail.name}
          editLink={`/generation/template/${templateId}/rule/${ruleId}/edit/`}
        />

        <GlobalRulesRecap/>

        <AreasRecap/>

        <AppText text={TRANSLATE.templateRecap.SEAtitle}
          props={{ classes: { root: classes.section_title } }}
        />

        <ActionTagList<RuleKeyword>
          data={ruleDetail.keywords}
          title="selected kwd"
          labelPath={["name"]}
          onAction={handleSelectValue}
        />
      </div>
    </div>
  );
}
