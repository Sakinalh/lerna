import { Route } from "react-router-dom";
import { lazy } from "react";
import { PageTheme } from "src/containers/PageTheme/PageTheme.container";

const BuListContainer = lazy(() => import("src/PageBusinesses/containers/BuiListContainer/BuList.container"));

export function routingBu() {
  return (
    <Route path="businesses" element={(<PageTheme><BuListContainer /></PageTheme>)} />
  );
}