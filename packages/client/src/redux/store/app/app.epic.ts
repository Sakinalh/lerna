import { AjaxCreationMethod, AjaxRequest } from "rxjs/internal/observable/dom/AjaxObservable";
import { UserResponse } from "src/model/user";
import { _updateToken, revokeUserToken, StaticAppState } from "src/redux/store/store.utils";
import { catchError, concatMap, exhaustMap, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { DispatchAction } from "src/model";
import { defer, from, Observable, of } from "rxjs";
import { REFRESH_TOKEN_API, USER_GET_API } from "src/api/routes/api_routes";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { safeGet } from "src/shared/utils";
import { clearPersistToken } from "src/index";
import {
  CLEAR_ALL,
  clearAllAction,
  clearUserTokenAction,
  isClearedAction,
  refreshUserTokenAction,
  RESUME_ACTION,
  ResumeActionPayload,
  resumedAction,
  setUserDetailAction,
  TRY_CLEAR_TOKEN,
  TRY_REFRESH_TOKEN,
  TRY_RESUME_ACTION,
  TRY_USER_DETAIL
} from "./app.actions";
import { get } from "../../../api/accessors/genericAccessors";

export function tryRefreshTokenAction$(
  action$: any,
  _state$: StaticAppState
): Observable<any> {
  return action$.pipe(
    ofType(TRY_REFRESH_TOKEN),
    concatMap(({ payload }: DispatchAction<string>) => {
      //! important to do not spread ajaxRequest.
      // it will break post request as   applying the refresh token will set its content type
      // breaking multipart for example
      const refreshReq = {
        url: `${REFRESH_TOKEN_API}`,
        method: "POST",
        body: {
          access_token: payload
        }
      };
      return ajax(refreshReq).pipe(
        map(res => res.response),
        map((res: any) => refreshUserTokenAction(res)),
        catchError(_error => of(clearAllAction()))
      );
    })
  );
}

export const clearTokenEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<{ type: string }> =>
  action$.pipe(
    ofType(TRY_CLEAR_TOKEN),
    mergeMap((action: DispatchAction<Partial<UserResponse>>) =>
      revokeUserToken(action.payload, client).pipe(
        tap(() => clearPersistToken()),
        map(_ => clearUserTokenAction())
      )),
    catchError(_err => from(clearPersistToken()).pipe(
      map(() => ({ type: "FORCE CLEAR" }))
    ))
  );

export const userDetailEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> =>
  action$.pipe(
    ofType(TRY_USER_DETAIL),
    switchMap((_action: any) => get(state$, USER_GET_API, setUserDetailAction, client))
  );

export const clearAll$ = (
  action$: any,
  _state$: StaticAppState,
  _client: AjaxCreationMethod = ajax
): Observable<void> =>
  action$.pipe(
    ofType(CLEAR_ALL),
    switchMap((_action: any) => from(clearPersistToken()).pipe(map(_d => isClearedAction())))
  );

/*
 *  token refresh
 *  make the  initial action,
 *  hold it,  dispatch action to update token
 *  then update headers with new token and resume action
 *  the validity is set on client . VALIDITY_THRESHOLD
 * this works for get call
 * but
 * !TODO post autorefresh
 *   in this case, couldn't switch from outer observable->to inner->outer ( initial action-> refresh token -> go  back to intial action response)
 * example create content: post project-> take the project id-> post content
 * so we need, in case of autorefresh post, to subsribe to child obse (refresh token->inital action-> on completion),switch back to parent
 * was stuck at child subscription. So couldn't get the created id and the second action was fired before the first completed
 * suspect this line
 *     return of(resumeAction({ ajaxRequest: opt, action }));
 * creating a new observable, so preventing to merging them as one
 *
 * ----------- IMPORTANT ---------------------
 * Limitation :
 * see abowe. for post,  if there's sequential /chain actions in post, put the  autorefresh at the end
 *  Use normal post request the initial action (s), subscribe to them.
 * On the last, put the autorefresh
 *
 * Previous implementation was make the initial action then action to update token
 * But couldn't handle sequential actions as the return observable is changed
 * */

export function tryResumeAction$(
  action$: any,
  state$: StaticAppState
): Observable<any> {
  return action$.pipe(
    ofType(TRY_RESUME_ACTION),
    concatMap(({ payload }: DispatchAction<ResumeActionPayload>) => {
      const { ajaxRequest, action } = payload;
      //! important to do not spread ajaxRequest.
      // it will break post request as   applying the refresh token will set its content type
      // breaking multipart for example
      const refreshReq = {
        url: `${REFRESH_TOKEN_API}`,
        method: "POST",
        body: {
          access_token: state$.value.app.user.access_token
        }
      };

      // https://medium.com/@benlesh/rxjs-observable-interop-with-promises-and-async-await-bebb05306875
      return defer(async () => {
        // try await req but not working
        const renewedToken = await ajax(refreshReq);
        return renewedToken;
      }).pipe(
        mergeMap(res => res),
        exhaustMap((res: any) => {
          //  console.log(res, 4.5, "REFRESH");
          const _tk = _updateToken(ajaxRequest, res.response);

          return [
            refreshUserTokenAction(res.response),
            resumedAction({ ajaxRequest: _tk, action })
          ];
        }),
        catchError(_error =>
        /*   Sentry.captureException({
                      error,
                      source: "resume action failed",
                    }); */

          of(clearAllAction()))
      );
    })
  );
}

export const resumeAction$ = (
  action$: any,
  state$: StaticAppState
): Observable<any> => action$.pipe(
  ofType(RESUME_ACTION),
  concatMap(({ payload }: DispatchAction<ResumeActionPayload>) => defer(() => {
    const userState = state$.value.app.user;
    const authState = `${userState.access_token_type} ${userState.access_token}`;

    const req: AjaxRequest = payload.ajaxRequest;
    const reqAuth = safeGet(
      payload,
      "ajaxRequest",
      "headers",
      "Authorization"
    );
    if(authState !== reqAuth) {
      // eslint-disable-next-line
          console.warn("token are not synced", authState, reqAuth);
      (req as any).headers.Authorization = authState;
    }
    return ajax(payload.ajaxRequest);
  }).pipe(
    mergeMap((res: AjaxResponse) => of(payload.action.call(null, res.response))),
    catchError(error => of({ type: "CATCH_REFRESH_ERROR", payload: error }))
  ))
);
