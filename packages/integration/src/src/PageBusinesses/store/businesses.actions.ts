import { SET_BUSINESS } from "./const";

export function setBusiness(payload: any) {
  return ({
    type: SET_BUSINESS,
    payload
  });
}