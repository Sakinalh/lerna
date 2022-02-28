/**
 * author: flippingbitss
 * repo:https://github.com/flippingbitss/react-daterange-picker
 * ripoff flippingbitss's repo
 */
import * as React from "react";
import { useEffect } from "react";
import { addMonths, isAfter, isBefore, isSameDay, isSameMonth, isValid, isWithinInterval, max, min } from "date-fns";
import { DateRange, DefinedRange, NavigationAction } from "./types";
import Menu from "./components/Menu";

type Marker = symbol;

export const MARKERS: { [key: string]: Marker } = {
  FIRST_MONTH: Symbol("firstMonth"),
  SECOND_MONTH: Symbol("secondMonth")
};

function getValidatedMonths(
  range: DateRange,
  minDate: Date,
  maxDate: Date
): [Date, Date] {
  const { startDate, endDate } = range;
  if(startDate && endDate) {
    const newStart = max([startDate, minDate]);
    const newEnd = min([endDate, maxDate]);
    return [
      newStart,
      isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd
    ];
  } else {
    return [new Date(), new Date()];
  }
}

interface DateRangePickerProps {
    initialDateRange: DateRange;
    definedRanges?: DefinedRange[];
    minDate?: Date | string;
    maxDate?: Date | string;
    onChange: (dateRange: DateRange) => void;
}

const DateRangePickerImpl: React.FunctionComponent<DateRangePickerProps> = (
  props
) => {
  const { onChange, initialDateRange } = props;

  const minDateValid = isValid(initialDateRange.startDate)
    ? (initialDateRange.startDate as Date)
    : new Date();
  const maxDateValid = isValid(initialDateRange.endDate)
    ? (initialDateRange.endDate as Date)
    : new Date();

  const [initialFirstMonth, initialSecondMonth] = getValidatedMonths(
    initialDateRange || {},
    minDateValid,
    maxDateValid
  );

  const [dateRange, setDateRange] = React.useState<DateRange>({
    ...initialDateRange
  });
  const [hoverDay, setHoverDay] = React.useState<Date>();
  const [firstMonth, setFirstMonth] = React.useState<Date>(initialFirstMonth);
  const [secondMonth, setSecondMonth] = React.useState<Date>(
    initialSecondMonth || addMonths(firstMonth, 1)
  );

  const { startDate, endDate } = dateRange;
  useEffect(() => {
    if(initialDateRange.startDate && initialDateRange.endDate) {
      setFirstMonth(initialDateRange.startDate);

      const secondDate = isSameMonth(
        initialDateRange.startDate,
        initialDateRange.endDate
      )
        ? addMonths(initialDateRange.startDate, 1)
        : initialDateRange.endDate;
      setSecondMonth(secondDate);
    }
  }, [initialDateRange]);
  // handlers
  const setFirstMonthValidated = (date: Date) => {
    if(isBefore(date, secondMonth)) {
      setFirstMonth(date);
    }
  };

  const setSecondMonthValidated = (date: Date) => {
    if(isAfter(date, firstMonth)) {
      setSecondMonth(date);
    }
  };

  const setDateRangeValidated = (range: DateRange) => {
    let { startDate: newStart, endDate: newEnd } = range;
    if(newStart && newEnd) {
      range.startDate = newStart = max([newStart, minDateValid]);
      range.endDate = newEnd = min([newEnd, maxDateValid]);
      setDateRange(range);
      onChange(range);
      setFirstMonth(newStart);
      setSecondMonth(
        isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd
      );
    }
  };

  const onDayClick = (day: Date) => {
    if(startDate && !endDate && !isBefore(day, startDate)) {
      const newRange = { startDate, endDate: day };
      onChange(newRange);
      setDateRange(newRange);
    } else {
      setDateRange({ startDate: day, endDate: undefined });
    }
    setHoverDay(day);
  };

  const onMonthNavigate = (marker: Marker, action: NavigationAction) => {
    if(marker === MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(firstMonth, action);
      if(isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
    } else {
      const secondNew = addMonths(secondMonth, action);
      if(isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
    }
  };

  const onDayHover = (date: Date) => {
    if(startDate && !endDate) {
      if(!hoverDay || !isSameDay(date, hoverDay)) {
        setHoverDay(date);
      }
    }
  };

  // helpers
  const inHoverRange = (day: Date) => (startDate &&
            !endDate &&
            hoverDay &&
            isAfter(hoverDay, startDate) &&
            isWithinInterval(day, { start: startDate, end: hoverDay })) as boolean;

  const helpers = {
    inHoverRange
  };

  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate
  };
  useEffect(() => {
    setDateRange(initialDateRange);
  }, [initialDateRange]);

  return (
    <Menu
      dateRange={dateRange}
      minDate={minDateValid}
      maxDate={maxDateValid}
      firstMonth={firstMonth}
      secondMonth={secondMonth}
      setFirstMonth={setFirstMonthValidated}
      setSecondMonth={setSecondMonthValidated}
      setDateRange={setDateRangeValidated}
      helpers={helpers}
      handlers={handlers}
    />
  );
};

export const DateRangePicker = DateRangePickerImpl;
