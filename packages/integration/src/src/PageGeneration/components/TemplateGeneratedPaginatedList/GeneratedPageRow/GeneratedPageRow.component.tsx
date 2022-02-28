import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TemplatePageKdwApi } from "src/PageGeneration/model";
import { Accordion, AccordionDetails, AccordionSummary } from "src/deps";
import { ArrowDropDown } from "@mui/icons-material";
import { GeneratedRowDetail } from "../GeneratedRowDetail/GeneratedRowDetail.component";
import { GeneratedRowSummary } from "../GeneratedRowSummary/GeneratedRowSummary.component";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: 20,
    boxShadow: theme.shape.objectShadow.boxShadowLight,
    border: "1px solid rgba(216,216,216,0.5)",
    borderRadius: "inherit",
    padding: "20px 10px"
  },
  cell: {
    minHeight: 30
  },
  head: {},
  list: {
    width: "100%"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "25% 20% 20% 30%"
  }
}));

interface GeneratedPageColProps {
    datum: TemplatePageKdwApi;
}

export function GeneratedPageRow({ datum }: GeneratedPageColProps) {
  const classes = useStyles({});

  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon={<ArrowDropDown color="secondary"/>}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id={`${datum.keywords}_summary`}
        classes={{ root: classes.head }}
      >
        <GeneratedRowSummary datum={datum}/>
      </AccordionSummary>
      <AccordionDetails>
        <GeneratedRowDetail data={datum.keywords} pageId={datum.page_id}/>
      </AccordionDetails>
    </Accordion>
  );
}
