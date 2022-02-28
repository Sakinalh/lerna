import { initialAppState } from "src/redux/store/app/app.reducers";
import { DispatchAction, ValidPayload } from "src/model/store";
import { StoreState } from "src/model";
import { initialSetupState } from "src/PageSetupApp/store/setupApp.reducers";
import { initialAnalyticsState } from "src/PageData/store/app.analytics.reducer";
import { initialOptimizationState } from "src/PageData/store/app.optimization.reducer";
// import { initialMessageMatchState } from "src/PageData/store/app.messageMatch.reducer";
import { initialPageQueueState } from "../../PageGeneration/store/app.pageQueue.reducer";
import { initialPageGeneratedState } from "../../PageGeneration/store/app.pageGenerated.reducer";
import { initialRuleListState } from "../../PageGeneration/store/app.ruleList.reducer";
import { initialRuleDetailState } from "../../PageGeneration/store/app.ruleDetail.reducer";
import { initialAnalyticsQueryState } from "../../PageData/store/app.analyticsQuery.reducer";
import { initialCampaignTestState } from "../../PageGeneration/store/app.campaignTest.reducer";

export const INITIAL_STORE_STATE: StoreState = {
  app: initialAppState,
  setupApp: initialSetupState,
  // new generation page
  // generation: initialGenerateState,
  ruleDetail: initialRuleDetailState,
  ruleList: initialRuleListState,
  pageQueue: initialPageQueueState,
  pageGenerated: initialPageGeneratedState,
  // new analytics && opt page
  optimization: initialOptimizationState,
  analytics: initialAnalyticsState,
  // messageMatch: initialMessageMatchState,
  analyticsQuery: initialAnalyticsQueryState,
  campaignTest: initialCampaignTestState

};

export function reducer(
  _state: StoreState,
  _action: DispatchAction<ValidPayload>
): StoreState {
  return INITIAL_STORE_STATE;
}
