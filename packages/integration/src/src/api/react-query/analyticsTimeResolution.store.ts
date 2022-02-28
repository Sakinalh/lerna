import { ANALYTICS_PERFORMANCE_TIME_RESOLUTION } from "../routes/api_routes";
import axios from "./customAxios";

export const getAnalyticsTimeResolutionGraph = () => async () => {
  const response = await axios.get(ANALYTICS_PERFORMANCE_TIME_RESOLUTION).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data;
};
