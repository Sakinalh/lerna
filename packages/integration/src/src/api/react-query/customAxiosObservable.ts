import Axios from "axios-observable";
import { differenceInMinutes } from "date-fns";
import { getPersistedUser, logout } from "src";
import { useCognitoToken } from "src/PageLogin/hooks/useCognitoToken";
import { getItemFromLocalStorage } from "../../shared/form/helper";

const instance = Axios.create({});

// Add a request interceptor
// eslint-disable-next-line
instance.interceptors.request.use(async function (config) {
  const user = getPersistedUser();
  const expiration = new Date(user.expires * 1000);

  const diff = differenceInMinutes(new Date(), expiration);
  if(diff > 660) {
    logout();
  }
  const token = (await useCognitoToken());
  config.headers = {
    "Authorization": `Bearer ${token}`

  };
  config.baseURL = getItemFromLocalStorage("envVariables")?.REACT_APP_NAISTER_API_URI;

  // Do something before request is sent
  return config;
  // eslint-disable-next-line
  }, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   });

export default instance;