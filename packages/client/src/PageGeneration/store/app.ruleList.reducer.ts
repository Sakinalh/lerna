import produce from "immer";
import {
  DispatchAction,
  PageQueueAppState,
  RuleListAppState
} from "../../model";
import { TemplateListItemNormalizedApi } from "../model";

import {
  DELETE_RULE_DETAIL_FROM_TEMPLATE_LIST,
  SET_RULE_LIST_DATA_STATE_SET
} from "./rule.epic";
import { SET_RULE_LIST_PAGINATION, SET_TEMPLATE_LIST } from "./template.epic";
import { DEFAULT_PAGINATION_DATE_SORT } from "../../api/routes/api_routes";

export const INIT_TEMPLATE_ITEM: TemplateListItemNormalizedApi = {
  id: 0,
  cached_temp_rule_id: "",
  name: "",
  rules: [],
  zones: [],
  html: "",
  creation_date: "",
  modification_date: "",
  url: ""
};

export const initialRuleListState: RuleListAppState = {
  dataState: "idle",
  asyncMsgState: "",
  count: 0,
  queryStr: "",
  queryState: DEFAULT_PAGINATION_DATE_SORT,
  results: [],
  previous: null,
  next: null
};

export function ruleListReducer(
  state = initialRuleListState,
  action: DispatchAction<any>
): RuleListAppState {
  const { payload, type } = action;
  switch (type) {
    case SET_RULE_LIST_DATA_STATE_SET: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.dataState = payload.state;
        draftState.asyncMsgState = payload.msg;
      });
    }

    /*
     * template list
     */
    case SET_TEMPLATE_LIST: {
      return produce(state, (draftState: RuleListAppState) => {
        const { count, next, previous, results } = payload;
        draftState.count = count;
        draftState.next = next;
        draftState.previous = previous;
        draftState.results = results;
      });
    }

    case DELETE_RULE_DETAIL_FROM_TEMPLATE_LIST: {
      return produce(state, (draftState: RuleListAppState) => {
        const { templateId, ruleId } = payload;
        const template = draftState.results.find(l => l.id === templateId);
        if(template) {
          const delIndex = template.rules.findIndex(
            el => el.rule_id === ruleId
          );
          if(delIndex !== undefined) {
            template.rules.splice(delIndex, 1);
          } else {
            // eslint-disable-next-line
            console.warn(ruleId, " rule could not be deleted");
          }
        } else {
          // eslint-disable-next-line
          console.warn(templateId, " template could not be found");
        }
      });
    }

    case SET_RULE_LIST_PAGINATION: {
      return produce(state, (draftState: RuleListAppState) => {
        const { qStr, qState } = payload;
        draftState.queryStr = qStr;
        draftState.queryState = qState;
      });
    }
    default: {
      return state;
    }
  }
}
