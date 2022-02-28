import { setDataTextAreaAction, setSuccesDataTextAreaAction } from "src/PageGeneration/store/action";
import {
  GET_TXT_CONTENT_BY_ZONE,
  GET_TXT_PROPOSALS,
  PAGE_GEN_RULES
} from "../routes/api_routes";
import { GenericClassAccessor } from "./GenericClassAccessor";
import {
  bodyParamsFormater,
  queryParamFormater,
  replacePathParameter
} from "./queryGenerator";
import {
  setProductsFiltersAction,
  setTxtContentByZoneAction,
  tryGetTxtProposalsAction,
  setTxtProposalsAction
} from "../../PageGeneration/store/actions";
export interface GetTxtContentParamsInterface {
  zone_id: string;
  page_id: string;
}

export interface setTxtContentInterface {
  text_value: string;
}

export interface GetTxtProposalsParamsInterface {
  rule_id: number;
  page_id: string;
  zone_id: string;
  keyword_id: string;
  limit?: number;
  offset?: number;
}

export interface saveTxtParamsInterface {
  page_id: string;
  keyword_id: string | number;
  update: {
    content_id: string;
    type: string;
    value: string;
    score: string | number;
    zone_id: string;
  };
}

export class Page extends GenericClassAccessor {
  tryGetTxtContentByZone = (
    bodyParams: GetTxtContentParamsInterface,
    state$,
    client
  ) => {
    const { page_id, zone_id } = bodyParams;
    let endpoint = GET_TXT_CONTENT_BY_ZONE;
    endpoint =
      endpoint +
      "?" +
      queryParamFormater({ page_id: page_id, zone_id: zone_id });
    return super.get(state$, endpoint, setTxtContentByZoneAction, client);
  };

  tryGetTxtProposals = (
    bodyParams: GetTxtProposalsParamsInterface,
    state$,
    client
  ) => {
    const { rule_id, page_id, zone_id, keyword_id, limit, offset } = bodyParams;

    const endpoint =
      GET_TXT_PROPOSALS +
      "?" +
      queryParamFormater({
        rule_id: rule_id,
        page_id: page_id,
        zone_id: zone_id,
        keyword_id: keyword_id,
        limit: limit,
        offset: offset
      });
    return super.get(state$, endpoint, setTxtProposalsAction, client);
  };

  saveTxt = (bodyParams: saveTxtParamsInterface, state$, client) => {
    const endpoint = `${PAGE_GEN_RULES}update-content/`;
    return super.post(
      state$,
      endpoint,
      setSuccesDataTextAreaAction,
      client,
      bodyParams
    );
  };
}
export default new Page();
