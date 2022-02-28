import produce from "immer";
import { AnalyticsQueryAppState, DispatchAction } from "../../model";
import {
  CLEAR_QUERY_SHARED_STATE,
  SET_ANALYTICS_QUERY,
  SET_QUERY_DATA_STATE,
  SET_QUERY_FORM_STATE,
  SET_QUEUE_LIST_PAGINATION
} from "./queryEpic$";
import { DEFAULT_PAGINATION_PARAMS } from "../../api/routes/api_routes";

export const initialAnalyticsQueryState: AnalyticsQueryAppState = {
  formState: "idle",
  dataState: "idle",
  asyncMsgState: "",
  list: {
    count: 0,
    previous: null,
    next: null,
    results: [
      {
        search_name: "",
        search_id: "0",
        date: ""
      },
      {
        search_name: "",
        search_id: "1",
        date: ""
      },
      {
        search_name: "",
        search_id: "2",
        date: ""
      },
      {
        search_name: "",
        search_id: "3",
        date: ""
      }
    ]
  },
  detail: {
    search_name: "",
    keyword_IDS: []
  },
  queryStr: "",
  queryState: DEFAULT_PAGINATION_PARAMS
};

export function analyticsQueryReducer(
  state = initialAnalyticsQueryState,
  action: DispatchAction<any>
): AnalyticsQueryAppState {
  const { type, payload } = action;
  switch (type) {
    case SET_QUERY_FORM_STATE: {
      return produce(state, (draftState: AnalyticsQueryAppState) => {
        draftState.formState = payload;
      });
    }

    case SET_QUERY_DATA_STATE: {
      return produce(state, (draftState: AnalyticsQueryAppState) => {
        draftState.dataState = payload.state;
        draftState.asyncMsgState = payload.msg;
      });
    }

    case CLEAR_QUERY_SHARED_STATE: {
      return produce(state, (draftState: AnalyticsQueryAppState) => {
        draftState.formState = "idle";
        draftState.dataState = "idle";
        draftState.asyncMsgState = "msg";
      });
    }

    case SET_ANALYTICS_QUERY: {
      return produce(state, (draftState: AnalyticsQueryAppState) => {
        draftState.list = payload;
        draftState.dataState = "complete";
      });
    }

    case SET_QUEUE_LIST_PAGINATION: {
      return produce(state, (draftState: AnalyticsQueryAppState) => {
        const { qStr, qState } = payload;
        draftState.queryStr = qStr;
        draftState.queryState = qState;
      });
    }
  }

  return state;
}
