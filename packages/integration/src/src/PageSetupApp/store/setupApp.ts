import { DataMachineState, DispatchAction } from "src/model/store";
import { AsyncPayload, FilePayload, PatchProject } from "src/PageSetupApp/model/index";

import { ofType } from "redux-observable";
import { concat, Observable, of } from "rxjs";
import { ajax, AjaxRequest, AjaxResponse } from "rxjs/ajax";
import { AjaxCreationMethod } from "rxjs/internal/observable/dom/AjaxObservable";
import { catchError, concatMap, ignoreElements, map, mergeMap, switchMap, tap } from "rxjs/operators";
import {
  REFRESH_TOKEN_API,
  SETUP_ADTEXT_API,
  SETUP_CREATE_API,
  SETUP_IMAGE_API,
  SETUP_KWD_API,
  SETUP_PRODUCT_API
} from "src/api/routes/api_routes";
import {
  _updateToken,
  getState$Token,
  makeTokenReq,
  StaticAppState
} from "src/redux/store/store.utils";
import { history } from "src/route-history";
import {
  ContentUploadType,
  CreateProjectForm,
  ProjectPayload,
  SetupFile,
  SetupFormState,
  TryPatchProjectPayload
} from "../model";
import { clearAllAction, clearUserTokenAction, refreshUserTokenAction, setAppErrorStateAction } from "../../redux/store/app";
import { getRemainTime, makeCSVPayload, objToEncodedValue } from "../../shared/utils";
import { get, post } from "../../api/accessors/genericAccessors";

// projects
export const TRY_HAS_COMPLETED_SETUP = "TRY_HAS_COMPLETED_SETUP";
export const HAS_COMPLETED_SETUP = "HAS_COMPLETED_SETUP";

export const TRY_SET_SETUP_STEP = "TRY_SET_SETUP_STEP";
export const SET_SETUP_STEP = "SET_SETUP_STEP";

export const TRY_PATCH_PROJECT = "TRY_PATCH_PROJECT";
export const PATCH_PROJECT = "PATCH_PROJECT";

export const TRY_SET_ASYNC = "TRY_SET_ASYNC";
export const REDIRECT = "REDIRECT";

export const SET_FILE_CACHE = "SET_FILE_CACHE";
export const CLEAR_FILE_CACHE = "CLEAR_FILE_CACHE";

export const SET_DATA_MACHINE_STATE = "SET_DATA_MACHINE_STATE";
export const RESET_DATA_MACHINE_STATE = "RESET_DATA_MACHINE_STATE";

export const TRY_POST_CONTENT = "TRY_POST_CONTENT";
export const TRY_SAVE_CONTENT = "TRY_SAVE_CONTENT";

export const TRY_CREATE_SETUP = "TRY_CREATE_SETUP";
export const SETUP_FSM = "SETUP_FSM";
export const RESET_SETUP = "RESET_SETUP";

export const SETUP_COMPLETED = "SETUP_COMPLETED";

export const setSetupStep = (payload: SetupFormState) => ({
  type: SET_SETUP_STEP,
  payload
});
export const tryHasCompleteSetup = () => ({
  type: TRY_HAS_COMPLETED_SETUP,
  payload: true
});

export const hasCompletedSetup = () => ({
  type: HAS_COMPLETED_SETUP
});

export function tryPatchProject(
  payload: TryPatchProjectPayload<Record<string, ProjectPayload>>
) {
  return {
    type: TRY_PATCH_PROJECT,
    payload
  };
}

export function patchProject(payload: PatchProject) {
  return {
    type: PATCH_PROJECT,
    payload
  };
}

export function trySetAsync(payload: TryPatchProjectPayload<AsyncPayload>) {
  return {
    type: TRY_SET_ASYNC,
    payload
  };
}

export function tryCreateSetup(payload: CreateProjectForm) {
  return {
    type: TRY_CREATE_SETUP,
    payload
  };
}

export function currTransitionSetupFsm(state: DataMachineState) {
  return _payload => ({
    type: SETUP_FSM,
    payload: state
  });
}

export function transitionSetupFsm(payload: DataMachineState) {
  return {
    type: SETUP_FSM,
    payload
  };
}

export function resetSetup() {
  return {
    type: RESET_SETUP
  };
}

// dummy function. just need to return an action
// the response is kind of useless. it's a success basically
export function setWeb(_payload: any) {
  return {
    type: "SET_WEB"
  };
}

export function redirect(payload: string) {
  return { type: REDIRECT, payload };
}

// upload content
export function setDataStateMachine(payload: Record<string, DataMachineState>) {
  return { type: SET_DATA_MACHINE_STATE, payload };
}

export function resetDataStateMachine() {
  return { type: RESET_DATA_MACHINE_STATE };
}

export function tryPostContent(payload: {
    data: SetupFile;
    type: ContentUploadType;
}) {
  return { type: TRY_POST_CONTENT, payload };
}

export function postContent(payload) {
  return { type: "POST_CONTENT", payload: payload.response };
}

export function trySaveContent(payload: TryPatchProjectPayload<FilePayload>) {
  return { type: TRY_SAVE_CONTENT, payload };
}

export function setFileCache(payload: Record<ContentUploadType, string>) {
  return {
    type: SET_FILE_CACHE,
    payload
  };
}

export function clearFileCache() {
  return {
    type: CLEAR_FILE_CACHE
  };
}

export function setupCompleted() {
  return {
    type: SETUP_COMPLETED
  };
}

/*
 *    EFFECT
 */
export const hasCompletedSetup$ = (
  action$: any,
  _state$: StaticAppState
): Observable<void> =>
  action$.pipe(
    ofType(TRY_HAS_COMPLETED_SETUP),
    mergeMap((_action: DispatchAction<any>) => of(hasCompletedSetup()))
  );

export const setSetupStep$ = (
  action$: any,
  _state$: StaticAppState
): Observable<void> =>
  action$.pipe(
    ofType(TRY_SET_SETUP_STEP),
    mergeMap(({ payload }: DispatchAction<SetupFormState>) => of(setSetupStep(payload)))
  );

export const patchProject$ = (
  action$: any,
  _state$: StaticAppState
): Observable<void> =>
  action$.pipe(
    ofType(TRY_PATCH_PROJECT),
    concatMap(
      ({
        payload
      }: DispatchAction<TryPatchProjectPayload<Record<string, ProjectPayload>>>) => {
        const { content } = payload;
        // here test if need to post?
        return [patchProject(content as any), redirect(payload.url)];
      }
    )
  );

function setupError$(error: AjaxResponse) {
  if(error.status === 401) {
    return of(clearAllAction());
  }
  const errMsg = Array.isArray(error.response)
    ? error.response[0]
    : error.response.detail;
  return concat(
    of({ type: "ERROR_SETUP" }),
    of(
      setAppErrorStateAction({
        hasError: true,
        msg: errMsg
      })
    )
  );
}

export function getSetup(
  state$: StaticAppState,
  endpoint: string,
  action: any,
  client: AjaxCreationMethod,
  nextState: { state: any; url: string }
): Observable<any> {
  const [access_token_type, access_token] = getState$Token(state$);
  const ajaxReq: AjaxRequest = makeTokenReq(
    `${access_token_type} ${access_token}`,
    endpoint
  );
    /* copy paste body function handleResourceAuth */
  const { expires } = state$.value.app.user;
  const remainingValidity = getRemainTime(expires, "min");
  const successCb$ = [patchProject(nextState.state), redirect(nextState.url)];

  if(remainingValidity < 0) {
    return of(clearUserTokenAction());
  }
  // ! TODO handle refresh token->on refresh, bubble up the error
  // for  now, on error, it stays at the child component
  // workaround refresh token if necessary at the beginning of process
  const VALIDITY_THRESHOLD: number = 15; // below refresh threshold

  if(remainingValidity < VALIDITY_THRESHOLD) {
    const refreshReq = {
      url: `${REFRESH_TOKEN_API}`,
      method: "POST",
      body: {
        access_token: state$.value.app.user.access_token
      }
    };
    return ajax(refreshReq).pipe(
      switchMap((res) => {
        const _tk = _updateToken(ajaxReq, res.response);
        // concatWith->concatWith in
        // https://github.com/ReactiveX/rxjs/issues/3927
        return concat(
          of(refreshUserTokenAction(res.response)),
          client.call(null, _tk).pipe(
            map((res: AjaxResponse) => of(action.call(null, res.response))),
            concatMap(_ => successCb$),
            catchError(error => setupError$(error))
          )
        );
      }),
      catchError(error => setupError$(error))
    );
  }

  return client.call(null, ajaxReq).pipe(
    map((res: AjaxResponse) => of(action.call(null, res.response))),
    concatMap(_ => successCb$),
    catchError(error => setupError$(error))
  );
}

export const setAsyncProject$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_SET_ASYNC),
  switchMap(
    ({ payload }: DispatchAction<TryPatchProjectPayload<AsyncPayload>>) => {
      const {
        content: { url, state }
      } = payload;
      return getSetup(
        state$,
        url,
        setWeb,
        client,
        { state, url: payload.url }
      );
    }
  )
);

export const redirect$ = action$ =>
  action$.pipe(
    ofType(REDIRECT),
    tap((action: DispatchAction<string>) => history.push(action.payload)),
    ignoreElements()
  );

const MAP_UPLOAD_URL: Record<ContentUploadType, string> = {
  adt_loc_file: SETUP_ADTEXT_API,
  imgb_loc_file: SETUP_IMAGE_API,
  prod_loc_file: SETUP_PRODUCT_API,
  kwd_loc_file: SETUP_KWD_API
};
export const postSetupContent$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> =>
  action$.pipe(
    ofType(TRY_POST_CONTENT),
    switchMap(
      ({
        payload
      }: DispatchAction<{
                data: SetupFile;
                type: ContentUploadType;
            }>) => {
        const uploadType = payload.type;

        const formData = makeCSVPayload(payload.data);

        const url = MAP_UPLOAD_URL[uploadType];
        return concat(
          of(setDataStateMachine({ [uploadType]: "loading" })),
          post(
            state$,
            url,
            postContent,
            client,
            formData
          ).pipe(
            concatMap((res: AjaxResponse) => [
              setFileCache({ [uploadType]: res.response } as any),
              setDataStateMachine({ [uploadType]: "success" })
            ]),
            catchError((e) => {
              // eslint-disable-next-line
              console.log(e);
              const msgErr = e.response
                ? e.response.file[0]
                : "error processing file";
              return concat(
                of(
                  setAppErrorStateAction({
                    hasError: true,
                    msg: msgErr
                  })
                ),
                of(setDataStateMachine({ [uploadType]: "error" }))
              );
            })
          )
        );
      }
    )
  );

export const saveSetupContent$ = (
  action$: any,
  state$: StaticAppState
): Observable<void> =>
  action$.pipe(
    ofType(TRY_SAVE_CONTENT),
    concatMap(
      ({ payload }: DispatchAction<TryPatchProjectPayload<FilePayload>>) => {
        const [head, tail] = payload.content.values;

        if(payload.content.keep) {
          const cache = state$.value.setupApp.fileLocCache;
          return [
            patchProject({ [head]: cache[head] } as any),
            patchProject({ [tail]: cache[tail] } as any),
            resetDataStateMachine(),
            redirect(payload.url)
          ];
        }
        return [
          patchProject({ [head]: "" } as any),
          patchProject({ [tail]: "" } as any),
          clearFileCache(),
          resetDataStateMachine(),
          redirect(payload.url)
        ];
      }
    )
  );

/* CREATE SETUP */
export const createSetup$ = (
  action$: any,
  state$: StaticAppState,
  client: AjaxCreationMethod = ajax
): Observable<void> => action$.pipe(
  ofType(TRY_CREATE_SETUP),
  concatMap(({ payload }: DispatchAction<CreateProjectForm>) => {
    const qParams = objToEncodedValue(payload);
    const partialTransition = currTransitionSetupFsm("success");
    return concat(
      of(transitionSetupFsm("loading")),
      get(
        state$,
        `${SETUP_CREATE_API}${qParams}`,
        partialTransition,
        client
      ).pipe(catchError(_e => of(transitionSetupFsm("error")))),
      of(setupCompleted())
    );
  })
);
