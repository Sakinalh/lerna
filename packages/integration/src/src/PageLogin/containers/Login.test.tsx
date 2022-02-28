import * as React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from "src/PageLogin/components/LoginForm/LoginForm.component";
import { BrowserRouter } from "react-router-dom";

describe("Access to app", () => {
    beforeEach(() => cleanup());

    test("It should prevent submit", async () => {
        const handleTryAuth = jest.fn();
        const loginType = "signin";
        const handleResetValidationError = jest.fn();
        let isInvalid = "Couldn't signin";
        const handleFormVal = jest.fn(() => "invalid");
        render(
            <BrowserRouter>
                <LoginForm
                    loginType={loginType}
                    tryAuth={handleTryAuth}
                    resetValidationError={handleResetValidationError}
                    validState={isInvalid}
                    formTouched={false}
                    formValidation={handleFormVal}
                    btnState="error"
                />
            </BrowserRouter>
        );
        const MOCK_INPUT: string = "inv";
        const MOCK_PWD: string = "re";

        const loginInput: any = await screen.getByTestId("login__input");
        fireEvent.change(loginInput, {target: {value: MOCK_INPUT}});
        expect(loginInput.value).toBe(MOCK_INPUT);

        const pwdInput: any = await screen.getByTestId("pwd-input");
        fireEvent.change(pwdInput, {target: {value: MOCK_PWD}});
        expect(pwdInput.value).toBe(MOCK_PWD);

        const loginSubmit: any = await screen.getByTestId("login-submit");
        expect(loginSubmit.disabled).toEqual(true);

        loginSubmit.click();
        expect(handleTryAuth).toHaveBeenCalledTimes(0);
    });
});
