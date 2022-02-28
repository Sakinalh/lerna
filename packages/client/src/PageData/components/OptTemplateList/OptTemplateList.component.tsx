import { OptTemplateApi } from "src/model/store";
import makeStyles from "@mui/styles/makeStyles";
import { AppText } from "src/components/AppText/AppText.component";
import { Accordion, AccordionDetails, AccordionSummary } from "src/deps";
import { Droppable } from "react-beautiful-dnd";
import { ArrowDropDown } from "@mui/icons-material";
import { OptPageList } from "src/PageData/components/OptPageList/OptPageList.component";

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
  templateSummary: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
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

interface OptTemplateListProps {
    templateList: OptTemplateApi[]
}

export function OptTemplateList({ templateList }: OptTemplateListProps) {
  const classes = useStyles({});

  return <div className={classes.root}>

    {templateList.map(t => <Accordion classes={{ root: classes.accordion }}
        key={t.template_id}>
      <AccordionSummary
          aria-controls="time-changes"
          id={`${t.template_id}__summary`}
        >
        <div className={classes.templateSummary}>

          <div className={classes.iconWrapSummary}>
            <ArrowDropDown/>
            <AppText
                text={t.template_name}/>
          </div>

          <AppText
              text={`${t.pages_associated.length} dynamic zones`}/>

        </div>

      </AccordionSummary>
      <AccordionDetails>
        <Droppable key={t.template_id}
            droppableId={t.template_id}>
          {provided => <OptPageList list={t.pages_associated} ref={provided as any}/>}

        </Droppable>
      </AccordionDetails>
    </Accordion>)
    }
  </div>;
}
