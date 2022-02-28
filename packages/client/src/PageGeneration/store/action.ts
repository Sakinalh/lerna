import {
  UPDATE_DATA_TEXT_AREA,
  SET_DATA_TEXT_AREA,
  SET_SUCESS_DATA_TEXT_AREA,
  RESET_DATA_TEXT_AREA,
  APP_SUCCESS_MESSAGE
} from "./const";

export function updateDataTextAreaAction(payload: {
  page_id : string,
  keyword_id : string | number,
  update: {
    content_id : string,
    type: string,
    value: string,
    score: string | number,
    zone_id: string
  }

}) {
  return {
    type: UPDATE_DATA_TEXT_AREA,
    payload: payload
  };
}

export function setDataTextAreaAction(payload: { msg: string }) {
  return {
    type: SET_DATA_TEXT_AREA,
    payload
  };
}

export function setSuccesDataTextAreaAction(payload) {
  return {
    type: APP_SUCCESS_MESSAGE,
    payload
  };
}