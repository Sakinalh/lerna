import makeStyles from "@mui/styles/makeStyles";
import { AppText } from "src/components/AppText/AppText.component";
import { Accordion, AccordionDetails, AccordionSummary } from "src/deps";
import { Droppable } from "react-beautiful-dnd";
import { ArrowDropDown } from "@mui/icons-material";
import { OptPageList } from "src/PageData/components/OptPageList/OptPageList.component";
import { OptPageItemApi } from "src/model";

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px dashed ${theme.palette.grey.light}`,
    padding: 10
  },
  accordion: {
    boxShadow: "none",
    "&::before": {
      backgroundColor: "inherit"
    }
  },
  orphanSummary: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    fontWeight: 900
  },
  iconWrapSummary: {
    display: "flex",
    alignItems: "center",
    paddingRight: 15
  },
  blockDivider: {
    padding: "15px 0"
  }
}));

interface OptOrphanPagesProps {
    pages: OptPageItemApi[]
}

export function OptOrphanPages({ pages }: OptOrphanPagesProps) {
  const classes = useStyles({});
  return <div className={classes.root}>
    <Accordion classes={{ root: classes.accordion }}
      defaultExpanded={true}>
      <AccordionSummary
        aria-controls="pages not associated with template"
        id="orphan__block"
      >
        <div className={classes.orphanSummary}>
          <div className={classes.iconWrapSummary}>
            <ArrowDropDown/>
            <AppText
              bold="bold"
              text="Orphan pages"/>
          </div>
          <AppText
            text="Drag the pages here"/>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Droppable droppableId="orphan">
          {provided => <OptPageList list={pages} ref={provided as any}/>}
        </Droppable>
      </AccordionDetails>
    </Accordion>
  </div>;
}
