import { ValidationKey } from "src/shared/form";

export type Value = string | number | boolean | any[] | Object;

export interface BaseInputState<T> {
    valid: boolean;
    value: T;
    touched: boolean;
    validationType?: Array<any>;
    errorDisplay: string | null;
}

// https://github.com/Microsoft/TypeScript/issues/24220

export interface FormUpdatePayload {
    name: string;
    value: any;
    validationType: Array<string>;
}

export interface FormsControlsRef {
    [key: string]: FormsControlState<string | number>;
}

export interface InputState<T> {
    value: T;
    valid: any;
    touched: boolean;
    validationType?: Array<ValidationKey>;
    errorDisplay: string | null;
}

export interface FormsControlState<T> {
    state: InputState<T>;
    setter: Function;
    validations: Array<ValidationKey>;
}

export interface ValidateState {
    value: boolean;
    message: string | null;
}

export type LoginType = "signin" | "signup";

export interface AuthPayload<T extends string | null> {
    email: T;
    password: T;
}

export type SigninControlsKeys = "loginInput" | "pwdInput";
export type SignupControlsKeys = "loginInput" | "pwdInput" | "confirmInput";
export type SignupFormControls = {
    [key in SignupControlsKeys]: BaseInputState<string | null>;
};
export type SigninFormControls = {
    [key in SigninControlsKeys]: BaseInputState<string | null>;
};

export type FormControls = SignupFormControls | SigninFormControls;

export type ErrorMessagesMap = { [key in ValidationKey]: string };
export type FormState = "idle" | "valid" | "invalid" | "pending" | "success" | "error" | "canceled";
