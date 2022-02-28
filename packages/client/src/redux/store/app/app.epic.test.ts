import { clearTokenEpic$, userDetailEpic$ } from "./app.epic";
import { MOCK_STORE_STATE_FRESH, MOCK_STORE_STATE_TOKEN_TO_REFRESH, } from "src/fixtures";
import { of } from "rxjs";
import {
    CLEAR_TOKEN,
    clearUserTokenAction,
    resumeAction,
    setUserDetailAction,
    TRY_CLEAR_TOKEN,
    TRY_USER_DETAIL,
} from "./app.actions";
import { TestScheduler } from "rxjs/testing";

/* const MockuserDetailEpic = (action$: any, state$: StateObservable<any>, client = ajax): Observable<void> =>
  action$.pipe(
    ofType(TRY_USER_DETAIL),
    mergeMap((action: any) => {
      return get(state$, USER_GET_API, setUserDetailAction, client);
    })
  );
 */
describe("epic app actions ", () => {
    // automatically unmount and cleanup DOM after the test is finished.

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("when accesssing a protected", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it("refresh token action to have bell called on token below threshold", (done) => {
            const testScheduler = new TestScheduler((actual, _expected) => {
                // somehow assert the two objects are equal
                // e.g. with chai `expect(actual).deep.equal(expected)`
                const expectedPayload = {
                    ajaxRequest: {
                        headers: {Authorization: "mock_type mock_token"},
                        method: "GET",
                        url: "undefinedapi/accounts/",
                        body: null,
                    },
                    action: setUserDetailAction,
                };

                const refreshTkAction = actual[0].notification.value;
                expect(refreshTkAction).toEqual(resumeAction(expectedPayload));
                expect(actual.length).toBe(1);
            });

            testScheduler.run(({hot, expectObservable}) => {
                const action$ = hot("-a", {
                    a: {type: TRY_USER_DETAIL},
                });
                const storeState = MOCK_STORE_STATE_TOKEN_TO_REFRESH;
                const userState = storeState.app.user;
                const state$: any = {value: storeState};
                const mockAjax: any = () => of({response: userState});
                const output$ = userDetailEpic$(
                    action$,
                    state$,
                    mockAjax
                );

                expectObservable(output$).toBe("-a", {
                    a: setUserDetailAction(userState),
                });

                done();
            });
        });

        it("fetch user details when token is valid", (done) => {
            const testScheduler = new TestScheduler((actual, expected) => {
                // somehow assert the two objects are equal
                expect(actual.length).toBe(1);
                expect(actual).toEqual(expected);
            });

            testScheduler.run(({hot, expectObservable}) => {
                const action$ = hot("-a", {
                    a: {type: TRY_USER_DETAIL},
                });
                const storeState = MOCK_STORE_STATE_FRESH;
                const state$: any = {value: storeState};
                const userState = storeState.app.user;
                const mockAjax: any = () => of({response: userState});
                const output$ = userDetailEpic$(
                    action$,
                    state$,
                    mockAjax
                );
                expectObservable(output$).toBe("-a", {
                    a: setUserDetailAction(userState),
                });

                done();
            });
        });

        it("clear token ", (done) => {
            const testScheduler = new TestScheduler((actual, expected) => {
                // somehow assert the two objects are equal
                expect(actual[0].notification.value.type).toEqual(CLEAR_TOKEN);
                expect(actual).toEqual(expected);
            });

            testScheduler.run(({hot, expectObservable}) => {
                const action$ = hot("-a", {
                    a: {
                        type: TRY_CLEAR_TOKEN,
                        payload: MOCK_STORE_STATE_FRESH.app.user,
                    },
                });

                const state$: any = {value: MOCK_STORE_STATE_FRESH};

                const mockAjax: any = () => of({response: null});

                const output$ = clearTokenEpic$(
                    action$,
                    state$,
                    mockAjax
                );

                expectObservable(output$).toBe("-a", {
                    a: clearUserTokenAction(),
                });

                done();
            });
        });


        it("resume action on success ", (done) => {
            const testScheduler = new TestScheduler((actual, expected) => {
                // somehow assert the two objects are equal
                expect(actual[0].notification.value.type).toEqual(CLEAR_TOKEN);
                expect(actual).toEqual(expected);
            });

            testScheduler.run(({hot, expectObservable}) => {
                const action$ = hot("-a", {
                    a: {
                        type: TRY_CLEAR_TOKEN,
                        payload: MOCK_STORE_STATE_FRESH.app.user,
                    },
                });

                const state$: any = {value: MOCK_STORE_STATE_FRESH};

                const mockAjax: any = () => of({response: null});

                const output$ = clearTokenEpic$(
                    action$,
                    state$,
                    mockAjax
                );

                expectObservable(output$).toBe("-a", {
                    a: clearUserTokenAction(),
                });

                done();
            });
        });


    });
});
