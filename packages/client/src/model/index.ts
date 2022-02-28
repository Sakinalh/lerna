export * from "./api";
export * from "./app";
export * from "./form";
export * from "./hooks";
export * from "./store";
export * from "./state";

export interface DataByDate<T> {
    data: Array<T>;
    value: "0" | "7" | "30" | "31";
    viewValue: "today" | "last 7 days" | "last 30 day" | "last 31 day";
}
