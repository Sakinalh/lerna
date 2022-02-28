import { StaticAppState } from "src/redux/store/store.utils";
import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { concat, Observable, of, throwError } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import {
  catchError,
  delay,
  mergeMap,
  switchMap,
  filter,
  map,
  startWith,
  tap,
  endWith
} from "rxjs/operators";
import {
  CHEAT_PAGINATION,
  PAGE_GEN_CATALOGS,
  PAGE_GEN_CATALOGS_FILTERS
} from "src/api/routes/api_routes";
import {
  setAppErrorStateAction,
  processStatusAction
} from "src/redux/store/app/app.actions";
import {
  AddProductParams,
  EditProductParamsInterface,
  GetProductFiltersParamsInterface,
  ReplaceProductParamsInterface,
  SendReorderedProductParams
} from "src/api/accessors/Rules/ProductAccessor/interfaces";
import {
  AreaProductItemInterface,
  AreaProductMetasInterface,
  DispatchAction,
  MetaFormInterface,
  PaginatedListApi,
  PROCESS_STATUS
} from "../../model";
import {
  CatalogFilterItemApi,
  DetailActionWithCb,
  TemplateCatalogApi
} from "../model";
import { FormGroupState } from "../../shared/form";

import {
  setRuleDetailDataStateAction,
  setRuleDetailFormStateAction
} from "./rule.epic";
import { get } from "../../api/accessors/genericAccessors";
import {
  ProductsByRuleKeywordPageApi,
  ProductsRemovePageApi
} from "../model/api";
import {
  TRY_GET_PRODUCT_DATA_TO_EDIT,
  TRY_GET_PROPOSED_PRODUCTS_FOR_ZONE_PRODUCTS,
  TRY_DELETE_PRODUCTS_LIST_FOR_ZONE_PRODUCTS,
  TRY_ADD_PRODUCTS_TO_PAGE,
  TRY_GET_PRODUCTS_FILTERS,
  TRY_GET_PRODUCTS_LIST_FOR_ZONE_PRODUCTS,
  TRY_REORDER_PRODUCTS,
  EDIT_PRODUCT_REQUEST,
  REPLACE_PRODUCT_REQUEST
} from "./const";
import {
  replacingProductSatusAction,
  setProductsListForZoneProductAction,
  tryDeleteProductsListForZoneProductAction } from "./actions";

import { PAGE_EDIT_ZONE_GET_PROPOSED_PRODUCTS } from "../../api/routes/api_routes";
import Product from "../../api/accessors/Rules/ProductAccessor/productAccessor";

/* *********************************************************
 *
 *          area catalog product
 *
 * ******************************************************* */

/* CATALOGS LIST */

export const TRY_GET_CATALOG_LIST = "TRY_GET_CATALOG_LIST";

export function tryGetCatalogListAction() {
  return {
    type: TRY_GET_CATALOG_LIST
  };
}

export const SET_CATALOG_LIST = "SET_CATALOG_LIST";

export function setCatalogListAction(
  payload: PaginatedListApi<TemplateCatalogApi>
) {
  return {
    type: SET_CATALOG_LIST,
    payload
  };
}

export const tryGetCatalogList$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_CATALOG_LIST),
  switchMap((_disp: DispatchAction<any>) => concat(
    get(state$, PAGE_GEN_CATALOGS, setCatalogListAction, client)
  )),
  catchError(_err => of(setRuleDetailFormStateAction("error")))
);
/* CATALOGS LIST PRODUCT ITEM */
export const TRY_GET_CATALOG_PRODUCT_LIST = "TRY_GET_CATALOG_PRODUCT_LIST";

export function tryGetCatalogProductListAction(payload: DetailActionWithCb) {
  return {
    type: TRY_GET_CATALOG_PRODUCT_LIST,
    payload
  };
}

export const SET_CATALOG_PRODUCT_LIST = "SET_CATALOG_PRODUCT_LIST";

export function setCatalogProductAction(
  payload: PaginatedListApi<AreaProductItemInterface>
) {
  return {
    type: SET_CATALOG_PRODUCT_LIST,
    payload
  };
}

export const tryGetCatalogProductListEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_CATALOG_PRODUCT_LIST),
  switchMap((disp: DispatchAction<DetailActionWithCb>) => {
    const {
      payload: { id, onSuccess }
    } = disp;

    return concat(
      get(
        state$,
        `${PAGE_GEN_CATALOGS}${id}/list-products/?is-sample=true&${CHEAT_PAGINATION}`,
        onSuccess,
        client
      ),
      of(setRuleDetailFormStateAction("idle")).pipe(delay(1000))
    );
  }),
  catchError(_err => of(setRuleDetailDataStateAction("error")))
);

export const SET_AREA_PRODUCTS = "SET_AREA_PRODUCTS";

export function setAreaCatalogProducts(payload: string[]) {
  return {
    type: SET_AREA_PRODUCTS,
    payload
  };
}

export const TRY_GET_AREA_PRODUCTS = "TRY_GET_AREA_PRODUCTS";

export function tryGetAreaProducts(payload: DetailActionWithCb) {
  return {
    type: TRY_GET_AREA_PRODUCTS,
    payload
  };
}

export const tryGetProductImgsEpic$ = (
  action$: any,
  _state$: StaticAppState,
  _client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_AREA_PRODUCTS),
  switchMap((disp: DispatchAction<DetailActionWithCb>) => {
    const {
      payload: { id, onSuccess }
    } = disp;

    return concat(
      of(tryGetCatalogListAction()),
      of(tryGetCatalogProductListAction({ id, onSuccess }))
    );
  }),
  catchError(_err => of(setRuleDetailDataStateAction("error")))
);

export const TRY_GET_PRODUCTS_META_FILTERS = "TRY_GET_PRODUCTS_META_FILTERS";

export function tryGetProductsMetaFilters(payload: string) {
  return {
    type: TRY_GET_PRODUCTS_META_FILTERS,
    payload
  };
}

export const SET_PRODUCTS_META_FILTERS = "SET_PRODUCTS_META_FILTERS";

export function setProductsMetaFilters(payload: CatalogFilterItemApi[]) {
  return {
    type: SET_PRODUCTS_META_FILTERS,
    payload
  };
}

export const tryGetAreaProductsFiltersEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<any> => action$.pipe(
  ofType(TRY_GET_PRODUCTS_META_FILTERS),
  switchMap(({ payload }: DispatchAction<string>) => get(
    state$,
    PAGE_GEN_CATALOGS_FILTERS.concat("?catalog-ids=", payload),
    setProductsMetaFilters,
    client
  ).pipe(catchError(_err => throwError(_err)))),
  catchError(err => of(setRuleDetailDataStateAction("error", err)))
);

export interface AreaProductMetaFormInterface {
  product_filters: string;
}

export interface AreaTextSetterFormInterface {
  source_list: string;
  variable_list: string;
  rule_list: string;
  text_length: string;
}

export interface AreaTextSetterAdvancedFormInterface {
  source_list: string;
  text_length: string;
  rule_list: string;
  extend_existing: string;
}

export interface AreaProductCatalogFormInterface {
  catalog_source: string;
  product_title: string;
  product_description: string;
  optimized: boolean;
}

export interface ProductInterface {
  score: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  id: string;
  neo_id: string;
  image: string;
  zone_id: string;
  is_active: string;
  name: string;
  link_to: string | null;
}

/* *********************************************************
 *
 *          area catalog product Meta
 *
 * ******************************************************* */

export const TRY_UPDATE_PRODUCT_META = "TRY_UPDATE_PRODUCT_META";

export function tryUpdateProductMeta(payload: AreaProductMetasInterface) {
  return {
    type: TRY_UPDATE_PRODUCT_META,
    payload
  };
}

export const SET_PRODUCT_META_FORM = "SET_PRODUCT_META_FORM";

export function setProductMetaFormAction(payload: MetaFormInterface) {
  return {
    type: SET_PRODUCT_META_FORM,
    payload
  };
}

export const PATCH_PRODUCT_META_FORM = "PATCH_PRODUCT_META_FORM";

export function patchProductMetaFormAction(payload: {
  next: FormGroupState;
  index: number;
}) {
  return {
    type: PATCH_PRODUCT_META_FORM,
    payload
  };
}

/* *********************************************************
 *
 *         GET PRODUCTS LIST FOR ZONE AREA PRODUCTS
 *
 * ******************************************************* */

export const tryGetProductsListForZoneProductEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<any> => action$.pipe(
  ofType(TRY_GET_PRODUCTS_LIST_FOR_ZONE_PRODUCTS),
  switchMap(({ payload }: DispatchAction<ProductsByRuleKeywordPageApi>) => Product.getZoneProducts(payload, state$, client).pipe(
    startWith(processStatusAction(PROCESS_STATUS.PROCESSING)),
    endWith(processStatusAction(PROCESS_STATUS.DONE)),
    catchError(_err => throwError(_err))
  )),
  catchError(err => of(
    processStatusAction(PROCESS_STATUS.FAIL),
    setAppErrorStateAction("error " + err)
  ))
);

export const tryGetZoneProductsProposedEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<any> => action$.pipe(
  ofType(TRY_GET_PROPOSED_PRODUCTS_FOR_ZONE_PRODUCTS),
  switchMap(({ payload }: DispatchAction<ProductsByRuleKeywordPageApi>) => Product.getPoposedProductsForZonePage(
    payload,
    state$,
    client
  ).pipe(
    startWith(processStatusAction(PROCESS_STATUS.PROCESSING)),
    endWith(processStatusAction(PROCESS_STATUS.DONE)),
    catchError(_err => throwError(_err))
  )),
  catchError(err =>
    of(
      processStatusAction(PROCESS_STATUS.FAIL),
      setAppErrorStateAction("error " + err)
    ))
);

export const tryGetProductsFiltersEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<any> => action$.pipe(
  ofType(TRY_GET_PRODUCTS_FILTERS),
  switchMap(
    ({ payload }: DispatchAction<GetProductFiltersParamsInterface>) => Product.getProductsFilters(payload, state$, client).pipe(
      catchError(_err => throwError(_err))
    )
  ),

  catchError(err => of(setAppErrorStateAction("error " + err)))
);

export const tryAddProductsToPageEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<any> => action$.pipe(
  ofType(TRY_ADD_PRODUCTS_TO_PAGE),
  switchMap(({ payload }: DispatchAction<AddProductParams>) => Product.addProductsToPage(payload, state$, client).pipe(
    startWith(processStatusAction(PROCESS_STATUS.PROCESSING)),
    endWith(processStatusAction(PROCESS_STATUS.DONE)),
    catchError(_err => throwError(_err))
  )),
  catchError(err =>
    of(
      processStatusAction(PROCESS_STATUS.FAIL),
      setAppErrorStateAction("error" + err)
    ))
);

export const tryDeleteProductsListForZoneProductEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_DELETE_PRODUCTS_LIST_FOR_ZONE_PRODUCTS),
  switchMap(({ payload }: DispatchAction<ProductsRemovePageApi>) => Product.removeProductsToPage(payload, state$, client).pipe(
    startWith(processStatusAction(PROCESS_STATUS.PROCESSING)),
    endWith(processStatusAction(PROCESS_STATUS.DONE)),
    catchError(_err => throwError(_err))
  )),
  catchError(err =>
    of(
      processStatusAction(PROCESS_STATUS.FAIL),
      setAppErrorStateAction("error" + err)
    ))
);

export const tryReorderProductsEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<any> => action$.pipe(
  ofType(TRY_REORDER_PRODUCTS),
  switchMap(({ payload }: DispatchAction<SendReorderedProductParams>) => Product.sendReorderedProduct(payload, state$, client).pipe(
    catchError(_err => throwError(_err))
  )),
  catchError(err => of(setAppErrorStateAction("error " + err)))
);

export const tryGetProductDataToEditEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<any> => action$.pipe(
  ofType(TRY_GET_PRODUCT_DATA_TO_EDIT),
  switchMap(({ payload }: DispatchAction<any>) => Product.getProductDataToEdit(payload, state$, client).pipe(
    catchError(_err => throwError(_err))
  )),
  catchError(err => of(setAppErrorStateAction("error" + err)))
);

export const editProductEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<any> => action$.pipe(
  ofType(EDIT_PRODUCT_REQUEST),
  switchMap(({ payload }: DispatchAction<EditProductParamsInterface>) => Product.editProduct(payload, state$, client).pipe(
    startWith(processStatusAction(PROCESS_STATUS.PROCESSING)),
    endWith(processStatusAction(PROCESS_STATUS.DONE)),
    catchError(_err => throwError(_err))
  )),
  catchError(err =>
    of(
      processStatusAction(PROCESS_STATUS.FAIL),
      setAppErrorStateAction("error" + err)
    ))
);

export const replaceProductEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<any> => action$.pipe(
  ofType(REPLACE_PRODUCT_REQUEST),
  switchMap(({ payload }: DispatchAction<ReplaceProductParamsInterface>) => Product.replaceProduct(payload, state$, client).pipe(
    startWith(processStatusAction(PROCESS_STATUS.PROCESSING)),
    endWith(processStatusAction(PROCESS_STATUS.DONE)),
    catchError(_err => throwError(_err))
  )),
  catchError(err =>
    of(
      processStatusAction(PROCESS_STATUS.FAIL),
      setAppErrorStateAction("error" + err)
    ))
);
