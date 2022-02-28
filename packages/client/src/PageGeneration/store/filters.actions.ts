import {
  DELETE_FILTER,
  REPLACE_FILTER,
  SET_DATE_RANGE,
  SET_FILTERS
} from "./const";

export function setFiltersAction(payload: any) {
  return ({
    type: SET_FILTERS,
    payload
  });
}
export function ReplaceFilterAction(payload: any) {
  return ({
    type: REPLACE_FILTER,
    payload
  });
}

export function deleteFilterAction(payload: any) {
  return ({
    type: DELETE_FILTER,
    payload
  });
}

export function setDateRange(payload: any) {
  return ({
    type: SET_DATE_RANGE,
    payload
  });
}
