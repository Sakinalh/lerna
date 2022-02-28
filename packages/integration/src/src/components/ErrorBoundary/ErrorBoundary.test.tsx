import * as React from "react";
import { render } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";
import { StateMock } from "@react-mock/state";

const Test = function (props) {
    return (
        <div>
            <p>no error</p>
        </div>
    );
};
const renderComponent = ({hasError}) =>
    render(
        <StateMock state={{hasError}}>
            <ErrorBoundary>
                <Test/>
            </ErrorBoundary>
        </StateMock>
    );
jest.mock("./../../mock/utils.mock", () => {
    return {
        reportError: jest.fn(() => Promise.resolve({success: true})),
    };
});
describe("Container should math route", () => {
    beforeEach(() => {
        jest.spyOn(console, "error");
    });
    afterEach(() => {
        //console.error.mockRestore();
    });
    test("It should display link to projects on error", async () => {
        const {getAllByTestId} = renderComponent({
            hasError: true,
        });
        expect(getAllByTestId("link_projects")).toBeTruthy();
    });

    test("It should display child component on error false", async () => {
        const {getByText} = renderComponent({
            hasError: false,
        });
        expect(getByText(/no error/i)).toBeTruthy();
    });
});
