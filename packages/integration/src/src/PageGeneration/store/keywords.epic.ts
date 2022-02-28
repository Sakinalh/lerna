import { AjaxCreationMethod } from "rxjs/internal-compatibility";
import { concat, Observable, of, throwError } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { catchError, delay, endWith, switchMap, startWith } from "rxjs/operators";
import { processStatusAction, setAppErrorStateAction } from "src/redux/store/app/app.actions";
import { StaticAppState } from "src/redux/store/store.utils";
import { setQueueListPagination } from "src/PageData/store/queryEpic$";
import { queryParamFormater } from "src/api/accessors/queryGenerator";
import { get } from "../../api/accessors/genericAccessors";
import { PAGE_EDIT_KWDS_WORD_SUMMARY, PAGE_EDIT_GET_KWDS, PAGE_EDIT_KWDS_PAGES_PROPOSAL, PAGE_DETAILS } from "../../api/routes/api_routes";
import { DispatchAction, PROCESS_STATUS } from "../../model";
import { TRY_GET_DETAILS, TRY_GET_KEYWORDS_BY_CATEGORY, TRY_GET_KEYWORDS_SUMMARY, TRY_GET_PROPOSED_PAGES } from "./const";
import { setDetailsPageAction, setKewordPagesAction, setKewordsByCategoryAction, setKewordsSummaryAction, setSelectedKwdAction, tryGetKewordsByCategoryAction } from "./actions";

/* *********************************************************
 *
 *         Get keyword summary
 *
 * ******************************************************* */

export const tryGetKewordsSummary$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_KEYWORDS_SUMMARY),
  switchMap((_disp: DispatchAction<any>) => {
    const {ruleId, campainId} = _disp.payload;
    return concat(
      get(
        state$,
        PAGE_EDIT_KWDS_WORD_SUMMARY.concat("/"+ruleId+"/campaigns/"+campainId+"/keywords-summary"),
        setKewordsSummaryAction,
        client
      )
    );
  }),
  catchError(err => of(setAppErrorStateAction("error "+ err)))
);

// export const tryGetKewordsByCategory$ = (
//   action$: any,
//   state$: StaticAppState,
//   client: AjaxCreationMethod = ajax
// ): Observable<void> => {
//   return action$.pipe(
//     ofType(TRY_GET_KEYWORDS_BY_CATEGORY),
//     switchMap((_disp: DispatchAction<any>) => {
//       const { ruleId, campainId, category, limit, offset, keywordValue, min, max } = _disp.payload;
//       let arr = {}
//       if (keywordValue) {
//         arr = {
//           ...arr,
//           kwd_text_contains: keywordValue,
//         }
//       }
//       if (min) {
//         arr = {
//           ...arr,
//           min_score: min
//         }
//       }
//       if (max) {
//         arr = {
//           ...arr,
//           max_score: max
//         }
//       }
//       let params = queryParamFormater(arr)
//       return concat(
//         get(
//           state$,
//           PAGE_EDIT_GET_KWDS.concat('/' + ruleId + '/campaigns/' + campainId + '/categories/' + category + '/keywords?limit=' + limit + '&offset=' + offset + "&" + params
//           ),
//           setKewordsByCategoryAction,
//           client
//         )
//       );
//     }),
//     catchError(err => of(setAppErrorStateAction("error "+  err)))
//     );
// };

export const tryGetKewordPages$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_PROPOSED_PAGES),
  switchMap((_disp: DispatchAction<any>) => {
    const {rule_id, keyword_id} = _disp.payload;
    return concat(
      get(
        state$,
        PAGE_EDIT_KWDS_PAGES_PROPOSAL.concat("/"+rule_id+"/keywords/"+String(keyword_id)+"/pages"),
        setKewordPagesAction,
        client
      ).pipe(
        startWith(processStatusAction(PROCESS_STATUS.PROCESSING)),
        endWith(processStatusAction(PROCESS_STATUS.DONE)),
        catchError(_err => throwError(_err))

      )
    );
  }),
  catchError(err => of(
    processStatusAction(PROCESS_STATUS.FAIL),
    setAppErrorStateAction("error "+ err)
  ))
);
catchError(err => of(
  processStatusAction(PROCESS_STATUS.FAIL),
  setAppErrorStateAction("error "+ err)
));

export const tryGetDetailsPages$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_GET_DETAILS),
  switchMap((_disp: DispatchAction<any>) => {
    const {rule_id, keyword_id, page_id} = _disp.payload;
    return concat(
      get(
        state$,
        PAGE_DETAILS.concat("/" + rule_id + "/keywords/" + String(keyword_id) + "/page-detail?" +
            queryParamFormater({
              page_id: page_id
            })),

        setDetailsPageAction,
        client
      ).pipe(
        startWith(processStatusAction(PROCESS_STATUS.PROCESSING)),
        endWith(processStatusAction(PROCESS_STATUS.DONE)),
        catchError(_err => throwError(_err))

      )
    );
  }),
  catchError(err => of(
    processStatusAction(PROCESS_STATUS.FAIL),
    setAppErrorStateAction("error "+ err)
  ))
);
catchError(err => of(
  processStatusAction(PROCESS_STATUS.FAIL),
  setAppErrorStateAction("error "+ err)
));
