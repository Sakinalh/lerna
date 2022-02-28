import { renderHook } from "@testing-library/react-hooks";
import { useDispachToProps } from "./useDispatchToProps";

test("apply dispatcher", () => {
    const payload = ["babou"];
    const func = jest.fn();

    const {rerender} = renderHook(() =>
        useDispachToProps(payload, func)
    );
    rerender();
    expect(func).toBeCalled();
    expect(func).toHaveBeenCalledTimes(1);
});
test("not apply dispatcher on empty list", () => {
    const payload = [];
    const func = jest.fn();
    const {rerender} = renderHook(() =>
        useDispachToProps(payload, func)
    );
    rerender();
    expect(func).not.toBeCalled();
});

test("apply format data if available", () => {
    const payload = [{mock: "test"}];
    const func = jest.fn();
    const formatData = jest.fn();

    const {rerender} = renderHook(() =>
        useDispachToProps(payload, func, formatData)
    );
    rerender();
    expect(formatData).toBeCalled();
    expect(formatData).toHaveBeenCalledTimes(1);
});
