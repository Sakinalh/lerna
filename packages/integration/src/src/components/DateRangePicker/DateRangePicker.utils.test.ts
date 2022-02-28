import {
    chunks,
    combine,
    getDaysInMonth,
    identity,
    inDateRange,
    isEndOfRange,
    isRangeSameDay,
    isStartOfRange,
    parseOptionalDate
} from "./utils";

describe("date range picker helpers ", () => {
    afterEach(() => jest.clearAllMocks());
    test("return sub array based on input", () => {
        const A = [1, 2, 3]
        const B = 2
        const value = chunks(A, B)
        const EXPECTED = [[1, 2], [3]]
        expect(value).toEqual(EXPECTED);

    });

    test("should return input", () => {
        const A = 1
        const value = identity(A)
        expect(value).toEqual(A);

    });

    test("should return list into string", () => {
        const A = [1, 2, 3]
        const value = combine(A)
        const EXPECTED = "1,2,3"
        expect(value).toEqual(EXPECTED);

    });

    test("should return list of days in the month", () => {
        const A = new Date(1980, 1, 1)
        const value = getDaysInMonth(A)
        const EXPECTED = 35
        expect(value.length).toBe(EXPECTED);

    });

    test("should return true when date is same as start date", () => {
        const A = new Date(1980, 1, 1)
        const value = isStartOfRange({startDate: A}, A)
        expect(value).toBeTruthy();

    });
    test("should return false when date is different from start date", () => {
        const A = new Date(1980, 1, 1)
        const B = new Date(1980, 2, 1)
        const value = isStartOfRange({startDate: A}, B)
        expect(value).toBeFalsy();
    });

    test("should return true when date is same as end date", () => {
        const A = new Date(1980, 1, 1)
        const value = isEndOfRange({endDate: A}, A)
        expect(value).toBeTruthy();
    });

    test("should return true when date are between start and end date", () => {
        const A = new Date(1980, 1, 1)
        const B = new Date(1980, 2, 1)
        const C = new Date(1980, 1, 10)

        const value = inDateRange({startDate: A, endDate: B}, C)
        expect(value).toBeTruthy();
    });
    test("should return false when date are not between start and end date", () => {
        const A = new Date(1980, 1, 1)
        const B = new Date(1980, 2, 1)
        const C = new Date(1990, 5, 10)

        const value = inDateRange({startDate: A, endDate: B}, C)
        expect(value).toBeFalsy();
    });


    test("should return true when dates are same", () => {
        const A = new Date(1980, 1, 1)
        const value = isRangeSameDay({startDate: A, endDate: A})
        expect(value).toBeTruthy();
    });
    test("should return false when dates are different", () => {
        const A = new Date(1980, 1, 1)
        const B = new Date(1980, 1, 3)

        const value = isRangeSameDay({startDate: A, endDate: B})
        expect(value).toBeFalsy();
    });


    test("should return input  in yyyy-MM-dd format", () => {
        const A = new Date(1980, 1, 1)
        const value = parseOptionalDate(A, A)
        const EXPECTED = new Date("1980-01-31T23:00:00.000Z")
        expect(value).toStrictEqual(EXPECTED);
    });


    test("should return input on invalid input", () => {
        const A = null
        const value = parseOptionalDate(A, A as any)
        expect(value).toStrictEqual(A);
    });

})
