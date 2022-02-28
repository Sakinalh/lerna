import makeStyles from "@mui/styles/makeStyles";
import { MouseEvent as ReactMouseEvent, useEffect, useState } from "react";
import { FilterByRangeDate } from "src/components/FilterByRangeDate/FilterByRangeDate.component";
import { Popover } from "src/deps";
import { DateRangeApi, FilterItemType } from "src/model";
import { KeyboardArrowDown } from "@mui/icons-material";
import { replaceAllStr } from "src/shared/utils";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";

const useStyles = makeStyles({
  root: {
    padding: "5px 0",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center"
  },
  btn: {
    fontWeight: "lighter",
    display: "inline-block"
  },
  icon: {
    verticalAlign: "sub"
  },
  labelBtn: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap"
  }
});

interface AnalyticsDateRangeProps {
    reqState: { start_date: string; end_date: string; };
    onDateChange: Function;
}

function formatViewDate(dateStr: string) {
  try {
    const _date = new Intl.DateTimeFormat("fr-FR").format(new Date(dateStr));
    return replaceAllStr(_date, "/", " ");
  } catch (e) {
    const _date = new Intl.DateTimeFormat("fr-FR").format(new Date());
    return replaceAllStr(_date, "/", " ");
  }
}

export function AnalyticsDateRange(props: AnalyticsDateRangeProps): JSX.Element {
  const { onDateChange, reqState } = props;
  const classes = useStyles(props);

  const [filterState, setFilterState] = useState({
    start_date: "",
    due_date: ""
  });
  const item: FilterItemType<string> = {
    value: "date",
    viewValue: "date",
    type: "range_date",
    qProps: ["start_date", "due_date"]
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const toggleDateRange = (event: ReactMouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleDateChange([date]: [DateRangeApi, { isValid: true }]) {
    onDateChange({
      start_date: date.start_date,
      end_date: date.due_date
    });
    handleClose();
  }

  const open = Boolean(anchorEl);

  useEffect(() => {
    if(reqState.start_date && reqState.end_date) {
      setFilterState({
        start_date: reqState.start_date,
        due_date: reqState.end_date
      });
    }
  }, [reqState.start_date, reqState.end_date]);

  const viewDuetDate = formatViewDate(filterState.due_date);
  const viewStartDate = formatViewDate(filterState.start_date);

  return (
    <div className={classes.root}>
      <AppBtn
        color="inherit"
        size="small"
        className={classes.btn}
        aria-describedby="template_date_range"
        onClick={toggleDateRange}
        endIcon={<KeyboardArrowDown classes={{ root: classes.icon }}/>}
        classes={{ label: classes.labelBtn }}
      >
        {`${viewStartDate}`} - {`${viewDuetDate}`}

      </AppBtn>
      <Popover
        id="template_date_range"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <FilterByRangeDate<string>
          onValueChange={handleDateChange}
          item={item}
          filterState={filterState}
        />
      </Popover>
    </div>
  );
}
