import axios from "./customAxios";
import { ANALYTICS_FILTERS, DATE_RANGES } from "../routes/api_routes";

export const getFiltersAnalytics = async () => {
  const endpoint = ANALYTICS_FILTERS;
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response.data;
};

export const getDateRanges = async (props) => {
  const endpoint = DATE_RANGES;
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response.data;
};
