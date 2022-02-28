import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { concat, Observable, of } from "rxjs";
import { ajax, AjaxRequest, AjaxResponse } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { catchError, concatMap, switchMap } from "rxjs/operators";
import { StaticAppState } from "../../redux/store/store.utils";
import { DispatchAction, PaginatedListApi } from "../../model";
import { TemplateImageBankApi, TemplateImageBankImageItemApi } from "../model";
import { PAGE_GEN_IMG_BANKS, PAGE_GEN_IMGS } from "../../api/routes/api_routes";
import { setRuleDetailFormStateAction } from "./rule.epic";
import { get, post } from "../../api/accessors/genericAccessors";

/* ******************************************************
 *
 *                  area  get imgs from image bank
 *
 * **************************************************** */

export const RESET_AREA_IMGS = "RESET_AREA_IMGS";

export function resetAreaSourceImgsAction() {
  return {
    type: RESET_AREA_IMGS
  };
}

export const TRY_SET_AREA_IMGS = "TRY_SET_AREA_IMGS";
export const SET_AREA_IMGS = "SET_AREA_IMGS";

// Because of reason, query multi img bank is a post
interface ImgsQuery {
  ids: number[];
  is_sample: boolean
}

export function trySetAreaImgsAction(payload: { setter: Function, body: ImgsQuery }) {
  return {
    type: TRY_SET_AREA_IMGS,
    payload
  };
}

export function setAreaSourceImgsAction(payload: PaginatedListApi<TemplateImageBankImageItemApi>) {
  return {
    type: SET_AREA_IMGS,
    payload
  };
}

export const trySetAreaImgsContentEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_SET_AREA_IMGS),
  switchMap((disp: DispatchAction<{ setter: Function, body: ImgsQuery }>) => {
    const { payload: { body } } = disp;

    const _formData = new FormData();
    _formData.append("ids", JSON.stringify(body.ids));
    _formData.append("is_sample", body.is_sample.toString());

    return concat(
      post(
        state$,
        `${PAGE_GEN_IMGS}`,
        setAreaSourceImgsAction,
        client,
        _formData
      ).pipe(
        concatMap((resp: AjaxResponse) => [
          setAreaSourceImgsAction(resp.response)
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
  }),
  catchError(_err => of(setRuleDetailFormStateAction("error")))
);

/* ******************************************************
 *
 *                  area  get image banks
 *
 * **************************************************** */

export const TRY_SET_AREA_IMGS_BANK = "TRY_SET_AREA_IMGS_BANK";
export const SET_AREA_IMGS_BANK = "SET_AREA_IMGS_BANK";

export function trySetAreaImgsBankAction(payload: { setter: Function }) {
  return {
    type: TRY_SET_AREA_IMGS_BANK,
    payload
  };
}

export function setAreaSourceImgsBankAction(payload: PaginatedListApi<TemplateImageBankApi>) {
  return {
    type: SET_AREA_IMGS_BANK,
    payload
  };
}

export const trySetAreaImgsBankContentEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_SET_AREA_IMGS_BANK),
  switchMap((_disp: DispatchAction<any>) =>
  // const {payload: {setter}} = disp;
    concat(
      get(
        state$,
        `${PAGE_GEN_IMG_BANKS}?offset=0&size=null`,
        setAreaSourceImgsBankAction,
        client
      )
    )),
  catchError(_err => of(setRuleDetailFormStateAction("error")))
);
