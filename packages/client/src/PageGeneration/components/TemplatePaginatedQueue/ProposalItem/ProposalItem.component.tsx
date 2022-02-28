import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TemplateZoneApi } from "../../../model";
import { ProposalImg } from "../ProposalImg/ProposalImg.component";
import { AppText } from "../../../../components/AppText/AppText.component";

const useStyles = (props: { maxHeight: number }) => makeStyles(theme => ({
  product: {
    padding: 0,
    height: "100%",
    maxHeight: props.maxHeight,
    overflow: "auto",
    fontSize: ".9em",
    border: theme.shape.border.dashedGrey

  },
  action: {
    padding: 0
  },
  proposal_img_wrap: {
    overflow: "hidden",
    width: 120,
    height: 150,
    paddingBottom: 5
  },
  productItem: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between"
  }
}));

function display(templ: TemplateZoneApi | undefined, fallback) {
  return templ && Array.isArray(templ.content) ? templ.content : fallback;
}

function renderProposalItem(datum: TemplateZoneApi, classes) {
  const { type } = datum;
  const zone_type = "simple";
  // if (zone_type === "complex") {
  //   const textZone = datum.sub_zones.find(s => s.data_type === "text");
  //   const imgZone = datum.sub_zones.find(s => s.data_type === "image");

  //   return <div className={classes.productItem}>
  //     <div className={classes.proposal_img_wrap}>
  //       <ProposalImg
  //         src={display(imgZone, "")}
  //         alt="visual missing"/>
  //     </div>
  //     <AppText text={display(textZone, "title")}
  //       props={{ classes: { root: classes.title } }}/>
  //   </div>;
  // }

  if(type === "text") {
    return <div className={classes.product}>

      <AppText text={datum.content}/>
    </div>;
  }
  if(type === "image") {
    return (<div className={classes.proposal_img_wrap}>

      <ProposalImg
        src={datum.content}
        alt={datum.content}/>
    </div>
    );
  }
  return <AppText text="failed to display proposed item" themeColor="dangerColor"/>;
}

interface ProposalItemProps {
    datum: TemplateZoneApi;
    maxHeight: number;
}

export function ProposalItem(props: ProposalItemProps) {
  const { datum, maxHeight } = props;
  const classes = useStyles({ maxHeight })(props);
  return (
    <article>

      {renderProposalItem(datum, classes)}

    </article>

  );
}
