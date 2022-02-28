export type SortCriteriaValue =
    | "message_match"
    | "missed_potential_traffic"
    | "missed_potential_conversions";

export type DataQueryValue = Record<string, string | number>;
export type ParamsState = Record<string, string>;

/*
export interface DateRange {
    startDate: string |Date;
    endDate: string | Date;
}
*/

export interface DateRangeApi {
    start_date: string;
    due_date: string;
}

export interface SortItemOrder {
    value: string;
    viewValue: string;
}

export interface SortItem<T extends string> {
    value: T;
    viewValue: string;
}

export interface SortModel<T extends string> {
    list: SortItem<T>[];
    defaultValue: T | "";
}

export type ViewSortList<T extends string, U extends string> = Record<T, SortModel<U>>;

export interface FilterItemType<T> {
    value: T;
    viewValue: string;
    qProps: [string] | [string, string];
    type:
        | "string"
        | "number"
        | "boolean"
        | "range"
        | "select"
        | "multiselect"
        | "range_select"
        | "range_date"
        | "range_string";
}

export interface ListSort {

    sort_criteria: SortCriteriaValue | "";
    sort_order: "asc" | "desc" | "";

}
