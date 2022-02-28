import { DataMachineState, DispatchAction, SetupAppState } from "src/model/store";
import produce from "immer";
import {
  CLEAR_FILE_CACHE,
  PATCH_PROJECT,
  RESET_DATA_MACHINE_STATE,
  RESET_SETUP,
  SET_DATA_MACHINE_STATE,
  SET_FILE_CACHE,
  SET_SETUP_STEP,
  SETUP_COMPLETED,
  SETUP_FSM
} from "./setupApp";
import { ContentUploadType } from "../model";

const INIT_DATA_FSM: Record<ContentUploadType, DataMachineState> = {
  adt_loc_file: "idle",
  kwd_loc_file: "idle",
  imgb_loc_file: "idle",
  prod_loc_file: "idle"
};

const INIT_FILE_LOC_CACHE: Record<ContentUploadType, null> = {
  adt_loc_file: null,
  kwd_loc_file: null,
  imgb_loc_file: null,
  prod_loc_file: null
};

export const initialSetupState: SetupAppState = {
  currentStep: "url",
  project: {
    project_name: "",
    customer_id: "",
    adt_loc_file: null,
    kwd_loc_file: null,
    imgb_loc_file: null,
    prod_loc_file: null,
    website: ""
  },
  uploadFSM: INIT_DATA_FSM,
  fileLocCache: INIT_FILE_LOC_CACHE,
  setupFsm: "idle",
  isDone: false
};

export function SetupAppReducer(
  state = initialSetupState,
  action: DispatchAction<any>
): SetupAppState {
  const { payload } = action;
  switch (action.type) {
    case SET_SETUP_STEP: {
      return produce(state, (draftState: SetupAppState) => {
        draftState.currentStep = payload;
      });
    }

    case PATCH_PROJECT: {
      return produce(state, (draftState: SetupAppState) => {
        const [[prop, value]] = Object.entries(payload);
        draftState.project[prop as any] = value;
      });
    }

    case SET_FILE_CACHE: {
      return produce(state, (draftState: SetupAppState) => {
        const [[prop, value]] = Object.entries(payload);
        draftState.fileLocCache[prop as any] = value;
      });
    }

    case CLEAR_FILE_CACHE: {
      return produce(state, (draftState: SetupAppState) => {
        draftState.fileLocCache = INIT_FILE_LOC_CACHE;
      });
    }

    case SET_DATA_MACHINE_STATE: {
      return produce(state, (draftState: SetupAppState) => {
        const [[prop, value]] = Object.entries(payload);
        draftState.uploadFSM[prop] = value;
      });
    }
    case RESET_DATA_MACHINE_STATE: {
      return produce(state, (draftState: SetupAppState) => {
        draftState.uploadFSM = INIT_DATA_FSM;
      });
    }

    case SETUP_FSM: {
      return produce(state, (draftState: SetupAppState) => {
        draftState.setupFsm = payload;
      });
    }

    case SETUP_COMPLETED: {
      return produce(state, (draftState: SetupAppState) => {
        draftState.isDone = true;
      });
    }
    case RESET_SETUP: {
      return produce(state, (draftState: SetupAppState) => initialSetupState);
    }
    default: {
      return state;
    }
  }
}
