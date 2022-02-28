// prefix REACT_APP_ before adding custom env var
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import addDays from "date-fns/addDays";

// export const API_ROOT = process.env.REACT_APP_API_URI;
// export const NAISTER_API_ROOT = process.env.REACT_APP_NAISTER_API_URI;

// auth
export const GET_TOKEN_API = "/api/accounts/token";
export const REFRESH_TOKEN_API = "/api/accounts/refresh-token";
export const REVOKE_TOKEN_API = "/api/accounts/revoke-token";
export const RESET_PWD_API = "/api/reset-password";
export const CHANGE_PWD_API = `${RESET_PWD_API}/confirm`;

// user
export const USER_GET_API = "/api/accounts";
export const POST_NEW_USER = "/api/newUser";

// SETUP
export const SETUP_NAME_API = "/api/core/validate-project";
export const SETUP_WEB_API = "/api/core/link-adwords-account";
export const SETUP_PRODUCT_API = "/api/core/upload-product";
export const SETUP_IMAGE_API = "/api/core/upload-image-bank";
export const SETUP_ADTEXT_API = "/api/core/upload-adtext";
export const SETUP_KWD_API = "/api/core/upload-keyword";
export const SETUP_CREATE_API = "/api/core/start-process";

// tracking
/*
export const MATOMO_URL = "http://localhost:8888/dlp_lp/matomo/";
export const MATOMO_TOKEN = "49f6504d56c14afb8a3e1c2331382587";
*/
/* export const MATOMO_URL = "https://naister.matomo.cloud/";
export const MATOMO_TOKEN = "80c3322559a21878aab6a93451857c04"; */

// Page generation
const CORE = "/api/core";
export const PAGE_GEN_TEMPLATES = `${CORE}/templates`;
export const PAGE_GEN_RULES = `${CORE}/rules`;
export const PAGE_GEN_RULES_GET_CAMPAINS = `${CORE}/rules/:rule_id/campaigns`;
export const PAGE_GEN_PAGES = `${CORE}/pages`;
export const PAGE_GEN_IMG_BANKS = `${CORE}/image-banks`;
export const PAGE_GEN_IMGS = `${PAGE_GEN_IMG_BANKS}/images`;
export const PAGE_GEN_CATALOGS = `${CORE}/catalogs`;
export const PAGE_GEN_CATALOGS_FILTERS = `${CORE}/catalogs/get-filters`;
export const PAGE_GEN_SOURCES = `${CORE}/sources`;
export const PAGE_GEN_SOURCES_DATA = `${PAGE_GEN_SOURCES}/get-data`;
export const PAGE_GEN_COLLECTIONS = `${CORE}/keywords-collections`;
export const PAGE_GEN_COLLECTIONS_NAMES = `${PAGE_GEN_COLLECTIONS}/names`;

/* sem */
export const PAGE_GEN_SEM = `${CORE}/sem`;
export const GET_CUSTOMER_ID = `${PAGE_GEN_SEM}/:user_id/get-customer-id`;
export const PAGE_ADWORDS_PUBLISH = `${PAGE_GEN_SEM}/publish-pages`;
export const PAGE_ADWORDS_LINK = `${PAGE_GEN_SEM}/link-pages-to-adwords`;
export const PAGE_EDIT_GET_ZONE_PRODUCTS = `${CORE}/rules/get-zone-products`;
export const PAGE_EDIT_ZONE_GET_PROPOSED_PRODUCTS = `${CORE}/rules/get-products`;
export const PAGE_EDIT_ZONE_GET_PRODUCT_DATA_TO_EDIT= `${CORE}/rules/get-product-detail`;
export const PAGE_EDIT_ZONE_EDIT_PRODUCT= `${CORE}/rules/edit-products`;
export const PAGE_EDIT_ZONE_REPLACE_PRODUCT= `${CORE}/rules/replace-product`;
export const PAGE_EDIT_GET_PRODUCTS_FILTERS = `${CORE}/pages/edit-product/get-filters`;
export const PAGE_EDIT_ADD_PRODUCTS_PAGE = `${CORE}/rules/add-products`;
export const PAGE_EDIT_REORDER_PRODUCTS = `${CORE}/rules/reorder-products`;
export const PAGE_EDIT_KWDS_WORD_SUMMARY = `${CORE}/rules/:ruleId/campaigns/:campainId/keywords-summary`;
export const PAGE_EDIT_GET_KWDS = `${CORE}/rules`;
export const PAGE_EDIT_KWDS_PAGES_PROPOSAL = `${CORE}/rules/:rule_id/keywords/:keyword_id/pages`;
export const PAGE_DETAILS = `${CORE}/rules`;

/* campaign test */
export const CAMPAIGN_TEST_BY_KEYWORD = `${CORE}/sem/campaign-test`;
export const CREATE_CAMPAIGN = `${CORE}/sem/create-campaign-test`;
export const LINK_PAGE_TO_ADWORDS = `${CORE}/sem/link-pages-to-adwords`;
export const PAGE_GEN_RULES_GET_CAMPAIN_DETAILS = `${CORE}/rules/:id/campaigns/:campaign_id/campaign-detail`;

/* filters */
export const ANALYTICS_NEW_ROOT = "/analytics";
export const DATE_RANGES = `${ANALYTICS_NEW_ROOT}/dashboard/date-ranges`;
export const ANALYTICS_FILTERS = `${ANALYTICS_NEW_ROOT}/filters`;

/* Analytics */
export const ANALYTICS_PERFORMANCE_PAGES_API = "/analytics/dashboard/scatterplot-perf";
export const ANALYTICS_PERFORMANCE_GET_KPIS = "/analytics/dashboard/scatterplot-perf/kpis";
export const ANALYTICS_PERFORMANCE_GET_FAV_FILTERS = "/analytics/fav-filters";
export const ANALYTICS_PERFORMANCE_PAGE_SUMMARY = "/analytics/kwdPage/infoSummary";
export const ANALYTICS_PERFORMANCE_LP_KWD_SUMMARY = "/analytics/kwdPage/perfSummary";
export const ANALYTICS_PIECHART_MESSAGE_MATCH = "/analytics/dashboard/piechart-mm";
export const ANALYTICS_PERFORMANCE_GRAPH = "/analytics/dashboard/graph-analytics";
export const ANALYTICS_PERFORMANCE_TIME_RESOLUTION = "/analytics/dashboard/graph-analytics/time-resolution";
export const ANALYTICS_PERFORMANCE_KPIS_GRAPH = "/analytics/dashboard/graph-analytics/kpis";
export const RECOMMANDATION_HISTORY_CHANGES = "/analytics/kwdPage/changeHistory";
// KwdPage
export const KWDPAGE_PERFORMANCE = "/analytics/kwdPage/performance";

// Tabs
export const ANALYTICS_TAB = "/analytics/table";

// optimizations stepper
const OPTIMIZATION_PAGES_ROOT = "/api/analytics-optimizations/opt";
export const ANALYTICS_OPT_PAGES_API = `${OPTIMIZATION_PAGES_ROOT}/pages`;
export const OPTIMIZATION_PAGES_API = `${OPTIMIZATION_PAGES_ROOT}/fetch-pages-templates`;
export const OPTIMIZATION_LINK_TEMPLATE_API = `${OPTIMIZATION_PAGES_ROOT}/link-pages-templates`;
/* APP */

export const DEFAULT_PAGINATION_PARAMS = {
  limit: "10",
  offset: "0"
};
export const DEFAULT_PAGINATION = "offset=0&limit=10";
export const CHEAT_PAGINATION_PARAMS = { limit: "999", offset: "0" };
export const DEFAULT_SORT_ORDER = "asc";
export const DATE_FILTER_FORMAT = "yyyy-MM-dd";
export const CHEAT_PAGINATION = "offset=0&limit=999";
export const INIT_LIST_PARAMS = {
  required: DEFAULT_PAGINATION_PARAMS,
  option: {}
};

export const DEFAULT_PAGINATION_DATE_SORT = {
  ...DEFAULT_PAGINATION_PARAMS,
  start_date: format(addMonths(addDays(new Date(), 1), -1), "yyyy-MM-dd'"),
  end_date: format(new Date(), "yyyy-MM-dd'"),
  sort_criteria: "message_match",
  sort_order: "asc"
};

export const REMOVE_PRODUCT_ZONE = `${PAGE_GEN_RULES}/remove-products`;
export const GET_TXT_CONTENT_BY_ZONE = `${CORE}/rules/zones/get-text-content`;
export const GET_TXT_PROPOSALS = `${CORE}/rules/get-text-proposals`;

/** new interfaces : add business ids cloudfront url not working yet use gateway url */
export const GET_USER_BUSINESS = "https://qf5hy2n3r5.execute-api.eu-west-1.amazonaws.com/businesses/by-user";
export const GET_USERS_BY_BU = "https://qf5hy2n3r5.execute-api.eu-west-1.amazonaws.com/users/by-business";