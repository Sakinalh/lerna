import { GetAnalyticsPageDetailsResponseInterface, GetPageDetailsParamsInterface, GetPageTimeLineParamsInterface } from "src/api/accessors/Analytics/PageAccessor/interfaces";
import { GET_ANALYTICS_PAGE_DETAILS, SET_ANALYTICS_PAGE_DETAILS, SET_ANALTICS_TRUNCATE } from "./const";

export function getAnalyticsPageDetailsAction(payload: GetPageDetailsParamsInterface) {
  return ({
    type: GET_ANALYTICS_PAGE_DETAILS,
    payload
  });
}

export function setAnalyticsPageDetailsAction(payload: GetAnalyticsPageDetailsResponseInterface) {
  return ({

    type: SET_ANALYTICS_PAGE_DETAILS,
    payload
  });
}

export function setAnalyticsTruncateAction(payload : boolean) {
  return ({
    type: SET_ANALTICS_TRUNCATE,
    payload
  });
}
