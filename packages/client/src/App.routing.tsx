import { Route } from "react-router-dom";
import { lazy } from "react";
import ProtectedPage from "src/containers/ProtectedPage/ProtectedPage";
import { routingData } from "./PageData/PageData.routing";
import { routingGeneration } from "./PageGeneration/PageGeneration.routing";

const AppMainContainer = lazy(
  () => import("src/containers/AppMain/AppMain.container")
);

export function routingApp(
  getPersistedToken: Function,
  logout: Function
) {
  return (
    <Route key="app" path="/" element={ <ProtectedPage getPersistedToken={getPersistedToken} component={AppMainContainer} logout={logout} /> } >
      {routingGeneration(getPersistedToken)}
      {routingData(getPersistedToken)}
    </Route>
  );
}
