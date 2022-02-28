import { act, renderHook } from "@testing-library/react-hooks";
import { useRerender } from "./useRerender";

test("return new state", async () => {
    let value = {mock: "test"};
    let newState = {
        mock: "updated",
    };
    let updated: any = {result: {current: []}};
    const {rerender} = renderHook(() =>
        useRerender(value, (state) => state)
    );

    act(() => {
        updated = renderHook(() => useRerender(newState, (state) => state));
    });
    rerender();

    expect(updated.result.current[0]).toMatchObject(newState);
});
