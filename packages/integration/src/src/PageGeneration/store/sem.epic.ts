import { ofType } from "redux-observable";
import { concat, forkJoin, Observable, of, throwError } from "rxjs";
import { ajax } from "rxjs/ajax";
import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { catchError, concatMap, endWith, mergeMap, startWith, switchMap } from "rxjs/operators";
import Sem, {
  GetCampaignTestByKeywordParams,
  PostCampaignTestInterface,
  PostLinkPageToAdwordsInterface,
  PostPublishPagesInterface
} from "src/api/accessors/Adwords/SemAccessors";
import { createTestStatusAction, linkToAdsStatusAction, processStatusAction, setAppErrorStateAction } from "src/redux/store/app";
import { CREATE_TEST_STATUS, DispatchAction, LINK_TO_ADS_STATUS, PaginatedListApi, PROCESS_STATUS } from "../../model";
import {
  CHEAT_PAGINATION,
  PAGE_GEN_RULES,
  PAGE_GEN_SEM
} from "../../api/routes/api_routes";
import {
  getAsyncMsg,
  getError$,
  protectedFormUpdate,
  StaticAppState
} from "../../redux/store/store.utils";
import {
  LinkKwdAdgroupItem,
  PublishPageItem
} from "../components/TemplatePaginatedQueue/QueueTablePublishBtn/QueueTablePublishBtn.component";
import {
  PageAdgroupInterface,
  PageCampaignInterface,
  PageKwdInterfaceView
} from "../model";
import { setQueueAsyncMsgAction } from "./queue.epic";
import { setModalActionStateAction } from "./shared.epic";
import {
  setRuleDetailDataStateAction,
  setRuleDetailFormStateAction
} from "./rule.epic";
import { get } from "../../api/accessors/genericAccessors";
import {TRY_GET_CAMPAIGN_TEST_BY_KEYWORD, TRY_POST_CREATE_CAMPAIGN_TEST, TRY_POST_LINK_PAGE_TO_ADWORDS, TRY_PUBLISH_PAGES } from "./const";

/* ******************************************************
 *
 *                 campaigns
 *
 * **************************************************** */

export const TRY_GET_CAMPAIGN_LIST = "TRY_GET_CAMPAIGN_LIST";
export const SET_CAMPAIGN_LIST = "SET_CAMPAIGN_LIST";

export function tryGetCampaignListAction(payload: string | null) {
  return {
    type: TRY_GET_CAMPAIGN_LIST,
    payload
  };
}

export function setCampaignListAction(
  payload: PaginatedListApi<PageCampaignInterface>
) {
  return {
    type: SET_CAMPAIGN_LIST,
    payload
  };
}

export function initCampaignListAction(
  payload: PaginatedListApi<PageCampaignInterface>
) {
  return payload;
}

function setCustomerAction(resp: string) {
  return resp;
}

/**
 * quick patch. could have set customer id in store or upon auth
 * whatever
 * @param customerId
 * @param userId
 * @param state$
 * @param client
 */
function getCampaignList(
  customerId: string | null,
  userId: string,
  state$,
  client
): Observable<PaginatedListApi<PageCampaignInterface> | any> {
  /* on error, just set the default paginated value */

  if(customerId) {
    return get(
      state$,
      `${PAGE_GEN_SEM}${customerId}/campaigns?${CHEAT_PAGINATION}`,
      initCampaignListAction,
      client
    );
  }
  // Todo shouldn't necessary anymore. customer id is fetched on getting into generation page

  return get(
    state$,
    `${PAGE_GEN_SEM}${userId}/get-customer-id/`,
    setCustomerAction,
    client
  ).pipe(
    mergeMap((customerIdResp: string) => {
      window.localStorage.setItem("naister_user_customer_id", customerIdResp);
      return get(
        state$,
        `${PAGE_GEN_SEM}${customerIdResp}/campaigns?${CHEAT_PAGINATION}`,
        initCampaignListAction,
        client
      );
    })
  );
}

export const tryGetCampaignListEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_CAMPAIGN_LIST),
  switchMap(({ payload }: DispatchAction<string | null>) => getCampaignList(
    payload,
    state$.value.app.user.user_id.toString(),
    state$,
    client
  ).pipe(
    mergeMap((disp: PaginatedListApi<PageCampaignInterface>) =>
      of(setCampaignListAction(disp))),
    getError$(setRuleDetailFormStateAction, "while fetching campaigns, ")
  ))
);
/* ******************************************************
 *
 *                 Adgroups list
 *
 * **************************************************** */

/*
export const TRY_GET_ADGROUP_LIST = "TRY_GET_ADGROUP_LIST";
export const SET_ADGROUP_LIST = "SET_ADGROUP_LIST";

export  type AdgroupGetPayload = [customerId: string, adgrpId: string];

export function tryGetAdgroupListAction(payload: AdgroupGetPayload) {
    return {
        type: TRY_GET_ADGROUP_LIST,
        payload
    };
}

export function setAdgroupListAction(payload: PaginatedListApi<PageAdgroupInterface>) {
    return {
        type: SET_ADGROUP_LIST,
        payload
    };
}

export const tryGetAdgroupListEpic$ = (
    action$: any,
    state$: StaticAppState,
    client: AjaxCreationMethod = ajax
): Observable<void> => {
    return action$.pipe(
        ofType(TRY_GET_ADGROUP_LIST),
        switchMap(({payload: [customerId, adgroupId]}: DispatchAction<KeywordsGetPayload>) => {
            return concat(
                get(
                    state$,
                    `${PAGE_GEN_SEM}${customerId}/adgroups/${adgroupId}/?${CHEAT_PAGINATION}`,
                    setAdgroupListAction,
                    client
                )
            );
        }),
        catchError(_err => of(setDataStateAction("error")))
    );
}; */

export const SET_ADGROUP_LIST = "SET_ADGROUP_LIST";

export function setAdgroupListAction(
  payload: PaginatedListApi<PageAdgroupInterface>
) {
  return {
    type: SET_ADGROUP_LIST,
    payload
  };
}

/* ******************************************************
 *
 *                 Keywords paginated list  by ctageory
 *
 * **************************************************** */

export const TRY_GET_KEYWORD_LIST_PAGINATED = "TRY_GET_KEYWORD_LIST_PAGINATED";

export function tryGetKeywordListPaginatedAction(payload: any) {
  return {
    type: TRY_GET_KEYWORD_LIST_PAGINATED,
    payload
  };
}

export const tryGetKeywordListPaginatedEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_KEYWORD_LIST_PAGINATED),
  switchMap(
    ({
      payload: [customerId, adgroupId]
    }: DispatchAction<KeywordsGetPayload>) => {
      const partSetKeywordListAction = concatKeywordListAction(adgroupId);
      return concat(
        get(
          state$,
          `${PAGE_GEN_SEM}${customerId}/adgroups/${adgroupId}/keywords?${CHEAT_PAGINATION}`,
          partSetKeywordListAction,
          client
        )
      );
    }
  ),
  catchError(_err => of(setRuleDetailDataStateAction("error")))
);

/* ******************************************************
 *  end   Keywords paginated list
 ****************************************************** */

/* ******************************************************
 *
 *                 Keywords list
 *
 * **************************************************** */

export const TRY_GET_KEYWORD_LIST = "TRY_GET_KEYWORD_LIST";
export const CONCAT_KEYWORD_LIST = "CONCAT_KEYWORD_LIST";

export type KeywordsGetPayload = [customerId: string, adgrpId: string];

export function tryGetKeywordListAction(payload: KeywordsGetPayload) {
  return {
    type: TRY_GET_KEYWORD_LIST,
    payload
  };
}

export function concatKeywordListAction(adgroup_id: string) {
  return (payload: PaginatedListApi<PageKwdInterfaceView>) => {
    const appendAdgroupId = payload.results.map(p => ({ ...p, adgroup_id }));
    return {
      type: CONCAT_KEYWORD_LIST,
      payload: {
        ...payload,
        results: appendAdgroupId
      }
    };
  };
}

export const UPDATE_KEYWORD_LIST = "UPDATE_KEYWORD_LIST";

export function updateKeywordListAction(
  payload: PaginatedListApi<PageKwdInterfaceView>
) {
  return {
    type: UPDATE_KEYWORD_LIST,
    payload
  };
}

export const tryGetKeywordListEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_KEYWORD_LIST),
  switchMap(
    ({
      payload: [customerId, adgroupId]
    }: DispatchAction<KeywordsGetPayload>) => {
      const partSetKeywordListAction = concatKeywordListAction(adgroupId);
      return concat(
        get(
          state$,
          `${PAGE_GEN_SEM}${customerId}/adgroups/${adgroupId}/keywords?${CHEAT_PAGINATION}`,
          partSetKeywordListAction,
          client
        )
      );
    }
  ),
  catchError(_err => of(setRuleDetailDataStateAction("error")))
);

export const TRY_PATCH_KEYWORD_LIST = "TRY_PATCH_KEYWORD_LIST";

export function tryBatchKeywordListAction(payload: {
  customerId: string;
  adGrpIdList: string[];
}) {
  return {
    type: TRY_PATCH_KEYWORD_LIST,
    payload
  };
}

export const tryBatchKeywordListEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_PATCH_KEYWORD_LIST),
  switchMap(
    ({
      payload: { customerId, adGrpIdList }
    }: DispatchAction<{ customerId: string; adGrpIdList: string[] }>) => {
      const q$ = adGrpIdList.map((adgId) => {
        const partSetKeywordListAction = concatKeywordListAction(adgId);
        return get(
          state$,
          `${PAGE_GEN_SEM}${customerId}/adgroups/${adgId}/keywords?${CHEAT_PAGINATION}`,
          partSetKeywordListAction,
          client
        );
      });
      return forkJoin(q$).pipe(
        concatMap(
          (
            response: Array<
                DispatchAction<PaginatedListApi<PageKwdInterfaceView>>
              >
          ) => {
            const acc = response.reduce(
              (
                curr: PaginatedListApi<PageKwdInterfaceView>,
                sel: DispatchAction<PaginatedListApi<PageKwdInterfaceView>>
              ) => {
                const { payload } = sel;
                return {
                  ...sel.payload,
                  count: payload.count + curr.count,
                  results: curr.results.concat(sel.payload.results)
                };
              },
              { count: 0, next: null, previous: null, results: [] }
            );

            return of(updateKeywordListAction(acc));
          }
        )
      );
    }
  ),
  catchError(_err => of(setRuleDetailDataStateAction("error")))
);

/*  DELETE */

function deletePage$<T>(
  state$: StaticAppState,
  url: string,
  client: AjaxCreationMethod,
  ids: string[],
  onSuccessAction: DispatchAction<T>
) {
  return protectedFormUpdate(
    state$,
    url,
    client,
    { page_ids: ids },
    "POST"
  ).pipe(
    catchError((e) => {
      // eslint-disable-next-line
      console.warn(e);
      return of(
        setModalActionStateAction({
          state: "error",
          action: null,
          msg: "failed to delete selection"
        })
      );
    }),
    switchMap(_ => of(onSuccessAction))
  );
}

export const TRY_DELETE_PAGE_FROM_QUEUE = "TRY_DELETE_PAGE_FROM_QUEUE";

export function tryDeletePageFromQueueAction(payload: {
  ruleId: number;
  kdwId: number;
  pageId: string;
}) {
  return {
    type: TRY_DELETE_PAGE_FROM_QUEUE,
    payload
  };
}

export const DELETE_PAGE_FROM_QUEUE = "DELETE_PAGE_FROM_QUEUE";

export function deletePageFromQueueAction(payload: {
  ruleId: number;
  kdwId: number;
  pageId: string;
}) {
  return {
    type: DELETE_PAGE_FROM_QUEUE,
    payload
  };
}

export const tryDeletePageFromQueueEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_DELETE_PAGE_FROM_QUEUE),
  switchMap(
    ({
      payload: { ruleId, kdwId, pageId }
    }: DispatchAction<{
        ruleId: number;
        kdwId: number;
        pageId: string;
      }>) => {
      const url = PAGE_GEN_RULES.concat(ruleId.toString(), "/dismiss-pages/");

      return concat(
        of(
          setModalActionStateAction({
            state: "processing",
            action: null,
            msg: "deleting selection"
          })
        ),
        deletePage$(
          state$,
          url,
          client,
          [pageId],
          deletePageFromQueueAction({ ruleId, kdwId, pageId })
        ),
        of(
          setModalActionStateAction({ state: "idle", action: null, msg: "" })
        )
      );
    }
  ),
  catchError(_err =>
    of(
      setModalActionStateAction({
        state: "error",
        action: null,
        msg: "failed to delete selection"
      })
    ))
);

export const TRY_BATCH_DELETE_PAGE_FROM_QUEUE =
  "TRY_BATCH_DELETE_PAGE_FROM_QUEUE";
export type BatchDeletePageFromQueueActionPayload = {
  ruleId: number;
  kdwId: number;
  pageId: string;
}[];

export function tryBatchDeletePageFromQueueAction(
  payload: BatchDeletePageFromQueueActionPayload
) {
  return {
    type: TRY_BATCH_DELETE_PAGE_FROM_QUEUE,
    payload
  };
}

export const BATCH_DELETE_PAGE_FROM_QUEUE = "BATCH_DELETE_PAGE_FROM_QUEUE";

export function batchDeletePageFromQueueAction(
  payload: {
    ruleId: number;
    kdwId: number;
    pageId: string;
  }[]
) {
  return {
    type: BATCH_DELETE_PAGE_FROM_QUEUE,
    payload
  };
}

export function dismissed(payload: { ruleId: number; pageIds: string[] }) {
  return {
    type: "DISMISSED",
    payload
  };
}

export const tryBatchDeletePageFromQueueEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_BATCH_DELETE_PAGE_FROM_QUEUE),
  switchMap(
    ({
      payload
    }: DispatchAction<
        {
          ruleId: number;
          kdwId: number;
          pageId: string;
        }[]
      >) => {
      const batchDismissPayload = payload.reduce(
        (acc: Array<{ ruleId: number; pageIds: string[] }>, curr) => {
          const hasRule = acc.findIndex(el => el.ruleId === curr.ruleId);
          if(hasRule >= 0) {
            return acc.map((ids, idx) => {
              if(idx === hasRule) {
                return {
                  ruleId: ids.ruleId,
                  pageIds: ids.pageIds.concat([curr.pageId])
                };
              }
              return ids;
            });
          }
          return acc.concat([
            { ruleId: curr.ruleId, pageIds: [curr.pageId] }
          ]);
        },
        []
      );

      const batchDismiss$ = batchDismissPayload.map(({ ruleId, pageIds }) => {
        const url = PAGE_GEN_RULES.concat(
          ruleId.toString(),
          "/dismiss-pages/"
        );
        return deletePage$(
          state$,
          url,
          client,
          pageIds,
          dismissed({ ruleId, pageIds })
        );
      });
      return concat(
        of(
          setModalActionStateAction({
            state: "processing",
            action: null,
            msg: "deleting selection"
          })
        ),
        forkJoin(batchDismiss$).pipe(
          switchMap(_r => of(batchDeletePageFromQueueAction(payload)))
        ),
        of(
          setModalActionStateAction({
            state: "idle",
            action: null,
            msg: "failed to delete selection"
          })
        )
      );
    }
  ),
  catchError((_err) => {
    // eslint-disable-next-line
      console.log(_err);
    return of(
      setModalActionStateAction({
        state: "error",
        action: null,
        msg: "failed to delete selection"
      })
    );
  })
);
/* PUBLISH PAGE */

const TRY_POST_SELECTED_TEMPLATE_PAGE = "TRY_POST_SELECTED_TEMPLATE_PAGE";

export type TemplatePageStateProps =
  | "is_dismissed"
  | "is_linked"
  | "is_published";
export type TemplatePageStatePath = [
  {
    prop: TemplatePageStateProps;
    pageId: string;
    ruleId: number;
    kwdId: number;
  }
];

export interface TemplateStateActionPayload {
  value: boolean;
  path: TemplatePageStatePath;
}

export function tryPostTemplatePageAction(payload: {
  data: Array<PublishPageItem | LinkKwdAdgroupItem>;
  url: string;
  updateAction: TemplateStateActionPayload;
}) {
  return {
    type: TRY_POST_SELECTED_TEMPLATE_PAGE,
    payload
  };
}

export const SET_TEMPLATE_PAGE_STATE = "SET_TEMPLATE_PAGE_STATE";

export function setPageTemplateStateAction(
  payload: TemplateStateActionPayload
) {
  return {
    type: SET_TEMPLATE_PAGE_STATE,
    payload
  };
}

export const tryPostTemplatePageEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_POST_SELECTED_TEMPLATE_PAGE),
  switchMap(
    ({
      payload: { data, url, updateAction }
    }: DispatchAction<{
        data: Array<PublishPageItem | LinkKwdAdgroupItem>;
        url: string;
        updateAction: TemplateStateActionPayload;
      }>) => concat(
      protectedFormUpdate(
        state$,
        url,
        client,
        { pages_data: data },
        "POST"
      ).pipe(
        switchMap(_ => of(setPageTemplateStateAction(updateAction))),
        catchError((e) => {
          // eslint-disable-next-line
              console.warn(e);

          return concat(
            of(
              setQueueAsyncMsgAction({
                state: "error",
                keys: data, // setKey(batchAll, data),
                msg: getAsyncMsg(e)
              })
            )
          );
        })
      )
    )
  ),
  catchError(_err =>
    of(
      setQueueAsyncMsgAction({
        state: "error",
        keys: action$.payload.data, // setKey(action$.payload.isRoot, action$.payload.data),
        msg: "error"
      })
    ))
);

/* CUSTOMER */

const TRY_GET_CUSTOMER_ID = "TRY_GET_CUSTOMER_ID";

export function tryGetCustomerIdAction(payload: { userId: number }) {
  return {
    type: TRY_GET_CUSTOMER_ID,
    payload
  };
}

const SET_GET_CUSTOMER_ID = "SET_GET_CUSTOMER_ID";

export function setCustomerIdAction(payload: string) {
  return {
    type: SET_GET_CUSTOMER_ID,
    payload
  };
}

const CLEAR_CUSTOMER_ID_CACHE = "CLEAR_CUSTOMER_ID_CACHE";

export function clearCustomerIdCacheAction() {
  window.localStorage.removeItem("naister_user_customer_id");
  return {
    type: CLEAR_CUSTOMER_ID_CACHE
  };
}

export const tryGetCustomerIdEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_CUSTOMER_ID),
  switchMap(({ payload: { userId } }: DispatchAction<{ userId }>) => get(
    state$,
    `${PAGE_GEN_SEM}${userId}/get-customer-id/`,
    setCustomerAction,
    client
  ).pipe(
    mergeMap((customerIdResp: string | Object) => {
      if(typeof customerIdResp === "string") {
        window.localStorage.setItem(
          "naister_user_customer_id",
              customerIdResp as string
        );

        return of(setCustomerIdAction(customerIdResp));
      }
      return of({ type: "INVALID_CUSTOMER_ID" });
    }),
        getError$(
          setRuleDetailFormStateAction,
          "while fetching customer id , ",
          [of(clearCustomerIdCacheAction())]
        ) as any
  ))
);

export const tryPostPublishPages$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<any> => action$.pipe(
  ofType(TRY_PUBLISH_PAGES),
  switchMap(({ payload }: DispatchAction<PostPublishPagesInterface>) => Sem.postPublishPages(state$, client, payload).pipe(
    startWith(processStatusAction(PROCESS_STATUS.PROCESSING)),
    endWith(processStatusAction(PROCESS_STATUS.DONE)),
    catchError(_err => throwError(_err))
  )),
  catchError(err => of(
    processStatusAction(PROCESS_STATUS.FAIL),
    setAppErrorStateAction("error " + err)
  ))
);

export const tryGetCampaignTestByKeyword$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<any> => action$.pipe(
  ofType(TRY_GET_CAMPAIGN_TEST_BY_KEYWORD),
  switchMap(
    ({ payload }: DispatchAction<GetCampaignTestByKeywordParams>) => Sem.getCampaignTestByKeyword(state$, client, payload).pipe(
      catchError(_err => throwError(_err))
    )
  ),
  catchError(err => of(setAppErrorStateAction("error " + err)))
);

export const trypostCampaignTest$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<any> => action$.pipe(
  ofType(TRY_POST_CREATE_CAMPAIGN_TEST),
  switchMap(({ payload }: DispatchAction<PostCampaignTestInterface>) => Sem.postCampaignTest(state$, client, payload).pipe(
    startWith(createTestStatusAction(CREATE_TEST_STATUS.PROCESSING)),
    endWith(createTestStatusAction(CREATE_TEST_STATUS.DONE)),
    catchError(_err => throwError(_err))
  )),
  catchError(err => of(
    createTestStatusAction(CREATE_TEST_STATUS.FAIL),
    setAppErrorStateAction("error " + err)
  ))
);

// export const tryPostLinkPageToAdwords$ = (
//   action$: any,
//   state$: StaticAppState,
//   client: AjaxCreationMethod = ajax
// ): Observable<any> => {
//   return action$.pipe(
//     ofType(TRY_POST_LINK_PAGE_TO_ADWORDS),
//     switchMap(({ payload }: DispatchAction<PostLinkPageToAdwordsInterface>) => {
//       return Sem.postLinkPageToAdwords(state$, client, payload).pipe(
//         startWith(linkToAdsStatusAction(LINK_TO_ADS_STATUS.PROCESSING)),
//         endWith(linkToAdsStatusAction(LINK_TO_ADS_STATUS.DONE)),
//         catchError((_err) => throwError(_err))
//       );
//     }),
//     catchError((err) => of(
//       linkToAdsStatusAction(LINK_TO_ADS_STATUS.FAIL),
//       setAppErrorStateAction("error " + err)))
//   );
// };
