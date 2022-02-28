import React from "react";
import { Theme } from "@mui/material";
import { WithStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import { differenceInCalendarMonths } from "date-fns";
import Month from "./Month";
import { DateRange, NavigationAction, Setter } from "../types";
import { MARKERS } from "../index";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      justify: "center",
      wrap: "nowrap",
      fontSize: "inherit"
    },
    header: {
      padding: "20px 70px"
    },
    headerItem: {
      flex: 1,
      textAlign: "center"
    },
    divider: {
      borderLeft: `1px solid ${theme.palette.action.hover}`,
      marginBottom: 20
    }
  });

export interface MenuProps extends WithStyles<typeof styles> {
    dateRange: DateRange;
    minDate: Date;
    maxDate: Date;
    firstMonth: Date;
    secondMonth: Date;
    setFirstMonth: Setter<Date>;
    setSecondMonth: Setter<Date>;
    setDateRange: Setter<DateRange>;
    helpers: {
        inHoverRange: (day: Date) => boolean;
    };
    handlers: {
        onDayClick: (day: Date) => void;
        onDayHover: (day: Date) => void;
        onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
    };
}

export const Menu: React.FunctionComponent<MenuProps> = (props) => {
  const {
    classes,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    helpers,
    handlers
  } = props;
  const canNavigateCloser =
        differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = { dateRange, minDate, maxDate, helpers, handlers };
  return (
    <div className={classes.root}>
      <Month
        {...commonProps}
        value={firstMonth}
        setValue={setFirstMonth}
        navState={[true, canNavigateCloser]}
        marker={MARKERS.FIRST_MONTH}
      />
      <div className={classes.divider}/>
      <Month
        {...commonProps}
        value={secondMonth}
        setValue={setSecondMonth}
        navState={[canNavigateCloser, true]}
        marker={MARKERS.SECOND_MONTH}
      />
    </div>
  );
};

export default withStyles(styles)(Menu);
