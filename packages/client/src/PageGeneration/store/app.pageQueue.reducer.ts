import produce from "immer";
import { DispatchAction, PageQueueAppState } from "src/model";
import {
  PATCH_SELECTION_QUEUE,
  RESET_QUEUE_STATE,
  SET_IS_SELECT_ALL,
  SET_LOAD_PAGES_STATE,
  SET_PAGE_QUEUE_DATA_STATE,
  SET_PAGE_QUEUE_FORM_STATE,
  SET_PAGE_QUEUE_PAGINATION,
  SET_QUEUE_ASYNC_MSG,
  SET_SELECTION_QUEUE,
  SET_TEMPLATE_QUEUE,
  SET_TEMPLATE_QUEUE_KWD,
  SET_VALUE_ON_SELECT_ALL,
  UPDATE_TEMPLATE_QUEUE_KWD
} from "./queue.epic";
import { SET_ZONE_PROPOSAL, traverseQueue } from "./rule.epic";
import {
  BATCH_DELETE_PAGE_FROM_QUEUE,
  DELETE_PAGE_FROM_QUEUE,
  SET_TEMPLATE_PAGE_STATE,
  TemplateStateActionPayload
} from "./sem.epic";
import { SET_MODAL_ACTION_STATE } from "./shared.epic";
import { DEFAULT_PAGINATION_PARAMS } from "../../api/routes/api_routes";
import { TRY_SET_PRODUCT_DATA_TO_EDIT, SET_SELECTED_PAGE, SET_KEYWORDS_BY_CATEGORY, SET_KEYWORDS_SUMMARY, SET_SELECTED_CAMPAIN, SET_SELECTED_RULE, SET_PROPOSED_PAGES, SET_RULE_CAMPAINS, SET_PRODUCTS_FILTERS, ADD_PRODUCT_SUCCESS, REMOVE_PRODUCT_SUCCESS, SET_SELECTED_KEYWORD, SET_TXT_CONTENT_BY_ZONE, SET_PROPOSED_PRODUCTS_FOR_ZONE_PRODUCTS, SET_SELECTED_LABEL, REPLACING_PRODUCT_LOADING_STATUS, SET_NEXT_SELECTED_INDEX, SET_PAGE_DETAILS, TRY_PUBLISH_PAGES_SUCESS, RESET_PUBLISH_SUCCESS_STATUS, TRY_LINK_PAGES_SUCESS, RESET_LINK_SUCCESS_STATUS, CREATE_CAMPAIGN_TEST, RESET_CREATE_SUCCESS_STATUS, APP_PROCESS_STATUS } from "./const";

function deleteQueuedPage({ ruleId, kdwId, pageId }, draftState: PageQueueAppState) {
  try {
    const [pageList] = traverseQueue(draftState.list.results, [ruleId, kdwId, pageId], "root");

    const pageIdx = pageList.findIndex(p => p.page_id === pageId);

    // update list
    pageList.splice(pageIdx, 1);

    // update matrix
    // matrix keep original page order, it's safe to reuse the same index

    // if we delete the last page, it will offset all row as  expect to have a row
    // so delete the kwd itself
    // it's the api behavior

    if(pageList.length === 0) {
      const listIdx = draftState.list.results.findIndex(el => el.id === ruleId);

      const kdwIdx = draftState.list.results[listIdx].keywords.findIndex(k => k.keyword_id === kdwId);
      // update list
      draftState.list.results[listIdx].keywords.splice(kdwIdx, 1);
      // update matrix
      draftState.formattedList[ruleId].results.splice(kdwIdx, 1);
    } else {
      draftState.formattedList[ruleId].results.splice(pageIdx, 1);
    }
    // update selected
    // if selected zone matches the related page to delete, reset it
    if(draftState.selectedKeywords[kdwId].selectedPage === pageId) {
      draftState.selectedKeywords[kdwId].selectedPage = "";
      draftState.selectedKeywords[kdwId].isSelected = false;
    }
  } catch (e) {
    // eslint-disable-next-line
    console.error(e.concat(" . while trying to delete with respective rule id, page id  and kwd id", ruleId, " and ", pageId, "and ", kdwId));
  }
}

export const INIT_PROPOSAL = {
  list: {
    results: [],
    count: 0,
    next: null,
    previous: null
  }

};

export const initialPageQueueState: PageQueueAppState = {
  formState: "idle",
  dataState: "idle",
  asyncMsgState: "",
  list: {
    count: 0,
    results: [],
    previous: null,
    next: null
  },
  selectedKeywords: {},
  isSelectAll: false,
  asyncPageState: {},
  loadPages: "idle",
  formattedList: {},
  deleteActionState: {
    state: "idle",
    action: null,
    msg: ""
  },
  proposals: INIT_PROPOSAL,
  queryStr: "",
  queryState: DEFAULT_PAGINATION_PARAMS,
  selectedRule: null,
  ruleCampains: null,
  selectedCampain: null,
  selectedKwd: null,
  selectedLabel: null,
  selectedCategory: null,
  kwdsSummary: null,
  kwdsByCategories: null,
  proposedPages: null,
  productFilters: null,
  successMessage: {hasSuccess: false, msg: ""},
  currentTextZone: {text_value: ""},
  selectedPage: null,
  currentEmail: "",
  proposedProducts: null
};

export function pageQueueReducer(
  state = initialPageQueueState,
  action: DispatchAction<any>
): PageQueueAppState {
  const { payload, type } = action;
  switch (type) {
    case SET_PAGE_QUEUE_DATA_STATE: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.dataState = payload.state;
        draftState.asyncMsgState = payload.msg;
      });
    }

    case SET_PAGE_QUEUE_FORM_STATE: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.formState = payload.state;
        draftState.asyncMsgState = payload.msg;
      });
    }

    /*
  * template queue
  */

    case SET_TEMPLATE_QUEUE: {
      return produce(state, (draftState: PageQueueAppState) => {
        const [list, selectablePages] = payload;
        draftState.list = list;
        draftState.selectedKeywords = selectablePages;
      });
    }

    case PATCH_SELECTION_QUEUE: {
      return produce(state, (draftState: PageQueueAppState) => {
        const { key, value } = payload;
        const currentSelection = state.selectedKeywords[key];
        draftState.selectedKeywords[key] = { ...currentSelection, ...value };
      });
    }

    case SET_SELECTION_QUEUE: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.selectedKeywords = payload;
      });
    }

    case RESET_QUEUE_STATE: {
      return produce(state, (draftState: PageQueueAppState) => {
        for(const prop in draftState.selectedKeywords) {
          draftState.selectedKeywords[prop].isSelected = false;
        }

        draftState.isSelectAll = false;
        // reset form state of all selection
        for(const key in draftState.asyncPageState) {
          draftState.asyncPageState[key] = { state: "idle", msg: "" };
        }
      });
    }

    case SET_QUEUE_ASYNC_MSG: {
      return produce(state, (draftState: PageQueueAppState) => {
        const { keys, msg, state } = payload;
        for(const item of keys) {
          draftState.asyncPageState[item.page_id] = {
            state,
            msg
          };
        }
      });
    }

    case DELETE_PAGE_FROM_QUEUE: {
      return produce(state, (draftState: PageQueueAppState) => {
        deleteQueuedPage(payload, draftState);
      });
    }

    case BATCH_DELETE_PAGE_FROM_QUEUE: {
      return produce(state, (draftState: PageQueueAppState) => {
        payload.forEach((path) => {
          deleteQueuedPage(path, draftState);
        });
      });
    }

    case SET_LOAD_PAGES_STATE: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.loadPages = payload;
      });
    }
    case SET_IS_SELECT_ALL: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.isSelectAll = payload;
      });
    }
    case SET_VALUE_ON_SELECT_ALL: {
      return produce(state, (draftState: PageQueueAppState) => {
        for(const prop in draftState.selectedKeywords) {
          draftState.selectedKeywords[prop].isSelected = payload;
        }
        draftState.isSelectAll = payload;
      });
    }

    case SET_TEMPLATE_QUEUE_KWD: {
      return produce(state, (draftState: PageQueueAppState) => {
        const [id, kwds, select, zoneMatrix, pagination] = payload;
        const page = draftState.list.results.find(el => el.id === id);
        if(page) {
          page.keywords = kwds;
          draftState.selectedKeywords = {
            ...state.selectedKeywords,
            ...select

          };
        }
        draftState.formattedList[id] = pagination;
        draftState.formattedList[id].results = zoneMatrix;

        draftState.loadPages = "idle";
      });
    }

    case UPDATE_TEMPLATE_QUEUE_KWD: {
      return produce(state, (draftState: PageQueueAppState) => {
        const [id, kwds, zoneMatrix] = payload;
        const page = draftState.list.results.find(el => el.id === id);
        if(page) {
          page.keywords = kwds;
        }
        draftState.formattedList[id].results = zoneMatrix;
      });
    }

    case SET_MODAL_ACTION_STATE: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.deleteActionState = payload;
      });
    }

    case SET_TEMPLATE_PAGE_STATE: {
      return produce(state, (draftState: PageQueueAppState) => {
        const {
          value,
          path
        } = payload as TemplateStateActionPayload;

        try {
          for(const p of path) {
            const { ruleId, kwdId, pageId, prop } = p;
            const [pageList] = traverseQueue(draftState.list.results, [ruleId, kwdId, pageId], "root");
            const page = pageList.find(p => p.page_id === pageId);

            (page!)[prop] = value;
          }
        } catch (e) {
        // eslint-disable-next-line
        console.warn("failed to batch âge update with key", path, " with ", e);
        }
      });
    }

    case SET_PAGE_QUEUE_PAGINATION: {
      return produce(state, (draftState: PageQueueAppState) => {
        const { qStr, qState } = payload;
        draftState.queryStr = qStr;
        draftState.queryState = { ...draftState.queryState, qState};
      });
    }

    // proposals

    case SET_ZONE_PROPOSAL: {
      return produce(state, (draftState: PageQueueAppState) => {
        const { data, userSelection } = payload;
        draftState.proposals.list = data;

        if(userSelection) {
          draftState.proposals.list.results.unshift(userSelection);
        }
      });
    }

    // selected rule

    case SET_SELECTED_RULE : {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.selectedRule = {...payload};
      });
    }

    case SET_SELECTED_CAMPAIN : {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.selectedCampain = {...payload};
      });
    }

    case SET_KEYWORDS_SUMMARY : {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.kwdsSummary = [...payload];
      });
    }

    case SET_KEYWORDS_BY_CATEGORY : {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.kwdsByCategories = payload;
      });
    }

    case SET_PROPOSED_PAGES : {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.proposedPages = [...payload];
      });
    }

    case SET_RULE_CAMPAINS : {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.ruleCampains = payload.results;
      });
    }

    case SET_PRODUCTS_FILTERS : {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.productFilters = payload;
      });
    }

    case SET_PROPOSED_PRODUCTS_FOR_ZONE_PRODUCTS: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.proposedProducts = {...payload};
      });
    }
    case SET_PAGE_DETAILS: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.pageDetails = payload;
      });
    }

    case ADD_PRODUCT_SUCCESS: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.successAdd = {msg: payload, hasSuccess: true};
      });
    }
    case REMOVE_PRODUCT_SUCCESS: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.successRemove = {msg: payload, hasSuccess: true};
      });
    }
    case SET_TXT_CONTENT_BY_ZONE: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.currentTextZone = payload;
      });
    }

    case SET_SELECTED_KEYWORD: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.selectedKwd = payload;
      });
    }
    case SET_NEXT_SELECTED_INDEX: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.nextSelectedIndex = payload;
      });
    }
    case SET_SELECTED_LABEL: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.selectedLabel = payload;
      });
    }
    case SET_SELECTED_PAGE: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.selectedPage = payload;
      });
    }
    case APP_PROCESS_STATUS: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.processStatus = payload;
      });
    }
    case TRY_SET_PRODUCT_DATA_TO_EDIT: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.productToEdit = payload;
      });
    }

    case REPLACING_PRODUCT_LOADING_STATUS: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.replacingProductSatus = payload;
      });
    }

    case TRY_PUBLISH_PAGES_SUCESS: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.publishSuccess = true;
      });
    }

    case RESET_PUBLISH_SUCCESS_STATUS: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.publishSuccess = false;
      });
    }
    case RESET_LINK_SUCCESS_STATUS: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.linkSuccess = false;
      });
    }
    case TRY_LINK_PAGES_SUCESS: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.linkSuccess = true;
      });
    }
    case CREATE_CAMPAIGN_TEST: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.createSuccess = true;
      });
    }
    case RESET_CREATE_SUCCESS_STATUS: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.createSuccess = false;
      });
    }
    default: {
      return state;
    }
  }
}
