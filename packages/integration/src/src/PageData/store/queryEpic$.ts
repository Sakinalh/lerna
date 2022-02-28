import { AjaxCreationMethod } from "rxjs/internal/observable/dom/AjaxObservable";
import { ajax } from "rxjs/ajax";
import { concat, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, switchMap } from "rxjs/operators";
import {
  getAsyncMsg,
  protectedFormUpdate,
  StaticAppState
} from "../../redux/store/store.utils";
import { DispatchAction, FormState, ListLoadState, ParamsState } from "../../model";
// import { SaveTableQueryPayload } from "./analyticsEpic$";
import { SaveQueryItem } from "../model/analytics";
// import { ANALYTICS_SAVE_QUERY_API } from "../../api/routes/api_routes";
import { StatefulPaginatedInterfaceActionPayload } from "../../PageGeneration/model";
import { queryParamsToStr } from "../../components/AppPaginator/AppPaginator.component";
import { del, get } from "../../api/accessors/genericAccessors";

/* *****************************************************
 *
 *             UI STATE
 *
 * **************************************************** */

export const SET_QUERY_DATA_STATE = "SET_QUERY_DATA_STATE";

function setQueryDataStateAction(state: ListLoadState, msg: string = "") {
  return {
    type: SET_QUERY_DATA_STATE,
    payload: {
      state,
      msg
    }
  };
}

export const SET_QUERY_FORM_STATE = "SET_QUERY_FORM_STATE";

export function setQueryFormStateAction(payload: FormState) {
  return {
    type: SET_QUERY_FORM_STATE,
    payload
  };
}

export const CLEAR_QUERY_SHARED_STATE = "CLEAR_QUERY_SHARED_STATE";

export function clearQuerySharedStateAction() {
  return {
    type: CLEAR_QUERY_SHARED_STATE
  };
}

/* *****************************************************
 *
 *             ANALYTICS QUERY
 *
 * **************************************************** */

export const TRY_GET_ANALYTICS_QUERY = "TRY_GET_ANALYTICS_QUERY";

export function tryGetAnalyticsQueryAction(payload: string) {
  return ({
    type: TRY_GET_ANALYTICS_QUERY,
    payload
  });
}

export const SET_QUEUE_LIST_PAGINATION = "SET_QUEUE_LIST_PAGINATION";

export function setQueueListPagination(payload: StatefulPaginatedInterfaceActionPayload) {
  const newRelativePathQuery = window.location.pathname + queryParamsToStr(payload.qState);
  window.history.replaceState(null, "", newRelativePathQuery);

  return ({
    type: SET_QUEUE_LIST_PAGINATION,
    payload
  });
}

export const SET_ANALYTICS_QUERY = "SET_ANALYTICS_QUERY";

export function setAnalyticsQueryAction(payload: SaveQueryItem[]) {
  return ({
    type: SET_ANALYTICS_QUERY,
    payload: {
      count: payload.length,
      next: null,
      previous: null,
      results: payload
    }
  });
}

// export const tryGetAnalyticsQueryEpic$ = (
//   action$: any,
//   state$: StaticAppState,
//   client: AjaxCreationMethod = ajax
// ): Observable<void> => {
//   return action$.pipe(
//     ofType(TRY_GET_ANALYTICS_QUERY),
//     switchMap(({ payload }: DispatchAction<string>) => {
//       return concat(
//         get(
//           state$,
//           ANALYTICS_SAVE_QUERY_API.concat(payload),
//           setAnalyticsQueryAction,
//           client
//         )
//       );
//     }),
//     catchError(err => of(setQueryDataStateAction("error", getAsyncMsg(err))))
//   );
// };

export const TRY_SAVE_ANALYTIC_QUERY = "TRY_SAVE_ANALYTIC_QUERY";

export function trySaveAnalyticQueryAction(payload: SaveQueryItem) {
  return ({
    type: TRY_SAVE_ANALYTIC_QUERY,
    payload
  });
}

// export const tryPostSaveAnalyticQueryEpic$ = (
//   action$: any,
//   state$: StaticAppState,
//   client: AjaxCreationMethod = ajax
// ): Observable<void> => {
//   return action$.pipe(
//     ofType(TRY_SAVE_ANALYTIC_QUERY),
//     switchMap(({ payload }: DispatchAction<SaveTableQueryPayload>) => {
//       return concat(
//         of(setQueryFormStateAction("pending")),
//         protectedFormUpdate(
//           state$,
//           ANALYTICS_SAVE_QUERY_API,
//           client,
//           payload,
//           "POST"
//         ).pipe(
//           switchMap(
//             _res => of(setQueryFormStateAction("success"))
//           ),
//           catchError((e) => {
//             console.warn(e);

//             return of(setQueryDataStateAction("error", getAsyncMsg(e.response)));
//           })
//         ));
//     }));
// };

// DETAIL

export const TRY_DELETE_ANALYTICS_QUERY = "TRY_DELETE_ANALYTICS_QUERY";

export function tryDeleteAnalyticsQueryAction(payload: { id: string, qState: ParamsState }) {
  return {
    type: TRY_DELETE_ANALYTICS_QUERY,
    payload
  };
}

export const DELETE_ANALYTICS_QUERY = "TRY_DELETE_ANALYTICS_QUERY";

export function deleteAnalyticsQueryAction(payload) {
  return {
    type: DELETE_ANALYTICS_QUERY,
    payload
  };
}

// export const tryDeleteAnalyticsQueryEpic$ = (
//   action$: any,
//   state$: StaticAppState,
//   client: AjaxCreationMethod = ajax
// ): Observable<void> => {
//   return action$.pipe(
//     ofType(TRY_DELETE_ANALYTICS_QUERY),
//     switchMap(({
//       payload: {
//         id,
//         qState
//       }
//     }: DispatchAction<{ id: string, qState: ParamsState }>) => {
//       return concat(
//         of(setQueryDataStateAction("loading")),
//         del(
//           state$,
//           ANALYTICS_SAVE_QUERY_API,
//           deleteAnalyticsQueryAction,
//           client,
//           { search_id: id }
//         ).pipe(
//           switchMap(
//             _res => of(tryGetAnalyticsQueryAction(queryParamsToStr(qState)))
//           ),
//           catchError((e) => {
//             console.warn(e);

//             return of(setQueryDataStateAction("error", getAsyncMsg(e.response)));
//           })
//         ));
//     }));
// };
