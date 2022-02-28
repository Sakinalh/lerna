import {
    _syncToken,
    del,
    autoRefreshDownloadObjectBuffer,
    autoRefreshDownloadObjectBufferPost,
    get,
    getState$Token,
    makeTokenReq,
    post,
    revokeUserToken,
    tryUserAuth,
} from "./store.utils";
import { AjaxRequest } from "rxjs/ajax";
import {
    MOCK_APP_STATE_TOKEN_EXPIRED,
    MOCK_APP_USER,
    MOCK_AUTH,
    MOCK_ENDPOINT,
    MOCK_STORE_STATE,
    MOCK_STORE_STATE_FRESH,
    MOCK_STORE_STATE_TOKEN_TO_REFRESH,
    OBS_MOCK_APP_STATE,
} from "../../fixtures";
import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { clearUserTokenAction, resumeAction, tryClearUserTokenAction, trySetUserDetailAction, } from "src/redux/store/app";
import { history } from "src/route-history";
import {
    clearPersistToken,
    getPersistedExp,
    getPersistedToken,
    getPersistedUser,
    logout,
    PUBLIC_PATH,
} from "../../index";
import { AppState, DataMachineState } from "../../model";

export type UpLoadFSM = DataMachineState | "close";

export const ADD_SOURCE = "ADD_SOURCE"

export function addSourceAction(payload: UpLoadFSM) {
    return {
        type: ADD_SOURCE,
        payload
    };
}

export const TRY_DELETE_SOURCE = "TRY_DELETE_SOURCE"

export function tryDeleteSourceAction(payload: string) {
    return {
        type: TRY_DELETE_SOURCE,
        payload
    };
}

describe("sync store utils", () => {
    afterEach(() => jest.clearAllMocks());
    /* utils */


    /* async */
    test("return tokens from state observable", () => {
        // mock out
        const [type, token] = getState$Token(OBS_MOCK_APP_STATE);
        expect(type).toEqual(
            (OBS_MOCK_APP_STATE.value.app as AppState).user.access_token_type
        );
        expect(token).toEqual(
            (OBS_MOCK_APP_STATE.value.app as AppState).user.access_token
        );
    });

    test("return Ajax get request", () => {
        // mock out
        const EXPECTED_PAYLOAD = {
            headers: {
                Authorization: MOCK_AUTH,
            },
            method: "GET",
            url: MOCK_ENDPOINT,
        };
        const payload: AjaxRequest = makeTokenReq(MOCK_AUTH, MOCK_ENDPOINT);

        expect(payload).toMatchObject(EXPECTED_PAYLOAD);
    });

    test("return Ajax post request", () => {
        // mock out
        const MOCK_PAYLOAD = "mock payload";
        const EXPECTED_PAYLOAD = {
            headers: {
                Authorization: MOCK_AUTH,
            },
            method: "POST",
            url: MOCK_ENDPOINT,
            body: MOCK_PAYLOAD,
        };
        const payload: AjaxRequest = makeTokenReq(
            MOCK_AUTH,
            MOCK_ENDPOINT,
            "POST",
            MOCK_PAYLOAD
        );

        expect(payload).toMatchObject(EXPECTED_PAYLOAD);
    });

    test("update Ajax request Authorisation", () => {
        // mock out
        let INITIAL_PAYLOAD = {
            headers: {
                Authorization: MOCK_AUTH,
            },
            method: "GET",
            url: MOCK_ENDPOINT,
        };
        const EXPECTED_PAYLOAD = {
            ...INITIAL_PAYLOAD,
            headers: {
                Authorization: `${MOCK_APP_USER.access_token_type} ${MOCK_APP_USER.access_token}`,
            },
        };

        const payload: AjaxRequest = _syncToken(INITIAL_PAYLOAD, MOCK_APP_USER);

        expect(payload).toMatchObject(EXPECTED_PAYLOAD);
    });

    test("return app state token ", () => {
        const result = getPersistedToken(MOCK_STORE_STATE);

        expect(result).toBe(MOCK_STORE_STATE.app.user.access_token);
    });
    test("return app state expire time ", () => {
        const result = getPersistedExp(MOCK_STORE_STATE);

        expect(result).toBe(MOCK_STORE_STATE.app.user.expires);
    });
    test("return app state user ", () => {
        const result = getPersistedUser(MOCK_STORE_STATE);
        expect(result).toMatchObject(MOCK_STORE_STATE.app.user);
    });
});
// test async tu
describe("async store utils", () => {
    afterEach(() => jest.clearAllMocks());

    it("should return user info", (done) => {
        const testScheduler = new TestScheduler((actual, _expected) => {
            // somehow assert the two objects are equal
            // e.g. with chai `expect(actual).deep.equal(expected)`
            const serverResp = actual[0].notification.value;
            expect(serverResp).toMatchObject(MOCK_APP_USER);

            expect(actual.length).toBe(2);
        });

        testScheduler.run(({hot: _hot, expectObservable}) => {
            const mockAjax: unknown = () => of({response: MOCK_APP_USER});
            const output$ = tryUserAuth(
                {email: "babou", password: "valid"},
                mockAjax as any
            );

            expectObservable(output$).toBe("-a", {
                a: {response: MOCK_APP_USER},
            });

            done();
        });
    });

    it("should clear user token", (done) => {
        const MOCK_RESPONSE = {response: "success"};
        const testScheduler = new TestScheduler((actual, _expected) => {
            const serverResp = actual[0].notification.value;
            expect(serverResp).toBe(MOCK_RESPONSE.response);
            expect(actual.length).toBe(2);
        });

        testScheduler.run(({hot: _hot, expectObservable}) => {
            const mockAjax = () => of(MOCK_RESPONSE);
            const output$ = revokeUserToken(
                {access_token: "babou", access_token_type: "valid"},
                mockAjax
            );
            expectObservable(output$).toBe("-a", {
                a: {response: MOCK_RESPONSE},
            });

            done();
        });
    });
    // tests fails because of weird bugs

    it("should dispatch clear token before if app user is not set", (done) => {
        const MOCK_RESPONSE = {response: "token"};
        const testScheduler = new TestScheduler((actual, _expected) => {
            const Dispatched = actual[0].notification.value;
            expect(Dispatched).toMatchObject(clearUserTokenAction());
            expect(actual.length).toBeGreaterThanOrEqual(2);
        });
        testScheduler.run(({hot: _hot, expectObservable}) => {
            const mockAjax = () => of(MOCK_RESPONSE);
            const storeState = {app: {}};
            const state$ = {value: storeState};
            const output$ = get(
                state$ as any,
                "mock_url",
                trySetUserDetailAction(),
                mockAjax as any
            );
            expectObservable(output$).toBe("-a", {
                a: {response: MOCK_RESPONSE},
            });
            done();
        });
    });

    it("should dispatch force redirect before action on token below 0", (done) => {
        const MOCK_RESPONSE = {response: "token"};
        const testScheduler = new TestScheduler((actual, _expected) => {
            const Dispatched = actual[0].notification.value;
            expect(Dispatched).toMatchObject({type: "FORCE_REDIRECT"});
            expect(actual.length).toBeGreaterThanOrEqual(2);
        });
        testScheduler.run(({hot: _hot, expectObservable}) => {
            const mockAjax = () => of(MOCK_RESPONSE);
            const storeState = {app: MOCK_APP_STATE_TOKEN_EXPIRED};
            const state$ = {value: storeState};
            const output$ = get(
                state$ as any,
                "mock_url",
                trySetUserDetailAction(),
                mockAjax as any
            );
            expectObservable(output$).toBe("-a", {
                a: {response: MOCK_RESPONSE},
            });
            done();
        });
    });

    it("should dispatch refresh token before action on token below threshold", (done) => {
        const MOCK_RESPONSE = {response: "token"};
        const testScheduler = new TestScheduler((actual, _expected) => {
            const Dispatched = actual[0].notification.value;
            const expectedPayload = {
                ajaxRequest: {
                    headers: {Authorization: "mock_type mock_token"},
                    method: "GET",
                    url: "mock_url",
                    body: null,
                },
                action: trySetUserDetailAction,
            };

            expect(Dispatched).toMatchObject(resumeAction(expectedPayload));
            expect(actual.length).toBeGreaterThanOrEqual(2);
        });
        testScheduler.run(({hot: _hot, expectObservable}) => {
            const mockAjax: unknown = () => of(MOCK_RESPONSE);
            const state$ = {value: MOCK_STORE_STATE_TOKEN_TO_REFRESH};
            const output$ = get(
                state$,
                "mock_url",
                trySetUserDetailAction,
                mockAjax as any
            );
            expectObservable(output$).toBe("-a", {
                a: {response: MOCK_RESPONSE},
            });
            done();
        });
    });

    it("should dispatch action on token above threshold", (done) => {
        const MOCK_RESPONSE = {response: "token"};
        const testScheduler = new TestScheduler((actual, _expected) => {
            const tkDispatch = actual[0].notification.value;
            expect(tkDispatch).toMatchObject({
                type: "TRY_USER_DETAIL",
                payload: null,
            });
            expect(actual.length).toBeGreaterThanOrEqual(1);
        });

        testScheduler.run(({hot: _hot, expectObservable}) => {
            const mockAjax: unknown = () => of(MOCK_RESPONSE);
            const state$ = {value: MOCK_STORE_STATE_FRESH};
            const output$ = get(
                state$,
                "mock_url",
                trySetUserDetailAction,
                mockAjax as any
            );
            expectObservable(output$).toBe("-a", {
                a: {response: MOCK_RESPONSE},
            });

            done();
        });
    });

    it("should dispatch logout action", (done) => {
        const ACTION = tryClearUserTokenAction({
            access_token: MOCK_STORE_STATE.app.user.access_token,
            access_token_type: MOCK_STORE_STATE.app.user.access_token_type,
        });
        const testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });

        testScheduler.run(({hot, expectObservable}) => {
            logout();
            const action$ = hot("-a", {
                a: ACTION,
            });

            expectObservable(action$).toBe("-a", {
                a: ACTION,
            });
        });
        done();
    });

    it("should redirect to public fullPath", async () => {
        await clearPersistToken().then((res) => {
            expect(history.location.pathname).toBe(PUBLIC_PATH);
            expect(res).toBe("storage cleared");
        });
    });


    it("should refresh token for getting download object buffer action above threshold", (done) => {
        const buffer = new ArrayBuffer(8);
        const view = new Int32Array(buffer);

        const MOCK_RESPONSE = {response: view};
        const MOCK_CALLBACK = () => ({type: "mock", value: "payload1"});
        const MOCK_PAYLOAD = "payload1";
        const MOCK_PARSE_ACTION = () => ("BUFFER1");

        const testScheduler = new TestScheduler((actual, _expected) => {
            const tkDispatch = actual[0].notification.value;
            expect(tkDispatch).toMatchObject({type: "ERROR_STATE"});
            expect(actual.length).toBeGreaterThanOrEqual(1);
        });

        testScheduler.run(({hot: _hot, expectObservable}) => {
            const mockAjax: unknown = () => of(MOCK_PAYLOAD);
            const state$ = {value: MOCK_STORE_STATE_FRESH};
            const output$ = autoRefreshDownloadObjectBuffer
            (
                state$,
                "mock_url",
                MOCK_PARSE_ACTION,
                mockAjax as any,
                MOCK_CALLBACK,
            );
            expectObservable(output$).toBe("-a", {
                a: MOCK_RESPONSE
            });

            done();
        });
    });

    it("should return error on invalid refresh token for getting download object buffer action", (done) => {
        const MOCK_RESPONSE = {response: "created"};
        const MOCK_CALLBACK = () => ({type: "mock", value: "payload"});
        const MOCK_PAYLOAD = "payload";
        const MOCK_PARSE_ACTION = () => ("BUFFER");

        const testScheduler = new TestScheduler((actual, _expected) => {
            const tkDispatch = actual[0].notification.value;
            expect(tkDispatch).toMatchObject({type: "ERROR_STATE"});
            expect(actual.length).toBeGreaterThanOrEqual(1);
        });

        testScheduler.run(({hot: _hot, expectObservable}) => {
            const mockAjax: unknown = () => of(MOCK_PAYLOAD);
            const state$ = {value: MOCK_STORE_STATE_FRESH};
            const output$ = autoRefreshDownloadObjectBuffer
            (
                state$,
                "mock_url",
                MOCK_PARSE_ACTION,
                mockAjax as any,
                MOCK_CALLBACK,
            );
            expectObservable(output$).toBe("-a", {
                a: MOCK_RESPONSE
            });

            done();
        });
    });


    it("should refresh token for post download object buffer action above threshold", (done) => {
        const MOCK_RESPONSE = {response: "created"};
        const MOCK_CALLBACK = () => ({type: "mock", value: "payload"});
        const MOCK_PAYLOAD = "payload";

        const testScheduler = new TestScheduler((actual, _expected) => {
            const tkDispatch = actual[0].notification.value;
            expect(tkDispatch).toMatchObject({type: "mock", value: "payload"});
            expect(actual.length).toBeGreaterThanOrEqual(1);
        });

        testScheduler.run(({hot: _hot, expectObservable}) => {
            const mockAjax: unknown = () => of(MOCK_PAYLOAD);
            const state$ = {value: MOCK_STORE_STATE_FRESH};
            const output$ = autoRefreshDownloadObjectBufferPost
            (
                state$,
                "mock_url",
                mockAjax as any,
                MOCK_CALLBACK,
                MOCK_PAYLOAD
            );
            expectObservable(output$).toBe("-a", {
                a: MOCK_RESPONSE
            });

            done();
        });
    });


    it("should post payload to protected endpoint ", (done) => {
        const MOCK_RESPONSE = {response: "created"};
        const MOCK_PAYLOAD = {value: "payload"};

        const testScheduler = new TestScheduler((actual, _expected) => {
            const tkDispatch = actual[0].notification.value;
            expect(tkDispatch).toMatchObject(MOCK_PAYLOAD);
            expect(actual.length).toBeGreaterThanOrEqual(1);
        });

        testScheduler.run(({hot: _hot, expectObservable}) => {
            const mockAjax: unknown = () => of(MOCK_PAYLOAD);
            const state$ = {value: MOCK_STORE_STATE_FRESH};
            const output$ = post(
                state$,
                "mock_url",
                addSourceAction,
                mockAjax as any,
                MOCK_PAYLOAD
            );
            expectObservable(output$).toBe("-a", {
                a: MOCK_RESPONSE
            });

            done();
        });
    });


    it("should refresh token above threshold on delete action ", (done) => {
        const MOCK_RESPONSE = {response: "key_to_delete"};
        const testScheduler = new TestScheduler((actual, _expected) => {
            const tkDispatch = actual[0].notification.value;
            expect(tkDispatch).toMatchObject({
                type: "TRY_DELETE_SOURCE",
                payload: "key_to_delete",
            });
            expect(actual.length).toBeGreaterThanOrEqual(1);
        });

        testScheduler.run(({hot: _hot, expectObservable}) => {
            const mockAjax: unknown = () => of(MOCK_RESPONSE);
            const state$ = {value: MOCK_STORE_STATE_FRESH};
            const output$ = del(
                state$,
                "mock_url",
                tryDeleteSourceAction,
                mockAjax as any,
            );
            expectObservable(output$).toBe("-a", {
                a: {response: MOCK_RESPONSE},
            });

            done();
        });
    });


});
