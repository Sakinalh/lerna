import { ANALYTICS_PIECHART_MESSAGE_MATCH } from "../routes/api_routes";
import axios from "./customAxios";

interface body {
  date_range : string,
  filters: Array<
    {
      name : string,
      operator: string,
      value : string,
      type : string,
    }
  >
}

export const getAnalyticsMessageMatchView = (body : body) => async () => {
  const response = await axios.post(ANALYTICS_PIECHART_MESSAGE_MATCH, body).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data;
};
