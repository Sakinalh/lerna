import { StackedLineGraph } from "src/PageData/components/StackedLineGraph/StackedLineGraph.component";
import { AnalyticsFiltersChipModal } from "src/PageData/components/AnalyticsfiltersChipModal/AnalyticsFiltersChipModal.component";
import { useState } from "react";
import { Stack, Popover } from "@mui/material";
import { AppChip } from "src/components";
import { getAnalyticsPerformanceKpiGraph } from "src/api/react-query/analyticsPerformanceKpiGraph.store";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { StoreState } from "src/model";
import Skeleton from "@mui/material/Skeleton";
import { useStyles } from "./StackedLineContent.style";
import { useGetGraphDataByKpi } from "./hooks/useGetGraphDataByKpi";
import { SelectTimeView } from "./SelectTimeView.component";

export function StackedLineContent() {
  const classes = useStyles();
  const [tabsActif, setTabsActif] = useState(["message_match"]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeView, setTimeView] = useState("daily");

  const applied_filters = useSelector((state: StoreState) => state.filters.data.filters.filter(item => item.value !== ""));
  const date_range = useSelector((state: StoreState) => state.filters.date_range);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const bodyParams = {
    time_resolution: timeView,
    date_range: date_range,
    kpis: tabsActif,
    filters: applied_filters
  };

  const [graphDataByKpi, isSuccessGraph] = useGetGraphDataByKpi(bodyParams, [tabsActif, applied_filters, timeView, date_range]);

  const { data: results_kpi, isSuccess } = useQuery(["getAnalyticsPerformanceKpiGraph"], getAnalyticsPerformanceKpiGraph());

  const handleChangeTimeView = (event) => {
    if(typeof (event) === "string") {
      setTimeView(event);
    } else {
      setTimeView(event.target.value);
    }
  };

  /**
   * @param tabValue
   * set type of color to filter / index tabValue
   */
  function getColorsFilters(tabValue) {
    const index = tabsActif.indexOf(tabValue);
    switch (index) {
      case -1:
        return "default";
      case 0:
        return "primary";
      case 1:
        return "error";
      case 2:
        return "info";
    }
  }

  /**
   * @param e
   * @param nextValue
   * set filters tabs active logic
   * you cant remove the last filters
   * you cant have more than 3 filters
   * add or remove tabActif Array
   */
  function toggleSelection(newFilterToAdd: string) {
    // impossible de retirer le dernier
    if(tabsActif.length === 1 && tabsActif.includes(newFilterToAdd)) {
      return;
    }

    // impossible d ajouter un 4eme
    if(tabsActif.length === 3 && !tabsActif.includes(newFilterToAdd)) {
      return;
    }

    let newArray = [];

    // supression d un filtre de la liste
    if(tabsActif.includes(newFilterToAdd)) {
      newArray = tabsActif.filter(item => item !== newFilterToAdd);
    } else {
      newArray = [...tabsActif, newFilterToAdd];
    }

    setTabsActif(newArray);
  }

  return (
    <div className={classes.root}>
      { isSuccess && date_range && <SelectTimeView date_range={date_range} handleChange={handleChangeTimeView} selectedTimeView={timeView} /> }
      <StackedLineGraph className={classes.graph} tabsActif={tabsActif} data={graphDataByKpi} isSucessGraph={isSuccessGraph} />
      {isSuccess ?
        (
          <Stack alignItems="center" justifyContent="center" direction="row" spacing={1}>
            {
          tabsActif.length !== 3 ? (
            results_kpi?.defaults.map(tab => (
              <AppChip
                color={getColorsFilters(tab?.name)}
                isactif={tabsActif.indexOf(tab?.name) !== -1}
                key={tab.name} label={tab.display_name} onClick={e => toggleSelection(tab?.name)} />
            ))
          ) : (
            results_kpi?.defaults.filter(item => tabsActif.includes(item.name)).map(tab => (
              <AppChip
                  color={getColorsFilters(tab?.name)}
                  isactif={tabsActif.indexOf(tab?.name) !== -1}
                  key={tab.name} label={tab.display_name} onClick={e => toggleSelection(tab?.name)} />
            ))
          )
        }
            {
          results_kpi?.extra.map(item => item.kpis?.filter(item => !results_kpi?.defaults.find(itemDefault => itemDefault.name === item.name) && item)
            .filter(item => tabsActif.includes(item.name))
            .map(tab => <AppChip
              color={getColorsFilters(tab?.name)}
              isactif={tabsActif.indexOf(tab?.name) !== -1}
              key={tab.name}
              label={tab?.display_name}
              onClick={e => toggleSelection(tab?.name)} />))
        }
            <AppChip color={"default"} label={"..."} onClick={handleClick} isactif={false}/>
            <Popover
          classes={{
            paper: "popover--noOverflow"
          }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
        >
              <AnalyticsFiltersChipModal tabsActif={tabsActif} handleCheckKpi={toggleSelection} filters={results_kpi} />
            </Popover>
          </Stack>
        )
        : <Skeleton variant="text" />}
    </div>
  );
}
