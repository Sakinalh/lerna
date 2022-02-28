import * as React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
/* comment test because fail-> epic middleware doesnt properly import model. again */
const LoginContainer = lazy(() =>
  import("src/PageLogin/containers/Login.container")
);

describe("Loadable components", () => {
  it("renders lazy login form", async () => {
    render(
            <Suspense fallback={<p>Loading...</p>}>
                <LoginContainer/>
            </Suspense>,
            { wrapper: Router }
    );
    const form = await screen.findByTestId(/login-form/i);
    expect(form).toBeDefined();
  });

  test("It should renders lazy login logo", async () => {
    render(
            <Suspense fallback={<p>Loading...</p>}>
                <LoginContainer/>
            </Suspense>,
            { wrapper: Router }
    );

    const logo = await screen.findByTestId("login-logo");
    expect(logo).toBeTruthy();
  });
});
