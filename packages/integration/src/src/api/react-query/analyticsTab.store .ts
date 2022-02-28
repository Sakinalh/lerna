import { queryParamFormater, replacePathParameter } from "../accessors/queryGenerator";
import { ANALYTICS_TAB } from "../routes/api_routes";
import axios from "./customAxios";

interface body {
  date_range: string,
  filters: Array<{
      name: string,
      operator: string,
      value: string,
      type: string
  }>
}
interface query {
  page : number,
  limit : number
}

export const AnalyticsTabs = (body : body, query : query) => async () => {
  const endpoint = ANALYTICS_TAB + "?" + queryParamFormater(query);
  const response = await axios.post(endpoint, body).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data;
};
