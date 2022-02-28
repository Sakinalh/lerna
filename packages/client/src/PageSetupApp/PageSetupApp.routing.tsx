import { Route } from "react-router-dom";
import * as React from "react";
import { lazy } from "react";
import { UserResponse } from "../model/user";
import ProtectedPage from "../containers/ProtectedPage/ProtectedPage";
import { SetupIntro } from "./containers/Setup-intro.container";
import { SetupFormName } from "./containers/Setup-form-name.container";
import { SetupFormCred } from "./containers/Setup-form-cred.container";
import { SetupFormLimit } from "./containers/Setup-form-limit.container";
import { SetupFormUrl } from "./containers/Setup-form-url.container";
import { SetupFormSem } from "./containers/Setup-form-sem.container";
import { SetupDone } from "./containers/Setup-done.container";
import { SetupProcessing } from "./containers/Setup-processing.container";
import { AppRedirect } from "../components/AppRedirect/AppRedirect.component";

export const SetupAppContainer = lazy(() => import("src/PageSetupApp/containers/SetupApp.container"));

export function routingSetupApp(
  getPersistedToken: Function,
  logout: Function
) {
  return (
    <Route path="setup-app/*" element={(<ProtectedPage getPersistedToken={getPersistedToken} component={SetupAppContainer} logout={logout} />)} >
      <Route path="intro" element={<SetupIntro />} />
      <Route path="form/name" element={<SetupFormName />} />
      <Route path="form/credential" element={<SetupFormCred />} />
      <Route path="form/limitation" element={<SetupFormLimit />} />
      <Route path="form/url" element={<SetupFormUrl />} />
      <Route path="form/sem" element={<SetupFormSem />} />
      <Route path="form/completed" element={<SetupDone />} />
      <Route path="/processing" element={<SetupProcessing />} />
      <Route path="*" element={(<AppRedirect to="intro" getPersistedToken={getPersistedToken} />)} />
    </Route>
  );
}
