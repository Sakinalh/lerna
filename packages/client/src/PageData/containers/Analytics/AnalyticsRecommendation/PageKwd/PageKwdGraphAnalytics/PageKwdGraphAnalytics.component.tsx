import React, { useState } from "react";
import { SelectTimeView } from "src/PageData/components/StackedLine/SelectTimeView.component";
import { StackedLineGraph } from "src/PageData/components/StackedLineGraph/StackedLineGraph.component";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { AppChip } from "src/components";
import { Popover, Skeleton, Stack } from "@mui/material";
import { AnalyticsFiltersChipModal } from "src/PageData/components/AnalyticsfiltersChipModal/AnalyticsFiltersChipModal.component";
import { useQuery } from "react-query";
import { getAnalyticsPerformanceKpiGraph } from "src/api/react-query/analyticsPerformanceKpiGraph.store";
import { getUrlParams } from "src/hooks/useUrlSearchParams";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useGetGraphPageKwdData } from "../hooks/useAnalyticsPerformanceGraph";
import { useStyles } from "./PageKwdGraphAnalytics.style";
import { PageTimeLine } from "../PageTimeLine/PageTimeline.component";
export interface PageKwdGraphAnalyticsProps {

}
export const PageKwdGraphAnalytics : React.FC<PageKwdGraphAnalyticsProps> = () => {
  const location = useLocation();
  const { adgroup_id, kwd_id, page_url, page_id } = queryString.parse(location.search);

  const classes = useStyles();
  const [tabsActif, setTabsActif] = useState(["message_match"]);
  const [timeView, setTimeView] = useState("daily");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChangeTimeView = (event) => {
    if(typeof (event) === "string") {
      setTimeView(event);
    } else {
      setTimeView(event.target.value);
    }
  };
  const date_range = useSelector((state: StoreState) => state.filters.date_range);
  const applied_filters = useSelector((state: StoreState) => state.filters.data.filters.filter(item => item.value !== ""));
  const bodyParams = {
    time_resolution: timeView,
    date_range: date_range,
    kpis: tabsActif,
    filters: applied_filters
  };

  const bodyPageKwd = {
    "adgroup_id": adgroup_id,
    "date_range": date_range,
    "kpis": tabsActif,
    "kwd_id": kwd_id,
    "page_url": page_url,
    "page_id": page_id,
    "time_resolution": timeView
  };

  const [graphPageKwd, isSucessGraphPageKwdData] = useGetGraphPageKwdData(bodyPageKwd, [tabsActif, applied_filters, timeView, date_range]);
  const { data: results_kpi, isSuccess } = useQuery(["getAnalyticsPerformanceKpiGraph"], getAnalyticsPerformanceKpiGraph());

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (<div className={classes.root}>
    {isSucessGraphPageKwdData && date_range && <SelectTimeView date_range={date_range} isGraphPageKpi={true} handleChange={handleChangeTimeView} selectedTimeView={timeView} />}
    <StackedLineGraph isGraphPageKpi={true} className={classes.graph} tabsActif={tabsActif} data={graphPageKwd} isSucessGraph={isSucessGraphPageKwdData} />
    {isSuccess ?
      (
        <><Stack alignItems="center" justifyContent="center" direction="row" spacing={1}>
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
          <PageTimeLine/>
        </>
      )
      : <Skeleton variant="text" />}
  </div>);
};