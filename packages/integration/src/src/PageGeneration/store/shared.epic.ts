import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { switchMap } from "rxjs/operators";
import { DispatchAction, MetaElement, ModalActionState } from "src/model";
import { StaticAppState } from "../../redux/store/store.utils";
import { PaginateInterfaceActionPayload, StatefulPaginatedInterfaceActionPayload } from "../model";

/* ***************************************************
 *
 *              UI ACTION TATE (form, data)
 *
 * *************************************************** */

export const SET_MODAL_ACTION_STATE = "SET_MODAL_ACTION_STATE";

export function setModalActionStateAction(payload: { state: ModalActionState, action: DispatchAction<any> | null, msg: string }) {
  return {
    type: SET_MODAL_ACTION_STATE,
    payload
  };
}

/* *****************************************************
 *
 *             shared template listing epics
 *
 * **************************************************** */

export const TRY_PAGINATE_LIST = "TRY_PAGINATE_LIST";

export function tryPaginateListAction(payload: { next: StatefulPaginatedInterfaceActionPayload, cb: Function }) {
  return ({
    type: TRY_PAGINATE_LIST,
    payload
  });
}

export const tryPaginateTemplatesEpic$ = (
  action$: any,
  state$: StaticAppState,
  _client: AjaxCreationMethod | Observable<{ response: null }> = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_PAGINATE_LIST),
  switchMap((disp: DispatchAction<PaginateInterfaceActionPayload>) => {
    const { payload: { next: { qState, qStr }, cb } } = disp;
    return of(cb.call(null, { qState, qStr }));
  })
);

export const SET_SELECTED_ZONE = "SET_SELECTED_ZONE";

export function setSelectedZoneAction(payload: MetaElement | null) {
  return {
    type: SET_SELECTED_ZONE,
    payload
  };
}
