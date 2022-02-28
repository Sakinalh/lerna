import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Accordion, AccordionDetails, AccordionSummary } from "src/deps";
import { ArrowDropDown } from "@mui/icons-material";
import { DetailKeywordSearch } from "src/components/DetailKwd/DetailKwdSearch/DetailKwdSearch.component";
import { DetailAdgroup } from "src/components/DetailAdgroup/DetailAdgroup.component";
import { DetailCampaign } from "src/components/DetailCampaign/DetailCampaign.component";
import { DetailKwdList } from "src/components/DetailKwd/DetailKwdList/DetailKwdList.component";
import * as TRANSLATE from "src/shared/translation/en.json";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import {
  PageAdgroupInterface,
  PageCampaignInterface,
  PageKwdInterfaceView,
  RuleKeyword
} from "src/PageGeneration/model";
import { patchRuleKeywordsAction, patchSelectTemplateQueries } from "src/PageGeneration/store/rule.epic";
import { AppText } from "src/components/AppText/AppText.component";
import { ActionTagList } from "../../shared/ActionTagList/ActionTagList.component";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "10px 15px",
    fontSize: "1.2em"
  },
  accordion: {
    border: theme.shape.border.solidGrey,
    boxShadow: theme.shape.objectShadow.boxShadowLight,
    borderRadius: theme.shape.border.radiusMin,
    marginTop: 20,
    position: "inherit"
  },
  accordionDetails: {
    padding: "0 30px",
    marginBottom: 35
  },
  contentAccordion: {
    display: "grid",
    gridTemplateColumns: "75% 25%",
    alignItems: "center"

  },
  textExpand: {
    fontSize: ".9em",
    textAlign: "center",
    textDecoration: "underline"
  },
  icon: {
    color: theme.palette.blue.main
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  kwdSummary: {
    width: "100%",
    color: theme.palette.grey.middle1
  },
  kwdDetails: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "50% 50%"
  },
  kwdContent: {
    width: "100%"
  }
}));

export function coerceKwd(datum: RuleKeyword | PageKwdInterfaceView): RuleKeyword {
  return datum.hasOwnProperty("keyword_id")
    ? {
      id: (datum as PageKwdInterfaceView).keyword_id,
      name: (datum as PageKwdInterfaceView).keyword_name
    }
    : datum as RuleKeyword;
}

interface DetailQueryKeywordProps {}

export function DetailQueryKeyword(props: DetailQueryKeywordProps) {
  const classes = useStyles(props);

  const data: RuleKeyword[] = useSelector((state: StoreState) => state.ruleDetail.rule.datum.keywords);
  const dispatch = useDispatch();

  const [next, setNext] = useState<{ selection: RuleKeyword[]; }>({
    selection: data
  });

  useEffect(() => {
    dispatch(patchSelectTemplateQueries<RuleKeyword>({ key: "keywords", value: data }));
    setNext({ selection: data });
  }, [data, dispatch]);

  function handleSelectValue(payload: PageKwdInterfaceView) {
    dispatch(patchRuleKeywordsAction(coerceKwd(payload)));
  }

  function handleCampaignSelect(payload: PageCampaignInterface[]) {
    dispatch(patchSelectTemplateQueries<PageCampaignInterface>({ key: "campaigns", value: payload }));
  }

  function handleAdGroupSelect(payload: PageAdgroupInterface[]) {
    dispatch(patchSelectTemplateQueries<PageAdgroupInterface>({ key: "adgroups", value: payload }));
  }

  function handleAdGroupSelectAll(payload: PageAdgroupInterface[]) {
    dispatch(patchSelectTemplateQueries<PageAdgroupInterface>({ key: "adgroups", value: payload }));
  }

  return (
    <Accordion classes={{ root: classes.accordion }}>
      <AccordionSummary
        expandIcon={<ArrowDropDown classes={{ root: classes.icon }}/>}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
        classes={{
          root: classes.root,
          content: classes.contentAccordion
        }}

      >
        <div className={classes.kwdSummary}>
          <AppText text={TRANSLATE.shared.kwd} capitalize="first"/>
          <DetailKeywordSearch selection={next.selection}
            onSelectValue={handleSelectValue}
            placeHolder="Choose one or more Google keyword to generate keyword"
          />
        </div>
        <AppText themeColor={"actionColor"}
          text={TRANSLATE.shared.showCampaign} capitalize="first"
          props={{ classes: { root: classes.textExpand } }}/>

      </AccordionSummary>
      <AccordionDetails classes={{ root: classes.accordionDetails }}>
        <div className={classes.kwdContent}>
          <div className={classes.kwdDetails}>
            <DetailCampaign onSelect={handleCampaignSelect}/>
            <DetailAdgroup
              onSelect={handleAdGroupSelect}
              onSelectAll={handleAdGroupSelectAll}
            />

          </div>

          <DetailKwdList selection={next.selection}
            onSelectValue={handleSelectValue}
          />
          <ActionTagList<RuleKeyword>
            data={data}
            title="selected kwd"
            labelPath={["name"]}
            onAction={handleSelectValue}
          />

        </div>
      </AccordionDetails>
    </Accordion>
  );
}
