import * as React from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import { DATE_FILTER_FORMAT } from "src/api/routes/api_routes";
import { FilterItemType } from "src/model";
import { DateRangePicker } from "../DateRangePicker";
import { DateRange } from "../DateRangePicker/types";

interface FilterByRangeDateProps<T> {
    onValueChange: Function;
    item: FilterItemType<T>;
    filterState: { [key: string]: string }; // store state
}

export function FilterByRangeDate<T>(props: FilterByRangeDateProps<T>): JSX.Element {
  const { onValueChange, filterState, item } = props;
  const [rangeStart, rangeEnd] = item.qProps as [string, string];
  const [dateRange, setDateRange] = React.useState<DateRange>({
    startDate: undefined,
    endDate: undefined
  });

  useEffect(() => {
    setDateRange({
      startDate: filterState[rangeStart]
        ? new Date(filterState[rangeStart])
        : undefined,
      endDate: filterState[rangeEnd]
        ? new Date(filterState[rangeEnd])
        : undefined
    });
  }, [filterState, rangeEnd, rangeStart]);

  function handleDateChange(range) {
    const formattedDate = {
      [rangeStart]: format(range.startDate, DATE_FILTER_FORMAT),

      [rangeEnd]: format(range.endDate, DATE_FILTER_FORMAT)
    };
    const payload = [formattedDate, { isValid: true }];

    onValueChange(payload);
  }

  return (
    <DateRangePicker
      initialDateRange={dateRange}
      onChange={range => handleDateChange(range)}
    />
  );
}
