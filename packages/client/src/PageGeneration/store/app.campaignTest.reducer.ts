import produce from "immer";
import { CREATE_CAMPAIGN } from "src/api/routes/api_routes";
import { DispatchAction, CampaignTestState } from "src/model";
import {
  SET_CAMPAIGN_TEST_BY_KEYWORD,
  CREATE_CAMPAIGN_TEST,
  RESET_CAMPAIGN_TEST_BY_KEYWORD
} from "./const";

import {

} from "./sem.epic";

export const initialCampaignTestState: CampaignTestState = {
  dataState: "idle",
  asyncMsgState: "",
  campaignTest: null,
  adLink: null
};

export function campaignTestReducer(
  state = initialCampaignTestState,
  action: DispatchAction<any>
): CampaignTestState {
  const { payload, type } = action;
  switch (type) {
    case SET_CAMPAIGN_TEST_BY_KEYWORD: {
      return produce(state, (draftState: CampaignTestState) => {
        draftState.campaignTest = payload;
        draftState.adLink = null;
        draftState.asyncMsgState = "message sucess check campaign test";
      });
    }
    case RESET_CAMPAIGN_TEST_BY_KEYWORD: {
      return produce(state, (draftState: CampaignTestState) => {
        draftState.campaignTest = null;
        draftState.adLink = null;
        draftState.asyncMsgState = "message reset campaign test";
      });
    }
    case CREATE_CAMPAIGN_TEST: {
      return produce(state, (draftState: CampaignTestState) => {
        draftState.adLink = payload;
        draftState.asyncMsgState = "message sucess CREATE_CAMPAIGN_TEST";
      });
    }

    default: {
      return state;
    }
  }
}
