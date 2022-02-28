import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { TemplateVariables } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppText } from "src/components/AppText/AppText.component";
import { GlobalCampaign } from "../GlobalCampagins/GlobalCampaign.component";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 30
  },
  title: {
    marginBottom: 30
  },
  variables: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: `solid 1px ${theme.palette.grey.light}`,
    borderRadius: theme.shape.border.radiusMin,
    marginTop: 10,
    padding: "10px 30px",
    fontSize: "1.2em"
  },
  cardBlock: {
    display: "flex",
    color: theme.palette.grey.light,
    width: "56%"
  },
  cards: {
    fontSize: ".7em",
    marginLeft: 5,
    border: theme.shape.border.solidGrey,
    borderRadius: 5,
    padding: "2px 10px",
    color: theme.palette.middle2
  }
}));

interface GlobalRulesRecapProps {}

export function GlobalRulesRecap(props: GlobalRulesRecapProps): JSX.Element {
  const classes = useStyles(props);
  const variables: TemplateVariables = useSelector((state: StoreState) => state.ruleDetail.rule.datum.variables);

  return (
    <div className={classes.root}>
      <AppText text={TRANSLATE.templateRecap.globalsTitle} props={{ classes: { props: classes.title } }}/>
      <GlobalCampaign/>
      <div className={classes.variables}>

        <AppText text={TRANSLATE.templateRecap.variableTitle}/>
        <div className={classes.cardBlock}>
          {
            variables.map((v, index) =>
              <div className={classes.cards} key={index}>
                <AppText text={`{${v.name}}: "${v.value}"`}
                  props={{ variant: "caption" }}
                />

              </div>)
          }
        </div>
      </div>
    </div>
  );
}
