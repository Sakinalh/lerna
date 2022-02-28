import { MOCK_APP_STATE, MOCK_CLEARED_APP_STATE, UPDATED_APP_USER, UPDATED_TOKEN_USER, } from "../../../fixtures";
import { AppReducer } from "./app.reducers";
import {
    clearAppErrorStateAction,
    clearUserTokenAction,
    refreshUserTokenAction,
    setAppErrorStateAction,
    setAppThemeAction,
    setAppUserAction,
    setUserDetailAction
} from "./app.actions";

afterEach(() => {
    jest.clearAllMocks();
});
describe("app reducer", () => {
    it("apply theme ", () => {
        const updatedReducer = AppReducer(
            MOCK_APP_STATE,
            setAppThemeAction("light")
        );
        const expected = {...MOCK_APP_STATE, theme: "light"};
        expect(updatedReducer).toMatchObject(expected);
        expect(updatedReducer.theme).toBe("light");
    });

    it("update user ", () => {
        const updatedReducer = AppReducer(
            MOCK_APP_STATE,
            setAppUserAction(UPDATED_APP_USER)
        );
        const expected = {...MOCK_APP_STATE, user: UPDATED_APP_USER};
        expect(updatedReducer).toMatchObject(expected);
        expect(updatedReducer.user.username).toBe(UPDATED_APP_USER.username);
    });

    it("update token", () => {
        const updatedReducer = AppReducer(
            MOCK_APP_STATE,
            refreshUserTokenAction(UPDATED_TOKEN_USER)
        );
        const expected = {...MOCK_APP_STATE, user: UPDATED_TOKEN_USER};
        expect(updatedReducer).toMatchObject(expected);
        expect(updatedReducer.user.access_token).toBe(
            UPDATED_TOKEN_USER.access_token
        );
    });

    it("set user detail", () => {
        const FAKE_USER_DETAIL = {user: "mock"};
        const updatedReducer = AppReducer(
            MOCK_APP_STATE,
            setUserDetailAction(FAKE_USER_DETAIL)
        );
        const expected = {...MOCK_APP_STATE, userDetail: FAKE_USER_DETAIL};
        expect(updatedReducer).toMatchObject(expected);
        expect(updatedReducer.userDetail).toBe(FAKE_USER_DETAIL);
    });
    it("clear app", () => {
        const updatedReducer = AppReducer(MOCK_APP_STATE, clearUserTokenAction());
        expect(updatedReducer).toMatchObject(MOCK_CLEARED_APP_STATE);
    });

    it("set error state", () => {
        const MOCK_ERROR_STATE = {
            hasError: true,
            msg: "mock error",
        }
        const updatedReducer = AppReducer(
            MOCK_APP_STATE,
            setAppErrorStateAction(MOCK_ERROR_STATE)
        );
        const expected = {...MOCK_APP_STATE, error: MOCK_ERROR_STATE};
        expect(updatedReducer).toMatchObject(expected);
        expect(updatedReducer.error).toBe(MOCK_ERROR_STATE);
    });

    it("clear error state", () => {
        const CLEAR_ERROR_STATE = {
            hasError: false,
            msg: "",
        }
        const updatedReducer = AppReducer(
            MOCK_APP_STATE,
            clearAppErrorStateAction() as any
        );
        expect(updatedReducer.error).toMatchObject(CLEAR_ERROR_STATE);
    });


    it("clear app", () => {
        const updatedReducer = AppReducer(MOCK_APP_STATE, clearUserTokenAction());
        expect(updatedReducer).toMatchObject(MOCK_CLEARED_APP_STATE);
    });

});
