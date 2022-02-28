import produce from "immer";
import { DispatchAction, TemplateBusiness } from "src/model";
import { SET_BUSINESS } from "./const";

export function businessReducer(
  state = {
    business: ""
  },
  action: DispatchAction<any>
): TemplateBusiness {
  const { payload, type } = action;
  switch (type) {
    case SET_BUSINESS: {
      return produce(state, (draftState: TemplateBusiness) => {
        draftState.business = payload;
      });
    }
    default: {
      return state;
    }
  }
}
