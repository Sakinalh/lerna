import { act, renderHook } from "@testing-library/react-hooks";
import { useToggle } from "./useToggle";

test("should toggle falsy value", () => {
    const initialValue = false;
    const {result} = renderHook(() => useToggle(initialValue));
    act(() => {
        result.current[1]();
    });
    expect(result.current[0]).toBeTruthy();
});

test("should toggle true value", () => {
    const initialValue = true;
    const {result} = renderHook(() => useToggle(initialValue));
    act(() => {
        result.current[1]();
    });
    expect(result.current[0]).toBeFalsy();
});
