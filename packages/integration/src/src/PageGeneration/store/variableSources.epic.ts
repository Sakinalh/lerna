import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { concat, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { catchError, concatMap, switchMap } from "rxjs/operators";
import { DispatchAction, PaginatedListApi, SetupFile } from "src/model";
import { DEFAULT_PAGINATION_PARAMS, PAGE_GEN_SOURCES, PAGE_GEN_SOURCES_DATA } from "src/api/routes/api_routes";
import { DetailActionInterfacePayload, QueuedItemDelimiter, TemplateSourceApi } from "../model";
import { formattedGroupByDateRange, makeSourceCsvPayload, objToEncodedValue } from "../../shared/utils";
import { StaticAppState } from "../../redux/store/store.utils";
import { setRuleDetailDataStateAction, setRuleDetailFormStateAction } from "./rule.epic";
import { get, post, del } from "../../api/accessors/genericAccessors";

/* ***************************************************
 *
 *                  VARIABLES SOURCES
 *
 * *************************************************** */

function makeSourceMap(data: TemplateSourceApi[]) {
  return data.reduce((acc, curr) => ({ ...acc, ...{ [curr.id]: false } }), {});
}

export const TRY_GET_VAR_SOURCE_LIST = "TRY_GET_VAR_SOURCE_LIST";

export function tryGetVarSourceAction(payload: { limit: string, offset: string; }) {
  return ({
    type: TRY_GET_VAR_SOURCE_LIST,
    payload
  });
}

export const SET_VAR_SOURCE_LIST = "SET_VAR_SOURCE_LIST";

export function setVarSourceAction(payload: PaginatedListApi<TemplateSourceApi>) {
  const formattedList = formattedGroupByDateRange(payload.results, "creation_date");
  const initSelection = makeSourceMap(payload.results);

  return ({
    type: SET_VAR_SOURCE_LIST,
    payload: {
      data: {
        ...payload,
        results: formattedList
      },
      rawResults: payload.results,
      selection: initSelection
    }

  });
}

interface VAR_SOURCES_PAGINATE_PAYLOAD {
    limit: string;
    offset: string;
}

export const SET_VAR_SOURCES_PAGINATION = "SET_VAR_SOURCES_PAGINATION";

export function trySetVarSourcesPagination(payload: VAR_SOURCES_PAGINATE_PAYLOAD) {
  return ({
    type: SET_VAR_SOURCES_PAGINATION,
    payload
  });
}

export const PATCH_SELECTED_SOURCE = "PATCH_SELECTED_SOURCE";

export function patchSelectedSource(payload: { key: string, value: boolean }) {
  return ({
    type: PATCH_SELECTED_SOURCE,
    payload
  });
}

export const RESET_SELECTION_SOURCE = "RESET_SELECTION_SOURCE";

function setNextSelectionState(state: Record<string, boolean>, value: boolean) {
  const keys = Object.keys(state);
  return keys.reduce((acc, curr) => ({ ...acc, ...{ [curr]: value } }), {});
}

interface ResetSelectionSourcePayload {
    state: Record<string, boolean>,
    value: boolean
}

export function resetSelectionSource(payload: ResetSelectionSourcePayload) {
  const nextState = setNextSelectionState(payload.state, payload.value);
  return ({
    type: RESET_SELECTION_SOURCE,
    payload: nextState
  });
}

export const tryGetTemplateVarSourceListEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_VAR_SOURCE_LIST),
  switchMap((disp: DispatchAction<VAR_SOURCES_PAGINATE_PAYLOAD>) => {
    const { payload } = disp;
    const q = objToEncodedValue(payload, true);
    const query = PAGE_GEN_SOURCES.concat(q);
    return concat(
      of(setRuleDetailDataStateAction("loading")),
      of(trySetVarSourcesPagination(payload)),

      get(
        state$,
        query,
        setVarSourceAction,
        client
      ).pipe(
        concatMap((cb: DispatchAction<PaginatedListApi<TemplateSourceApi>>) => [
          cb,
          setRuleDetailDataStateAction("complete")

        ]),
        catchError(_err => of(setRuleDetailDataStateAction("error")))
      )
    );
  }),
  catchError(_err => of(setRuleDetailDataStateAction("error")))
);

export const SET_SOURCE_FILE = "SET_SOURCE_FILE";

export function setSourceFileAction(payload: SetupFile) {
  return ({
    type: SET_SOURCE_FILE,
    payload
  });
}

/* detail */
export const TRY_GET_VAR_SOURCE_DETAIL = "TRY_GET_VAR_SOURCE_DETAIL";

export function tryGetVarSourceDetailAction(payload: DetailActionInterfacePayload) {
  return ({
    type: TRY_GET_VAR_SOURCE_DETAIL,
    payload
  });
}

export const SET_VAR_SOURCE_DETAIL = "SET_VAR_SOURCE_DETAIL";

export function setVarSourceDetailAction(payload: [TemplateSourceApi]) {
  return ({
    type: SET_VAR_SOURCE_DETAIL,
    payload: payload[0]
  });
}

export const tryGetTemplateVarSourceDetailEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_VAR_SOURCE_DETAIL),
  switchMap((disp: DispatchAction<DetailActionInterfacePayload>) => {
    const { payload: { id } } = disp;
    const query = `${PAGE_GEN_SOURCES}${id}/`;
    return concat(
      of(setRuleDetailDataStateAction("loading")),
      get(
        state$,
        query,
        setVarSourceDetailAction,
        client
      ).pipe(
        concatMap((cb: DispatchAction<PaginatedListApi<TemplateSourceApi>>) => [
          cb,
          setRuleDetailDataStateAction("complete")

        ]),
        catchError(_err => of(setRuleDetailDataStateAction("error")))
      )
    );
  }),
  catchError(_err => of(setRuleDetailDataStateAction("error")))
);

/* post */

export const TRY_UPDATE_SOURCE = "TRY_UPDATE_SOURCE";

interface UpdateSourceActionPayload {
    selection: Record<string, boolean>;
    file: SetupFile;
}

export function tryUpdateSourceAction(payload: UpdateSourceActionPayload) {
  return ({
    type: TRY_UPDATE_SOURCE,
    payload
  });
}

export function postContent(payload: any) {
  return ({
    type: "POST_CONTENT",
    payload
  });
}

export const tryUpdateSourceEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> =>
  action$.pipe(
    ofType(TRY_UPDATE_SOURCE),
    switchMap(
      ({
        payload
      }: DispatchAction<UpdateSourceActionPayload>) => {
        const { file, selection } = payload;

        const formData = makeSourceCsvPayload(file);

        return concat(
          of(setRuleDetailFormStateAction("pending")),
          post(
            state$,
            PAGE_GEN_SOURCES,
            postContent,
            client,
            formData
          ).pipe(
            concatMap((_cb: DispatchAction<any>) => [
              resetSelectionSource({ state: selection, value: false }),
              tryGetVarSourceAction(DEFAULT_PAGINATION_PARAMS)
            ]),
            catchError((e) => {
              const msgErr = e.response
                ? e.response.non_field_errors[0]
                : "error processing file";
              // eslint-disable-next-line
              console.warn(e, msgErr);

              return of(setRuleDetailFormStateAction("error"));
            })
          )
        );
      }
    )
  );

/* delete */

export const TRY_DELETE_SOURCE_ITEM = "TRY_DELETE_SOURCE_ITEM";

export function tryDeleteSourceItem(payload: DetailActionInterfacePayload) {
  return ({
    type: TRY_DELETE_SOURCE_ITEM,
    payload
  });
}

export const DELETE_SOURCE_ITEM = "TRY_DELETE_SOURCE_ITEM";

export function deleteSourceItem(payload: any) {
  return ({
    type: DELETE_SOURCE_ITEM,
    payload
  });
}

export const tryDeleteSourceItemEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_DELETE_SOURCE_ITEM),
  switchMap((disp: DispatchAction<DetailActionInterfacePayload>) => {
    const { payload: { id } } = disp;

    const query = `${PAGE_GEN_SOURCES}${id}/`;

    return concat(
      of(setRuleDetailDataStateAction("loading")),
      del(
        state$,
        query,
        deleteSourceItem,
        client
      ).pipe(
        concatMap((_cb: any) => [
          tryGetVarSourceAction(DEFAULT_PAGINATION_PARAMS)
        ]),
        catchError(_err => of(setRuleDetailDataStateAction("error")))
      )
    );
  }),
  catchError(_err => of(setRuleDetailDataStateAction("error")))
);

/* source data content  */
export const TRY_ADD_SOURCE_DATA = "TRY_ADD_SOURCE_DATA";

export interface AddSourceDataItemPayload {
    file_path: string;
    delimiter: QueuedItemDelimiter,
    excel_columns: string;
}

export type AddSourceDataPayload = AddSourceDataItemPayload[]

export function tryAddSourceDataAction(payload: AddSourceDataPayload) {
  return ({
    type: TRY_ADD_SOURCE_DATA,
    payload
  });
}

export const ADD_SOURCE_DATA = "ADD_SOURCE_DATA";

function addSourceDataAction(payload: any) {
  return ({
    type: ADD_SOURCE_DATA,
    payload
  });
}

export const tryAddSourceDataEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> =>
  action$.pipe(
    ofType(TRY_ADD_SOURCE_DATA),
    switchMap(
      ({
        payload
      }: DispatchAction<AddSourceDataPayload>) => {
        const _formData = new FormData();
        _formData.append("keywords", JSON.stringify(payload));
        return concat(
          of(setRuleDetailFormStateAction("pending")),
          post(
            state$,
            PAGE_GEN_SOURCES_DATA,
            addSourceDataAction,
            client,
            _formData
          ).pipe(
            concatMap((_cb: DispatchAction<any>) => [
              setRuleDetailFormStateAction("success")
            ]),
            catchError((e) => {
              const msgErr = e.response
                ? e.response
                : "error processing file";
              // eslint-disable-next-line
              console.warn(e, msgErr);

              return of(setRuleDetailFormStateAction("error"));
            })
          )
        );
      }
    )
  );
