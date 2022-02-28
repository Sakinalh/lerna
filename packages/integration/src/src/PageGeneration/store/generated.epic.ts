import { ofType } from "redux-observable";
import { concat, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { catchError, switchMap } from "rxjs/operators";
import { DispatchAction, ListLoadState, PaginatedListApi, SelectedKwdInterface } from "../../model";
import { StaticAppState } from "../../redux/store/store.utils";
import { PageKwdInterface, StatefulPaginatedInterfaceActionPayload, TemplatePageKdwApi } from "../model";
import { queryParamsToStr } from "../../components/AppPaginator/AppPaginator.component";

/* *****************************************************
 *
 *             generated list
 *
 * **************************************************** */

export const SET_GENERATED_LIST_PAGINATION = "SET_GENERATED_LIST_PAGINATION";

export function setGeneratedListPagination(payload: StatefulPaginatedInterfaceActionPayload) {
  const newRelativePathQuery = window.location.pathname + queryParamsToStr(payload.qState);
  window.history.replaceState(null, "", newRelativePathQuery);

  return ({
    type: SET_GENERATED_LIST_PAGINATION,
    payload
  });
}

function setKdwSelect(data: PageKwdInterface[]) {
  return data.reduce((acc, curr) => ({ ...acc, ...{ [curr.keyword_id]: false } }), {});
}

function makeSelectedGeneratedKwd(data: TemplatePageKdwApi[]) {
  return data.reduce((acc, curr) => ({ ...acc, ...{ [curr.page_id]: setKdwSelect(curr.keywords) } }), {});
}

export const SET_SELECT_GENERATED_KWD = "SET_SELECT_GENERATED_KWD";

export function setSelectGeneratedAction(payload: SelectedKwdInterface) {
  return {
    type: SET_SELECT_GENERATED_KWD,
    payload
  };
}

export const PATCH_SELECT_GENERATED_PAGE = "PATCH_SELECT_GENERATED_PAGE";

export function patchSelectGeneratedAction(payload: {
    key: string;
    next: Record<string, boolean>;
}) {
  return {
    type: PATCH_SELECT_GENERATED_PAGE,
    payload
  };
}

export function setGeneratedDataStateAction(payload: ListLoadState) {
  return ({
    type: SET_GENERATED_DATA_STATE,
    payload
  });
}

export const TRY_GET_GENERATED_LIST = "TRY_GET_GENERATED_LIST";

export function tryGetGeneratedList(payload: string) {
  return {
    type: TRY_GET_GENERATED_LIST,
    payload
  };
}

export const tryGetGeneratedListEpic$ = (
  action$: any,
  _state$: StaticAppState,
  _client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_GENERATED_LIST),
  switchMap(({ payload }: DispatchAction<string>) => concat(
    of(setGeneratedDataStateAction("loading")),
    /*            get(
                                         state$,
                                        PAGE_GEN_PAGES.concat(payload),
                                        setGeneratedListAction,
                                        client
                                    ), */

    of(setGeneratedListAction({ count: 0, next: null, previous: null, results: [] })),
    of(setGeneratedDataStateAction("complete"))
  )),

  catchError(_err => of(setGeneratedDataStateAction("error")))
);

export const SET_GENERATED_LIST = "SET_GENERATED_LIST";

export function setGeneratedListAction(
  payload: PaginatedListApi<TemplatePageKdwApi>
) {
  return {
    type: SET_GENERATED_LIST,
    payload: {
      data: payload,
      selection: makeSelectedGeneratedKwd(payload.results)
    }
  };
}

/**
 * DELETE
 */

export const TRY_DELETE_GENERATED_KWD = "TRY_DELETE_GENERATED_KWD";

export function tryDeleteGeneratedKwd(payload: any) {
  return {
    type: TRY_DELETE_GENERATED_KWD,
    payload
  };
}

export const tryDeleteGeneratedKwdEpic$ = (
  action$: any,
  state$: StaticAppState,
  _client: AjaxCreationMethod | Observable<{ response: null }> = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_DELETE_GENERATED_KWD),
  switchMap((_disp: DispatchAction<any>) => concat(
    //   of(setGeneratedListAction(MOCK_LIST_DELETE)).pipe(delay(700)),
    of(setGeneratedDataStateAction("complete"))
  )),
  catchError(_err => of(setGeneratedDataStateAction("error")))
);
export const SET_GENERATED_DATA_STATE = "SET_GENERATED_DATA_STATE";
