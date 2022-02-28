import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useValidationError } from "./useTryLogin";
//import { mockPostInvalidLogin, mockPostValidLogin } from "@mock/fetch.mock";

describe("grant access toke", () => {
    //let hook;
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);
    /*
    test("refresh token action to have bell called on token below threshold", done => {
      act(() => {
        console.log("rrr");
        const { result, rerender, waitForNextUpdate } = renderHook(() =>
          useTryAuth({ email: "mock@mocha.com", password: "mock" })
        );
        hook = result;
      });
      /*     const testScheduler = new TestScheduler((actual, expected) => {
        // somehow assert the two objects are equal
        // e.g. with chai `expect(actual).deep.equal(expected)`
        const serverResp = actual[0].notification.value;
        expect(serverResp).toMatchObject(MOCK_APP_USER);

        expect(actual.length).toBe(2);
      });

      testScheduler.run(({ hot, expectObservable }) => {
        console.log(hook, "ezezezez");



        const mockAjax = () => of({ response: MOCK_APP_USER });
        const output$ = tryUserAuth({ email: "babou", password: "valid" }, mockAjax );

        expectObservable(output$).toBe("-a", {
          a: { response: MOCK_APP_USER }
        });

        done();
      });
    });*/

    test("should return touch state", () => {
        const {result,} = renderHook(() =>
            useValidationError()
        );

        expect(result.current[0]).toBeFalsy();
    });

    test("should return touch state", () => {
        const {result,} = renderHook(() =>
            useValidationError(true)
        );

        expect(result.current[0]).toBeTruthy();
    });
});
