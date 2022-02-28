// format dates
import { DataByDate } from "src/model";
import { differenceInDays } from "date-fns";

function _setDaysGroup(num: number): 0 | 7 | 30 | 31 {
  switch (true) {
    case num < 1: {
      return 0;
    }

    case num < 8: {
      return 7;
    }
    case num < 31: {
      return 30;
    }
    default:
      return 31;
  }
}

export function formattedGroupByDateRange<T>(
  arr: Array<T>,
  dateProp: string
): Array<DataByDate<T>> {
  const _list = groupByDateRange(arr, dateProp);
  return viewGroupByDateRange(_list);
}

export function groupByDateRange<T>(
  arr: Array<T>,
  dateProp: string
): {
    [key: number]: Array<T>;
} {
  return arr.reduce(
    (acc, curr) => {
      const diffDay = Math.abs(
        differenceInDays(new Date(), new Date(curr[dateProp]))
      );
      const grpRange = _setDaysGroup(diffDay);
      return {
        ...acc,
        ...{
          [grpRange]: [...acc[grpRange], ...[curr]]
        }
      };
    },
    {
      0: [],
      7: [],
      30: [],
      31: []
    }
  );
}

function viewGroupByDateRange<T>(grp: { [key: number]: Array<T> }): Array<any> {
  return Object.keys(grp)
    .filter(key => grp[key].length > 0)
    .map(key => ({
      value: key.toString(),
      viewValue: _mapViewLab[key],
      data: grp[key]
    }));
}

const _mapViewLab = {
  0: "today",
  7: "last 7 days",
  30: "last 30 days",
  31: "older"
};
