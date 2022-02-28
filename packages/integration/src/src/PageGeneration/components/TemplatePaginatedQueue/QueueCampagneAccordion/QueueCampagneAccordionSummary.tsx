import { Accordion, AccordionDetails, AccordionSummary, Paper, Table, TableBody, TableRow, TableHead, TableCell, TableContainer, FormControl, FormGroup, TextField, FormControlLabel } from "src/deps";
import { Button, CircularProgress, Grid, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import clsx from "clsx";
import { RuleInterface } from "src/model";
import { IconCircularProgress } from "src/components";
import { useAccordionSummaryStyle } from "./QueueCampagneAccordionSummary.style";
import { ReactComponent as Group } from "../../../styles/global/icons/group.svg";

interface CustomAccordionSummaryProps {
  // onSelect:  (rule: RuleInterface) => void;
  rule: any;
}

export const CustomAccordionSummary: React.FC<CustomAccordionSummaryProps> = ({ rule, onSelect }) => {
  const classes = useAccordionSummaryStyle();
  return (
    <AccordionSummary
      // onClick={() => onSelect(rule)}
      className={clsx("accordion__summary", classes.expanded, classes.expandIcon)}
      expandIcon={<KeyboardArrowDownOutlinedIcon />}>
      <Grid container className="gridTab" >
        <Grid className="gridTab__cell" item>
          <span className="queueTab__input  ">
            <span className="arrowLine arrowLine--large">
              <span className="arrowLine__icon">
              </span>
              <span title={rule.name} className="arrowLine__title ellipsis">{rule.name}</span>
            </span>
          </span>
        </Grid>
        <Grid className="gridTab__cell gridTab__cell--fix" item>
          <IconCircularProgress
            value={rule.processed_pages}
            total={rule.total_pages}
          />

        </Grid>
        <Grid className="gridTab__cell gridTab__cell--fix gridTab__cell--right" item>
          <span className="queueTab__input ">
            {rule.creation_date}
          </span>
        </Grid>
      </Grid>
    </AccordionSummary>

  );
};