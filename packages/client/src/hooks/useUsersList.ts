/* eslint-disable no-useless-concat */
import { useQuery } from "react-query";
import { GET_USERS_BY_BU } from "src/api/routes/api_routes";
import { queryParamFormater } from "src/api/accessors/queryGenerator";
import axios from "../api/react-query/customAxios";

interface Params {
    "bu_id" : string
}

const getUsersList = async ({ queryKey }) => {
  const [_key, params] = queryKey;
  const endpoint = GET_USERS_BY_BU + "?" + queryParamFormater(params);
  const { data } = await axios.get(endpoint);

  return data;
};

export default function useUserslist(params: Params) {
  return useQuery(["getUsersList", params], getUsersList);
}