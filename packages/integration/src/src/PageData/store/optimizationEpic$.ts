import { AjaxCreationMethod } from "rxjs/internal/observable/dom/AjaxObservable";
import { ajax } from "rxjs/ajax";
import { concat, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, mergeMap, switchMap } from "rxjs/operators";
import { getAsyncMsg, protectedFormUpdate, StaticAppState } from "../../redux/store/store.utils";
import { DispatchAction, FormState, ListLoadState, OptimizationPagesApi, OptTemplateApi } from "../../model";
import { OPTIMIZATION_LINK_TEMPLATE_API, OPTIMIZATION_PAGES_API } from "../../api/routes/api_routes";
import { setPageQueueFormStateAction } from "../../PageGeneration/store/queue.epic";
import { history } from "../../route-history";
import { get } from "../../api/accessors/genericAccessors";

/* *****************************************************
 *
 *             UI STATE
 *
 * **************************************************** */

export const SET_OPTIMIZATION_DATA_STATE = "SET_OPTIMIZATION_DATA_STATE";

function setOptimizationDataStateAction(state: ListLoadState, msg: string = "") {
  return {
    type: SET_OPTIMIZATION_DATA_STATE,
    payload: {
      state,
      msg
    }
  };
}

export const SET_OPTIMIZATION_FORM_STATE = "SET_OPTIMIZATION_FORM_STATE";

function setOptimizationFormStateAction(state: FormState, msg: string = "") {
  return {
    type: SET_OPTIMIZATION_FORM_STATE,
    payload: {
      state,
      msg
    }
  };
}

export const CLEAR_OPTIMIZATION_FORM_STATE = "CLEAR_OPTIMIZATION_FORM_STATE";

// function clearOptimizationFormStateAction() {
//     return {
//         type: CLEAR_OPTIMIZATION_FORM_STATE,

//     }
// }

/* STEP PAGES */

export const TRY_GET_OPTIMIZATION_PAGES = "TRY_GET_OPTIMIZATION_PAGES";

export interface OptimizationActionPayload {
    id: string;
}

export function tryGetOptimizationAction(payload: OptimizationActionPayload) {
  return {
    type: TRY_GET_OPTIMIZATION_PAGES,
    payload
  };
}

export const SET_OPTIMIZATION_PAGES = "SET_OPTIMIZATION_PAGES";

export function setOptimizationPagesAction(payload: OptimizationPagesApi) {
  return {
    type: SET_OPTIMIZATION_PAGES,
    payload
  };
}

export const tryGetOptimizationEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_OPTIMIZATION_PAGES),
  switchMap(({ payload: { id } }: DispatchAction<OptimizationActionPayload>) => get(
    state$,
    OPTIMIZATION_PAGES_API.concat("?optim_id=", id),
    setOptimizationPagesAction,
    client
  )),
  catchError(err => of(setOptimizationDataStateAction("error", getAsyncMsg(err))))
);

export const TRY_POST_OPT_TEMPLATE = "TRY_POST_OPT_TEMPLATE";

export interface PostOptTemplateActionPayload {
    optim_id: string;
    template_page_pairs: OptTemplateApi[]
}

export function tryPostOptTemplateAction(payload: PostOptTemplateActionPayload) {
  return {
    type: TRY_POST_OPT_TEMPLATE,
    payload
  };
}

export const tryPostOptimizeTemplateEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_POST_OPT_TEMPLATE),
  switchMap(({ payload }: DispatchAction<PostOptTemplateActionPayload>) => {
    const { optim_id } = payload;
    return concat(
      of(setOptimizationFormStateAction("pending")),
      protectedFormUpdate(
        state$,
        OPTIMIZATION_LINK_TEMPLATE_API,
        client,
        payload,
        "POST"
      ).pipe(
        switchMap(_ => of(history.push("/data/optimization/".concat(optim_id, "/meta/")))
          .pipe(mergeMap(_r => of(setOptimizationFormStateAction("idle"))))),
        catchError((e) => {
          const msgErr = e.response
            ? e.response.non_field_errors[0]
            : "error processing file";
            // eslint-disable-next-line
            console.warn(e, msgErr);

          return of(setOptimizationFormStateAction("error"));
        })
      )
    );
  }),
  catchError(_err => of(setPageQueueFormStateAction("error")))
);
