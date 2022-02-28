import { CampaignInterface } from "src/model";
import { setItemToLocalStorage } from "src/shared/form";
import { SUCCESS_MESSAGE } from "src/redux/store/app";
import { EditProductParamsInterface, GetProductDetailsParamsInterface, ReplaceProductParamsInterface } from "src/api/accessors/Rules/ProductAccessor/interfaces";
import {
  SET_KEYWORDS_BY_CATEGORY,
  SET_KEYWORDS_SUMMARY,
  SET_PRODUCTS_LIST_FOR_ZONE_PRODUCTS,
  SET_SELECTED_CAMPAIN,
  SET_SELECTED_RULE,
  TRY_GET_KEYWORDS_BY_CATEGORY,
  TRY_GET_KEYWORDS_SUMMARY,
  TRY_GET_PROPOSED_PRODUCTS_FOR_ZONE_PRODUCTS,
  TRY_GET_PRODUCTS_LIST_FOR_ZONE_PRODUCTS,
  TRY_GET_PROPOSED_PAGES,
  SET_PROPOSED_PAGES,
  TRY_GET_RULE_CAMPAINS,
  SET_RULE_CAMPAINS,
  TRY_GET_PRODUCTS_FILTERS,
  SET_PRODUCTS_FILTERS,
  TRY_ADD_PRODUCTS_TO_PAGE,
  ADD_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_SUCCESS,
  TRY_DELETE_PRODUCTS_LIST_FOR_ZONE_PRODUCTS,
  TRY_PUBLISH_PAGES,
  TRY_PUBLISH_PAGES_SUCESS,
  TRY_LINK_PAGES_SUCESS,
  TRY_GET_CAMPAIGN_TEST_BY_KEYWORD,
  SET_CAMPAIGN_TEST_BY_KEYWORD,
  TRY_POST_CREATE_CAMPAIGN_TEST,
  CREATE_NEW_CAMPAIGN_TEST,
  CREATE_CAMPAIGN_TEST,
  TRY_POST_LINK_PAGE_TO_ADWORDS,
  TRY_POST_LINK_PAGE_TO_ADWORDS_SUCESS,
  TRY_GET_TXT_CONTENT_BY_ZONE,
  SET_TXT_CONTENT_BY_ZONE,
  TRY_REORDER_PRODUCTS,
  REORDER_PRODUCT_SUCCESS,
  SET_SELECTED_KEYWORD,
  SET_SELECTED_LABEL,
  SET_SELECTED_PAGE,
  SET_PROPOSED_PRODUCTS_FOR_ZONE_PRODUCTS,
  TRY_GET_TXT_PROPOSALS_ZONE,
  SET_TXT_PROPOSALS_ZONE,
  CLEAR_STORE,
  TRY_GET_PRODUCT_DATA_TO_EDIT,
  TRY_SET_PRODUCT_DATA_TO_EDIT,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  APP_SUCCESS_MESSAGE,
  REPLACE_PRODUCT_REQUEST,
  REPLACING_PRODUCT_LOADING_STATUS,
  APP_PROCESS_STATUS,
  TRY_GET_DETAILS,
  SET_PAGE_DETAILS,
  SET_NEXT_SELECTED_INDEX,
  RESET_PUBLISH_SUCCESS_STATUS,
  RESET_LINK_SUCCESS_STATUS,
  RESET_CREATE_SUCCESS_STATUS,
  RESET_CAMPAIGN_TEST_BY_KEYWORD
} from "./const";
import { KeywordsSummaryApi, ProductsByRuleKeywordPageApi, BaseKeywordListApi, KeywordPagesApi, ProductsRemovePageApi } from "../model/api";
import { ProductInterface } from "./areaProduct.epic";
import { PROCESS_STATUS, RuleInterface } from "../../model/store";
import { PostPublishPagesInterface, GetCampaignTestByKeywordParams, GetCampaignTestByKeywordSucessInterface, PostCampaignTestInterface, PostLinkPageToAdwordsInterface } from "../../api/accessors/Adwords/SemAccessors";
import { AddProductParams, GetProductFiltersParamsInterface, SendReorderedProductParams } from "../../api/accessors/Rules/ProductAccessor/productAccessor";
import { GetTxtContentParamsInterface, setTxtContentInterface, GetTxtProposalsParamsInterface } from "../../api/accessors/pageAccessor";

export function getProductsListForZoneProductAction(payload: ProductsByRuleKeywordPageApi) {
  return {
    type: TRY_GET_PRODUCTS_LIST_FOR_ZONE_PRODUCTS,
    payload
  };
}

export function setProductsListForZoneProductAction(payload: ProductInterface) {
  return {
    type: SET_PRODUCTS_LIST_FOR_ZONE_PRODUCTS,
    payload
  };
}

export function tryGetProposedZoneProductsAction(payload: ProductsByRuleKeywordPageApi) {
  return {
    type: TRY_GET_PROPOSED_PRODUCTS_FOR_ZONE_PRODUCTS,
    payload
  };
}

export function setProposedProductsForZoneAction(payload: ProductsByRuleKeywordPageApi) {
  return {
    type: SET_PROPOSED_PRODUCTS_FOR_ZONE_PRODUCTS,
    payload
  };
}

export function TryGetDetailsPageAction(payload: any) {
  return {
    type: TRY_GET_DETAILS,
    payload
  };
}
export function setDetailsPageAction(payload: any) {
  return {
    type: SET_PAGE_DETAILS,
    payload
  };
}

export function setSelectedRuleAction(payload: RuleInterface) {
  setItemToLocalStorage("selectedRule", payload);
  return {
    type: SET_SELECTED_RULE,
    payload: payload
  };
}

export function setSelectedCampainAction(payload: CampaignInterface) {
  return {
    type: SET_SELECTED_CAMPAIN,
    payload: payload
  };
}

export function tryGetKeywordSummaryListAction(payload: { ruleId: number, campainId: number }) {
  return {
    type: TRY_GET_KEYWORDS_SUMMARY,
    payload: payload
  };
}

export function setKewordsSummaryAction(payload: KeywordsSummaryApi[]) {
  return {
    type: SET_KEYWORDS_SUMMARY,
    payload
  };
}

export const tryGetKewordsByCategoryAction = (payload: {
  ruleId: number,
  campainId: number,
  category: string,
  limit: number,
  offset: number,
  keywordValue: string,
  min: number,
  max: number,
}) => ({
  type: TRY_GET_KEYWORDS_BY_CATEGORY,
  payload: payload
});

export function setKewordsByCategoryAction(payload: BaseKeywordListApi) {
  return {
    type: "SET_KEYWORDS_BY_CATEGORY",
    payload
  };
}

export function tryGetKeywordPagesAction(payload: KeywordPagesApi) {
  return {
    type: TRY_GET_PROPOSED_PAGES,
    payload
  };
}

export function setKewordPagesAction(payload: any) {
  return {
    type: SET_PROPOSED_PAGES,
    payload
  };
}

export function tryGetRuleCampaignsAction(ruleId: number) {
  return ({
    type: TRY_GET_RULE_CAMPAINS,
    payload: { ruleId: ruleId }
  });
}

export function setRuleCampaignsAction(campainList: CampaignInterface[]) {
  return ({
    type: SET_RULE_CAMPAINS,
    payload: campainList
  });
}

export function tryGetProductsFiltersAction(payload: GetProductFiltersParamsInterface) {
  return ({
    type: TRY_GET_PRODUCTS_FILTERS,
    payload
  });
}

export function setProductsFiltersAction(payload: any) {
  return ({
    type: SET_PRODUCTS_FILTERS,
    payload
  });
}

export function tryAddProductPageAction(payload: AddProductParams) {
  return ({
    type: TRY_ADD_PRODUCTS_TO_PAGE,
    payload
  });
}

export function setSuccessAddProductPageAction(payload: any) {
  return ({
    type: APP_SUCCESS_MESSAGE,
    payload

  });
}
export function setSuccessRemoveProductPageAction(payload: any) {
  return ({
    type: APP_SUCCESS_MESSAGE,
    payload

  });
}
export function tryDeleteProductsListForZoneProductAction(payload: ProductsRemovePageApi) {
  return ({
    type: TRY_DELETE_PRODUCTS_LIST_FOR_ZONE_PRODUCTS,
    payload: payload
  });
}

export function tryGetProductDataToEditAction(payload: GetProductDetailsParamsInterface) {
  return ({
    type: TRY_GET_PRODUCT_DATA_TO_EDIT,
    payload: payload
  });
}

export function trySetProductDataToEditAction(payload: any) {
  return ({
    type: TRY_SET_PRODUCT_DATA_TO_EDIT,
    payload: payload
  });
}

export function tryPublishPage(payload: PostPublishPagesInterface) {
  return ({
    type: TRY_PUBLISH_PAGES,
    payload
  });
}

export function tryPublishPageSucess(payload: string) {
  return ({
    type: TRY_PUBLISH_PAGES_SUCESS,
    payload
  });
}
export function tryLinkPageSucess(payload: string) {
  return ({
    type: TRY_LINK_PAGES_SUCESS,
    payload
  });
}
export function tryGetCampaignTestByKeywordAction(payload: GetCampaignTestByKeywordParams) {
  return ({
    type: TRY_GET_CAMPAIGN_TEST_BY_KEYWORD,
    payload
  });
}

export function setCampiagnTestByKeywordAction(payload: GetCampaignTestByKeywordSucessInterface | null) {
  return ({
    type: SET_CAMPAIGN_TEST_BY_KEYWORD,
    payload
  });
}
export function resetCampiagnTestByKeywordAction(payload: GetCampaignTestByKeywordSucessInterface | null) {
  return ({
    type: RESET_CAMPAIGN_TEST_BY_KEYWORD,
    payload
  });
}

export function createCampiagnTestByKeywordAction(payload: PostCampaignTestInterface) {
  return ({
    type: CREATE_CAMPAIGN_TEST,
    payload
  });
}
export function createNewCampaignTest(payload: PostCampaignTestInterface) {
  return ({
    type: CREATE_NEW_CAMPAIGN_TEST,
    payload
  });
}

export function tryCreateCampaignTest(payload: PostCampaignTestInterface) {
  return ({
    type: TRY_POST_CREATE_CAMPAIGN_TEST,
    payload
  });
}

export function tryPostLinkPageToAdwordsAction(payload: PostLinkPageToAdwordsInterface) {
  return ({
    type: TRY_POST_LINK_PAGE_TO_ADWORDS,
    payload
  });
}

export function postLinkPageToAdwordsSucessAction(payload: string) {
  return ({
    type: TRY_POST_LINK_PAGE_TO_ADWORDS_SUCESS,
    payload
  });
}

export function tryGetTxtContentAction(payload: GetTxtContentParamsInterface) {
  return ({
    type: TRY_GET_TXT_CONTENT_BY_ZONE,
    payload
  });
}

export function tryGetTxtProposalsAction(payload: GetTxtProposalsParamsInterface) {
  return ({
    type: TRY_GET_TXT_PROPOSALS_ZONE,
    payload
  });
}

export function setTxtProposalsAction(payload: any) {
  return ({
    type: SET_TXT_PROPOSALS_ZONE,
    payload
  });
}

export function setTxtContentByZoneAction(payload: setTxtContentInterface) {
  return ({
    type: SET_TXT_CONTENT_BY_ZONE,
    payload
  });
}

export function trySendReorderProductsAction(payload: SendReorderedProductParams) {
  return {
    type: TRY_REORDER_PRODUCTS,
    payload
  };
}

export function reorderProductsSuccessAction(payload: string) {
  return {
    type: REORDER_PRODUCT_SUCCESS,
    payload
  };
}

export function setSelectedKwdAction(payload: number) {
  return {
    type: SET_SELECTED_KEYWORD,
    payload
  };
}

export function setNextSelectedIndexAction(payload: number) {
  return {
    type: SET_NEXT_SELECTED_INDEX,
    payload
  };
}

export function setSelectedLabelKwdAction(payload: string) {
  return {
    type: SET_SELECTED_LABEL,
    payload
  };
}

export function setSelectedPageAction(payload: any) {
  return {
    type: SET_SELECTED_PAGE,
    payload
  };
}
export function ForceClearStore(payload: any) {
  return {
    type: CLEAR_STORE,
    payload
  };
}

export function editProductAction(payload: EditProductParamsInterface) {
  return {
    type: EDIT_PRODUCT_REQUEST,
    payload
  };
}

export function editProductSuccessAction(payload: EditProductParamsInterface) {
  return {
    type: APP_SUCCESS_MESSAGE,
    payload
  };
}

export function replaceProductRequestAction(payload: ReplaceProductParamsInterface) {
  return {
    type: REPLACE_PRODUCT_REQUEST,
    payload
  };
}

export function replaceProductSuccessAction(payload: any) {
  return {
    type: APP_SUCCESS_MESSAGE,
    payload
  };
}

export function editProductErrorAction(payload: EditProductParamsInterface) {
  return {
    type: EDIT_PRODUCT_ERROR,
    payload
  };
}

export function dissmissAppSuccessMessageAction() {
  return {
    type: APP_SUCCESS_MESSAGE,
    payload: null
  };
}

export function resetPublishSuccessStatusAction() {
  return {
    type: RESET_PUBLISH_SUCCESS_STATUS,
    payload: false
  };
}
export function resetLinkSuccessStatusAction() {
  return {
    type: RESET_LINK_SUCCESS_STATUS,
    payload: false
  };
}
export function resetCreateSuccessStatusAction() {
  return {
    type: RESET_CREATE_SUCCESS_STATUS,
    payload: false
  };
}