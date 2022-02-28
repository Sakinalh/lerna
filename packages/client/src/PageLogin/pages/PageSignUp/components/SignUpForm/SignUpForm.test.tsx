import * as React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from "src/PageLogin/components/LoginForm/LoginForm.component";
import { BrowserRouter } from "react-router-dom";
import { ERROR_MSG } from "src/shared/form";


describe("Fill form's input", () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    test("It should display login error", async () => {
        const handleTryAuth = jest.fn();
        const loginType = "signin";
        const handleResetValidationError = jest.fn();
        const handleFormVal = jest.fn();

        render(
            <BrowserRouter>
                <LoginForm
                    loginType={loginType}
                    tryAuth={handleTryAuth}
                    resetValidationError={handleResetValidationError}
                    validState="error"
                    formTouched={false}
                    btnState="invalid"
                    formValidation={handleFormVal}
                />
            </BrowserRouter>
        );

        const loginInput: any = await screen.getByTestId("login__input");

        fireEvent.change(loginInput, {target: {value: "test"}});
        fireEvent.change(loginInput, {target: {value: null}});

        const inputError: any = await screen.getByTestId("input-error");
        expect(inputError.textContent).toBe(ERROR_MSG.isEmail);

        const loginSubmit: any = await screen.getByTestId("login-submit");

        expect(loginSubmit.disabled).toBe(true);
    });

    test("It should display password error", async () => {
        const handleTryAuth = jest.fn();
        const loginType = "signin";
        const handleResetValidationError = jest.fn();
        let isInvalid = "invalid";
        const handleFormVal = jest.fn();

        render(
            <BrowserRouter>
                <LoginForm
                    loginType={loginType}
                    tryAuth={handleTryAuth}
                    resetValidationError={handleResetValidationError}
                    validState={isInvalid}
                    formTouched={false}
                    btnState="invalid"
                    formValidation={handleFormVal}
                />
            </BrowserRouter>
        );
        const MOCK_PWD: string = "re";

        const pwdInput: any = await screen.getByTestId("pwd-input");

        fireEvent.change(pwdInput, {target: {value: MOCK_PWD}});
        expect(pwdInput.value).toBe(MOCK_PWD);

        const pwdError: any = await screen.getByTestId("pwd-error");

        expect(pwdError.textContent).toBe(ERROR_MSG.minLength);
        const loginSubmit: any = await screen.getByTestId("login-submit");

        expect(loginSubmit.disabled).toBe(true);
    });

    test("It should match input", async () => {
        const handleTryAuth = jest.fn();
        const loginType = "signin";
        const handleResetValidationError = jest.fn();
        const handleFormVal = jest.fn();

        render(
            <BrowserRouter>
                <LoginForm
                    loginType={loginType}
                    tryAuth={handleTryAuth}
                    resetValidationError={handleResetValidationError}
                    validState=""
                    formTouched={false}
                    btnState="valid"
                    formValidation={handleFormVal}
                />
            </BrowserRouter>
        );
        const LOGIN_INPUT: string = "toto";
        const loginInput: any = await screen.getByTestId("login__input");

        fireEvent.change(loginInput, {target: {value: LOGIN_INPUT}});
        expect(loginInput.value).toBe(LOGIN_INPUT);

        const MOCK_PWD: string = "rerere";
        const pwdInput: any = await screen.getByTestId("pwd-input");

        fireEvent.change(pwdInput, {target: {value: MOCK_PWD}});
        expect(pwdInput.value).toBe(MOCK_PWD);

        const loginSubmit: any = await screen.getByTestId("login-submit");

        expect(loginSubmit.disabled).toBe(true);
    });

    test("It should disable submit button on invalid inputs", async () => {
        const handleTryAuth = jest.fn();
        const loginType = "signin";
        const handleResetValidationError = jest.fn();
        const handleFormVal = jest.fn();

        render(
            <BrowserRouter>
                <LoginForm
                    loginType={loginType}
                    tryAuth={handleTryAuth}
                    resetValidationError={handleResetValidationError}
                    validState="error"
                    formTouched={false}
                    btnState="valid"
                    formValidation={handleFormVal}
                />
            </BrowserRouter>
        );
        const LOGIN_INPUT: string = "mock";
        const loginInput: any = await screen.getByTestId("login__input");

        fireEvent.change(loginInput, {target: {value: LOGIN_INPUT}});
        expect(loginInput.value).toBe(LOGIN_INPUT);

        const MOCK_PWD: string = "ree";

        const pwdInput: any = await screen.getByTestId("pwd-input");

        fireEvent.change(pwdInput, {target: {value: MOCK_PWD}});
        expect(pwdInput.value).toBe(MOCK_PWD);
        const loginSubmit: any = await screen.getByTestId("login-submit");

        expect(loginSubmit.disabled).toBe(true);
    });
    test("It display error hint on invalid credentials", async () => {
        const handleTryAuth = jest.fn();
        const loginType = "signin";
        const handleResetValidationError = jest.fn();
        let isInvalid = "invalid";
        const handleFormVal = jest.fn();

        render(
            <BrowserRouter>
                <LoginForm
                    loginType={loginType}
                    tryAuth={handleTryAuth}
                    resetValidationError={handleResetValidationError}
                    validState={isInvalid}
                    formTouched={false}
                    btnState="valid"
                    formValidation={handleFormVal}
                />
            </BrowserRouter>
        );
        const LOGIN_INPUT: string = "mock@mock.fr";
        const loginInput: any = await screen.getByTestId("login__input");

        fireEvent.change(loginInput, {target: {value: LOGIN_INPUT}});
        expect(loginInput.value).toBe(LOGIN_INPUT);

        const MOCK_PWD: string = "rererere";

        const pwdInput: any = await screen.getByTestId("pwd-input");

        fireEvent.change(pwdInput, {target: {value: MOCK_PWD}});
        expect(pwdInput.value).toBe(MOCK_PWD);

        const loginSubmit: any = await screen.getByTestId("login-submit");

        fireEvent.click(loginSubmit);

        const hintError = await screen.getByTestId("message");

        expect(hintError).toBeTruthy();
    });

    test("It redirect to setup app intro on valid credentials", async () => {
        const handleTryAuth = jest.fn();
        const loginType = "signin";
        const handleResetValidationError = jest.fn();
        const handleFormVal = jest.fn();

        render(
            <BrowserRouter>
                <LoginForm
                    loginType={loginType}
                    tryAuth={handleTryAuth}
                    resetValidationError={handleResetValidationError}
                    validState={"valid"}
                    formTouched={false}
                    btnState="valid"
                    formValidation={handleFormVal}
                />
            </BrowserRouter>
        );
        const LOGIN_INPUT: string = "mock@mock.fr";

        const loginInput: any = await screen.getByTestId("login__input");

        fireEvent.change(loginInput, {target: {value: LOGIN_INPUT}});
        expect(loginInput.value).toBe(LOGIN_INPUT);

        const MOCK_PWD: string = "rererere";
        const pwdInput: any = await screen.getByTestId("pwd-input");

        fireEvent.change(pwdInput, {target: {value: MOCK_PWD}});
        expect(pwdInput.value).toBe(MOCK_PWD);

        const loginSubmit: any = await screen.getByTestId("login-submit");

        fireEvent.click(loginSubmit);

        expect(screen.getByTestId('message').textContent).toBe('valid')

    });
});
