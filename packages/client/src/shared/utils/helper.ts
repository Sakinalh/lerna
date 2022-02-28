import add from "date-fns/add";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import differenceInMinutes from "date-fns/differenceInMinutes";
import format from "date-fns/format";
import __ from "lodash";
import { matchPath } from "react-router";
import { Theme } from "@mui/material";
import { PAGE_QUERY_KEYS } from "../../model";
import { DATE_FILTER_FORMAT } from "../../api/routes/api_routes";
import { SetupFile } from "../../PageSetupApp/model";

export function safeGet(value: Object, ...path: string[]): any {
  if(path.length === 0) {
    return value;
  }
  // @ts-ignore
  return path.reduce((prev: Object, prop: string) => {
    if(typeof prev === "undefined" || prev === null) {
      return null;
    }
    if(typeof prev[prop] !== "undefined") {
      return prev[prop];
    }
    // eslint-disable-next-line
    console.warn(prev, prop, path, "failed to get with value");

    return null;
  }, value);
}

export function getlabelFromId(keywordId: number, kwdByCategoryResult: { results: any; }) {
  const list = kwdByCategoryResult.results;
  let label = "";
  __.forEach(list, (item, index) => {
    if(item.id === keywordId) {
      label = item.kwd_text;
      return label;
    }
  });
  return label;
}

export function safeGetFallback(value: Object, fallback: unknown, ...path: string[]) {
  const _value = safeGet(value, ...path);
  return _value === null ? fallback : _value;
}

// BE careful does not work when removing key
// the merge will add it back

export function safePatchObj(initState: Object, nextState: Object, ...path: string[]) {
  const copy = deepCopy(initState);

  const _targets = safeGet(copy, ...path);
  if(_targets === null) {
    return initState;
  }

  const update = { ..._targets, ...nextState };

  return safeSet(copy, update, ...path);
}

export function safeMutablePatchObj(initState: Object, nextState: Object, ...path: string[]) {
  const _targets = safeGet(initState, ...path);
  if(_targets === null) {
    return initState;
  }

  return safeMutableSet(initState, nextState, ...path);
}

/**
 * return string without space && upper case
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export function normalizeStr(str: string): string {
  return str.replace(/\s+/g, "").trim().toUpperCase();
}

// forms

export const isEmpty = (val: string): boolean =>
  val ? val.trim() === "" : true;

/* export function isValidUrl(u: string): boolean {
    return u
        ? !!u.match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
        )
        : false;
} */

export function isEquivalent(a: Object, b: Object): boolean {
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if(aProps.length !== bProps.length) {
    return false;
  }

  for(let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    // console.log(  a[propName], b[propName] propName, a[propName], b[propName]);

    if(typeof a[propName] === "object" && typeof a[propName] === "object") {
      return isEquivalent(a[propName], b[propName]);
    }
    if(a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

/**
 * simple comparison of list objects
 *
 * @export
 * @template T
 * @template S
 * @param {Array<T>} sourceArr
 * @param {Array<S>} newArr
 * @param {Function} [objCompare=isEquivalent]
 * @returns {boolean}
 */
export function IsArrayObjectEqual<T, S>(
  sourceArr: Array<T>,
  newArr: Array<S>,
  objCompare: Function = isEquivalent
): boolean {
  // Get the value type
  const type = Object.prototype.toString.call(sourceArr);
  // If the two objects are not the same type, return false
  if(type !== Object.prototype.toString.call(newArr)) return false;
  // If items are not an object or array, return false
  if(["[object Array]", "[object Object]"].indexOf(type) < 0) return false;
  if(sourceArr.length !== newArr.length) return false;

  return sourceArr.reduce(
    (accu: boolean, curr) => newArr.filter(n => objCompare(n, curr)).length > 0,
    true
  );
}

/** date  */
// https://stackoverflow.com/questions/11887934/how-to-check-if-the-dst-daylight-saving-time-is-in-effect-and-if-it-is-whats
/* function is_DST_Used_In_This_TimeZone(): boolean {
  let Jan_Date,
    jan_Timezone_OffSet,
    July_Date,
    july_Timezone_OffSet,
    offsetsNotEqual,
    thisYear,
    today;

  today = new Date(); //Create a date object that is now
  thisYear = today.getFullYear(); //Get the year as a number

  Jan_Date = new Date(thisYear, 0, 1); //Month is zero indexed - Jan is zero
  jan_Timezone_OffSet = Jan_Date.getTimezoneOffset();

  //console.log("jan_Timezone_OffSet: " + jan_Timezone_OffSet);

  July_Date = new Date(thisYear, 6, 1);
  july_Timezone_OffSet = July_Date.getTimezoneOffset();

  //console.log("july_Timezone_OffSet: " + july_Timezone_OffSet);

  offsetsNotEqual = july_Timezone_OffSet !== jan_Timezone_OffSet; //True if not equal

  //  console.log("offsetsNotEqual: " + offsetsNotEqual);

  return offsetsNotEqual; //If the offsets are not equal for summer and
  //winter then the only possible reason is that DST is used for
  //this time zone
} */

export type FormatTime = "scd" | "min";

/**
 * get remaining time between time and now by unit (scd or min)
 *
 * @export
 * @param {string} time
 * @param {FormatTime} format
 * @returns {number}
 */
export function getRemainTime(time: number, format: FormatTime): number {
  /**
   * We should multiply by 1000 because js
   * uses milliseconds internally, while unix uses second
   * https://newbedev.com/why-do-i-need-to-multiply-unix-timestamps-by-1000-in-javascript
   *
   */
  const expiration = new Date(time * 1000);

  return differenceInMinutes(expiration, new Date());
}

/**
 * flatten all object values into single object with fullPath and value
 * not really usefuk but fun to code
 * @param {*} obj
 * @param {*} [acc={ nodes: [], values:[] }]
 * @returns
 */
export function flattenObjValues(
  obj: Object,
  acc: {
        nodes: Array<string>;
        values: Array<{ value: unknown; path: Array<string> }>;
    } = {
    nodes: [],
    values: []
  }
): { values: Array<{ value: any; path: Array<string> }> } {
  const props = Object.keys(obj);
  if(props.length === 0 || typeof obj !== "object") {
    return { values: [] };
  }
  return props.reduce(
    (
      accu: {
                nodes?: Array<string>;
                values: Array<{ value: any; path: Array<string> }>;
            },
      curr: string
    ) => {
      if(typeof obj[curr] !== "object") {
        return {
          values: [
            ...accu.values,
            ...[{ path: [...acc.nodes, ...[curr]], value: obj[curr] }]
          ]
        };
      }
      return flattenObjValues(obj[curr], {
        nodes: [...acc.nodes, ...[curr]],
        values: [...accu.values]
      });
    },
    acc
  );
}

export function safeSet(obj: { a?: { aa: string; }; aa?: string; }, value: string, ...path: string[]) {
  try {
    const newObj = { ...obj };
    setDeep(newObj, path, value);

    return newObj;
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
    // eslint-disable-next-line
    console.warn(`failed to set value of path: ${path.toString()}`);
    return null;
  }
}

export function safeMutableSet(obj: Object, value: Object, ...path: string[]) {
  try {
    return setDeep(obj, path, value);
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
    // eslint-disable-next-line
    console.warn(`failed to set value of path: ${path.toString()}`);
    return null;
  }
}

/**
 * Dynamically sets a deeply nested value in an object.
 * Optionally "bores" a path to it if its undefined.
 * @function
 * @param {!object} obj  - The object which contains the value you want to change/set.
 * @param {!array} path  - The array representation of path to the value you want to change/set.
 * @param {!any} value - The value you want to set it to.
 * @param {boolean} setRecursively - If true, will set value of non-existing path as well.
 */
const setDeep = (obj: any, path: any[], value: any, setRecursively = false) => {
  let level = 0;
  return path.reduce((a: { [x: string]: any; }, b: string | number) => {
    level++;
    if(setRecursively && typeof a[b] === "undefined" && level !== path.length) {
      a[b] = {};
      return a[b];
    }

    if(level === path.length) {
      a[b] = value;
      return value;
    } else {
      return a[b];
    }
  }, obj);
};

export function deepCopy(inObject: Object) {
  let outObject: {};
  let value: any;
  let key: string | number;

  if(typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  // eslint-disable-next-line prefer-const
  outObject = Array.isArray(inObject) ? [] : {};

  const keys = Object.keys(inObject);
  for(key of keys) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopy(value);
  }

  return outObject;
}

export function isObject(obj: number | Object) {
  return obj != null && obj.constructor.name === "Object";
}

function listAreEquals<T>(a: Array<T>, b: Array<T>) {
  const sortA = a.sort();
  const sortB = b.sort();

  if(a.length !== b.length || !(Array.isArray(a) && Array.isArray(b))) {
    return false;
  }

  let compare = true;
  let idx = 0;
  while(compare) {
    if(sortA[idx] !== sortB[idx]) {
      return false;
    }
    if(idx === a.length) {
      compare = false;
    }

    idx = idx + 1;
  }

  return true;
}

export function isPageQueryModelValid(datum: { [x: string]: any; }) {
  const isObj = isObject(datum);
  if(!isObj) {
    return false;
  }

  const keys = Object.keys(datum);

  const isValidObj = keys.length === PAGE_QUERY_KEYS.length && listAreEquals(PAGE_QUERY_KEYS, keys);
  if(!isValidObj) {
    return false;
  }

  for(const element of keys) {
    if(!isDataQueryValid(datum[element])) {
      return false;
    }
  }
  return true;
}

export function isPartialPageQueryModelValid(datum: { [x: string]: any; }) {
  const isObj = isObject(datum);
  if(!isObj) {
    return false;
  }
  const key: string = Object.keys(datum)[0];
  const isValidObj = PAGE_QUERY_KEYS.includes(key);
  if(!isValidObj) {
    return false;
  }

  return isDataQueryValid(datum[key]);
}

export function isDataQueryValid(datum: any): boolean {
  const isObj = isObject(datum);
  if(!isObj) {
    return false;
  }

  const keys = Object.keys(datum);
  return keys.length === 2 && (datum.hasOwnProperty("required") && datum.hasOwnProperty("option"));
}

export function isReqQueryValid(datum: any, validKeys: Array<string>) {
  if(!datum) {
    return false;
  }
  const reqKeys = Object.keys(datum);
  const isReqValid = reqKeys.length === validKeys.length && listAreEquals(validKeys, reqKeys);
  if(!isReqValid) {
    return false;
  }

  for(const element of reqKeys) {
    if(typeof datum[element] !== "string" || (datum[element] as string).length === 0) {
      return false;
    }
  }

  return true;
}

export function objToEncodedValue(obj: Object, isHead: boolean = true): string {
  const _q = Object.keys(obj).reduce(
    (acc, curr) => acc.concat(`&${curr}=${encodeURIComponent(obj[curr])}`),
    ""
  );

  return isHead ? _q.replace("&", "?") : _q; // replace first & with ?
}

export function updateSelection<T>(list: T[], value: T, predicate?: Function) {
  const selectedIndex = predicate ? list.findIndex(el => predicate.call(null, value, el)) : list.indexOf(value);
  let newSelected: T[] = [];

  if(selectedIndex === -1) {
    newSelected = newSelected.concat(list, value);
  } else if(selectedIndex === 0) {
    newSelected = newSelected.concat(list.slice(1));
  } else if(selectedIndex === list.length - 1) {
    newSelected = newSelected.concat(list.slice(0, -1));
  } else if(selectedIndex > 0) {
    newSelected = newSelected.concat(
      list.slice(0, selectedIndex),
      list.slice(selectedIndex + 1)
    );
  }

  return newSelected;
}

export function updateList<T>(list: T[], value: T, predicate?: Function) {
  const selectedIndex = predicate ? list.findIndex(el => predicate.call(null, value, el)) : list.indexOf(value);
  let newSelected: T[] = [];
  if(selectedIndex === -1) {
    newSelected = newSelected.concat(list, value);
  } else if(selectedIndex === 0) {
    newSelected = list.map((l, idx) => idx === selectedIndex ? value : l);
  } else if(selectedIndex === list.length - 1) {
    newSelected = newSelected.concat(list.slice(0, -1));
  } else if(selectedIndex > 0) {
    newSelected = list.map((l, idx) => idx === selectedIndex ? value : l);
  }

  return newSelected;
}

type FilterDateRange = [string, string];

export function initDatesRange(range: FilterDateRange): FilterDateRange {
  const [start, end] = range;
  if(start && start.length > 0 && end && end.length > 0) {
    return range;
  }

  return [
    format(add(new Date(), { months: -3 }), DATE_FILTER_FORMAT),
    format(new Date(), DATE_FILTER_FORMAT)
  ];
}

export function formatDateRangesQuery(dateRange: [string, string]) {
  const [start_date, end_date] = initDatesRange(dateRange);
  return ({ start_date, end_date });
}

export function makeCSVPayload(content: SetupFile): FormData {
  const formData = new FormData();
  // const fileName = type === "adt_loc_file" ? "adtext_file" : "keyword_file";
  formData.append("name", content.name);
  formData.append("file", content.file);
  formData.append("delimiter", ",");
  return formData;
}

export function makeSourceCsvPayload(content: SetupFile): FormData {
  const formData = new FormData();

  formData.append("source_path", content.file);
  formData.append("delimiter", ",");
  return formData;
}

/**
 * replace all string. To replace with native ReplaceAll when supported
 * @param str
 * @param bef
 * @param aft
 */
export function replaceAllStr(str: string, bef: string, aft: string) {
  let hasMatch = true;
  let replStr = str;

  while(hasMatch) {
    const matchPos = replStr.indexOf(bef);
    if(matchPos < 0) {
      hasMatch = false;
    }
    const checked = replStr.slice(0, matchPos);
    const _toCheck = replStr.slice(matchPos);
    const repl = _toCheck.replace(bef, aft);
    replStr = checked.concat(repl);
  }
  return replStr;
}

export function parsePathRouteParams(currentPath: string, pathModel: string) {
  return matchPath(pathModel, currentPath) as {
        path: string;
        pathname: string;
        params: any;
    };
}

export function setActiveClass(fragment: string, uri: string) {
  return uri.includes(fragment) ? "active" : "";
}

/* PAGINATION */

export function setDefaultDateRange() {
  return {
    start_date: format(addMonths(addDays(new Date(), 1), -1), "yyyy-MM-dd'"),
    end_date: format(new Date(), "yyyy-MM-dd'")
  };
}

export function numberFormat(value: string | number, round:number, suffix: string) : string {
  return Number.parseFloat(value.toString()).toFixed(round) + " " + suffix;
}

// eslint-disable-next-line func-names
String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export function getBackgroundTag(pct : number, theme, valueOnly = false) {
  let color: string = null;

  // eslint-disable-next-line no-constant-condition
  if((pct: number) => 0 && pct <= 30) {
    color = "red";
  }
  if(pct > 30 && pct <= 60) {
    color = "yellow";
  }
  if(pct > 60 && pct <= 100) {
    color = "green";
  }

  switch (color) {
    case "red" :
      return valueOnly ? theme.palette.red.main : {background: theme.palette.red.main};
    case "yellow" :
      return valueOnly ? theme.palette.yellow.main : {background: theme.palette.yellow.main};
    case "green" :
      return valueOnly ? theme.palette.green.main : {background: theme.palette.green.main};
  }
}
