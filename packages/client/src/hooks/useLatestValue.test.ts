import { renderHook } from "@testing-library/react-hooks";

import { useLatestValue } from "./useLatestValue";

test("return latest value", () => {
    let value = {mock: "test"};
    let newState = {
        mock: "udapted",
    };
    const {result, rerender} = renderHook(() =>
        useLatestValue(newState, value)
    );
    rerender();
    expect(result.current[0]).toMatchObject(newState);
});
