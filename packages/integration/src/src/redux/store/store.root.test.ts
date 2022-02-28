import { INITIAL_STORE_STATE, reducer } from "./const";

test("return initial store state", () => {
    const expected = reducer(INITIAL_STORE_STATE, null as any);

    expect(expected).toMatchObject(INITIAL_STORE_STATE);
});
