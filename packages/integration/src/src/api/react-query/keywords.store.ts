import { getPersistedToken } from "src";
import { tryLinkPageSucess, tryPublishPageSucess } from "src/PageGeneration/store/actions";
import { linkToAdsStatusAction, processStatusAction } from "src/redux/store/app";
import { queryParamFormater, replacePathParameter } from "../accessors/queryGenerator";
import { LINK_PAGE_TO_ADWORDS, PAGE_ADWORDS_PUBLISH, PAGE_EDIT_GET_KWDS, PAGE_EDIT_KWDS_PAGES_PROPOSAL, PAGE_EDIT_KWDS_WORD_SUMMARY, PAGE_GEN_PAGES, PAGE_GEN_RULES, PAGE_GEN_RULES_GET_CAMPAIN_DETAILS } from "../routes/api_routes";
import axios from "./customAxios";

export const getCampaign = async (props) => {
  const endpoint = replacePathParameter(PAGE_GEN_RULES_GET_CAMPAIN_DETAILS, props.queryKey[1]);
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response.data;
};

export const getKeywordPages = async (props) => {
  const endpoint = replacePathParameter(PAGE_EDIT_KWDS_PAGES_PROPOSAL, props.queryKey[1]);
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return response.data;
};

export const getKeywordSummaryList = async (props) => {
  const endpoint = replacePathParameter(PAGE_EDIT_KWDS_WORD_SUMMARY, props.queryKey[1]);
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data;
};

export const getKewordsByCategory = async (props) => {
  const { ruleId, campainId, category, limit, offset, keywordValue, min, max } = props.queryKey[1];
  let arr = {};

  if(keywordValue) {
    arr = {
      ...arr,
      kwd_text_contains: keywordValue
    };
  }
  if(min) {
    arr = {
      ...arr,
      min_score: min
    };
  }
  if(max) {
    arr = {
      ...arr,
      max_score: max
    };
  }

  const endpoint = PAGE_EDIT_GET_KWDS.concat("/" + ruleId + "/campaigns/" + campainId + "/categories/" + category + "/keywords?limit=" + limit + "&offset=" + offset + "&" + queryParamFormater(arr));
  const response = await axios.get(endpoint).then(data => data)
    .catch((error) => {
      throw new Error(error.message);
    });
  return response.data;
};

const TrySuccessAction = (type, dispatch) => {
  switch (type) {
    case "publishPage":
      dispatch(tryPublishPageSucess("your pages have been successufully published"));
      break;
    case "linkPage":
      dispatch(tryLinkPageSucess("your pages have been successufully linked"));
      break;
    default:
      break;
  }
};

export const publishPage = async (params) => {
  const dispatch = params.queryKey[1];
  dispatch(processStatusAction("PROCESSING"));
  const response = await axios.post(PAGE_ADWORDS_PUBLISH, params.queryKey[2])
    .then((res) => {
      TrySuccessAction(params.queryKey[0], dispatch);
      dispatch(processStatusAction("DONE"));
    }).catch((error) => {
      dispatch(processStatusAction("FAIL"));
      // eslint-disable-next-line
      console.log(error.message);
    });
  return response;
};

export const linkPage = params => async () => {
  const dispatch = params.queryKey[1];
  dispatch(linkToAdsStatusAction("PROCESSING"));
  const response = await axios.post(LINK_PAGE_TO_ADWORDS, params.queryKey[2]).then((res) => {
    TrySuccessAction(params.queryKey[0], dispatch);
    dispatch(linkToAdsStatusAction("DONE"));
    // eslint-disable-next-line
      console.log(res)
  }).catch((error) => {
    dispatch(linkToAdsStatusAction("FAIL"));
    // eslint-disable-next-line
      console.log(error.message);
  });
  return response;
};