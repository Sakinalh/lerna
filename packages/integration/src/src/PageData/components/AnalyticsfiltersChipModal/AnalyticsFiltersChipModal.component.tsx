import { Accordion, AccordionSummary, AccordionDetails, TextField, Typography, useTheme, FormGroup, FormControlLabel, Checkbox, InputAdornment, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AppCheckbox } from "src/components";
import SearchIcon from "@mui/icons-material/Search";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useStyles, tooltipOverride } from "./AnalyticsFiltersChipModal.style";
import { SearchKpisResults } from "./SearchKpiResults";

interface AnalyticsFiltersChipModalProps {
  filters: {
    defaults: [{
      name: string,
      display_name: string
    }],
    extra: [{
      category_name: string,
      kpis: [{
        name: string,
        display_name: string
      }]
    }],
  },
  handleCheckKpi: any,
  tabsActif: Array<string>
}

export function AnalyticsFiltersChipModal(props: AnalyticsFiltersChipModalProps) {
  const { filters, handleCheckKpi, tabsActif } = props;
  const classes = useStyles();
  const tooltip = tooltipOverride();
  const [searchTerm, setSearchTerm] = useState(null);
  const [kpisToShow, setKpisToShow] = useState<any>(null);

  const handleChangeSearchTerm = (event) => {
    const searchValue = event.target.value;

    if(searchValue.length === 0) {
      setKpisToShow(null);
      setSearchTerm(null);
      return;
    }

    setSearchTerm(searchValue);

    const allKpis = [];

    filters.extra.forEach((category) => {
      const kpisByCat = category.kpis.filter(kpi => kpi.name.includes(searchValue));

      allKpis.push(...kpisByCat);
    });

    setKpisToShow(allKpis);
  };

  const handleChange = (event) => {
    handleCheckKpi(event.target.value);
  };

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <TextField
          classes={{ root: classes.inputSearch }}
          type="search"
          placeholder="Search"
          id="outlined-basic"
          value={searchTerm === null ? "" : searchTerm}
          onChange={e => handleChangeSearchTerm(e)}
          fullWidth
          variant="outlined"
          InputProps={{
            autoComplete: "off",
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </header>
      <div className={classes.main}>
        {kpisToShow ? kpisToShow.map(kpi => (<SearchKpisResults kpi={kpi} tabsActif={tabsActif} handleChange={handleChange} />)) :
          filters?.extra.map((catExtra, index) => (
            <Accordion key={index}>
              <AccordionSummary
                classes={{
                  root: classes.summaryRoot,
                  content: classes.summaryContent
                }}
                expandIcon={<ExpandMoreIcon />}
                className={classes.summary}>
                <Typography component="span" color="black" variant="subtitle1">{catExtra.category_name}</Typography>
              </AccordionSummary>
              <AccordionDetails classes={{ root: classes.detailsRoot }}>
                {
                  catExtra?.kpis
                    .map((kpi, index) => (
                      <Tooltip key={index}
                        classes={tooltip}
                        title={<div className={"containerTitle"}>
                          <ErrorOutlineIcon />
                          <div> You cannot have more than 3 KPIs selected.</div>
                        </div>}
                        placement="right"
                        arrow
                        disableHoverListener={tabsActif.includes(kpi.name) || tabsActif.length < 3}
                      >

                        <FormControlLabel value={kpi.name} className={classes.formControlGroup}
                          control={
                            <AppCheckbox
                              onClick={handleChange}
                              disabled={!tabsActif.includes(kpi.name) && tabsActif.length === 3}
                              name={kpi.name}
                              checked={tabsActif.includes(kpi.name)}
                              noPadding size="small"
                              whiteBg={false}
                            />}
                          label={<Typography className={classes.formControlLabel} component="span" color="black" variant="subtitle2">
                            {kpi.display_name}</Typography>}
                        />

                      </Tooltip>))
                }
              </AccordionDetails>
            </Accordion>
          ))
        }
      </div>
    </div>
  );
}