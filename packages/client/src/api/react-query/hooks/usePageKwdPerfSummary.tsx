import { useQuery } from "react-query";
import { ANALYTICS_PERFORMANCE_PAGE_SUMMARY } from "src/api/routes/api_routes";
import { queryParamFormater } from "src/api/accessors/queryGenerator";
import axios from "../customAxios";

interface PagePerfSummaryParams {
    date_range: string;
    kwd_id: string;
    page_url: string;
    page_id: string;
    adgroup_id: string;
  }

export interface PagePerfSummaryResponse {
     keyword : {
         text : string,
         id : string
    },
     page : {
         url : string,
         title : string,
         path : string,
         id : string,
         last_analyzed : string
    },
     adgroup : {
         name : string,
         id : string,
    },
     campaign : {
         name : string,
         id : string,
    },
     has_recommendation : boolean
  }
const getPagePerfSummary = async ({ queryKey }) => {
  const [_key, { params }] = queryKey;

  const endpoint = !params ? ANALYTICS_PERFORMANCE_PAGE_SUMMARY : ANALYTICS_PERFORMANCE_PAGE_SUMMARY + "?" + queryParamFormater(params);
  const { data } = await axios.get(endpoint);

  return data;
};

export default function usePageKwdPerfSummary(params: PagePerfSummaryParams) {
  return useQuery(["pageKwdPagePerf", params], getPagePerfSummary);
}