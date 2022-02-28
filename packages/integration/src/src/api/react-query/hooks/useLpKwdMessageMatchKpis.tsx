import { useQuery } from "react-query";
import { queryParamFormater } from "src/api/accessors/queryGenerator";
import axios from "../customAxios";
import { ANALYTICS_PERFORMANCE_LP_KWD_SUMMARY } from "../../routes/api_routes";

interface getKwpPagePerfSummaryParams {
     date_range : string,
     kwd_id : string,
     page_url : string,
     page_id : string,
     adgroup_id : string
}
interface getKwpPagePerfSummaryResponse {

     message_match : {
         value : number,
         unit : string,
         legend : string // #good, bad, acceptable
    },
     kpis : [
        {
             name : string,
             value : string,
             unit : string, // # %, €, ..., or null
             has_evolution : boolean,
             evolution : {
                 sign : string, // # - or +,
                 unit : string, // # %, ... or null
                 value : string
            }
        }
    ]
}
const getKwpPagePerfSummary = async ({ queryKey }) => {
  const [_key, { params }] = queryKey;

  const endpoint = !params ? ANALYTICS_PERFORMANCE_LP_KWD_SUMMARY : ANALYTICS_PERFORMANCE_LP_KWD_SUMMARY + "?" + queryParamFormater(params);
  const { data } = await axios.get(endpoint);

  return data;
};

export default function useLpKwdMessageMatchKpis(params: getKwpPagePerfSummaryParams) {
  return useQuery(["getKwpPagePerfSummary", params], getKwpPagePerfSummary);
}