import { Route } from "react-router-dom";
import * as React from "react";
import { lazy } from "react";
import { PageTheme } from "src/containers/PageTheme/PageTheme.container";

const ResetPwdContainer = lazy(() => import("src/PageLogin/pages/PagePwd/containers/ResetPwd.container"));
const ChangePwdContainer = lazy(() => import("src/PageLogin/pages/PagePwd/containers/ChangePwd.container"));
const LoginContainer = lazy(() => import("src/PageLogin/containers/Login.container"));
const SignUpContainer = lazy(() => import("src/PageLogin/pages/PageSignUp/containers/SignUp.container"));

export function routingLogin(purge: Function) {
  return (
    <>
      <Route path="login" element={(<PageTheme> <LoginContainer /> </PageTheme>)} />
      <Route path="password/" key="password">
        <Route path="reset" key="pwd-reset" element={<ResetPwdContainer purge={purge} />} />
        <Route path="change" key="pwd-change" element={<ChangePwdContainer purge={purge} />} />
      </Route>
      <Route path="signUp" element={(<PageTheme> <SignUpContainer /> </PageTheme>)} />
    </>
  );
}
