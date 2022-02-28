import { AnalyticsAppState, DispatchAction } from "src/model";
import produce from "immer";
import {SET_ANALTICS_TRUNCATE } from "./const";

export const initialAnalyticsState: AnalyticsAppState = {
  dataState: "idle",
  asyncMsgState: "",
  truncate: true
};

export function analyticsReducer(
  state = initialAnalyticsState,
  action: DispatchAction<any>
): AnalyticsAppState {
  const { type, payload } = action;
  switch (type) {
    case SET_ANALTICS_TRUNCATE: {
      return produce(state, (draftState: AnalyticsAppState) => {
        draftState.truncate = payload;
      });
    }

    default: {
      return state;
    }
  }
}
