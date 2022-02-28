import { replacePathParameter } from "src/api/accessors/queryGenerator";
import { RECOMMANDATION_HISTORY_CHANGES } from "src/api/routes/api_routes";
import axios from "../customAxios";

export const getChangeHistory = params => async () => {
  const endpoint = replacePathParameter(RECOMMANDATION_HISTORY_CHANGES, params);
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data.dates;
};