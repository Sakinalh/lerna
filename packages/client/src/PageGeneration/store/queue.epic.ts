import { ofType } from "redux-observable";
import { concat, forkJoin, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, concatMap, mergeMap, switchMap } from "rxjs/operators";
import {
  DataMachineState,
  DispatchAction,
  FormState,
  ListLoadState,
  PaginatedListApi,
  SelectableKwdPages
} from "src/model";
import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import produce from "immer";
import { StaticAppState } from "../../redux/store/store.utils";
import {
  ExtendedTemplateZoneApi,
  StatefulPaginatedInterfaceActionPayload,
  TemplateKeywordApi,
  TemplatePageApi,
  TemplatePageRuleListApi,
  TemplateZoneApi
} from "../model";
import { ResumeActionPayload } from "../../redux/store/app";
import { PAGE_GEN_RULES } from "../../api/routes/api_routes";
import { queryParamsToStr } from "../../components/AppPaginator/AppPaginator.component";
import { get, post } from "../../api/accessors/genericAccessors";

/* ***************************************************
 *
 *  QUEUE
 *
 * *************************************************** */

/* QUEUE KWD * /
/*  QUEUE KEYWORDS */
export const TRY_GET_TEMPLATE_QUEUE_KWD = "TRY_GET_TEMPLATE_QUEUE_KWD";
export const SET_TEMPLATE_QUEUE_KWD = "SET_TEMPLATE_QUEUE_KWD";

export interface PaginatedActionInterfacePayload {
    query: string;
    id: number;
}

export function tryGetTemplateQueueKwdAction(payload: PaginatedActionInterfacePayload) {
  return {
    type: TRY_GET_TEMPLATE_QUEUE_KWD,
    payload
  };
}

export function setSelectablePages(list: TemplateKeywordApi[], ruleId: number): SelectableKwdPages {
  return list.reduce((acc, curr) => {
    // by default take the first on list
    const selectedPage = curr.pages.length === 0 ? "" : curr.pages[0].page_id;
    return (
      {
        ...acc,
        ...{
          [curr.keyword_id]:
                        { selectedPage, ruleId, isSelected: false }
        }
      });
  }, {});
}

function _flattenSub(datum: ExtendedTemplateZoneApi): ExtendedTemplateZoneApi[] {
  /* if (datum.zone_type === "complex") {
    let _data: any[] = [];
    for (const sub of datum.sub_zones) {
      _data = _data.concat(_flattenSub({
        ...sub,
        keyword_id: datum.keyword_id,
        page_id: datum.page_id,
        _parentZoneId: datum.zone_id
      }));
    }
    return _data;
  } */
  return [datum];
}

export function flattenZones(keywords: TemplateKeywordApi[]) {
  return keywords.reduce((acc: any[], curr: TemplateKeywordApi) => [...acc, ...curr.pages.map((page: TemplatePageApi) => page.zones.reduce((_acc: TemplateZoneApi[], _curr: TemplateZoneApi) => [..._acc, ..._flattenSub({
    ..._curr,
    keyword_id: curr.keyword_id,
    page_id: page.page_id,
    _parentZoneId: null
  })], []), [])], []);
}

export function setTemplateQueueKwdAction(id: number, accList: TemplateKeywordApi[]) {
  return (payload: PaginatedListApi<TemplateKeywordApi>) => {
    const { results, ...rest } = payload;
    // do not display is_dismissed page. kind of deleting
    // const filtered = results.map(kwd => ({...kwd, pages: kwd.pages.filter(p => !p.is_dismissed)}));

    const zoneMatrix = flattenZones(accList.concat(results));
    return {
      type: SET_TEMPLATE_QUEUE_KWD,
      payload: [id, accList.concat(results), setSelectablePages(accList.concat(results), id), zoneMatrix, rest]
    };
  };
}

function getKwdList(list: TemplatePageRuleListApi[], rowId: number) {
  const currentKwdList = list.find(z => z.id === rowId);
  if(currentKwdList === undefined) {
    return [];
  }
  return currentKwdList.keywords;
}

export const SET_PAGE_QUEUE_DATA_STATE = "SET_PAGE_QUEUE_DATA_STATE_SET";

export function setPageQueuedDataStateAction(state: ListLoadState, msg: string = "") {
  return ({
    type: SET_PAGE_QUEUE_DATA_STATE,
    payload: {
      state,
      msg
    }
  });
}

export const SET_PAGE_QUEUE_FORM_STATE = "SET_PAGE_QUEUE_FORM_STATE";

export function setPageQueueFormStateAction(state: FormState, msg: string = "") {
  return ({
    type: SET_PAGE_QUEUE_FORM_STATE,
    payload: {
      state,
      msg
    }
  });
}

export const tryGetTemplateQueueKwdEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_TEMPLATE_QUEUE_KWD),
  switchMap(({
    payload: { query, id }
  }: DispatchAction<PaginatedActionInterfacePayload>) => {
    const currentKwdlist = getKwdList(state$.value.pageQueue.list.results, id);

    const partSetTemplateQueueKwdAction = setTemplateQueueKwdAction(id as number, currentKwdlist);

    return concat(
      of(setLoadPagesStateAction("loading")),
      get(
        state$,
        query,
        partSetTemplateQueueKwdAction,
        client
      )
    );
  }),
  catchError(err => of(setPageQueuedDataStateAction("error", err)))
);
export const TRY_BATCH_GET_TEMPLATE_QUEUE_KWD = "TRY_BATCH_GET_TEMPLATE_QUEUE_KWD";

export function tryPatchGetTemplateQueueKwdAction(payload: { queries: PaginatedActionInterfacePayload[], nextSelectValue: boolean }) {
  return {
    type: TRY_BATCH_GET_TEMPLATE_QUEUE_KWD,
    payload
  };
}

/**
 * on select all, batch the setTemplateQueueKwdAction
 * then on the selected keys apply the value

 * @param action$
 * @param state$
 * @param client
 */
export const tryBatchGetTemplateQueueKwdEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_BATCH_GET_TEMPLATE_QUEUE_KWD),
  switchMap(({
    payload: { queries, nextSelectValue }
  }: DispatchAction<{ queries: PaginatedActionInterfacePayload[], nextSelectValue: boolean }>) => {
    const q$ = queries.map((queryPayload: PaginatedActionInterfacePayload) => {
      const currentKwdlist = getKwdList(state$.value.pageQueue.list.results, queryPayload.id);

      const partSetTemplateQueueKwdAction = setTemplateQueueKwdAction(queryPayload.id as number, currentKwdlist);
      return get(
        state$,
        queryPayload.query,
        partSetTemplateQueueKwdAction,
        client
      );
    });
    return concat(
      of(setLoadPagesStateAction("loading")),
      forkJoin(q$).pipe(
        concatMap((response: Array<DispatchAction<PaginatedListApi<TemplateKeywordApi>>>) => [...response.map(action => action),
          ...[
            setLoadPagesStateAction("success"),
            setValueOnSelectAllAction(nextSelectValue)
          ]
        ])
      )
    );
  }),
  catchError(_err => of(setPageQueuedDataStateAction("error")))
);

export const UPDATE_TEMPLATE_QUEUE_KWD = "UPDATE_TEMPLATE_QUEUE_KWD";

export function updateTemplateQueueKwdAction(id: number, list: TemplateKeywordApi[]) {
  const zoneMatrix = flattenZones(list);
  return {
    type: UPDATE_TEMPLATE_QUEUE_KWD,
    payload: [id, list, zoneMatrix]
  };
}

const TRY_POST_TEMPLATE_QUEUE_KWD = "TRY_POST_TEMPLATE_QUEUE_KWD";

export function tryPostTemplateQueueKwdAction(payload: { id: number, payload: any }) {
  return {
    type: TRY_POST_TEMPLATE_QUEUE_KWD,
    payload
  };
}

function placeHolder() {
  return {
    type: "PLACEHOLDER"
  };
}

export const tryPostTemplateQueueKwdEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_POST_TEMPLATE_QUEUE_KWD),
  switchMap(({
    payload: { id, payload }
  }: DispatchAction<{ id: number, payload: any }>) => post(
    state$,
    `${PAGE_GEN_RULES}${id}/edit-pages/`,
    placeHolder,
    client,
    { data: payload }
  ).pipe(
    concatMap((_cb: DispatchAction<any>) => [
      // partSetTemplateQueueKwdAction
      placeHolder()
    ]),
    catchError((e) => {
      const msgErr = e.response
        ? e.response.non_field_errors[0]
        : "error processing file";
      // eslint-disable-next-line
          console.warn(e, msgErr);

      return of(setPageQueuedDataStateAction("error"));
    })
  )),
  catchError(_err => of(setPageQueuedDataStateAction("error")))
);

/* QUEUE LIST */

export const TRY_INIT_TEMPLATE_QUEUE = "TRY_INIT_TEMPLATE_QUEUE";
export const TRY_GET_TEMPLATE_QUEUE = "TRY_GET_TEMPLATE_QUEUE";
export const SET_TEMPLATE_QUEUE = "SET_TEMPLATE_QUEUE";
export const PATCH_SELECTION_QUEUE = "PATCH_SELECTION_QUEUE";
export const SET_SELECTION_QUEUE = "SET_SELECTION_QUEUE";

export const SET_PAGE_QUEUE_PAGINATION = "SET_PAGE_QUEUE_PAGINATION";

export function setPageQueuePaginationAction(payload: StatefulPaginatedInterfaceActionPayload) {
  const newRelativePathQuery = window.location.pathname + queryParamsToStr(payload.qState);
  window.history.replaceState(null, "", newRelativePathQuery);

  return ({
    type: SET_PAGE_QUEUE_PAGINATION,
    payload: payload
  });
}

export function patchSelectableValue(selectableState: SelectableKwdPages, next: boolean) {
  return produce(selectableState, (draftState: SelectableKwdPages) => {
    for(const key in draftState) {
      if(Object(draftState).hasOwnProperty(key)) {
        draftState[key].isSelected = next;
      }
    }
  });
}

function _setPageId(pages, kwd_id: number) {
  if(Array.isArray(pages)) {
    return pages[0].page_id;
  }
  // eslint-disable-next-line
  console.warn("failed to set page for the kwd ", kwd_id);
  return "default";
}

// at init, the selected zone ist the first page
export function initSelectablePages(list: TemplatePageRuleListApi[]): SelectableKwdPages {
  return list.reduce((acc, curr) => {
    const pages = curr.keywords.reduce((kwdAcc, kwdCurr) => (
      {
        ...kwdAcc,
        ...{
          [kwdCurr.keyword_id]:
                            { selectedPage: _setPageId(kwdCurr.pages, kwdCurr.keyword_id), isSelected: false }
        }
      }), {});

    return { ...acc, ...pages };
  }, {});
}

export function setTemplateQueueAction(
  payload: PaginatedListApi<TemplatePageRuleListApi>
) {
  return {
    type: SET_TEMPLATE_QUEUE,
    payload: [payload, {}] // initSelectablePages(payload.results)

  };
}

export function patchSelectionQueueAction(
  payload: { key: number; value: Record<string, string | boolean> }
) {
  return {
    type: PATCH_SELECTION_QUEUE,
    payload
  };
}

export function setSelectionQueueAction(
  payload: SelectableKwdPages
) {
  return {
    type: SET_SELECTION_QUEUE,
    payload
  };
}

export const RESET_QUEUE_STATE = "RESET_QUEUE_STATE";

/**
 * deselect selection
 * empty async msg on selection
 */
export function resetQueueStateAction() {
  return {
    type: RESET_QUEUE_STATE
  };
}

// copy paste from queueTablePublishBtn
interface PublishPageItem {
    keyword_id: number;
    page_id: string
}

interface LinkKwdAdgroupItem {
    keyword_id: number;
    customer_id: string;
    page_id: string;
}

export const SET_QUEUE_ASYNC_MSG = "SET_QUEUE_ASYNC_MSG";

/**
 * deselect selection
 * empty async msg on selection
 */
export function setQueueAsyncMsgAction(payload: { state: FormState, keys: Array<PublishPageItem | LinkKwdAdgroupItem | Record<"page_id", string>>, msg: string }) {
  return {
    type: SET_QUEUE_ASYNC_MSG,
    payload
  };
}

export const SET_VALUE_ON_SELECT_ALL = "SET_VALUE_ON_SELECT_ALL";

export function setValueOnSelectAllAction(payload: boolean) {
  return {
    type: SET_VALUE_ON_SELECT_ALL,
    payload
  };
}

export const SET_LOAD_PAGES_STATE = "SET_LOAD_PAGES_STATE";

export function setLoadPagesStateAction(payload: DataMachineState) {
  return {
    type: SET_LOAD_PAGES_STATE,
    payload
  };
}

export const SET_IS_SELECT_ALL = "SET_IS_SELECT_ALL";

export function setIsSelectAllAction(payload: boolean) {
  return {
    type: SET_IS_SELECT_ALL,
    payload
  };
}

export function tryGetTemplateQueueAction(payload: string) {
  return {
    type: TRY_GET_TEMPLATE_QUEUE,
    payload
  };
}

function resp(res) {
  return { type: "SUCCESS", payload: res };
}

export const tryGetTemplateQueueEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_TEMPLATE_QUEUE),
  switchMap(({
    payload
  }: DispatchAction<string>) => concat(
    of(setPageQueuedDataStateAction("loading")),
    get(
      state$,
      PAGE_GEN_RULES.concat(payload),
      resp,
      client
    ).pipe(
      mergeMap((disp: DispatchAction<PaginatedListApi<TemplatePageRuleListApi> | ResumeActionPayload>) => {
        if(disp.type === "TRY_RESUME_ACTION") {
          return of({
            ...disp,
            payload: {
              ...disp.payload,
              action: setTemplateQueueAction // success cb
            }
          });
        }

        const { payload } = disp;
        return of(setTemplateQueueAction(payload as PaginatedListApi<TemplatePageRuleListApi>));
      })
    ),
    of(setPageQueuedDataStateAction("complete"))
  ))
);
