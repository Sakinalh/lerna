import { ANALYTICS_PERFORMANCE_KPIS_GRAPH } from "../routes/api_routes";
import axios from "./customAxios";

export const getAnalyticsPerformanceKpiGraph = () => async () => {
  const response = await axios.get(ANALYTICS_PERFORMANCE_KPIS_GRAPH).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data;
};
