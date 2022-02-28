import { AjaxCreationMethod } from "rxjs/internal/observable/dom/AjaxObservable";
import { Observable, of } from "rxjs";
import { AjaxRequest } from "rxjs/ajax";
import { clearUserTokenAction } from "../../redux/store/app";
import { getState$Token, handleResourceAuth, makeTokenReq, StaticAppState } from "../../redux/store/store.utils";
import clientAxios from "../react-query/customAxiosObservable";

export class GenericClassAccessor {
/**
 * wrapper that get current state and perform protected api action

 * @param state$
 * @param endpoint
 * @param action
 * @param client
 */

  get(
    state$: StaticAppState,
    endpoint: string,
    action: any,
    client: AjaxCreationMethod
  ): Observable<any> {
    const [access_token_type, access_token] = getState$Token(state$);

    if(!access_token_type || !access_token) {
    /*    Sentry.captureException({
              user: state$.value.app,
              source: "access_token_type not set",
            }); */
      return of(clearUserTokenAction());
    }
    const ajaxReq: AjaxRequest = makeTokenReq(
      `${access_token_type} ${access_token}`,
      endpoint
    );
    // test 401
    //  const ajaxReq: AjaxRequest = makeTokenReq(`TEST`, endpoint);
    return handleResourceAuth(state$, ajaxReq, action, clientAxios);
  }

  del(
    state$: StaticAppState,
    endpoint: string,
    action: any,
    client: AjaxCreationMethod,
    body = {}
  ): Observable<any> {
    const [access_token_type, access_token] = getState$Token(state$);
    const ajaxReq: AjaxRequest = makeTokenReq(
      `${access_token_type} ${access_token}`,
      endpoint,
      "DELETE",
      body,
      "json"

    );
    return handleResourceAuth(state$, ajaxReq, action, clientAxios);
  }

  /* export function autoRefreshPost<T>(
  state$: StaticAppState,
  endpoint: string,
  action: any,
  client: AjaxCreationMethod | Observable<{ response: UserResponse }>,
  payload: T
): Observable<any> {
  const [access_token_type, access_token] = getState$Token(state$);
  const ajaxReq: AjaxRequest = makeTokenReq(
    `${access_token_type} ${access_token}`,
    endpoint,
    "POST",
    payload
  );
  return handleResourceAuth(state$, ajaxReq, action, client);
} */

  // simple wrapper post

  post<T>(
    state$: StaticAppState,
    endpoint: string,
    action: any,
    client: AjaxCreationMethod,
    payload: T
  ): Observable<any> {
    // default let the browser handle form data header
    const [access_token_type, access_token] = getState$Token(state$);
    const ajaxReq: AjaxRequest = makeTokenReq(
      `${access_token_type} ${access_token}`,
      endpoint,
      "POST",
      payload,
      "json"
    );

    return handleResourceAuth(state$, ajaxReq, action, clientAxios);

  // return client.call(null, ajaxReq);
  }

  patch<T>(
    state$: StaticAppState,
    endpoint: string,
    action: any,
    client: AjaxCreationMethod,
    payload: T
  ): Observable<any> {
    const [access_token_type, access_token] = getState$Token(state$);
    const ajaxReq: AjaxRequest = makeTokenReq(
      `${access_token_type} ${access_token}`,
      endpoint,
      "PATCH",
      payload
    );
    return clientAxios.request(null, ajaxReq);
  }

  protectedDelete(
    state$: StaticAppState,
    endpoint: string,
    action: any,
    client: AjaxCreationMethod
  ): Observable<any> {
    const [access_token_type, access_token] = getState$Token(state$);
    const ajaxReq: AjaxRequest = makeTokenReq(
      `${access_token_type} ${access_token}`,
      endpoint,
      "DELETE"
    );
    return clientAxios.request(null, ajaxReq);
  }
}
