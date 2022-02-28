import { UseCbOnEffect } from "src/hooks/useCbOnEffect";
import { renderHook } from "@testing-library/react-hooks";

test("should call cb on trigger change", () => {
    let trigger = true;
    const expectedVal = "mock";
    let res: string | null = null;
    const cb = jest.fn((arg) => (res = arg));

    renderHook(() => UseCbOnEffect(trigger, cb, expectedVal));

    expect(res).toBe(expectedVal);
    expect(cb).toHaveBeenCalledTimes(1);
});
