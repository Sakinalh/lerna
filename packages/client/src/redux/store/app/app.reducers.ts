import { AppState, DispatchAction, INIT_PAGE_QUERY, PROCESS_STATUS, QueuePageState } from "src/model";
import produce from "immer";
import { APP_PROCESS_STATUS, APP_SUCCESS_MESSAGE, CREATE_TEST_STATUS, LINK_TO_ADS_STATUS, TRY_LINK_PAGES_SUCESS, TRY_POST_LINK_PAGE_TO_ADWORDS_SUCESS } from "src/PageGeneration/store/const";
import {
  CLEAR_TOKEN,
  DISMISS_ERROR,
  ERROR_STATE,
  REFRESH_TOKEN,
  SET_PAGE_QUERY,
  SET_USER,
  SET_USER_DETAIL,
  SUCCESS_MESSAGE,
  TOGGLE_THEME,
  IS_LOADING
} from "./app.actions";
import { INIT_USER_RESPONSE } from "../../../model/user";
import { SET_ENV_VARIABLES } from "../../../PageGeneration/store/const";

export const initialAppState: AppState = {
  theme: "light",
  user: INIT_USER_RESPONSE,
  userDetail: null,
  error: null,
  pageQuery: INIT_PAGE_QUERY
};

export function AppReducer(
  state = initialAppState,
  action: DispatchAction<any>

): AppState {
  const { payload } = action;
  switch (action.type) {
    case TOGGLE_THEME: {
      return produce(state, (draftState: AppState) => {
        draftState.theme = payload;
      });
    }
    case SET_USER:
    case REFRESH_TOKEN: {
      return produce(state, (draftState: AppState) => {
        draftState.user = payload;
      });
    }

    case SET_USER_DETAIL: {
      return produce(state, (draftState: AppState) => {
        if(typeof (payload) === "string") {
          draftState.userDetail = {
            email: payload
          };
        }
      });
    }
    case ERROR_STATE: {
      return produce(state, (draftState: AppState) => {
        draftState.error = payload;
      });
    }

    case APP_SUCCESS_MESSAGE: {
      return produce(state, (draftState: AppState) => {
        draftState.success = payload;
      });
    }

    case DISMISS_ERROR: {
      return produce(state, (draftState: AppState) => {
        draftState.error = payload;
      });
    }

    case CLEAR_TOKEN: {
      return produce(state, () => initialAppState);
    }

    case SET_PAGE_QUERY: {
      return produce(state, (draftState: AppState) => {
        draftState.pageQuery = payload;
      });
    }

    case IS_LOADING: {
      return produce(state, (draftState: AppState) => {
        draftState.isLoading = payload;
      });
    }

    case APP_PROCESS_STATUS: {
      return produce(state, (draftState: QueuePageState) => {
        draftState.processStatus = payload;
      });
    }
    case LINK_TO_ADS_STATUS: {
      return produce(state, (draftState: AppState) => {
        draftState.linkToAdsStatus = payload;
      });
    }
    case CREATE_TEST_STATUS: {
      return produce(state, (draftState: AppState) => {
        draftState.createTestStatus = payload;
      });
    }
    default: {
      return state;
    }
  }
}
