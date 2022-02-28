import { StackedLineGraph } from "src/PageData/components/StackedLineGraph/StackedLineGraph.component";
import { AnalyticsFiltersChipModal } from "src/PageData/components/AnalyticsfiltersChipModal/AnalyticsFiltersChipModal.component";
import { useEffect, useState } from "react";
import { useTheme, Typography, Stack, FormControl, InputAdornment, ListItemText, OutlinedInput, Radio, Select, MenuItem, Popover } from "@mui/material";
import { AppChip } from "src/components";
import { getAnalyticsPerformanceKpiGraph } from "src/api/react-query/analyticsPerformanceKpiGraph.store";
import { useQuery } from "react-query";
import EventIcon from "@mui/icons-material/Event";
import { useSelector } from "react-redux";
import { StoreState } from "src/model";
import Skeleton from "@mui/material/Skeleton";
import makeStyles from "@mui/styles/makeStyles";
import { useAnalyticsTimeResolution } from "./hooks/useAnalyticsTimeResolution";
import { useGetGraphDataByKpi } from "./hooks/useGetGraphDataByKpi";

interface SelectTimeViewProps {
    handleChange: (e) => void;
    selectedTimeView: string;
    isGraphPageKpi ?:boolean;
    date_range: string;
}

export const SelectTimeView: React.FC<SelectTimeViewProps> = ({handleChange, selectedTimeView, isGraphPageKpi = true, date_range }) => {
  const useStyles = makeStyles(() => ({
    title: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingBottom: isGraphPageKpi => isGraphPageKpi ? 34 : 75,
      "& > *": {
        "&:first-child": {
          marginRight: 26
        }
      }
    }
  }));

  const classes = useStyles(isGraphPageKpi);

  const theme = useTheme();
  const [resolution_time, isSucessTime] = useAnalyticsTimeResolution();
  const [optionUnDisplay, setOptionUnDisplay] = useState([]);

  /**
   *
   The monthly view is disabled if the selected time range is less than three months
   The weekly view is disabled if the selected time range is less than a month and more than 31 weeks
   The daily view is disabled if the selected time range is more than a month
   * @param date_range
   */

  function DisabledOption(date_range) {
    if(date_range === "yesterday" || date_range === "last_3_days" || date_range === "last_week" || date_range === "last_2_weeks" || date_range === "last_month") {
      setOptionUnDisplay([...optionUnDisplay, "monthly"]);
    }
    if(date_range === "yesterday" || date_range === "last_3_days" || date_range === "last_week" || date_range === "last_2_weeks" || date_range === "last_year") {
      setOptionUnDisplay([...optionUnDisplay, "weekly"]);
    }
    if(date_range === "last_trimester" || date_range === "last_6_month" || date_range === "last_year") {
      setOptionUnDisplay([...optionUnDisplay, "daily"]);
    }
  }

  useEffect(() => {
    if(isSucessTime && optionUnDisplay.includes(selectedTimeView)) {
      const newResolution_time = resolution_time.find(elem => !optionUnDisplay.includes(elem.name)).name;
      handleChange(newResolution_time);
    }
  }, [optionUnDisplay, isSucessTime]);

  useEffect(() => {
    DisabledOption(date_range);
  }, []);

  const MenuProps = {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    PaperProps: {
      style: {
        width: 172
      }
    }
  };

  return (<div className={classes.title}>
    <Typography color={theme.palette.grey.middle1} variant="h2">
      {"Analytics".toUpperCase()}
    </Typography>
    <FormControl sx={{ width: 160 }}>

      {isSucessTime ?
        <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            value={selectedTimeView}
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            }
            input={<OutlinedInput sx={{height: 35}} label="Daily view" />}
            renderValue={selected => selected }
            MenuProps={MenuProps}
          >
          {resolution_time?.map(item => (
            <MenuItem disabled={optionUnDisplay.includes(item.name)} key={item.name} value={item.name}>
              <Radio color={selectedTimeView === item.name ? "secondary" : "primary"} checked={selectedTimeView === item.name} />
              <ListItemText primary={item.display_name} />
            </MenuItem>
          ))}
        </Select>
        : <Skeleton variant="rectangular" /> }
    </FormControl>
  </div>);
};