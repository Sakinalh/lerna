import { Route } from "react-router-dom";
import * as React from "react";
import { lazy } from "react";
import ProtectedPage from "../containers/ProtectedPage/ProtectedPage";

export const NotFoundContainer = lazy(() => import("src/PageNotFound/containers/PageNotFound"));

export function routingPageNotFound(
  getPersistedToken: Function,
  logout: Function
) {
  return (
    <Route path="not-found" element={(<ProtectedPage getPersistedToken={getPersistedToken} component={NotFoundContainer} logout={logout} />)} />
  );
}
