import { AjaxRequest } from "rxjs/ajax";
import { DispatchAction, ListLoadState } from "src/model";
import { APP_PROCESS_STATUS, APP_SUCCESS_MESSAGE, CREATE_TEST_STATUS, LINK_TO_ADS_STATUS } from "src/PageGeneration/store/const";
import { UserResponse } from "../../../model/user";

/* READ ME */
// subtle difference between clearAllAction and clearTokenEpic$
// clear is basically logout. The user has a valid token, call the api to revoke it then cache is cleared/redirect to login
// in all other cases,
// clearAllAction The user has a invalid token or doesn't have ani, cache is cleared/redirect to login
// there's no token to invalid

export const TRY_REFRESH_TOKEN = "TRY_REFRESH_TOKEN";
export const TRY_CLEAR_TOKEN = "TRY_CLEAR_TOKEN";
export const SET_PAGE_QUERY = "SET_PAGE_QUERY";
export const SUCCESS_MESSAGE = "SUCCESS_MESSAGE";
export const IS_LOADING = "IS_LOADING";

// action creators
export const TOGGLE_THEME = "TOGGLE_THEME";

export function setAppThemeAction(payload) {
  return { type: TOGGLE_THEME, payload };
}

export const SET_USER = "SET_USER";

export function setAppUserAction(payload: UserResponse) {
  return { type: SET_USER, payload };
}

// token

export const REFRESH_TOKEN = "REFRESH_TOKEN";

export function refreshUserTokenAction(payload: UserResponse) {
  return { type: REFRESH_TOKEN, payload };
}

export function tryClearUserTokenAction(payload: Partial<UserResponse>) {
  return { type: TRY_CLEAR_TOKEN, payload };
}

export const CLEAR_TOKEN = "CLEAR_TOKEN";

export function clearUserTokenAction() {
  return { type: CLEAR_TOKEN, payload: null };
}

// user
export const TRY_USER_DETAIL = "TRY_USER_DETAIL";

export function trySetUserDetailAction() {
  return { type: TRY_USER_DETAIL, payload: null };
}

export const SET_USER_DETAIL = "SET_USER_DETAIL";

export function setUserDetailAction(payload) {
  return { type: SET_USER_DETAIL, payload };
}

// error
export const ERROR_STATE = "ERROR_STATE";

// success
export const APP_MSG_STATE = "APP_MSG_STATE";

export function setAppErrorStateAction(payload) {
  return { type: ERROR_STATE, payload };
}

export const DISMISS_ERROR = "DISMISS_ERROR";

export function clearAppErrorStateAction() {
  return { type: DISMISS_ERROR, payload: null };
}

export function clearAppSuccessMessageAction() {
  return { type: APP_SUCCESS_MESSAGE, payload: null };
}

export function processStatusAction(status : string) {
  return {
    type: APP_PROCESS_STATUS,
    payload: status
  };
}

export function linkToAdsStatusAction(status : string) {
  return {
    type: LINK_TO_ADS_STATUS,
    payload: status
  };
}
export function createTestStatusAction(status : string) {
  return {
    type: CREATE_TEST_STATUS,
    payload: status
  };
}
/*
 *  Clear all will not try to revoke token .
 *  It will clear the local storage and redirect to login
 * */

export const CLEAR_ALL = "CLEAR_ALL";

export function clearAllAction() {
  return { type: CLEAR_ALL };
}

export function isClearedAction() {
  return { type: "IS_CLEARED" };
}

export interface ResumeActionPayloadPayload {
  ajaxRequest: AjaxRequest;
  action: (payload) => DispatchAction<any>;
}

export const TRY_RESUME_ACTION = "TRY_RESUME_ACTION";

export function resumeAction(payload: ResumeActionPayloadPayload) {
  return {
    type: TRY_RESUME_ACTION,
    payload
  };
}

export const RESUME_ACTION = "RESUME_ACTION";

export function resumedAction(payload: any) {
  return {
    type: RESUME_ACTION,
    payload
  };
}

export interface ResumeActionPayload {
  ajaxRequest: AjaxRequest;
  action: (payload) => DispatchAction<any>;
}

//
export const SET_DATA_STATE_SET = "SET_DATA_STATE_SET";

export function setDataStateAction(state: ListLoadState, msg: string = "") {
  return {
    type: SET_DATA_STATE_SET,
    payload: {
      state,
      msg
    }
  };
}