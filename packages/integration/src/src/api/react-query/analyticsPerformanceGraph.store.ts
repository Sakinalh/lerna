import { ANALYTICS_PERFORMANCE_GRAPH } from "../routes/api_routes";
import axios from "./customAxios";

export interface BodyPerformanceGraph {
  time_resolution : string,
  date_range:string,
  kpis: Array<string>,
  filters:Array<{
    name: string,
    operator: string,
    value: string,
    type: string
  }>
}

/**
 *
 * @param body
 * @returns graph data performance points by kpis
 */
export const getPerformanceGraphDataByKpi = (body : BodyPerformanceGraph) => async () => {
  const response = await axios.post(ANALYTICS_PERFORMANCE_GRAPH, body).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data;
};
