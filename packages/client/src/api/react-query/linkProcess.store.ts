import { queryParamFormater, replacePathParameter } from "../accessors/queryGenerator";
import { CAMPAIGN_TEST_BY_KEYWORD, PAGE_GEN_RULES_GET_CAMPAIN_DETAILS } from "../routes/api_routes";
import axios from "./customAxios";

export const getCampaignTestByKeyword = async (props) => {
  const endpoint = CAMPAIGN_TEST_BY_KEYWORD + "?" + queryParamFormater(props.queryKey[1]);
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data;
};
