import * as React from "react";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import { Grid } from "src/deps";
import { format, getDate, isAfter, isToday } from "date-fns";
import { chunks, getDaysInMonth, inDateRange, isEndOfRange, isRangeSameDay, isStartOfRange } from "../utils";
import Day from "./Day";
import { DateRange, NavigationAction } from "../types";
import Header from "./Header";
import { AppText } from "../../AppText/AppText.component";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const styles = ({
  root: {
    width: 290
  },
  weekDaysContainer: {
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  daysContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 20
  }
});

export interface MonthProps extends WithStyles<typeof styles> {
    value: Date;
    marker: symbol;
    dateRange: DateRange;
    minDate: Date;
    maxDate: Date;
    navState: [boolean, boolean];
    setValue: (date: Date) => void;
    helpers: {
        inHoverRange: (day: Date) => boolean;
    };
    handlers: {
        onDayClick: (day: Date) => void;
        onDayHover: (day: Date) => void;
        onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
    };
}

export const Month: React.FunctionComponent<MonthProps> = (props) => {
  const {
    classes,
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    maxDate,
    minDate,
    setValue: setDate
  } = props;
  const [back, forward] = props.navState;
  // COMMENT SELECTION DISABLE
  /*   disabled={
                     !isSameMonth(date, day) ||
                     //!isWithinInterval(day, { start: minDate, end: maxDate })
                   } */

  const invalidDate = isAfter(minDate, maxDate);
  return (
    <div className={classes.root}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() =>
            handlers.onMonthNavigate(marker, NavigationAction.Previous)
          }
          onClickNext={() =>
            handlers.onMonthNavigate(marker, NavigationAction.Next)
          }
        />

        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          className={classes.weekDaysContainer}
        >
          {WEEK_DAYS.map(day => (
            <AppText themeColor="actionColor" text={day} key={day} props={{ variant: "caption" }}/>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          justifyContent="space-between"
          className={classes.daysContainer}
        >
          {chunks(getDaysInMonth(date), 7).map((week, idx) => (
            <Grid key={idx} container direction="row" justifyContent="center">
              {week.map((day) => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted =
                                    inDateRange(dateRange, day) || helpers.inHoverRange(day);

                return (
                  <Day
                    key={format(day, "MM-dd-yyyy")}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    disabled={invalidDate}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={getDate(day)}
                  />
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Month);
