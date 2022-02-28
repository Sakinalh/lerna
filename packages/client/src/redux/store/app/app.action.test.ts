import { TestScheduler } from "rxjs/testing";
import { MOCK_APP_USER } from "../../../fixtures";
import { store } from "../../../index";

import { SET_USER, setAppThemeAction, setAppUserAction, TOGGLE_THEME, } from "./app.actions";

describe("app actions ", () => {
    // automatically unmount and cleanup DOM after the test is finished.

    beforeEach(() => {
        // @ts-ignore
        delete global.window.location;
        // @ts-ignore
        global.window.location = new URL(
            'https://www.fake.com/?q={"test":"a"}&qId=-2000535797'
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("apply theme on TOGGLE_THEME", (done) => {
        const ACTION = {type: TOGGLE_THEME, payload: "light"};
        const testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
            expect((store.getState() as any).app.theme).toEqual(ACTION.payload);
        });

        testScheduler.run(({hot, expectObservable}) => {
            store.dispatch(setAppThemeAction(ACTION.payload));
            const action$ = hot("-a", {
                a: ACTION,
            });

            expectObservable(action$).toBe("-a", {
                a: ACTION,
            });
        });
        done();
    });

    it("set user on SET_USER", (done) => {
        const ACTION = {type: SET_USER, payload: MOCK_APP_USER};
        const testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
            expect((store.getState() as any).app.user).toMatchObject(ACTION.payload);
        });

        testScheduler.run(({hot, expectObservable}) => {
            store.dispatch(setAppUserAction(ACTION.payload));
            const action$ = hot("-a", {
                a: ACTION,
            });

            expectObservable(action$).toBe("-a", {
                a: ACTION,
            });
        });
        done();
    });

})

