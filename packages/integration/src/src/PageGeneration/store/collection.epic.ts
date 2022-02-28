import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { concat, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { catchError, switchMap } from "rxjs/operators";
import { CHEAT_PAGINATION, PAGE_GEN_COLLECTIONS_NAMES } from "src/api/routes/api_routes";
import { CollectionItemApi, CollectionNameApi, DetailActionInterfacePayload } from "../model";
import { StaticAppState } from "../../redux/store/store.utils";
import { DispatchAction, PaginatedListApi } from "../../model";
import { PAGE_GEN_COLLECTIONS } from "../../api/routes/api_routes";
import { setRuleDetailDataStateAction } from "./rule.epic";
import { get } from "../../api/accessors/genericAccessors";

/* ******************************************************
 *
 *                 Collections item
 *
 * **************************************************** */

export const TRY_GET_COLLECTION_ITEM = "TRY_GET_COLLECTION_ITEM";
export const SET_COLLECTION_ITEM = "SET_COLLECTION_ITEM";

export function tryGetCollectionItemAction(payload: DetailActionInterfacePayload) {
  return {
    type: TRY_GET_COLLECTION_ITEM,
    payload
  };
}

export function setCollectionItemAction(payload: CollectionItemApi) {
  return {
    type: SET_COLLECTION_ITEM,
    payload
  };
}

export const tryGetCollectionItemEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_COLLECTION_ITEM),
  switchMap(({ payload: { id } }: DispatchAction<DetailActionInterfacePayload>) => concat(
    get(
      state$,
      `${PAGE_GEN_COLLECTIONS}${id}/`,
      setCollectionItemAction,
      client
    )
  )),
  catchError(_err => of(setRuleDetailDataStateAction("error")))
);

/* ******************************************************
 *
 *                 Collections names
 *
 * **************************************************** */

export const TRY_GET_COLLECTIONS_NAMES = "TRY_GET_COLLECTIONS_NAMES";
export const SET_COLLECTIONS_NAMES = "SET_COLLECTIONS_NAMES";

export function tryGetCollectionsNamesAction() {
  return {
    type: TRY_GET_COLLECTIONS_NAMES
  };
}

export function setCollectionsNamesAction(payload: PaginatedListApi<CollectionNameApi>) {
  return {
    type: SET_COLLECTIONS_NAMES,
    payload
  };
}

export const tryGetCollectionsNamesEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_COLLECTIONS_NAMES),
  switchMap((_disp: DispatchAction<null>) => concat(
    get(
      state$,
      `${PAGE_GEN_COLLECTIONS_NAMES}?${CHEAT_PAGINATION}`,
      setCollectionsNamesAction,
      client
    )
  )),
  catchError(_err => of(setRuleDetailDataStateAction("error")))
);
