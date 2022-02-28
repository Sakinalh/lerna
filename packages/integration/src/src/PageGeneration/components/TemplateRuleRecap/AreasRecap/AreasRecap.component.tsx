import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  TemplateAreaItemImg,
  TemplateAreaItemProduct,
  TemplateAreaItemText,
  TemplateRuleNormalizedApi
} from "src/PageGeneration/model";
import { RecapTxtArea } from "src/PageGeneration/components/TemplateRuleRecap/RecapTxtArea/RecapTxtArea.component";
import * as TRANSLATE from "src/shared/translation/en.json";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { RecapImgArea } from "../RecapImgArea/RecapImgArea.component";
import { AreasProduct } from "../AreasProduct/AreasProduct.component";
import { AppText } from "../../../../components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 30
  },
  name: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  title: {
    marginBottom: 30
  },
  header: {},
  cards: {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    flexDirection: "row",
    border: `solid 1px ${theme.palette.grey.light}`,
    borderRadius: 1,
    padding: "10px 30px",
    marginBottom: 20
  }

}));

function ErrArea() {
  return <p>something wen wrong </p>;
}

function renderTemplateArea(ruleZone: TemplateAreaItemText | TemplateAreaItemImg | TemplateAreaItemProduct) {
  try {
    if(ruleZone.type === "text") {
      return <RecapTxtArea datum={(ruleZone as TemplateAreaItemText).rule}/>;
    }
    if(ruleZone.type === "image") {
      return <RecapImgArea datum={(ruleZone as TemplateAreaItemImg)}/>;
    }

    if(ruleZone.type === "product") {
      return <AreasProduct datum={(ruleZone as TemplateAreaItemProduct)}/>;
    }
    return <div>cannot show area type {ruleZone.type}</div>;
  } catch (e) {
    return ErrArea;
  }
}

interface AreasRecapProps {
}

export function AreasRecap(_props: AreasRecapProps): JSX.Element {
  const ruleDetail: TemplateRuleNormalizedApi = useSelector(
    (state: StoreState) => state.ruleDetail.rule.datum
  );
  const classes = useStyles({});

  return (
    <section className={classes.root}>

      <AppText text={TRANSLATE.templateRecap.areasTitle} props={{ classes: { root: classes.title } }}/>
      {ruleDetail.zones.map((z, idx) => (
        <article className={classes.cards}
            key={`${z.zone_id}__${idx}`}>
          <div className={classes.name}>
            <AppText text={`Areas ${idx + 1}`}/>
            <AppText text={z.comment as string} props={{ variant: "caption" }}/>
          </div>
          {renderTemplateArea(z)}
        </article>
      ))}
    </section>
  );
}
