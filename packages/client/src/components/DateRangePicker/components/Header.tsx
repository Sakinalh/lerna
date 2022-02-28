import { WithStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import { Grid, IconButton, MenuItem, Select } from "src/deps";

import React from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { getMonth, getYear, setMonth, setYear } from "date-fns";

export interface HeaderProps extends WithStyles<typeof styles> {
    date: Date;
    setDate: (date: Date) => void;
    nextDisabled: boolean;
    prevDisabled: boolean;
    onClickNext: () => void;
    onClickPrevious: () => void;
}

const styles = createStyles({
  iconContainer: {
    padding: 5
  },
  icon: {
    padding: 10,
    "&:hover": {
      background: "none"
    }
  }
});

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

export const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  classes,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious
}) => {
  const handleMonthChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setDate(setMonth(date, parseInt(event.target.value as string, 10)));
  };

  const handleYearChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setDate(setYear(date, parseInt(event.target.value as string, 10)));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item className={classes.iconContainer}>
        <IconButton
          className={classes.icon}
          disabled={prevDisabled}
          onClick={onClickPrevious}
          size="large">
          <ChevronLeft color={prevDisabled ? "disabled" : "action"}/>
        </IconButton>
      </Grid>
      <Grid item>
        <Select
          value={getMonth(date)}
          onChange={handleMonthChange}
          MenuProps={{ disablePortal: true }}
        >
          {MONTHS.map((month, idx) => (
            <MenuItem key={month} value={idx}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item>
        <Select
          value={getYear(date)}
          onChange={handleYearChange}
          MenuProps={{ disablePortal: true }}
        >
          {generateYears(date, 30).map(year => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item className={classes.iconContainer}>
        <IconButton
          className={classes.icon}
          disabled={nextDisabled}
          onClick={onClickNext}
          size="large">
          <ChevronRight color={nextDisabled ? "disabled" : "action"}/>
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Header);
