import { combineReducers } from "redux";

import { AppReducer } from "./app";
import { pageQueueReducer } from "../../PageGeneration/store/app.pageQueue.reducer";
import { analyticsReducer } from "../../PageData/store/app.analytics.reducer";
// import { messageMatchReducer } from "../../PageData/store/app.messageMatch.reducer";
import { optimizationReducer } from "../../PageData/store/app.optimization.reducer";
import { pageGeneratedReducer } from "../../PageGeneration/store/app.pageGenerated.reducer";
import { ruleListReducer } from "../../PageGeneration/store/app.ruleList.reducer";
import { ruleDetailReducer } from "../../PageGeneration/store/app.ruleDetail.reducer";
import { analyticsQueryReducer } from "../../PageData/store/app.analyticsQuery.reducer";
import { campaignTestReducer } from "../../PageGeneration/store/app.campaignTest.reducer";
import { filtersReducer } from "../../PageGeneration/store/filters.reducer";
import { businessReducer } from "../../PageBusinesses/store/businesses.reducer";
const reducers = {
  app: AppReducer,
  // setupApp: SetupAppReducer,
  // generation
  // generation: generateReducer,
  pageQueue: pageQueueReducer,
  pageGenerated: pageGeneratedReducer,
  ruleDetail: ruleDetailReducer,
  ruleList: ruleListReducer,
  // analytics && co
  analytics: analyticsReducer,
  // messageMatch: messageMatchReducer,
  optimization: optimizationReducer,
  analyticsQuery: analyticsQueryReducer,
  campaignTest: campaignTestReducer,
  filters: filtersReducer,
  business: businessReducer
};
const CLEAR_STORE = "CLEAR_STORE";
export const appReducer = combineReducers(reducers);

export const rootReducer = (state, action) => {
  if(action.type === CLEAR_STORE) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
