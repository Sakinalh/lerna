import { BASE_INPUT_STATE, BASE_MOCK_FORM_CONTROL, BaseInputState, } from "src/fixtures";
import {
    deepCopy,
    flattenObjValues,
    getRemainTime,
    IsArrayObjectEqual,
    isEmpty,
    isEquivalent,
    normalizeStr,
    safeGet,
    safeSet,
} from "./helper";
import {
    controlsAreValid,
    displayErrorHint,
    ERROR_MSG,
    formatInputState,
    formsCtrlsToPayload,
    formStateToValue,
    isValidUrl,
    makeFormState,
    uiValidation,
    validate
} from "../form/helper";

const VALID_INPUT_STATE = {value: true, message: null};

describe("utils", () => {
    it("return object value given right fullPath", () => {
        const OBJ = {
            nested: {
                inner: "nested",
            },
        };
        const value = safeGet(OBJ, "nested", "inner");
        expect(value).toBe(OBJ.nested.inner);
    });

    it("return null given wrong fullPath", () => {
        const OBJ = {
            nested: {
                inner: "nested",
            },
        };
        const value = safeGet(OBJ, "nested", "nested");

        expect(value).toBe(null);
    });

    it("return normalize string and remove space", () => {
        const STR = " Fa Y ";
        const expected = "FAY";
        const value = normalizeStr(STR);
        expect(value).toBe(expected);
    });

    it("return true on empty string", () => {
        const STR = "";
        const value = isEmpty(STR);
        expect(value).toBeTruthy();
    });
    it("return false on non empty string", () => {
        const STR = "babou";
        const value = isEmpty(STR);
        expect(value).toBeFalsy();
    });

    it("return true on valid url", () => {
        const URL = "https://react-testing-examples.com/";
        const value = isValidUrl(URL);
        expect(value).toBeTruthy();
    });
    it("return false on invalid url", () => {
        const URL = "hts://react-testing-examples";
        const value = isValidUrl(URL);
        expect(value).toBeFalsy();
    });

    it("return true if objects have same value", () => {
        const A = {
            nested: {
                inner: "nested",
            },
        };
        const B = {
            nested: {
                inner: "nested",
            },
        };
        const value = isEquivalent(A, B);
        expect(value).toBeTruthy();
    });

    it("return false if objects are different", () => {
        const A = {
            nested: {
                inner: "nested",
            },
        };
        const B = {
            nested: {
                inner: "nested",
                outer: "outer"
            },
        };
        const value = isEquivalent(A, B);
        expect(value).toBeFalsy();
    });

    it("return false if objects have different value", () => {
        const A = {
            nested: {
                inner: "nested",
            },
        };
        const B = {
            nested: {
                inner: "babou",
            },
        };
        const value = isEquivalent(A, B);
        expect(value).toBeFalsy();
    });

    it("return true if Array objects have same value", () => {
        const A = [
            {
                nested: "nested",
            },
            {
                some: "some",
            },
        ];
        const B = [
            {
                nested: "nested",
            },
            {
                some: "some",
            },
        ];
        const value = IsArrayObjectEqual(A, B);
        expect(value).toBeTruthy();
    });

    it("return false if Array objects have different value", () => {
        const A = [
            {
                nested: "nested",
            },
            {
                some: "some",
            },
        ];
        const B = [
            {
                nested: "nested",
            },
            {
                some: "babou",
            },
        ];
        const value = IsArrayObjectEqual(A, B);
        expect(value).toBeFalsy();
    });
    it("return false if Array objects have different length", () => {
        const A = [
            {
                nested: "nested",
            },
            {
                some: "some",
            },
        ];
        const B = [
            {
                nested: "nested",
            },
        ];
        const value = IsArrayObjectEqual(A, B);
        expect(value).toBeFalsy();
    });
    it("return false if Array objects have different type", () => {
        const A = [
            {
                nested: "nested",
            },
        ];
        const B = [
            {
                nested: true,
            },
        ];
        const value = IsArrayObjectEqual(A, B);
        expect(value).toBeFalsy();
    });

    it("return false if input are not Array objects", () => {
        const A = "a"
        const value = IsArrayObjectEqual(A as any, A as any);
        expect(value).toBeFalsy();
    });

    it("return false if list types are different", () => {
        const A = [{value: "1"}]
        const B = [true]

        const value = IsArrayObjectEqual(A, B);
        expect(value).toBeFalsy();
    });


    it("return remaining time in minutes", () => {
        const REMAINING = 2;

        let START_DATE = new Date();
        START_DATE.setMinutes(new Date().getMinutes() + REMAINING);
        const value = getRemainTime(START_DATE.toISOString(), "min");

        expect(value).toBeLessThanOrEqual(REMAINING);
    });

    it("return remaining time in seconds", () => {
        const REMAINING = 10;

        let START_DATE = new Date();
        START_DATE.setSeconds(new Date().getSeconds() + REMAINING);
        const value = getRemainTime(START_DATE.toISOString(), "scd");

        expect(value).toBeLessThanOrEqual(REMAINING);
    });

    it("return error message", () => {
        let PARTIAL_INPUT_SATE = {
            state: {
                errorDisplay: "required",
            },
        };
        const value = displayErrorHint(PARTIAL_INPUT_SATE as any);

        expect(value).toBe(ERROR_MSG.required);
    });

    it("return true if input has not been touched", () => {
        let PARTIAL_INPUT_SATE: any = {
            state: {
                touched: false,
                valid: true,
            },
        };
        const value = uiValidation(PARTIAL_INPUT_SATE);

        expect(value).toBeTruthy();
    });

    it("return truthy form valid state if input has been touched", () => {
        let PARTIAL_INPUT_SATE: any = {
            state: {
                touched: true,
                valid: true,
            },
        };
        const value = uiValidation(PARTIAL_INPUT_SATE);

        expect(value).toBeTruthy();
    });

    it("return falsy form valid state if input has been touched", () => {
        let PARTIAL_INPUT_SATE: any = {
            state: {
                touched: true,
                valid: false,
            },
        };
        const value = uiValidation(PARTIAL_INPUT_SATE);
        expect(value).toBeFalsy();
    });
    it("return null on non array input", () => {
        const MOCK_VAL = "";

        const value = validate(MOCK_VAL, "required" as any);
        expect(value).toBeNull();
    });

    it("return valid input state on unknown rules", () => {
        const MOCK_VAL = "";

        const value = validate(MOCK_VAL, ["mock"] as any);
        expect(value).toMatchObject(VALID_INPUT_STATE);
    });

    it("return required input state on falsy value", () => {
        const MOCK_VAL = "";
        const expected = {
            value: false,
            message: "required",
        };
        const value = validate(MOCK_VAL, ["required"]);
        expect(value).toEqual(expected);
    });

    it("return minLength input state on falsy value", () => {
        const MOCK_VAL = "";
        const expected = {
            value: false,
            message: "minLength",
        };
        const value = validate(MOCK_VAL, ["minLength"]);
        expect(value).toEqual(expected);
    });

    it("return minLength input state on value length < 5", () => {
        const MOCK_VAL = "";
        const expected = {
            value: false,
            message: "minLength",
        };
        const value = validate(MOCK_VAL, ["minLength"]);
        expect(value).toEqual(expected);
    });

    it("return truthy input state on value length > 5", () => {
        const MOCK_VAL = "babouuuu";
        const expected = {
            value: true,
            message: "minLength",
        };
        const value = validate(MOCK_VAL, ["minLength"]);
        expect(value).toEqual(expected);
    });

    it("return falsy input state on invalid url", () => {
        const MOCK_VAL = "babouuuu";
        const expected = {
            value: false,
            message: "isUrl",
        };
        const value = validate(MOCK_VAL, ["isUrl"]);
        expect(value).toEqual(expected);
    });

    it("return falsy input state on invalid email", () => {
        const MOCK_VAL = "babouuuu";
        const expected = {
            value: false,
            message: "isEmail",
        };
        const value = validate(MOCK_VAL, ["isEmail"]);
        expect(value).toEqual(expected);
    });

    it("return truthy input state on empty rules", () => {
        const MOCK_VAL = "babouuuu";

        const value = validate(MOCK_VAL, []);
        expect(value).toEqual(VALID_INPUT_STATE);
    });

    it("return false is required field is empty", () => {
        const MOCK_VAL = "";
        const expected = {
            value: false,
            message: "required",
        };
        const value = validate(MOCK_VAL, ["required"]);
        expect(value).toMatchObject(expected);
    });
    it("return true is required field is not empty", () => {
        const MOCK_VAL = ["a"];
        const expected = {
            value: true,
            message: "required",
        };
        const value = validate(MOCK_VAL as any, ["required"]);
        expect(value).toMatchObject(expected);
    });

    it("return true is required field is not empty", () => {
        const MOCK_VAL = "a";
        const expected = {
            value: true,
            message: "required",
        };
        const value = validate(MOCK_VAL as any, ["required"]);
        expect(value).toMatchObject(expected);
    });

    it("return true is required field is not empty", () => {
        const MOCK_VAL = true;
        const expected = {
            value: true,
            message: "required",
        };
        const value = validate(MOCK_VAL as any, ["required"]);
        expect(value).toMatchObject(expected);
    });


    it("return true if form controls are valid", () => {
        const mock: any = {
            ...BASE_MOCK_FORM_CONTROL,
            loginInput: {
                valid: true,
            },
            pwdInput: {
                valid: true,
            },
        };

        const value = controlsAreValid(mock);
        expect(value).toBeTruthy();
    });

    it("return false if form controls are invalid", () => {
        const mock: any = {
            ...BASE_MOCK_FORM_CONTROL,
            loginInput: {
                valid: false,
            },
            pwdInput: {
                valid: true,
            },
        };

        const value = controlsAreValid(mock);
        expect(value).toBeFalsy();
    });
    //in absence of valid prop, free pass
    it("return true if form controls has no valid property", () => {
        const mock: any = {

            pwdInput: {},
        };

        const value = controlsAreValid(mock);
        expect(value).toBeTruthy();
    });


    it("return form control state inputs", () => {
        const setter = (_) => null;
        const key = "mock";
        const validations = ["required"];
        const mock: any = [[key, BASE_INPUT_STATE, setter, validations]];
        const value = makeFormState(mock);
        const expected = {
            [key]: {
                state: BASE_INPUT_STATE,
                setter,
                validations,
            },
        };
        expect(value).toMatchObject(expected);
    });

    it("return login payload from forms controls", () => {
        const mock: any = {
            ...BASE_MOCK_FORM_CONTROL,
            loginInput: {
                state: {
                    value: "mock",
                },
            },
            pwdInput: {
                state: {
                    value: "mock",
                },
            },
        };

        const value = formsCtrlsToPayload(mock);

        const expected = {
            email: "mock",
            password: "mock",
        };
        expect(value).toMatchObject(expected);
    });

    it("return form value  from forms controls", () => {
        const mock: any = {
            ...BASE_MOCK_FORM_CONTROL,
            loginInput: {
                state: {
                    value: "mock",
                },
            },
            pwdInput: {
                state: {
                    value: "mock",
                },
            },
        };

        const value = formStateToValue(mock);

        const expected = {
            loginInput: "mock",
            pwdInput: "mock",
        };
        expect(value).toMatchObject(expected);
    });

    it("return updated validation form state   from forms controls", () => {
        const validations: any = ["required"];
        const expected = {
            ...BASE_INPUT_STATE,
            validationType: validations,
        };

        const value = formatInputState(
            validations,
            BASE_INPUT_STATE as BaseInputState<string | null>
        );

        expect(value).toMatchObject(expected);
    });

    it("return a flatten list of values in an object", () => {
        const mock = {
            message: {
                nested: {
                    test: "test",
                    babou: "babou",
                },
                massage: {
                    other_1: "other",
                    nested_massage: {
                        other_head: "other_babou",
                        other_sub: "other_babou",
                    },
                },
            },
        };

        const expected = {
            values: [
                {path: ["message", "nested", "test"], value: "test"},
                {path: ["message", "nested", "babou"], value: "babou"},
                {path: ["message", "massage", "other_1"], value: "other"},
                {
                    path: ["message", "massage", "nested_massage", "other_head"],
                    value: "other_babou",
                },
                {
                    path: ["message", "massage", "nested_massage", "other_head"],
                    value: "other_babou",
                },
            ],
        };

        const value = flattenObjValues(mock);

        expect(value.values).toEqual(expect.arrayContaining(expected.values));
    });

    it("return empty values on non object input", () => {
        const mock = "babou";
        const expected = {
            values: [],
        };

        const value = flattenObjValues(mock);

        expect(value).toMatchObject(expected);
    });


    it("return false if input is invalid url", () => {
        const A = "invalid"

        const value = isValidUrl(A);
        expect(value).toBeFalsy();
    });
    it("return true if input is valid url", () => {
        const A = "https://stackedit.io/app#"

        const value = isValidUrl(A);
        expect(value).toBeTruthy();
    });
    it("return a new object from object", () => {
        const A = {
            a: {
                "aa": "nested"
            }
        }

        const value = deepCopy(A);
        expect(value === A).toBeFalsy();
        expect(value).toMatchObject(A)
    });

    it("return a updated object on valid path", () => {
        const A = {
            a: {
                "aa": "nested"
            }
        }
        const EXPECTED = {
            a: {
                "aa": "mutated"
            }
        }
        const nextValue = "mutated"
        const value = safeSet(A, nextValue, "a", "aa");
        expect(value).toMatchObject(EXPECTED)
    });

    it("return null on invalid nested object", () => {
        const A = {
            "aa": "nested"
        }

        const nextValue = "mutated"
        const value = safeSet(A, nextValue, "a", "zz");
        expect(value).toBeNull()
    });
    it("return initial state on invalid path", () => {
        const A = {
            "aa": "nested"
        }

        const nextValue = "mutated"
        const value = safeSet(A, nextValue, "a");
        expect(value).toMatchObject(A)
    });


});
