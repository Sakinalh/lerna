import { getPersistedToken } from "src";
import { replacePathParameter } from "../accessors/queryGenerator";
import { PAGE_GEN_TEMPLATES } from "../routes/api_routes";
import axios from "./customAxios";

export const getTemplateList = async (props) => {
  const endpoint = PAGE_GEN_TEMPLATES.concat(props.queryKey[1]);
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data;
};