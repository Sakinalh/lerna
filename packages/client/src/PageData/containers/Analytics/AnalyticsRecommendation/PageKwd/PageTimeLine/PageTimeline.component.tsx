import React, { useEffect, useState } from "react";
import { Typography, useTheme, Paper } from "@mui/material";
import { useQuery } from "react-query";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { FormControl, Skeleton } from "@material-ui/core";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Badge from "@mui/material/Badge";
import PickersDay from "@mui/lab/PickersDay";
import { AppChip, AppTooltip } from "src/components";
import { AppCalendar } from "src/components/AppCalendar/AppCalendar.component";
import { getChangeHistory } from "src/api/react-query/analysis/analysis.store";
import { useStyles } from "./PageTimeLine.style";

export interface PageTimeLineProps {
}

export const PageTimeLine: React.FC<PageTimeLineProps> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const { adgroup_id, kwd_id, page_url, page_id } = queryString.parse(location.search);
  const date_range = useSelector((state: StoreState) => state.filters.date_range);
  const WIDTH_TRUNCATE = 200;

  const params = {
    date_range: date_range,
    kwd_id: kwd_id,
    page_url: page_url,
    page_id: page_id,
    adgroup_id: adgroup_id
  };
  const { data: results } = useQuery(["getChangeHistory", params], getChangeHistory(params), {
    enabled: !!params
  });
  const [index, setIndex] = useState(0);
  const [arrDates, setArrDates] = useState([]);

  const { handleSubmit, formState, control, register, getValues, setValue } = useForm<IFormInput>({
    mode: "onBlur",
    defaultValues: { date: dayjs() }
  });

  useEffect(() => {
    results && setArrDates(results.map(item => item.display_date));
  }, [results]);

  const getFormattedDate = (input) => {
    const new_data = new Date(input);
    const date_ = new_data.getDate() + "-" + (new_data.getMonth() + 1) + "-" + new_data.getFullYear();
    return date_;
  };

  const setDetails = value => (
    value.length > WIDTH_TRUNCATE ? <AppTooltip
      placement="right"
      title={<div className="tooltip__container ">{value}</div>}
      aria-label="details"
    >
      <div className={classes.details}> {value} </div>
    </AppTooltip> : <div className={classes.details}> {value} </div>
  );

  return (
    <div className={classes.container}>
      {results ? <>
        <div className={classes.title}>
          <Typography color={theme.palette.grey.middle1} variant="h2">
            {"HISTORY OF CHANGES"}
          </Typography>
          <FormControl
            variant="outlined"
            className={classes.input}
          >
            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, value } }) => <AppCalendar
                {...register("date", { required: false })}
                value={getValues("date")}
                renderDay={(day, _value, DayComponentProps) => {
                  const date_ = day.getDate() + "-" + (day.getMonth() + 1) + "-" + day.getFullYear();
                  return (
                    <Badge
                      key={day.toString()}
                      overlap="circular"
                      color="primary"
                      variant={arrDates.indexOf(date_) !== -1 ? "dot" : "standard"}
                    >
                      <PickersDay {...DayComponentProps} />
                    </Badge>
                  );
                }}
                handleDateChange={(data) => {
                  setIndex(arrDates.indexOf(getFormattedDate(data)));
                  setValue("date", data);
                }}
              />}
            />
          </FormControl>
        </div>
        <Timeline className={classes.timeline} position="right">
          {results.map((item, idx) => <TimelineItem classes={{ root: classes.timelineRoot }} >
            <TimelineSeparator>
              <TimelineDot onClick={() => {
                setIndex(idx);
                const date_ = item.display_date.split("-");
                setValue("date", new Date(new Date(date_[2] + "/" + date_[1] + "/" + date_[0])));
              }}
                className={classes.dot}
                sx={{
                  color: idx === index ? theme.palette.white : theme.palette.blue.main
                }}
                color="primary" variant={idx === index ? "filled" : "outlined"}
              > {item.display_date}</TimelineDot>
              <TimelineConnector sx={{ height: 24, width: 6, backgroundColor: theme.palette.blue.main }} />
            </TimelineSeparator>
            {
              idx === index && <TimelineContent className={classes.timelineContentContainer}>
                <Paper className={classes.timelineContent}>
                  <Typography variant="h6" component="span">
                    {<>
                      <Typography color={theme.palette.grey.middle1}>{results[index].display_date}</Typography>
                      <div className={classes.content}>
                        <span className={classes.nbChanges}>{results[index].number_changes} changes</span>
                        <AppChip label={results[index].message_match + " %"} color="success" />
                      </div>
                      {results[index].changes.map(item => <>
                        <div className={classes.name} >
                          {item.name}
                        </div>
                        {setDetails(item.details)}
                        <Divider sx={{ margin: "5px 0 7px 0" }} />
                      </>)}
                    </>}
                  </Typography>
                </Paper>
              </TimelineContent>
            }
          </TimelineItem>)}

        </Timeline>
      </> : <Skeleton height={300} variant="rectangular" />}
    </div>
  );
};