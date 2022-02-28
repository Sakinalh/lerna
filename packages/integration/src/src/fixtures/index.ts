import { StateObservableGeneric } from "src/redux/store/store.utils";
import { initialSetupState } from "src/PageSetupApp/store/setupApp.reducers";
import { AppState, INIT_PAGE_QUERY, StoreState } from "src/model/store";

export interface UserResponse {
    access_token: string;
    access_token_type: string;
    user_id: number;
    username: string;
    is_admin: boolean | null
    business_id: number | null;
    expires: string;
}

export const MOCK_APP_USER: UserResponse = {
  access_token_type: "mock_type",
  access_token: "mock_token",
  user_id: 0,
  username: "mockName",
  is_admin: false,
  business_id: 0,
  expires: new Date().toUTCString()

};
export const MOCK_APP_USER_TOKEN_EXPIRED = {
  ...MOCK_APP_USER,
  pageQuery: INIT_PAGE_QUERY,
  expires: new Date(new Date().getTime() - 8640000).toUTCString()
};

// token expires in 3 minutes
export const MOCK_APP_USER_TOKEN_TO_REFRESH = {
  ...MOCK_APP_USER,
  expires: new Date(new Date().getTime() + 1000 * 240).toUTCString()
};

// token expires in 55 minutes

export const MOCK_APP_USER_FRESH_TOKEN = {
  ...MOCK_APP_USER,
  expires: new Date(new Date().getTime() + 1000 * 2100).toUTCString()
};

export const UPDATED_APP_USER = {
  ...MOCK_APP_USER,
  username: "update"
};

export const UPDATED_TOKEN_USER = {
  ...MOCK_APP_USER,
  access_token: "update"
};

export const MOCK_APP_STATE: AppState = {
  theme: "dark",
  userDetail: null,
  user: MOCK_APP_USER,
  error: {
    hasError: false,
    msg: ""
  },
  pageQuery: INIT_PAGE_QUERY
};

export const MOCK_APP_STATE_FRESH: AppState = {
  theme: "dark",
  userDetail: null,
  user: MOCK_APP_USER_FRESH_TOKEN,
  error: {
    hasError: false,
    msg: ""
  },
  pageQuery: INIT_PAGE_QUERY
};

export const MOCK_APP_STATE_TOKEN_TO_REFRESH: AppState = {
  theme: "dark",
  userDetail: null,
  user: MOCK_APP_USER_TOKEN_TO_REFRESH,
  error: {
    hasError: false,
    msg: ""
  },
  pageQuery: INIT_PAGE_QUERY
};
export const MOCK_APP_STATE_TOKEN_EXPIRED: AppState = {
  theme: "dark",
  userDetail: null,
  user: MOCK_APP_USER_TOKEN_EXPIRED,
  error: {
    hasError: false,
    msg: ""
  },
  pageQuery: INIT_PAGE_QUERY
};

export const MOCK_CLEARED_APP_STATE = {
  theme: "light",
  user: {
    access_token: "",
    access_token_type: "",
    business_id: 0,
    expires: "",
    is_admin: false,
    user_id: 0,
    username: ""
  },
  userDetail: null,
  pageQuery: INIT_PAGE_QUERY
};
/* const INIT_GENERATION={
    form:{},
    formState:"idle"
}; */

export const MOCK_STORE_STATE: any = {
  app: MOCK_APP_STATE,
  setupApp: initialSetupState,
  pageQuery: INIT_PAGE_QUERY

};
export const MOCK_STORE_STATE_FRESH: any = {
  app: MOCK_APP_STATE_FRESH,
  setupApp: initialSetupState,
  pageQuery: INIT_PAGE_QUERY
};

export const MOCK_STORE_STATE_TOKEN_TO_REFRESH: any = {
  app: MOCK_APP_STATE_TOKEN_TO_REFRESH,
  pageQuery: INIT_PAGE_QUERY

};

export const OBS_MOCK_APP_STATE: StateObservableGeneric<StoreState> = {
  value: MOCK_STORE_STATE
};
export const MOCK_AUTH: string = "Authorisation : Bearer Mock";
export const MOCK_ENDPOINT: string = "mock_endpoint";

export interface BaseInputState<T> {
    valid: boolean;
    value: T;
    touched: boolean;
    validationType?: Array<any>;
    errorDisplay: string | null;
}

export const BASE_INPUT_STATE: BaseInputState<string | null> = {
  valid: false,
  value: "",
  touched: false,
  validationType: [],
  errorDisplay: null
};
export const BASE_MOCK_FORM_CONTROL = {
  loginInput: BASE_INPUT_STATE,
  pwdInput: BASE_INPUT_STATE
};

export const MOCK_LOGIN_INPUT_STATE = {
  ...BASE_INPUT_STATE,
  validationType: ["required", "isEmail"]
};

export const MOCK_PWD_INPUT_STATE = {
  ...BASE_INPUT_STATE,
  validationType: ["required", "minLength"]
};

export const MOCK_INPUT_REF_STATE = {
  state: null,
  setter: function dispatchAction() {
  },
  validations: []
};

export const BASE_FORM_STATE = {
  loginInput: MOCK_LOGIN_INPUT_STATE,
  pwdInput: MOCK_PWD_INPUT_STATE,
  isFormValid: false,
  inputsRef: {
    loginInput: {
      ...MOCK_INPUT_REF_STATE,
      state: MOCK_LOGIN_INPUT_STATE,
      validations: ["required", "isEmail"]
    },
    pwdInput: {
      ...MOCK_INPUT_REF_STATE,
      state: MOCK_PWD_INPUT_STATE,
      validations: ["required", "minLength"]
    }
  },
  updateFormState: function updateFormState() {
  }
};
export const MOCK_INVALID_PAGE_QUERY = {
  ...INIT_PAGE_QUERY,
  page: {}
};
export const MOCK_UPDATED_PAGE_QUERY = {
  ...INIT_PAGE_QUERY,
  template: {
    required: {
      limit: "50",
      offset: "0",
      sort_order: "",
      sort_criteria: "",
      start_date: "a",
      end_date: "z"
    },
    option: {}
  }
};
