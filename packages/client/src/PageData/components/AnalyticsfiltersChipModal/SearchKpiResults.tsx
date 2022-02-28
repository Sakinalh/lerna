import { Accordion, AccordionDetails, Typography, FormControlLabel, Tooltip } from "@mui/material";
import React from "react";
import { AppCheckbox } from "src/components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useStyles, tooltipOverride } from "./AnalyticsFiltersChipModal.style";

interface SearchKpisResultsProps {
    kpi: {name: string, display_name: string}[];
    tabsActif: any[];
    handleChange: (event) => void;
}

export const SearchKpisResults:React.FC<SearchKpisResultsProps> = ({kpi, tabsActif, handleChange}) => {
  const classes = useStyles();
  const tooltip = tooltipOverride();

  return (<Accordion>
    <AccordionDetails classes={{ root: classes.detailsRoot }}>
      <Tooltip
              classes={tooltip}
              title={<div className={tooltip.containerTitle}>
                <ErrorOutlineIcon />
                <div> You cannot have more than 3 KPIs selected.</div>
              </div>}
              placement="right"
              arrow
              disableHoverListener={ tabsActif.includes(kpi.name) || tabsActif.length < 3 }
            >

        <FormControlLabel value={kpi.name} className={classes.formControlGroup}
                control={
                  <AppCheckbox
                    onClick={handleChange}
                    disabled={ !tabsActif.includes(kpi.name) && tabsActif.length === 3}
                    // onChange={handleChange}
                    name={kpi.name}
                    checked={tabsActif.includes(kpi.name)}
                    noPadding size="small"
                    whiteBg={false}
                    />}
                label={<Typography className={classes.formControlLabel} component="span" color="black" variant="subtitle2">
                  {kpi.display_name}</Typography>}
              />

      </Tooltip>
    </AccordionDetails>
  </Accordion>);
};