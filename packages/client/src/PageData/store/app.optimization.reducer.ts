import { DispatchAction, OptimizationAppState } from "src/model";
import produce from "immer";
import {
  CLEAR_OPTIMIZATION_FORM_STATE,
  SET_OPTIMIZATION_DATA_STATE,
  SET_OPTIMIZATION_FORM_STATE,
  SET_OPTIMIZATION_PAGES
} from "./optimizationEpic$";

export const initialOptimizationState: OptimizationAppState = {
  dataState: "idle",
  asyncMsgState: "",
  step: {
    formState: "idle",
    asyncMsgState: ""
  },
  pages: {
    pages_without_template: [],
    pages_with_template: [],
    optimization_id: ""
  }
};

export function optimizationReducer(
  state = initialOptimizationState,
  { type, payload }: DispatchAction<any>
): {} {
  switch (type) {
    case SET_OPTIMIZATION_DATA_STATE: {
      return produce(state, (draftState: OptimizationAppState) => {
        draftState.dataState = payload.state;
        draftState.asyncMsgState = payload.msg;
      });
    }

    case SET_OPTIMIZATION_FORM_STATE: {
      return produce(state, (draftState: OptimizationAppState) => {
        draftState.step.formState = payload.state;
        draftState.step.asyncMsgState = payload.msg;
      });
    }
    case CLEAR_OPTIMIZATION_FORM_STATE: {
      return produce(state, (draftState: OptimizationAppState) => {
        draftState.step.formState = "idle";
        draftState.step.asyncMsgState = "";
      });
    }

    case SET_OPTIMIZATION_PAGES : {
      return produce(state, (draftState: OptimizationAppState) => {
        draftState.pages = payload;
      });
    }
    default: {
      return state;
    }
  }
}
