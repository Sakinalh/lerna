import { ofType } from "redux-observable";
import { concat, Observable, of, throwError } from "rxjs";
import {
  ajax,
  AjaxCreationMethod,
  AjaxRequest
} from "rxjs/internal-compatibility";
import { post } from "src/api/accessors/genericAccessors";
import Page from "src/api/accessors/pageAccessor";
import { DispatchAction, PROCESS_STATUS } from "src/model";
import {
  processStatusAction,
  setAppErrorStateAction
} from "src/redux/store/app";
import {
  getState$Token,
  makeTokenReq,
  StaticAppState
} from "src/redux/store/store.utils";
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
import { PAGE_GEN_RULES } from "../../api/routes/api_routes";
import { setDataTextAreaAction, setSuccesDataTextAreaAction } from "./action";
import { setTxtContentByZoneAction } from "./actions";
import {
  SET_TXT_PROPOSALS_ZONE,
  TRY_GET_TXT_CONTENT_BY_ZONE,
  UPDATE_DATA_TEXT_AREA,
  TRY_GET_TXT_PROPOSALS_ZONE
} from "./const";
import { setRuleDetailFormStateAction } from "./rule.epic";

export const tryPostDataTextArea$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(UPDATE_DATA_TEXT_AREA),
  switchMap((_disp: DispatchAction<any>) => {
    const payload = _disp.payload;
    return Page.saveTxt(payload, state$, client).pipe(
      startWith(processStatusAction(PROCESS_STATUS.PROCESSING)),
      endWith(processStatusAction(PROCESS_STATUS.DONE)),
      catchError(_err => throwError(_err))
    );
  }),
  catchError(err =>
    of(
      processStatusAction(PROCESS_STATUS.FAIL),
      setAppErrorStateAction("error" + err)
    ))
);

export const tryGetTxtEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_TXT_CONTENT_BY_ZONE),
  switchMap((_disp: DispatchAction<any>) => {
    const payload = _disp.payload;

    return Page.tryGetTxtContentByZone(payload, state$, client).pipe(
      catchError(_err => throwError(_err))
    );
  }),
  catchError(_err => of(_err => throwError(_err)))
);

export const tryGetTxtProposalsEpic$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_TXT_PROPOSALS_ZONE),
  switchMap((_disp: DispatchAction<any>) => {
    const payload = _disp.payload;
    return Page.tryGetTxtProposals(payload, state$, client).pipe(
      startWith(processStatusAction(PROCESS_STATUS.PROCESSING)),
      endWith(processStatusAction(PROCESS_STATUS.DONE)),
      catchError(_err => throwError(_err))
    );
  }),
  catchError(_err =>
    of(processStatusAction(PROCESS_STATUS.FAIL), _err => throwError(_err)))
);
