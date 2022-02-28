import { useEffect, useState } from "react";
import { of } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, tap } from "rxjs/operators";
import { store } from "src/index";
import { FormState, UseBoolean } from "src/model";
import { UserResponse } from "src/model/user";
import { setAppUserAction, setUserDetailAction } from "src/redux/store/app";
import { tryUserAuth } from "src/redux/store/store.utils";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

export const SUCCESS_LOGIN_PATH: string = "/generation/template/list/";

export interface AuthPayload {
    email: string | null;
    password: string | null;
}

export interface AuthState {
    isSuccess: boolean;
    state: FormState;
}

/**
 *
 *
 * @export
 * @param {AuthPayload} payload
 * @returns {[AuthState]}
 */
export function useTryAuth(payload: AuthPayload): [AuthState] {
  const dispatch = useDispatch();
  const [tryAuth, setTryAuth] = useState({
    isSuccess: false,
    state: "invalid"
  });
  const navigate = useNavigate();
  useEffect(() => {
    if(payload.password) {
      setTryAuth({ isSuccess: false, state: "pending" });
      tryUserAuth(payload)
        .pipe(
          map((data: UserResponse) => {
            setTryAuth({ isSuccess: true, state: "success" });
            dispatch(setUserDetailAction(payload.email));
            return store.dispatch(setAppUserAction(data));
          }),
          tap((_) => {
            navigate(SUCCESS_LOGIN_PATH);
          }),
          catchError((_err: AjaxResponse) => {
            setTryAuth({ isSuccess: false, state: "error" });
            return of(null);
          })
        )
        .subscribe();
    }
  }, [payload, navigate]);
  return [tryAuth as AuthState];
}

export function useValidationError(touchState: boolean = false): UseBoolean {
  const [formTouched, setFormTouched]: UseBoolean = useState<boolean>(
    touchState
  );
  useEffect(() => {
    setFormTouched(touchState);
  }, [touchState]);
  return [formTouched, setFormTouched];
}
