import axios from "axios";
import { getPersistedToken, getPersistedUser, logout, PUBLIC_PATH } from "src";
import { useCognitoToken } from "src/PageLogin/hooks/useCognitoToken";
import { differenceInMinutes } from "date-fns";
import { linkToAdsStatusAction, processStatusAction } from "src/redux/store/app";
import { tryLinkPageSucess, tryPublishPageSucess } from "src/PageGeneration/store/actions";
import { configureStore } from "src/redux/store/config.store";
import { local_env } from "./mock.local.env";
import { getItemFromLocalStorage } from "../../shared/form/helper";
import { getEnvVariables } from "./global.store";

const instance = axios.create();
export const { store, persistor } = configureStore();

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
  setBaseUrl(config);
  // Do something before request is sent
  store.dispatch(processStatusAction("PROCESSING"));
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

// it resolves the crash after 400 error
axios.interceptors.response.use((response) => {
  store.dispatch(processStatusAction("DONE"));
  return response;
  // eslint-disable-next-line
  }, function (error) {
  // Do something with request error
  store.dispatch(processStatusAction("DONE"));
  return Promise.reject(error);
});

const setBaseUrl = (config) => {
  if(!config.baseURL) { // ne le faire qu'une fois par lancement d'app
    if(window.location.host.includes("localhost")) {
      config.baseURL = local_env.REACT_APP_NAISTER_API_URI;
    } else {
      config.baseURL = getEnvVariables().REACT_APP_NAISTER_API_URI;
    }
  }
};

const TrySuccessAction = (type, dispatch) => {
  switch (type) {
    case "publishPage":
      dispatch(tryPublishPageSucess("your pages have been successufully published"));
      break;
    case "linkPage":
      dispatch(tryLinkPageSucess("your pages have been successufully linked"));
      break;
    default:
      break;
  }
};

export const postAxiosQuery = (endpoint, data) => async () => {
  const dispatch = data.queryKey[1];
  dispatch(linkToAdsStatusAction("PROCESSING"));
  return await axios.post(
    endpoint,
    data.queryKey[2],
    {
      headers: {
        "Authorization": "Bearer " + getPersistedToken()
      }
    }
  ).then((res) => {
    TrySuccessAction(data.queryKey[0], dispatch);
    dispatch(linkToAdsStatusAction("DONE"));
    // eslint-disable-next-line
      console.log(res)
  }).catch((error) => {
    dispatch(linkToAdsStatusAction("FAIL"));
    // eslint-disable-next-line
      console.log(error.message);
  });
};
