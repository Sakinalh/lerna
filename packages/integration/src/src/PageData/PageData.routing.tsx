import { Route } from "react-router-dom";
import { lazy } from "react";
import { AppRedirect } from "../components/AppRedirect/AppRedirect.component";
/* ANALYTICS */

const AnalyticsBase = lazy(
  () => import("src/PageData/containers/Analytics/Analytics.container")
);
const AnalyticsTablePage = lazy(
  () => import("src/PageData/components/AnalyticsTable/AnalyticsTable.component")
);

const AnalyticsRecommendationsPage = lazy(
  () => import("./containers/Analytics/AnalyticsRecommendation/AnalyticRecommendations.container")
);

const PageKwdPage = lazy(
  () => import("./containers/Analytics/AnalyticsRecommendation/PageKwd/PageKwd.container")
);

const PagePreview = lazy(
  () => import("./containers/Analytics/AnalyticsRecommendation/PreviewPage/PreviewPage")
);

const AllKpisPage = lazy(
  () => import("./containers/Analytics/AnalyticsRecommendation/PageKwd/PageKwdPerfSummary/PaginatedBlockKpis.tsx/KpisModal/KpisModal.component")
);

const AnalyticsDashboardPage = lazy(
  () => import("src/PageData/containers/AnalyticsDashboard/AnalyticsDashboard.container")
);
const FavoriteSearches = lazy(
  () => import("src/PageData/containers/FavoriteSearches/FavoriteSearches.container")
);

const FavoritesBase = lazy(
  () => import("src/PageData/containers/FavoritesBase/FavoritesBase.container")
);

const Query = lazy(
  () => import("src/PageData/containers/Query/Query.container")
);
const QuerySave = lazy(
  () => import("src/PageData/containers/QueryCreate/QueryCreate.container")
);

const PageRecommendation = lazy(
  () => import("./containers/Analytics/AnalyticsRecommendation/PageKwd/PageRecommendation/PageRecommendation.container")
);

const PageAnalysis = lazy(
  () => import("./containers/Analytics/AnalyticsRecommendation/PageKwd/PageAnalysis/PageAnalysis.container")
);
const PageBusinesses = lazy(
  () => import("../PageBusinesses/containers/BuiListWithDetails/BuiListWithDetails.container")
);
// TODO remove analytics path when bug fix
// as of 01/2021, nested routed with empty path are not displayed. add temp route
// https://github.com/ReactTraining/react-router/issues/7239
export function routingData(
  getPersistedToken: Function
) {
  return (
    <Route key="data" path="data/" >

      <Route key="analytics" path="analytic/" element={ <AnalyticsBase/> }>
        <Route path="dashboard" element={ <AnalyticsDashboardPage/> }/>
        <Route path="table" element={ <AnalyticsTablePage/>}/>

      </Route>

      <Route key="recommendation" path="analytic/recommendation" element={ <AnalyticsRecommendationsPage/> } >
        <Route path="page-kwd" element={<PageKwdPage />}>
          <Route path="page-analysis" element={<PageAnalysis />} />
          <Route path="page-recommendation" element={<PageRecommendation />} />
        </Route>
        <Route path="page-preview" element={ <PagePreview />}/>
        <Route path='all-kpis' element={<AllKpisPage />} />
      </Route>

      <Route key="favorite" path="favorite/" element={<FavoritesBase />}>
        <Route path="searches/" element={<FavoriteSearches />} />
      </Route>
      <Route path="page-businesses-details" element={ <PageBusinesses />}/>

      <Route path="query/" element={<Query />}>
        <Route path="create" element={<QuerySave />} />
      </Route>

      <Route path="*" element={(<AppRedirect to="/data/analytic/dashboard/" getPersistedToken={getPersistedToken} />)} />

    </Route>
  );
}
