import { GET_CUSTOMER_ID, GET_USER_BUSINESS, POST_NEW_USER } from "../routes/api_routes";
import { replacePathParameter } from "../accessors/queryGenerator";
import axios from "./customAxios";

export const getCustomerId = (user_id: number) => async () => {
  const endpoint = replacePathParameter(GET_CUSTOMER_ID, {user_id: user_id+""});
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response.data;
};

export const getUserBusinesses = async () => {
  const response = await axios.get(GET_USER_BUSINESS).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response.data;
};

export interface newUserParams {
  email: string,
  password: string,
  first_name: string,
  last_name: string
}

export const postNewUser = (params : newUserParams) => async () => {
  const response = await axios.post(
    POST_NEW_USER,
    params
  ).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response.data;
};