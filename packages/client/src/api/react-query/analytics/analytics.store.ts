import { queryParamFormater } from "src/api/accessors/queryGenerator";
import { ANALYTICS_PERFORMANCE_GET_FAV_FILTERS, ANALYTICS_PERFORMANCE_GET_KPIS, ANALYTICS_PERFORMANCE_PAGES_API, KWDPAGE_PERFORMANCE, ANALYTICS_PERFORMANCE_PAGE_SUMMARY } from "src/api/routes/api_routes";
import axios from "../customAxios";

interface PerformancePageParams {s
    date_range: string,
    kpi: string,
    filters: {
      name: string;
      operator: string;
      value: string | [];// #will be array if type is choices
      type: string | number | []; // "text/numeric/choices/enum"
    }[]
}

interface GetFavSearchFiltersParams {
  id?: string;
  page: number;
  limit: number;
}

export const getPerformancePages = (params : PerformancePageParams) => async () => {
  const response = await axios.post(
    ANALYTICS_PERFORMANCE_PAGES_API,
    params
  ).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response.data;
};

export const getPerformanceKpis = () => async () => {
  const response = await axios.get(ANALYTICS_PERFORMANCE_GET_KPIS).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response.data;
};

export interface FavFiltersResponse {
  id: string,
  name: string,
  creation_date: string,
  results: {name: string, operators: string, value: number}[]
}

export const getAnalyticsFavSearchFilters = (params : GetFavSearchFiltersParams) => async () => {
  const endpoint = !params ? ANALYTICS_PERFORMANCE_GET_FAV_FILTERS : ANALYTICS_PERFORMANCE_GET_FAV_FILTERS + "?" + queryParamFormater(params);
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response.data;
};

interface DeleteFavSearchFiltersParams {
  ids : string[];
}
export const deleteAnalyticsFavSearchFilters = (params : DeleteFavSearchFiltersParams) =>
// const response = await axios.delete(ANALYTICS_PERFORMANCE_GET_FAV_FILTERS, { data:  params  }
// ).then((data)=> {
//   return data
// })
// .catch(error => {
//   throw new Error(error.message);
// });

  axios.delete(ANALYTICS_PERFORMANCE_GET_FAV_FILTERS, { data: params });

interface createFavSearchFiltersParams {
  name: string;
  filters: {name: string, operator: string, value: string, type:string}[];

}

export const createAnalyticsFavSearchFilters = (params : createFavSearchFiltersParams) => async () => {
  const response = await axios.post(ANALYTICS_PERFORMANCE_GET_FAV_FILTERS, params).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response.data;
};

export interface PerformancePageKwdParams {
  adgroup_id: string | string[];
  date_range: string;
  kpis: string[];
  kwd_id: string | string[];
  page_url: string | string[];
  page_id: string | string[];
  time_resolution: string;
}

export const getPerformancePageKwdParams = (params : PerformancePageKwdParams) => async () => {
  const response = await axios.post(
    KWDPAGE_PERFORMANCE,
    params
  ).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response.data;
};
