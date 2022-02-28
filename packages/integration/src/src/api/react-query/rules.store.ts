import { replacePathParameter } from "../accessors/queryGenerator";
import { PAGE_GEN_RULES, PAGE_GEN_RULES_GET_CAMPAINS } from "../routes/api_routes";
import axios from "./customAxios";

export const getRules = async (props) => {
  const response = await axios.get(PAGE_GEN_RULES).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data;
};

export const getRuleCampaigns = async (props) => {
  const endpoint = replacePathParameter(PAGE_GEN_RULES_GET_CAMPAINS, props.queryKey[1]);
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data.results;
};