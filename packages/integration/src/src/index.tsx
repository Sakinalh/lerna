// style
import { ThemeProvider, Theme } from "@mui/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
// navigation
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import * as Sentry from "@sentry/browser";
import { routingLogin } from "src/PageLogin/PageLogin.routing";
import { routingSignUp } from "src/PageLogin/pages/PageSignUp/PageSignUp.routing";
import StylesProvider from "@mui/styles/StylesProvider";
import { Amplify } from "aws-amplify";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  QueryCache
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { setItemToLocalStorage } from "src/shared/form";
import { Loading } from "./components/Loading/Loading.component";
import { APP_THEME } from "./styles/themes/commonTheme";
import { lightTheme } from "./styles/themes/lightTheme";
import registerServiceWorker from "./registerServiceWorker";
import { history } from "./route-history";
// routes
// style
import { safeGet } from "./shared/utils";
// redux observable
import { configureStore } from "./redux/store/config.store";
import { EnvVariablesResponse, UserResponse } from "./model/user";
import { clearUserTokenAction, tryClearUserTokenAction } from "./redux/store/app";
// error log
import { AppRedirect } from "./components/AppRedirect/AppRedirect.component";

import { routingPageNotFound } from "./PageNotFound/PageNotFound.routing";
import { routingApp } from "./App.routing";
import { ForceClearStore } from "./PageGeneration/store/actions";
import AuthConfig from "./shared/AuthConfig";
import { useCognitoLogout, useCognitoToken} from "./PageLogin/hooks/useCognitoToken";
import { getEnvVariables } from "./api/react-query/global.store";
import { local_env } from "./api/react-query/mock.local.env";
import { routingBu } from "./PageBusinesses/PageBusinesses.routing";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

Amplify.configure(AuthConfig.Common);

export const { store, persistor } = configureStore();

export function purgePersist(): Promise<string> {
  return persistor.purge();
}

export const PUBLIC_PATH: string = "/login/";

/**
 * clear local storage then redirect to non protected page
 *
 * @export
 * @returns {Promise<string>}
 */
export function clearPersistToken(): Promise<string> {
  localStorage.removeItem("naister_user_customer_id");

  return purgePersist()
    .then(() => history.push(PUBLIC_PATH))
    .then(() => "storage cleared");
}

export function getPersistedExp(state: any = store.getState()): string {
  return safeGet(state, "app", "user", "expires");
}

export function getPersistedUser(state: any = store.getState()): UserResponse {
  return safeGet(state, "app", "user");
}

/**
 * dispatch clear token
 *
 * @export
 * @returns
 */
// export function logout () {
//   const { access_token, access_token_type } = getPersistedUser();
//   store.dispatch(ForceClearStore(null))  // force clear all store content
//   localStorage.clear(); // clear local storage
//   return store.dispatch(
//     tryClearUserTokenAction({ access_token, access_token_type })
//   );
// }

// TODO :: use when cognito ready
export const logout = async () => {
  store.dispatch(ForceClearStore(null)); // force clear all store content
  localStorage.clear();
  store.dispatch(clearUserTokenAction());
  await useCognitoLogout();
};

export const getPersistedToken = async (state: any = store.getState()) => {
  const token = (await useCognitoToken());

  return token || null;
};

function AppWrap(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if(window.location.host.includes("localhost")) {
      setItemToLocalStorage("envVariables", local_env);
    } else {
      setItemToLocalStorage("envVariables", getEnvVariables());
    }
  }, []);

  useEffect(() => {
    const listener = history.listen((h) => {
      const { action, location } = h;
      if(action === "PUSH") {
        navigate(location.pathname);
      }

      return () => {
        listener();
      };
    });
  }, [navigate]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnReconnect: true,
        refetchIntervalInBackground: false,
        retryOnMount: false,
        refetchOnWindowFocus: true,
        retry: true,
        staleTime: 30000
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>

      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={lightTheme}>
            <PersistGate loading={null} persistor={persistor}>
              <React.Suspense fallback={<Loading/>}>
                <Routes>

                  {routingLogin(purgePersist)}
                  {/* {routingSignUp()} */}
                  {routingBu()}
                  {routingApp(getPersistedToken, logout)}
                  {routingPageNotFound(getPersistedToken, logout)}

                  <Route path="*" element={ <AppRedirect getPersistedToken={getPersistedToken} /> }/>
                </Routes>
              </React.Suspense>
            </PersistGate>
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

const host = window.location.hostname;

if(host !== "localhost") {
  Sentry.init({
    dsn: "https://de1618e516a14ca49b4c2bdb2aaf88b0@o918033.ingest.sentry.io/5860817",
    // integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
  });
}

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <AppWrap/>
      </StyledEngineProvider>
    </React.StrictMode>
  </BrowserRouter>,
  (document.getElementById("root") as HTMLElement) ||
    document.createElement("div")
);
registerServiceWorker();
