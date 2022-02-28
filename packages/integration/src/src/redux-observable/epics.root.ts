import { combineEpics } from "redux-observable";
import { redirect$ } from "src/PageSetupApp/store/setupApp";
import {
  trySetAreaImgsBankContentEpic$,
  trySetAreaImgsContentEpic$
} from "../PageGeneration/store/areaImage.epic";
import {
  tryAddProductsToPageEpic$,
  tryGetAreaProductsFiltersEpic$,
  tryGetCatalogList$,
  tryGetCatalogProductListEpic$,
  tryGetProductImgsEpic$,
  tryGetProductsFiltersEpic$,
  tryGetProductsListForZoneProductEpic$,
  tryDeleteProductsListForZoneProductEpic$,
  tryReorderProductsEpic$,
  tryGetZoneProductsProposedEpic$,
  tryGetProductDataToEditEpic$,
  editProductEpic$,
  replaceProductEpic$
} from "../PageGeneration/store/areaProduct.epic";
import {
  tryDeleteGeneratedKwdEpic$,
  tryGetGeneratedListEpic$
} from "../PageGeneration/store/generated.epic";
import {
  tryBatchGetTemplateQueueKwdEpic$,
  tryGetTemplateQueueEpic$,
  tryGetTemplateQueueKwdEpic$,
  tryPostTemplateQueueKwdEpic$
} from "../PageGeneration/store/queue.epic";

import { tryPaginateTemplatesEpic$ } from "../PageGeneration/store/shared.epic";
import {
  tryGetTemplateDetailEpic$,
  tryGetTemplateListEpic$,
  tryPatchTemplateDetailEpic$
} from "../PageGeneration/store/template.epic";
import {
  tryAddSourceDataEpic$,
  tryDeleteSourceItemEpic$,
  tryGetTemplateVarSourceDetailEpic$,
  tryGetTemplateVarSourceListEpic$,
  tryUpdateSourceEpic$
} from "../PageGeneration/store/variableSources.epic";
import {
  clearAll$,
  clearTokenEpic$,
  resumeAction$,
  tryRefreshTokenAction$,
  tryResumeAction$,
  userDetailEpic$
} from "../redux/store/app";
import {
  tryDeleteRuleDetailEpic$,
  tryGetRuleCampainEpic$,
  tryGetRuleDetailEpic$,
  tryGetZoneProposalEpic$,
  tryPatchRuleDetailEpic$,
  tryPostRuleDetailEpic$,
  tryPostZoneProposalDetailEpic$,
  tryPutRuleDetailEpic$
} from "../PageGeneration/store/rule.epic";
import {
  tryGetCollectionItemEpic$,
  tryGetCollectionsNamesEpic$
} from "../PageGeneration/store/collection.epic";
import {
  tryBatchDeletePageFromQueueEpic$,
  tryBatchKeywordListEpic$,
  tryDeletePageFromQueueEpic$,
  tryGetCampaignListEpic$,
  tryGetCustomerIdEpic$,
  tryGetKeywordListEpic$,
  tryPostTemplatePageEpic$,
  tryPostPublishPages$,
  tryGetCampaignTestByKeyword$,
  trypostCampaignTest$
  // tryPostLinkPageToAdwords$,
} from "../PageGeneration/store/sem.epic";
import { tryPostGeneratePagesEpic$ } from "../PageGeneration/store/generate.epic";

import {
// tryDeleteAnalyticsQueryEpic$,
// tryGetAnalyticsQueryEpic$,
// tryPostSaveAnalyticQueryEpic$,
} from "src/PageData/store/queryEpic$";
import { tryGetOptimizationEpic$, tryPostOptimizeTemplateEpic$ } from "../PageData/store/optimizationEpic$";
import { tryGetKewordsSummary$, tryGetKewordPages$, tryGetDetailsPages$ } from "../PageGeneration/store/keywords.epic";
import { tryPostDataTextArea$, tryGetTxtEpic$, tryGetTxtProposalsEpic$ } from "../PageGeneration/store/areaTxt.epic";

export const rootEpic = combineEpics(
  redirect$,
  // app
  tryRefreshTokenAction$,
  clearTokenEpic$,
  userDetailEpic$,
  clearAll$,
  tryResumeAction$,
  resumeAction$,
  // app setup
  /*  hasCompletedSetup$,
      setSetupStep$,
      patchProject$,
      setAsyncProject$,
      postSetupContent$,
      saveSetupContent$,
      createSetup$, */
  // blob
  // downloadFile$,
  // export all
  // exportAll$,

  /* v2 */
  // area img
  trySetAreaImgsBankContentEpic$,
  trySetAreaImgsContentEpic$,
  tryGetProductImgsEpic$,
  // shared template listing
  tryPaginateTemplatesEpic$,
  // list of products
  tryGetProductsListForZoneProductEpic$,
  tryGetZoneProductsProposedEpic$,
  tryReorderProductsEpic$,
  editProductEpic$,
  replaceProductEpic$,

  // templates
  // tryInitTemplateListEpic$,
  // tryGetTemplateListEpic$,
  tryGetTemplateDetailEpic$,
  tryPatchTemplateDetailEpic$,
  // rule
  tryGetRuleDetailEpic$,
  tryPostRuleDetailEpic$,
  tryPutRuleDetailEpic$,
  tryPatchRuleDetailEpic$,
  tryDeleteRuleDetailEpic$,
  // interpreter
  // queue
  tryGetTemplateQueueEpic$,
  tryGetTemplateQueueKwdEpic$,
  tryBatchGetTemplateQueueKwdEpic$,
  tryPostTemplateQueueKwdEpic$,
  tryDeletePageFromQueueEpic$,
  tryBatchDeletePageFromQueueEpic$,
  // variables data
  tryGetTemplateVarSourceListEpic$,
  tryGetTemplateVarSourceDetailEpic$,
  tryUpdateSourceEpic$,
  tryDeleteSourceItemEpic$,
  // generated
  tryGetGeneratedListEpic$,
  tryDeleteGeneratedKwdEpic$,
  // source
  tryAddSourceDataEpic$,
  // catalogs
  tryGetCatalogProductListEpic$,
  tryGetCatalogList$,
  tryGetAreaProductsFiltersEpic$,
  tryAddProductsToPageEpic$,
  tryGetProductDataToEditEpic$,
  // queue page edit
  tryGetProductsFiltersEpic$,
  // collections
  tryGetCollectionsNamesEpic$,
  tryGetCollectionItemEpic$,
  // campaigns
  // tryGetCampaignListEpic$,
  // tryGetRuleCampainEpic$,
  // kwds
  tryGetKeywordListEpic$,
  tryBatchKeywordListEpic$,
  tryGetKewordsSummary$,
  // tryGetKewordsByCategory$,
  tryGetKewordPages$,
  // pages
  tryPostTemplatePageEpic$,
  tryGetDetailsPages$,
  // proposals
  tryGetZoneProposalEpic$,
  tryPostZoneProposalDetailEpic$,
  // customer
  tryGetCustomerIdEpic$,
  // generate pages
  tryPostGeneratePagesEpic$,
  // analytics graph
  // query
  // tryPostSaveAnalyticQueryEpic$,
  // tryGetAnalyticsQueryEpic$,
  // tryDeleteAnalyticsQueryEpic$,
  // message match
  // tryGetMmEvolutionEpic$,
  // tryGetMmTimelineEpic$,
  // optimization
  tryGetOptimizationEpic$,
  tryPostOptimizeTemplateEpic$,
  tryPostDataTextArea$,
  tryDeleteProductsListForZoneProductEpic$,
  tryPostPublishPages$,
  tryGetCampaignTestByKeyword$,
  trypostCampaignTest$,
  // tryPostLinkPageToAdwords$,
  tryGetTxtEpic$,
  tryGetTxtProposalsEpic$
);
