import produce from "immer";
import { DispatchAction, PageGeneratedAppState } from "src/model";
import {
  SET_DATA_TEXT_AREA,
  SET_SUCESS_DATA_TEXT_AREA,
  RESET_DATA_TEXT_AREA
} from "./const";

import {
  PATCH_SELECT_GENERATED_PAGE,
  SET_GENERATED_DATA_STATE,
  SET_GENERATED_LIST,
  SET_GENERATED_LIST_PAGINATION
} from "./generated.epic";
import { DEFAULT_PAGINATION_DATE_SORT } from "../../api/routes/api_routes";

const INIT_GENERATED_PAGE = {
  page_name: "",
  page_id: "",
  keywords: []
};
export const initialPageGeneratedState: PageGeneratedAppState = {
  dataState: "idle",
  asyncMsgState: "",
  list: {
    count: 0,
    results: [
      INIT_GENERATED_PAGE,
      INIT_GENERATED_PAGE,
      INIT_GENERATED_PAGE,
      INIT_GENERATED_PAGE,
      INIT_GENERATED_PAGE
    ],
    previous: null,
    next: null
  },
  selectedKwd: {},
  queryStr: "",
  queryState: DEFAULT_PAGINATION_DATE_SORT
};

export function pageGeneratedReducer(
  state = initialPageGeneratedState,
  action: DispatchAction<any>
): PageGeneratedAppState {
  const { payload, type } = action;
  switch (type) {
    case SET_GENERATED_DATA_STATE: {
      return produce(state, (draftState: PageGeneratedAppState) => {
        draftState.dataState = payload.state;
        draftState.asyncMsgState = payload.msg;
      });
    }

    /*
     * generated list
     */
    case SET_GENERATED_LIST: {
      const { data, selection } = payload;
      return produce(state, (draftState: PageGeneratedAppState) => {
        draftState.list = data;
        draftState.selectedKwd = selection;
      });
    }
    case PATCH_SELECT_GENERATED_PAGE: {
      const { key, next } = payload;
      return produce(state, (draftState: PageGeneratedAppState) => {
        draftState.selectedKwd[key] = next;
      });
    }
    case SET_GENERATED_LIST_PAGINATION: {
      return produce(state, (draftState: PageGeneratedAppState) => {
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
