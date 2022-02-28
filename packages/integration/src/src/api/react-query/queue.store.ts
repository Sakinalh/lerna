import { replacePathParameter } from "../accessors/queryGenerator";
import { PAGE_GEN_RULES } from "../routes/api_routes";
import axios from "./customAxios";

export const getTemplateQueue = async (props) => {
  const endpoint = replacePathParameter(PAGE_GEN_RULES, props.queryKey[2]);
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data;
};