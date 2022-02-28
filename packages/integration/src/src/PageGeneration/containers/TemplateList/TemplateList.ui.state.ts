//@ts-nocheck
import create from "zustand";

import {
  setSelectedPageAction,
  tryGetKewordsByCategoryAction,
  tryGetKeywordSummaryListAction,
  setCampiagnTestByKeywordAction,
  tryPostCreateCampaignTest,
  tryPostLinkPageToAdwordsAction,
  tryPublishPage,
  tryGetCampaignTestByKeywordAction,
  setSelectedKwdAction,
  setSelectedLabelKwdAction,
  tryGetRuleCampaignsAction,
  setNextSelectedIndexAction,
  resetPublishSuccessStatusAction,
  resetLinkSuccessStatusAction,
  resetCreateSuccessStatusAction,
  resetCampiagnTestByKeywordAction,
  tryGetCampainDetailsAction,
  tryGetKeywordPagesAction
} from "src/PageGeneration/store/actions";
import { getlabelFromId } from "src/shared/utils";
import {updateUrl, getUrlParams } from "src/hooks/useUrlSearchParams";
import { keywordPage_QParamsType } from "src/PageGeneration/shared/page_query_params";
import { store } from "src";

export const useKeywordsStore = create((set, get) => {
  //const {getQueryParams, updateUrl} = searchParamFn;
  const DEFAULT_LIMIT = 10;

  const [_currentPaginationPage, _campaignId, _ruleId, _k_limit, _K_offset, _category, _keywordId, _pageId] =
   getUrlParams(keywordPage_QParamsType);
  console.log([_currentPaginationPage, _campaignId, _ruleId, _k_limit, _K_offset, _category, _keywordId, _pageId]);

  // const storedCampain = useFetchCampainDetails(_ruleId, _campaignId);

  return {
    selectedPage: null,

    actions: {
      setSelectedPage: selectedPage => set({selectedPage}),
      getSelectedPage: () => get().selectedPage
    }

  };
});
