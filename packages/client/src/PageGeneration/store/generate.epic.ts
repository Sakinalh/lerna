import { makeReactiveStateForm } from "src/shared/form";
import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { ajax } from "rxjs/ajax";
import { concat, Observable, of } from "rxjs";
import { ofType } from "redux-observable";
import { switchMap, tap } from "rxjs/operators";
import { getError$, protectedFormUpdate, StaticAppState } from "../../redux/store/store.utils";
import { SELECTED_COLUMNS_SEP, TemplateVariableApi, VariableFormInterface } from "../model";
import { DispatchAction } from "../../model";
import { PAGE_GEN_RULES } from "../../api/routes/api_routes";
import { history } from "../../route-history";
import { setRuleDetailFormStateAction } from "./rule.epic";

/* ******************************************************
 *
 *                  variable list
 *
 * **************************************************** */

export const SET_MUTABLE_VARIABLE_LIST = "SET_MUTABLE_VARIABLE_LIST";

export function initFormatVarList(list: TemplateVariableApi[], pristine = false): VariableFormInterface[] {
  if(!Array.isArray(list)) {
    return [];
  }
  try {
    return list.map(vf => (
      {
        name: makeReactiveStateForm(vf.name, ["required"], pristine, "name"),
        type: makeReactiveStateForm(vf.type, [], pristine, "type"),
        value: makeReactiveStateForm(vf.value, [], pristine, "value"),
        selected_columns: makeReactiveStateForm(vf.selected_columns.split(SELECTED_COLUMNS_SEP), [], true, "selected_columns"),
        source_files: makeReactiveStateForm(vf.source_files, [], pristine, "source_files")

      }
    ));
  } catch (e) {
    // eslint-disable-next-line
    console.warn(e, "following parsing", list);
    return [];
  }
  // list
}

export interface PostGeneratePagesPayload {
    id: string;
    data: any
}

export const TRY_POST_GENERATE_PAGE = "TRY_POST_GENERATE_PAGE";

export function tryPostGeneratePagesAction(payload: PostGeneratePagesPayload) {
  return {
    type: "TRY_POST_GENERATE_PAGE",
    payload
  };
}

export const tryPostGeneratePagesEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_POST_GENERATE_PAGE),
  switchMap(
    ({
      payload: { data, id }
    }: DispatchAction<PostGeneratePagesPayload>) => concat(
      protectedFormUpdate(
        state$,
        PAGE_GEN_RULES.concat(id, "/generate-pages/"),
        client,
        data,
        "POST"
      ).pipe(
        switchMap(_ => of(setRuleDetailFormStateAction("idle"))),
        tap((_) => {
          history.push("/generation/template/queue/");
        }),
        getError$(setRuleDetailFormStateAction)
      )
    )
  )
  /*        catchError((_err) => of(setQueueAsyncMsgAction({
                    state: "error",
                    keys: setKey(action$.payload.batchAll, action$.payload.data),
                    msg: "error",
                    published: false
                }))) */
);
