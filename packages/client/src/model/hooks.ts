import { Dispatch, SetStateAction } from "react";

import {
  AuthPayload, BaseInputState, FormsControlsRef, LoginType
} from "./form";

export type UseDispatch<T extends Object> = Dispatch<SetStateAction<T>>;
export type UseHooks<T extends Object> = [T, UseDispatch<T>];
export type UseDispatchState<T extends Object> = Dispatch<SetStateAction<T>>;

export type UseBoolean = UseHooks<boolean>;
export type UseLoginType = UseHooks<LoginType>;
export type UseAuthPayload = UseHooks<AuthPayload<string | null>>;

// custom hooks
export interface UseLoginHook {
    loginInput: BaseInputState<string | null>;
    pwdInput: BaseInputState<string | null>;
    confirmInput: BaseInputState<string | null>;
    isFormValid: boolean;
    inputsRef: FormsControlsRef;
    updateFormState: Function;
}
