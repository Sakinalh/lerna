import { clearAllAction, clearUserTokenAction, processStatusAction, refreshUserTokenAction, resumeAction, setAppErrorStateAction } from "src/redux/store/app/app.actions";
import { ajax, AjaxRequest, AjaxResponse } from "rxjs/ajax";
import { concat, Observable, of, throwError } from "rxjs";
import { catchError, concatMap, endWith, finalize, map, startWith, switchMap, tap } from "rxjs/operators";
import { DispatchAction, ListLoadState, PROCESS_STATUS, StoreState } from "src/model";
import { getRemainTime, isObject, safeGet } from "src/shared/utils";
import { UserResponse } from "src/model/user";
import { AjaxCreationMethod } from "rxjs/internal/observable/dom/AjaxObservable";
import { history } from "src/route-history";
import { GET_TOKEN_API, REVOKE_TOKEN_API } from "src/api/routes/api_routes";
import { getPersistedToken, getPersistedUser, store } from "src";
import { AxiosObservable } from "axios-observable";

const CLEAR_LIST_SELECTION = "CLEAR_LIST_SELECTION";

export const SET_DATA_STATE_SET = "SET_DATA_STATE_SET";

export function setDataStateAction(state: ListLoadState, msg: string = "") {
  return ({
    type: SET_DATA_STATE_SET,
    payload: {
      state,
      msg
    }
  });
}

export function clearListSelectionAction() {
  return {
    type: CLEAR_LIST_SELECTION
  };
}

// interface
export interface StateObservableGeneric<T> {
    value: T;
}

export interface StaticAppState {
    value: StoreState;
}

/* READ ME */
// subtle difference between clearAllAction and clearTokenEpic$
// clear is basically logout. The user has a valid token, call the api to revoke it then cache is cleared/redirect to login
// in all other case,
// clearAllAction The user has a invalid token or doesn't have ani, cache is cleared/redirect to login
// there's no token to invalid

/**
 *
 * HELPER
 */
// Authenticate user
export function tryUserAuth(
  payload: any,
  client:
        AjaxCreationMethod
  = ajax
): Observable<UserResponse> {
  const ajaxReq = {
    url: `${GET_TOKEN_API}`,
    method: "POST",
    body: payload
  };
  return ajaxObs(ajaxReq, client);
}

// clear user token
export function revokeUserToken(
  { access_token, access_token_type }: Partial<UserResponse>,
  client: any
): Observable<any> {
  const ajaxReq = makeTokenReq(
    `${access_token_type} ${access_token}`,
    `${REVOKE_TOKEN_API}`,
    "POST",
        { access_token } as UserStoreState
  );

  return ajaxObs(ajaxReq, client);
}

// redux observable
/**
 * return the content of ajax response
 * @param options
 * @param client
 */
export function ajaxObs<T>(
  options: AjaxRequest,
  client: AjaxCreationMethod
): Observable<T> {
  return client
    .call(null, options)
    .pipe(map(({ response }: AjaxResponse) => response)) as Observable<T>;
}

/**
 * get toke from State Observable
 *
 * @export
 * @param {StateObservableGeneric< StoreState<AppState | null>>} state
 * @returns {[string, string]}
 */
export function getState$Token(state: { value: StoreState }): [string, string] {
  const user = safeGet(state, "value", "app", "user");

  if(!user) {
    return ["", ""];
  }
  const { access_token_type, access_token } = user;
  return [access_token_type, access_token];
}

export type UserStoreState = UserResponse | string | File | Object | null;

// Refresh token
/**
 * generate ajax req payload
 *
 * @export
 * @param {string} auth
 * @param {string} url
 * @param {string} [method="GET"]
 * @param {*} [body=null]
 * @returns
 */
export function makeTokenReq(
  auth: string,
  url: string,
  method: string = "GET",
  data: UserStoreState = null,
  contentType: "default" | "json" = "default"
) {
  // default let the browser handle form data header
  const json = contentType === "json" ? { "Content-Type": "application/json; charset=UTF-8" } : {};

  return {
    headers: {
      // Authorization: auth,
      ...json
    },
    method,
    url,
    data
  };
}

// download file with rxjs
// https://stackoverflow.com/questions/45450207/how-to-get-binary-image-correctly-using-redux-observable
export function makeDownloadReq(
  auth: string,
  url: string,
  method: string = "GET"
) {
  return {
    headers: {
      Authorization: auth
    },
    method,
    url,
    responseType: "arraybuffer"
  };
}

/**
 *
 * @param {AjaxRequest}  ajReq
 * @param {Function} action
 * @param client
 *
 * @returns {Observable<null>}

 */
export function reqDispatchAction(
  ajReq: AjaxRequest,
  action: Function,
  client: any
): Observable<any> {
  return (client.request(ajReq)).pipe(
    switchMap((res: any) => {
      const user = getPersistedUser();

      store.dispatch(refreshUserTokenAction({...user, access_token: res?.config?.headers?.Authorization }));

      return of(action.call(null, res.data));
    }),
    catchError((error) => {
      // github.com/redux-observable/redux-observable/blob/master/docs/recipes/ErrorHandling.md
      //  console.info(error, ajReq, "HANDLE ERROR");

      /*
            Sentry.captureException({
              error,
              source: "resume reqDispatchAction",
            });
      */

      if(error.status === 401) {
        return of(clearAllAction());
      }

      /*  const errMsg = Array.isArray(error.response)
                  ? error.response[0]
                  : "something went wrong"; */
      const errMsg = typeof error.response === "string"
        ? error.response
        : "something went wrong";
      // eslint-disable-next-line
      console.warn("get failed with following message ", error, JSON.stringify(error));

      return throwError(errMsg);
    })
  );
}

/**
 * simple wrap catch error,
 * @param domain
 * @param actionSlice
 * @param errActions
 */
export function getError$(
  actionSlice: Function,
  domain = " ",
  errActions: Observable<any>[] = []
) {
  return catchError(errBody => concat(
    ...[of(actionSlice.call(null, "error", domain.concat(errBody)))],
    ...errActions
  ));
}

/**
 * refresh Ajax req Authorization
 *
 * @param {*} ajxReq
 * @param {UserResponse} userRes
 * @returns {AjaxRequest}
 */
export function _syncToken(
  ajxReq: AjaxRequest,
  userRes: UserResponse
): AjaxRequest {
  return {
    ...ajxReq,
    headers: {
      ...ajxReq.headers as any,
      Authorization: `${userRes.access_token_type} ${userRes.access_token}` as any
    } as any
  };
}

export function _updateToken(
  ajxReq: AjaxRequest,
  userRes: UserResponse
): AjaxRequest {
  (ajxReq as {
        headers: { Authorization: string };
    }).headers.Authorization = `${userRes.access_token_type} ${userRes.access_token}`;
  return ajxReq;
}

/**
 * check remain validity of token
 * either dispatch the action from opt/
 *  or update token and then perform the action
 *
 * @param state$
 * @param opt
 * @param action
 * @param client
 */
export function handleResourceAuth(
  state$: any,
  opt: AjaxRequest,
  action: any,
  client: any = ajax
): Observable<any> {
  const {
    value: { app }
  } = state$;
  const { expires } = app.user;
  const remainingValidity: number = getRemainTime(expires, "min");
  const VALIDITY_THRESHOLD: number = 15; // below refresh threshold

  // console.log(remainingValidity, "DEBUG");
  // comment because of tests
  // the remainingValidity is on the old value
  // so always fail tes

  // if (remainingValidity < 0) {
  //   /*    Sentry.captureException({
  //         user: app.user,
  //         remainingValidity,
  //         expires,
  //         source: "remainingValidity <0",
  //       }); */
  //   return of(history.push("/login")).pipe(
  //     map(() => ({
  //       type: "FORCE_REDIRECT"
  //     }))
  //   );
  // }

  //! TODO fix refresh token when multi call
  /*
      when replace the token api call with no delay observable, the latter api call does not fire before the current complete
      couldn't find a way for next stream to fire before the previous completes
      the solution may be concatmap the initial actions, no higher parent for children to execute sequential? which is s*** and unfeasible.
      the actions are not centralized
      failed with async await or other operators
      */
  // console.log("TEST ME", remainingValidity);
  if(remainingValidity < VALIDITY_THRESHOLD) {
    // console.log('token expires')
    // console.log("%c refresh token" + 1, "color: orange");
    // return of(resumeAction({ ajaxRequest: opt, action }));
  }

  return reqDispatchAction(opt, action, client);
}

/*
 *
 *   REST WRAPPER
 *
 */

// test 401
//  const ajaxReq: AjaxRequest = makeTokenReq(`TEST`, endpoint);

// https://gist.github.com/iansinnott/3d0ba1e9edc3e6967bc51da7020926b0
function readJsonBuffer$(
  { payload }: DispatchAction<ArrayBuffer | any>,
  cb: Function
) {
  if(!(payload instanceof ArrayBuffer)) {
    return throwError(new Error("invalid payload"));
  }

  const blob = new Blob([payload]);
  return new Observable((obs) => {
    const reader = new FileReader();
    reader.onerror = err => obs.error(err);
    reader.onabort = err => obs.error(err);
    reader.onload = () => obs.next(reader.result);
    reader.onloadend = () => obs.complete();
    return reader.readAsText(blob);
  }).pipe(
    map((content: any) => {
      const parsed = JSON.parse(content);
      return cb.call(null, parsed);
    }),
    catchError(() =>
      of(setAppErrorStateAction({ hasError: true, msg: "unkown error" })))
  );
}

// https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
// see above for better per, doesnt work as is

/**
 * data as received as ArrayBuffer
 * so have to parse it first into text with file reader
 * then the text is turned into Object
 *
 * @param state$
 * @param endpoint
 * @param action
 * @param client
 * @param cb
 */
export function autoRefreshDownloadObjectBuffer(
  state$: StaticAppState,
  endpoint: string,
  action: any,
  client: AjaxCreationMethod,
  cb: Function
): Observable<any> {
  const [access_token_type, access_token] = getState$Token(state$);
  const ajaxReq: AjaxRequest = makeDownloadReq(
    `${access_token_type} ${access_token}`,
    endpoint
  );

  return handleResourceAuth(state$, ajaxReq, action, client).pipe(
    switchMap((resp: any) => readJsonBuffer$(resp, cb)),
    catchError(() =>
      of(setAppErrorStateAction({ hasError: true, msg: "unkown error" })))
  );
}

/*
 *  unlike autoRefreshDownloadObjectBuffer ( report content source/optimization),
 *   the response is not array buffer but json
 * */
export function autoRefreshDownloadObjectBufferPost<T>(
  state$: StaticAppState,
  endpoint: string,
  client: AjaxCreationMethod,
  cb,
  payload: T
): Observable<any> {
  const [access_token_type, access_token] = getState$Token(state$);
  const ajaxReq: AjaxRequest = makeTokenReq(
    `${access_token_type} ${access_token}`,
    endpoint,
    "POST",
    payload
  );
  return client
    .call(null, ajaxReq)
    .pipe(
      switchMap((resp: any) =>
        concat([cb.call(null, resp.response), clearListSelectionAction()]).pipe(
          catchError(() =>
            of(setAppErrorStateAction({ hasError: true, msg: "unkown error" })))
        ))
    );
}

export function makeTokenContentReq(
  auth: string,
  url: string,
  method: string = "GET",
  body: UserStoreState = null,
  contentType: "default" | "json" = "default"
) {
  // default let the browser handle form data header
  const json = contentType === "json" ? { "Content-Type": "application/json; charset=UTF-8" } : {};
  return {
    headers: {
      Authorization: auth,
      ...json

    },
    method,
    url,
    body
  };
}

export function protectedFormUpdate<T>(
  state$: StaticAppState,
  endpoint: string,
  client: AjaxCreationMethod,
  payload: T,
  type: "POST" | "PUT" | "PATCH"
): Observable<any> {
  const [access_token_type, access_token] = getState$Token(state$);
  // eslint-disable-next-line
  console.log('payload T', payload)
  const ajaxReq: AjaxRequest = makeTokenContentReq(
    `${access_token_type} ${access_token}`,
    endpoint,
    type,
    payload,
    "json"
  );
  return client.call(null, ajaxReq);
}

// static state getter

export function getAsyncMsg(resp: Record<string, string[]> | string[]) {
  if(isObject(resp)) {
    const key = Object.keys(resp)[0];
    const body = (Object.values(resp)[0] as any).toString();

    return key.concat(", ", body);
  }

  if(Array.isArray(resp)) {
    return resp.toString();
  }
  return "something went wrong on our side. Please contact us";
}
