export interface UserResponse {
    access_token: string;
    access_token_type: string;
    username: string;
    expires: string;
    user_id: number;
}

export interface EnvVariablesResponse {
    NODE_ENV: string;
    PUBLIC_URL: string;
    REACT_APP_API_URI: string;
    REACT_APP_NAISTER_API_URI: string;
}

export interface BaseUser {
    email: string;
    first_name: string;
    last_name: string;
    username: string;
}

export interface UserApi extends BaseUser {
    id: number;
    mobile_phone: string;
    office_phone: string;
}

export interface CreateUser extends BaseUser {
    business: number;
    emailConfirm: string;
    password: string;
    passwordConfirm: string;
}

export interface Business {
    id: number;
    name: string;
}

export const INIT_ADD_USER = {
  email: null,
  first_name: null,
  last_name: null,
  username: null,
  business: null,
  emailConfirm: null,
  password: null,
  passwordConfirm: null
};

// INITIAL VALUES
export const INIT_USER_RESPONSE: UserResponse = {
  access_token: "",
  access_token_type: "",
  user_id: null,
  username: "",
  is_admin: false,
  business_id: 0,
  expires: ""
};
