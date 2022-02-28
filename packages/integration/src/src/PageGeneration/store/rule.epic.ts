import {
  getAsyncMsg,
  protectedFormUpdate,
  StaticAppState
} from "src/redux/store/store.utils";
import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { concat, merge, Observable, of, throwError } from "rxjs";
import { ofType } from "redux-observable";
import { catchError, concatMap, endWith, filter, startWith, switchMap, tap } from "rxjs/operators";
import { DispatchAction, FormState, ListLoadState, PaginatedListApi, PROCESS_STATUS, RuleInterface } from "src/model";
import { CHEAT_PAGINATION, PAGE_GEN_RULES, PAGE_GEN_RULES_GET_CAMPAINS } from "src/api/routes/api_routes";
import produce, { current } from "immer";
import { processStatusAction } from "src/redux/store/app";
import { history } from "../../route-history";
import { normalizeRuleItemApi } from "../shared/helper";
import { setPageQueuedDataStateAction, setPageQueueFormStateAction, updateTemplateQueueKwdAction } from "./queue.epic";
import { del, get } from "../../api/accessors/genericAccessors";
import { SET_RULE_CAMPAINS, SET_SELECTED_RULE, TRY_GET_RULE_CAMPAINS } from "./const";
import { CampaignInterface } from "../../model/api";
import { setRuleCampaignsAction } from "./actions";
import {
  DetailActionInterfacePayload,
  RuleKeyword,
  TemplateAreaItemImg,
  TemplateAreaItemProduct,
  TemplateAreaItemText,
  TemplateMeta,
  TemplatePageRuleListApi,
  TemplateRuleApiDenormalized,
  TemplateVariableApi,
  TemplateZoneApi,
  UtmVar,
  VariableFormInterface
} from "../model";

/**
 *
 * @param data
 * @param path
 * @param nextNodes
 * @param entity
 * @param iteration
 */
function abstractTraverseApi<T, U, V>(
  data: Array<any> | T,
  path: Array<string | number>,
  nextNodes: { predicateProp: U, entity: V }[],
  entity: V,
  iteration = 0
) {
  if(path.length === 1) {
    return [data, path];
  }
  if(!Array.isArray(data)) {
    // eslint-disable-next-line
    console.warn(data, "is not iterable list");
    return [];
  }

  const entityId = nextNodes[iteration].predicateProp;
  const _match = data.find((el: any) => el[entityId] === path[0]);

  const next = iteration + 1;

  if(_match && nextNodes[next]) {
    const nextEntity = nextNodes[next].entity;
    // if two remains means we're done
    //  the next path is sliced and the last value is prop value to read
    // eslint-disable-next-line
        const [, ...remaining] = path;
    const nextIteration = remaining.length === 0 ? _match : _match[nextEntity];

    return abstractTraverseApi<T, U, V>(nextIteration, remaining, nextNodes, nextEntity, next);
  }
  // eslint-disable-next-line
  console.warn("match failed for ", current(data), " against key ", entityId, "  with the value", path[0]);

  return [];
}

/**
 *  given a path, will
 *  traverse queue list to get zone item at each node, will match path id with next node list
 *  id(row id)
 *      |___keywords/keyword_id
 *            |___pages/page_id
 *                 |___zones/zone_id
 *                 |___sub_zones/zone_id
 *
 * @param list
 * @param path
 * @param prop
 * @param iteration
 */
export function traverseQueue(
  list: any[] | TemplateZoneApi,
  path: Array<string | number>,
  prop: "keywords" | "pages" | "zones" | "sub_zones" | "root",
  iteration = 0
) {
  const NODES: { predicateProp: "id" | "keyword_id" | "page_id" | "zone_id", entity: "keywords" | "pages" | "zones" | "sub_zones" | "root" }[] = [
    { predicateProp: "id", entity: "root" },
    { predicateProp: "keyword_id", entity: "keywords" },
    { predicateProp: "page_id", entity: "pages" },
    { predicateProp: "zone_id", entity: "zones" },
    { predicateProp: "zone_id", entity: "sub_zones" },
    { predicateProp: "zone_id", entity: "zones" }

  ];
    type QueuePredicateProp = "id" | "keyword_id" | "page_id" | "zone_id";
    type QueueEntity = "keywords" | "pages" | "zones" | "sub_zones" | "root";

    return abstractTraverseApi<TemplateZoneApi, QueuePredicateProp, QueueEntity>(list, path, NODES, prop, iteration);
}

function updateZoneItem(list: TemplatePageRuleListApi[], path: Array<string>, value: unknown) {
  return produce(list, (draftState: TemplatePageRuleListApi[]) => {
    const [datum, propToUpdate] = traverseQueue(draftState, path, "root");
    if(datum) {
      const idx = datum.findIndex(d => d.zone_id === propToUpdate[0]);
      if(Number.isFinite(idx)) {
        datum[idx] = value;
      } else {
        // eslint-disable-next-line
        console.warn("failed to find zone ", propToUpdate, "in", current(datum));
      }

      return draftState;
    } else {
      // eslint-disable-next-line
      console.warn("failed to update value", value, "with path", path);
      return draftState;
    }
  });
}

/* VAR FORM */
export const SET_VARIABLE_FORM = "SET_VARIABLE_FORM";

export function setVariableFormAction(payload: VariableFormInterface) {
  return {
    type: SET_VARIABLE_FORM,
    payload
  };
}

export const PATCH_VARIABLE_FORM = "PATCH_VARIABLE_FORM";

export function patchVariableFormAction(payload: { key: string; value: Partial<VariableFormInterface> | TemplateVariableApi[] }) {
  return {
    type: PATCH_VARIABLE_FORM,
    payload
  };
}

export const PARTIAL_VARIABLE_FORM = "PARTIAL_VARIABLE_FORM";

export function partialVariableFormAction(payload: Partial<VariableFormInterface>) {
  return {
    type: PARTIAL_VARIABLE_FORM,
    payload
  };
}

export const RESET_VARIABLE_FORM = "RESET_VARIABLE_FORM";

export function resetVariableFormAction() {
  return {
    type: RESET_VARIABLE_FORM
  };
}

export const SET_VARIABLES = "SET_VARIABLES";

export function setVariablesAction(payload: TemplateVariableApi[]) {
  return {
    type: SET_VARIABLES,
    payload
  };
}

export const ADD_VARIABLES = "ADD_VARIABLES";

export function addVariablesAction(payload: TemplateVariableApi) {
  return {
    type: ADD_VARIABLES,
    payload
  };
}

export const PATCH_VARIABLES = "PATCH_VARIABLES";

export function patchVariablesAction(payload: { idx: number, value: TemplateVariableApi }) {
  return {
    type: PATCH_VARIABLES,
    payload
  };
}

export const DELETE_VARIABLES = "DELETE_VARIABLES";

export function deleteVariablesAction(payload: { idx: number }) {
  return {
    type: DELETE_VARIABLES,
    payload
  };
}

export const ADD_ZONES = "ADD_ZONES";

export function addRuleZonesAction(payload: TemplateAreaItemText | TemplateAreaItemImg | TemplateAreaItemProduct) {
  return {
    type: ADD_ZONES,
    payload
  };
}

export const PATCH_ZONES = "PATCH_ZONES";

export function patchRuleZonesAction(payload: { id: string, value: TemplateAreaItemText | TemplateAreaItemImg | TemplateAreaItemProduct }) {
  return {
    type: PATCH_ZONES,
    payload
  };
}

export const PATCH_RULE_DETAIL = "PATCH_RULE_DETAIL";

export function patchRuleDetailAction<T>(payload: { key: string; value: T; }) {
  return {
    type: PATCH_RULE_DETAIL,
    payload
  };
}

export const PATCH_RULE_UTM = "PATCH_RULE_UTM";

export function patchRuleUtmAction(payload: { url_pattern: string; utm: UtmVar[]; }) {
  return {
    type: PATCH_RULE_UTM,
    payload
  };
}

export const PATCH_RULE_META = "PATCH_RULE_META";

export function patchRuleMetaAction(payload: TemplateMeta) {
  return {
    type: PATCH_RULE_META,
    payload
  };
}

export const PATCH_RULE_KEYWORDS = "PATCH_RULE_KEYWORDS";

export function patchRuleKeywordsAction(payload: RuleKeyword) {
  return ({
    type: PATCH_RULE_KEYWORDS,
    payload
  });
}

/* *****************************************************
 *
 *             rules
 *
 * **************************************************** */

/*  DETAIL */
export const TRY_GET_RULE_DETAIL = "TRY_GET_RULE_DETAIL";

export function tryGetRuleDetailAction(payload: DetailActionInterfacePayload) {
  return ({
    type: TRY_GET_RULE_DETAIL,
    payload
  });
}

export const SET_RULE_DETAIL_TEMPLATE_ID = "SET_RULE_DETAIL_TEMPLATE_ID";

export function setRuleDetailTemplateId(payload: number) {
  return ({
    type: SET_RULE_DETAIL_TEMPLATE_ID,
    payload
  });
}

export const RESET_RULE_DETAIL = "RESET_RULE_DETAIL";

export function resetRuleDetailAction(payload: number) {
  return {
    type: RESET_RULE_DETAIL,
    payload
  };
}

export const SET_RULE_DETAIL = "SET_RULE_DETAIL";

export function setRuleDetail(payload: TemplateRuleApiDenormalized) {
  return ({
    type: SET_RULE_DETAIL,
    payload: normalizeRuleItemApi(payload)
  });
}

export const SET_RULE_DETAIL_DATA_STATE = "SET_RULE_DETAIL_DATA_STATE";

export function setRuleDetailDataStateAction(state: ListLoadState, msg: string = "") {
  return ({
    type: SET_RULE_DETAIL_DATA_STATE,
    payload: {
      state,
      msg
    }
  });
}

export const SET_RULE_DETAIL_FORM_STATE = "SET_RULE_DETAIL_FORM_STATE";

export function setRuleDetailFormStateAction(state: FormState, msg: string = "") {
  return ({
    type: SET_RULE_DETAIL_FORM_STATE,
    payload: {
      state,
      msg
    }
  });
}

export const CLEAR_RULE_DETAIL_SHARED_STATE = "CLEAR_RULE_DETAIL_SHARED_STATE";

export function clearRuleDetailSharedState() {
  return {
    type: CLEAR_RULE_DETAIL_SHARED_STATE
  };
}

export const CLEAR_RULE_DETAIL_ASYNC_MSG = "CLEAR_RULE_DETAIL_ASYNC_MSG";

export function clearRuleDetailAsyncMsgAction() {
  return {
    type: CLEAR_RULE_DETAIL_ASYNC_MSG
  };
}

export const tryGetRuleDetailEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_RULE_DETAIL),
  switchMap((disp: DispatchAction<DetailActionInterfacePayload>) => {
    const { payload: { id } } = disp;
    const q = `${PAGE_GEN_RULES}${id}/`;
    return concat(
      get(
        state$,
        q,
        setRuleDetail,
        client
      ).pipe(
        concatMap(disp => concat(
          of(disp)
        ))
      ),
      of(setRuleDetailDataStateAction("complete"))
    );
  }),
  /* eslint handle-callback-err: "warn" */
  catchError((error, caught) => merge(
    of(setRuleDetailDataStateAction("error", "failed to lod the data")),
    caught
  ))
);

export const TRY_POST_RULE_DETAIL = "TRY_POST_RULE_DETAIL";

export function tryPostRuleDetailAction(payload: { datum: TemplateRuleApiDenormalized, id: string }) {
  return ({
    type: TRY_POST_RULE_DETAIL,
    payload
  });
}

export function updateRuleForm$<T>(
  state$: StaticAppState,
  endpoint: string,
  client: AjaxCreationMethod,
  payload: T,
  type: "POST" | "PUT" | "PATCH",
  ...successCb$: Observable<DispatchAction<any> | { type: string }>[]
) {
  return concat(
    of(setRuleDetailFormStateAction("pending")),
    protectedFormUpdate(
      state$,
      endpoint,
      client,
      payload,
      type
    ).pipe(
      switchMap(
        res => concat(
          of(setRuleDetailFormStateAction("idle")),
          of({ type: "SUCCESS_RESPONSE", payload: res }),
          ...successCb$
        )
      ),
      catchError((e) => {
        // eslint-disable-next-line
        console.warn(e);
        /*          const msgErr = e.response
                              ? e.response.file[0]
                              : "error processing file"; */
        return throwError(getAsyncMsg(e.response));
      })
    )
  );
}

export const tryPostRuleDetailEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_POST_RULE_DETAIL),
  switchMap((disp: DispatchAction<{ datum: TemplateRuleApiDenormalized, id: string } | any>) => {
    const { payload: { datum, id } } = disp;
    return updateRuleForm$(
      state$,
      PAGE_GEN_RULES,
      client,
                datum as any,
                "POST"
    ).pipe(
      catchError((err: string) => throwError(err)),
                filter((disp: DispatchAction<any>) => disp.type === "SUCCESS_RESPONSE") as any,

                tap(
                  ({ payload: { response } }: DispatchAction<AjaxResponse>) => {
                    if(response.id) {
                      history.push(`/generation/template/${id}/rule/${response.id.toString()}/edit/`);
                    }
                  }
                ),
                switchMap(_ => of(setRuleDetailFormStateAction("success")))
    );
  }),
  // https://github.com/redux-observable/redux-observable/issues/591
  // ad the merge operator to keep root store sub alive.
  catchError((error, caught) => merge(
    of(setRuleDetailFormStateAction("error", error)),
    caught
  ))
);
export const TRY_PUT_RULE_DETAIL = "TRY_PUT_RULE_DETAIL";

export function tryPutRuleDetailAction(payload: { datum: TemplateRuleApiDenormalized, id: number }) {
  return ({
    type: TRY_PUT_RULE_DETAIL,
    payload
  });
}

export const tryPutRuleDetailEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_PUT_RULE_DETAIL),
  switchMap((disp: DispatchAction<{ datum: TemplateRuleApiDenormalized, id: number }>) => {
    const { payload } = disp;

    return updateRuleForm$(
      state$,
      PAGE_GEN_RULES.concat(payload.id.toString(), "/"),
      client,
      payload.datum,
      "PUT"
    ).pipe(
      switchMap(_resp => of(setRuleDetailFormStateAction("success")))
    );
  }),
  catchError((error, caught) => merge(
    of(setRuleDetailFormStateAction("error", error)),
    caught
  ))
);

export const TRY_PATCH_RULE_DETAIL = "TRY_PATCH_RULE_DETAIL";

export function tryPatchRuleDetailAction(payload: { datum: Partial<TemplateRuleApiDenormalized>, id: number }) {
  return ({
    type: TRY_PATCH_RULE_DETAIL,
    payload
  });
}

export const tryPatchRuleDetailEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_PATCH_RULE_DETAIL),
  switchMap((disp: DispatchAction<{ datum: Partial<TemplateRuleApiDenormalized>, id: number }>) => {
    const { payload } = disp;

    return concat(
      updateRuleForm$(
        state$,
        PAGE_GEN_RULES.concat(payload.id.toString(), "/"),
        client,
        payload.datum,
        "PATCH"
      ),

      of(history.push(`/generation/template/${payload.datum.template_id}/rule/${payload.id.toString()}/recap/`)).pipe(
        switchMap(_ => of(setRuleDetailFormStateAction("idle")))
      )
    );
  }),
  catchError((error, caught) => merge(
    of(setRuleDetailFormStateAction("error", getAsyncMsg(error.response))),
    caught
  ))
);

/* Page zone */

export interface ZoneProposalPayload {
    rule_id: number;
    page_id: string;
    zone_id: string;
}

export interface ZoneProposalPayloadWithUserSelection extends ZoneProposalPayload {
    userSelection: TemplateZoneApi | undefined;
}

export const TRY_GET_ZONE_PROPOSAL = "TRY_GET_ZONE_PROPOSAL";

export function tryGetZoneProposalAction(payload: ZoneProposalPayloadWithUserSelection) {
  return ({
    type: TRY_GET_ZONE_PROPOSAL,
    payload
  });
}

export const SET_ZONE_PROPOSAL = "SET_ZONE_PROPOSAL";

export function setZoneProposalAction(userSelection: TemplateZoneApi | undefined) {
  return (payload: PaginatedListApi<TemplateZoneApi>) => ({
    type: SET_ZONE_PROPOSAL,
    payload: {
      userSelection,
      data: payload
    }
  });
}

export const tryGetZoneProposalEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_ZONE_PROPOSAL),
  switchMap((disp: DispatchAction<ZoneProposalPayloadWithUserSelection>) => {
    const { payload: { rule_id, page_id, zone_id, userSelection } } = disp;

    const partSetZoneProposalAction = setZoneProposalAction(userSelection);
    const q = `${PAGE_GEN_RULES}${rule_id}/pages/${page_id}/zones/${zone_id}/proposals?${CHEAT_PAGINATION}`;
    return get(
      state$,
      q,
      partSetZoneProposalAction,
      client
    );
  }),
  /* eslint handle-callback-err: "warn" */
  catchError((error, caught) => merge(
    of(setPageQueuedDataStateAction("error", "failed  to load the data")),
    caught
  ))
);

export const TRY_UPDATE_ZONE_PROPOSAL_DETAIL = "TRY_UPDATE_ZONE_PROPOSAL_DETAIL";

export interface UpdateZoneProposalPayload extends ZoneProposalPayload {
    data: TemplateZoneApi,
}

export function tryUpdateZoneProposalDetailAction(payload: UpdateZoneProposalPayload) {
  return ({
    type: TRY_UPDATE_ZONE_PROPOSAL_DETAIL,
    payload
  });
}

/*
function patchZone(list: TemplatePageRuleListApi[], [rule_id, page_id, zone_id], value) {
    const ruleIdx = list.findIndex(el => el.id === rule_id);

    if (ruleIdx === undefined) {
        return list

    }

    const kdwIdx = list[ruleIdx].keywords.findIndex(k => k.pages.find(p => p.page_id === page_id));
    if (kdwIdx === undefined) {
        return list
    }
    const pageIdx = list[ruleIdx].keywords[kdwIdx].pages.findIndex(p => p.page_id === page_id);
    const zoneIdx = list[ruleIdx].keywords[kdwIdx].pages[pageIdx].zones.findIndex(s => s.zone_id === zone_id);

    if (zoneIdx === undefined) {
        return list

    }
    return produce(list, (draftState) => {
        draftState[ruleIdx].keywords[kdwIdx].pages[pageIdx].zones[zoneIdx] = value
    })

}
*/

export const tryPostZoneProposalDetailEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_UPDATE_ZONE_PROPOSAL_DETAIL),
  switchMap((disp: DispatchAction<UpdateZoneProposalPayload>) => {
    const { payload: { rule_id, page_id, zone_id, data } } = disp;

    const content = { zone_data: data };

    const q = `${PAGE_GEN_RULES}${rule_id}/pages/${page_id}/zones/${zone_id}/update-data`;

    const _paginatedQ = state$.value.pageQueue.list;

    const ruleIdx = _paginatedQ.results.findIndex(el => el.id === rule_id);

    const kdwIdx = _paginatedQ.results[ruleIdx].keywords.find(k => k.pages.find(p => p.page_id === page_id));

    const updateList = updateZoneItem(
      _paginatedQ.results,
      [
        rule_id,
        (kdwIdx as any).keyword_id,
        page_id,
        zone_id
      ],
      data
    );

    const updatedKwd = updateList[ruleIdx].keywords;

    return concat(
      of(setPageQueueFormStateAction("pending")),
      protectedFormUpdate(
        state$,
        q,
        client,
        content,
        "POST"
      )
        .pipe(
          concatMap((_resp: AjaxResponse) => [
            updateTemplateQueueKwdAction(rule_id, updatedKwd),
            //      setPageQueueFormStateAction('success'),
            setPageQueueFormStateAction("idle")

          ]),
          catchError((e) => {
            const msgErr = e.response
              ? e.response.non_field_errors[0]
              : "error processing file";
              // eslint-disable-next-line
              console.warn(e, msgErr);

            return of(setPageQueueFormStateAction("error"));
          })
        )
    );
  }),
  catchError(_err => of(setPageQueueFormStateAction("error")))
);
/*  TEMPLATE RUL SELECT/DESELECT  campaigns/adgroups/keywords /query(?) */

export type SELECTED_TEMPLATE_KEYS = "queries" | "pages" | "keywords" | "adgroups" | "campaigns"
export const SET_SELECT_TEMPLATE_QUERIES = "SET_SELECT_TEMPLATE_QUERIES";

export function setSelectTemplateQueries(payload: Record<SELECTED_TEMPLATE_KEYS, string | number>) {
  return {
    type: SET_SELECT_TEMPLATE_QUERIES,
    payload: payload
  };
}

export const PATCH_SELECT_TEMPLATE_QUERIES = "PATCH_SELECT_TEMPLATE_QUERIES";

export function patchSelectTemplateQueries<T>(payload: { key: SELECTED_TEMPLATE_KEYS, value: Array<T> }) {
  return {
    type: PATCH_SELECT_TEMPLATE_QUERIES,
    payload
  };
}

export const TRY_DELETE_RULE_DETAIL_FROM_TEMPLATE_LIST = "TRY_DELETE_RULE_DETAIL_FROM_TEMPLATE_LIST";

/**
 * because of reason, delete the rule from the template list
 * delete the rule , then in store, get the template and then update its rule list
 *
 * @param payload
 */
export function tryDeleteRuleDetailFromTemplateListAction(payload: { ruleId: number, templateId: number }) {
  return ({
    type: TRY_DELETE_RULE_DETAIL_FROM_TEMPLATE_LIST,
    payload
  });
}

export const DELETE_RULE_DETAIL_FROM_TEMPLATE_LIST = "DELETE_RULE_DETAIL_FROM_TEMPLATE_LIST";

export function deleteDetailFromTemplateListAction(payload: { ruleId: number, templateId: number }) {
  return () => ({
    type: DELETE_RULE_DETAIL_FROM_TEMPLATE_LIST,
    payload
  });
}

export const tryDeleteRuleDetailEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_DELETE_RULE_DETAIL_FROM_TEMPLATE_LIST),
  switchMap((disp: DispatchAction<{ ruleId: number, templateId: number }>) => {
    const { payload } = disp;

    const query = `${PAGE_GEN_RULES}${payload.ruleId.toString()}`;
    const parDeleteDetailAction = deleteDetailFromTemplateListAction(payload);
    return concat(
      del(
        state$,
        query,
        parDeleteDetailAction,
        client
      )
    );
  }),
  catchError(_err => of(setRuleDetailDataStateAction("error")))
);

export const SET_RULE_LIST_DATA_STATE_SET = "SET_RULE_LIST_DATA_STATE_SET";

export function setRuleListDataStateAction(state: ListLoadState, msg: string = "") {
  return ({
    type: SET_RULE_LIST_DATA_STATE_SET,
    payload: {
      state,
      msg
    }
  });
}

// export const tryGetRuleCampainEpic$ = (
//   action$: any,
//   state$: StaticAppState,
//   client: AjaxCreationMethod = ajax
// ): Observable<void> => {
//   return action$.pipe(
//     ofType(TRY_GET_RULE_CAMPAINS),
//     switchMap((disp: DispatchAction<{ ruleId: number}>) => {
//       const { payload } = disp;
//       const query = `${PAGE_GEN_RULES_GET_CAMPAINS}${payload.ruleId}/campaigns/`;
//       return concat(
//         get(
//           state$,
//           query,
//           setRuleCampaignsAction,
//           client
//         )
//       ).pipe(
//         startWith(processStatusAction(PROCESS_STATUS.PROCESSING)),
//         endWith(processStatusAction(PROCESS_STATUS.DONE)),
//         catchError(_err => throwError(_err))
//       )
//     }),
//     catchError(err => of(
//       processStatusAction(PROCESS_STATUS.FAIL),
//       setRuleDetailDataStateAction(err)

//     ))
//   );
// };
