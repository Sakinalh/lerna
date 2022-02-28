import { StaticAppState } from "src/redux/store/store.utils";
import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { concat, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { catchError, switchMap } from "rxjs/operators";
import { DispatchAction, PaginatedListApi } from "src/model";
import { PAGE_GEN_TEMPLATES } from "src/api/routes/api_routes";
import {
  DetailActionInterfacePayload,
  StatefulPaginatedInterfaceActionPayload,
  TemplateListItemApi,
  TemplateRuleApiDenormalized
} from "../model";
import {
  setRuleDetailDataStateAction,
  setRuleDetailFormStateAction,
  setRuleListDataStateAction,
  updateRuleForm$
} from "./rule.epic";
import { queryParamsToStr } from "../../components/AppPaginator/AppPaginator.component";
import { get } from "../../api/accessors/genericAccessors";

/* *****************************************************
 *
 *             template list
 *
 * **************************************************** */

export const SET_TEMPLATE_LIST = "SET_TEMPLATE_LIST";

export function setTemplateListAction(payload: PaginatedListApi<TemplateListItemApi>) {
  return ({
    type: SET_TEMPLATE_LIST,
    payload
  });
}

export const SET_RULE_LIST_PAGINATION = "SET_RULE_LIST_PAGINATION";

export function setRuleListPagination(payload: StatefulPaginatedInterfaceActionPayload) {
  const newRelativePathQuery = window.location.pathname + queryParamsToStr(payload.qState);
  window.history.replaceState(null, "", newRelativePathQuery);

  return ({
    type: SET_RULE_LIST_PAGINATION,
    payload
  });
}

export const TRY_GET_TEMPLATE_LIST = "TRY_GET_TEMPLATE_LIST";

// export function tryGetTemplateList (payload: string) {
//   return ({
//     type: TRY_GET_TEMPLATE_LIST,
//     payload
//   });
// }

// export const tryGetTemplateListEpic$ = (
//   action$: any,
//   state$: StaticAppState,
//   client: AjaxCreationMethod = ajax
// ): Observable<void> => {
//   return action$.pipe(
//     ofType(TRY_GET_TEMPLATE_LIST),
//     switchMap(({ payload }: DispatchAction<string>) => {
//       return concat(
//         of(setRuleListDataStateAction("loading")),
//         get(
//           state$,
//           PAGE_GEN_TEMPLATES.concat(payload),
//           setTemplateListAction,
//           client
//         ),
//         of(setRuleListDataStateAction("complete"))
//       );
//     }),
//     catchError(_err => of(setRuleListDataStateAction("error")))
//   );
// };

/* DETAIL */
export const PATCH_TEMPLATE_DETAIL = "PATCH_TEMPLATE_DETAIL";

export function patchTemplateDetailAction(payload: { key: string; value: any }) {
  return {
    type: PATCH_TEMPLATE_DETAIL,
    payload
  };
}

export const SET_TEMPLATE_DETAIL = "SET_TEMPLATE_DETAIL";

export function setTemplateDetailAction(payload: TemplateListItemApi) {
  return ({
    type: SET_TEMPLATE_DETAIL,
    payload
  });
}

export const TRY_GET_TEMPLATE_DETAIL = "TRY_GET_TEMPLATE_DETAIL";

export function tryGetTemplateDetail(payload: DetailActionInterfacePayload) {
  return ({
    type: TRY_GET_TEMPLATE_DETAIL,
    payload
  });
}

export const tryGetTemplateDetailEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_TEMPLATE_DETAIL),
  switchMap(({ payload }: DispatchAction<DetailActionInterfacePayload>) => {
    const q = `${PAGE_GEN_TEMPLATES}${payload.id}/`;
    return get(
      state$,
      q,
      setTemplateDetailAction,
      client
    );
  }),
  catchError(_err => of(setRuleDetailDataStateAction("error")))
);
/* export const TRY_DELETE_TEMPLATE = "TRY_DELETE_TEMPLATE";

export function tryDeleteTemplateAction(payload: DeleteActionInterfacePayload) {
    return ({
        type: TRY_DELETE_TEMPLATE,
        payload
    });
} */

/*
export const DELETE_TEMPLATE = "DELETE_TEMPLATE";

export function deleteTemplateAction(payload: any) {
    return ({
        type: DELETE_TEMPLATE,
        payload
    });
}

export const tryDeleteTemplateEpic$ = (
    action$: any,
    state$: StaticAppState,
    client: AjaxCreationMethod = ajax
): Observable<void> => {
    return action$.pipe(
        ofType(TRY_DELETE_TEMPLATE),
        switchMap((disp: DispatchAction<DeleteActionInterfacePayload>) => {
            const {payload} = disp;

            const query = `${PAGE_GEN_TEMPLATES}${payload.id}/`;
            const resetState:unknown= {
                ...state$.value.ruleList.queryState,
                ...DEFAULT_PAGINATION_PARAMS
            }
            return concat(
                of(setRuleListDataStateAction("loading")),
                del(
                    state$,
                    query,
                    setVarSourceAction,
                    client
                ).pipe(
                    concatMap((cb: DispatchAction<PaginatedListApi<TemplateSourceApi>>) => {
                            return [
                                cb,
                                //tryInitTemplateList({req: INIT_LIST_PARAMS.required, opt: {}}),

                                setRuleListPagination({
                                        qState: resetState as ParamsState,
                                        qStr: queryParamsToStr(resetState as ParamsState)
                                    }
                                ),
                                setRuleListDataStateAction("complete")

                            ]
                        }
                    ),
                    catchError(_err => of(setRuleListDataStateAction("error")))
                ),
            )
        }),
        catchError(_err => of(setRuleListDataStateAction("error")))
    );
};
*/

export const TRY_PATCH_TEMPLATE_DETAIL = "TRY_PATCH_TEMPLATE_DETAIL";

export function tryPatchTemplateDetailAction(payload: { datum: Partial<TemplateListItemApi>, id: number }) {
  return ({
    type: TRY_PATCH_TEMPLATE_DETAIL,
    payload
  });
}

export const tryPatchTemplateDetailEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_PATCH_TEMPLATE_DETAIL),
  switchMap((disp: DispatchAction<{ datum: Partial<TemplateRuleApiDenormalized>, id: number }>) => {
    const { payload } = disp;

    return updateRuleForm$(
      state$,
      PAGE_GEN_TEMPLATES.concat(payload.id.toString(), "/"),
      client,
      payload.datum,
      "PATCH"
    );
  }),
  catchError(_err => of(setRuleDetailFormStateAction("error")))
);
