import {
  PAGE_ADWORDS_PUBLISH,
  CAMPAIGN_TEST_BY_KEYWORD,
  CREATE_CAMPAIGN,
  LINK_PAGE_TO_ADWORDS
} from "src/api/routes/api_routes";
import { queryParamsToStr } from "src/components/AppPaginator/AppPaginator.component";
import {
  setProductsFiltersAction,
  tryPublishPage,
  tryPublishPageSucess,
  setCampiagnTestByKeywordAction,
  createCampiagnTestByKeywordAction,
  postLinkPageToAdwordsSucessAction,
  tryLinkPageSucess
} from "src/PageGeneration/store/actions";
import { GenericClassAccessor } from "../GenericClassAccessor";
import { queryParamFormater, replacePathParameter } from "../queryGenerator";
import { GetProductFiltersParamsInterface } from "../Rules/ProductAccessor/productAccessor";

export interface PostPublishPagesInterface {
  pages_data: [
    {
      page_id: string;
      keyword_id: string;
    }
  ];
}

export interface GetCampaignTestByKeywordParams {
  base_campaign_id: string;
  customer_id: number;
}

export interface GetCampaignTestByKeywordSucessInterface {
  exists: boolean;
  name: string;
  id: string;
  start_date: string;
  end_date: string;
  traffic_split: string;
}

export interface AdlinkInterface {
  name: string;
  id: string;
}

export interface PostCampaignTestInterface {
  customer_id: string;
  page_id: string;
  keyword_id: number;
  name: string;
  start_date: string;
  end_date: string;
  traffic_split: number;
}

export interface PostLinkPageToAdwordsInterface {
  customer_id: string,
  page_id: string,
  campaign_id: number,
  keyword_id: number
}

class Sem extends GenericClassAccessor {
  postPublishPages = (state$, client, payload: PostPublishPagesInterface) => {
    const endpoint = PAGE_ADWORDS_PUBLISH;
    return super.post(state$, endpoint, tryPublishPageSucess, client, payload);
  };

  getCampaignTestByKeyword = (
    state$,
    client,
    query: GetCampaignTestByKeywordParams
  ) => {
    const { base_campaign_id, customer_id } = query;

    const endpoint = CAMPAIGN_TEST_BY_KEYWORD + "?" + queryParamFormater({ base_campaign_id: base_campaign_id, customer_id: customer_id });
    return super.get(state$, endpoint, setCampiagnTestByKeywordAction, client);
  };

  postCampaignTest = (
    state$,
    client,
    payload: PostCampaignTestInterface
  ) => {
    const endpoint = CREATE_CAMPAIGN;
    return super.post(state$, endpoint, createCampiagnTestByKeywordAction, client, payload);
  };

  postLinkPageToAdwords = (
    state$,
    client,
    payload: PostLinkPageToAdwordsInterface
  ) => {
    const endpoint = LINK_PAGE_TO_ADWORDS;
    return super.post(state$, endpoint, tryLinkPageSucess, client, payload);
  };
}
export default new Sem();
