import { DataQueryValue, ParamsState, SortItem, SortModel, ViewSortList } from "src/model";

export type TemplateSortCriteriaValue =
    | "message_match"
    | "missed_potential_traffic"
    | "missed_potential_conversions";

export type TemplateSort = SortItem<TemplateSortCriteriaValue>;
export type TemplateSortModel = SortModel<TemplateSortCriteriaValue>;
export type SortTemplateType = "default";

export type TemplateRequiredKeys = "limit" | "offset" | "sort_order" | "sort_criteria" | "start_date" | "end_date";
export const ENUM_SORT_TEMPLATE_MODELS: ViewSortList<SortTemplateType, TemplateSortCriteriaValue> = {
  default: {
    list: [
      {
        value: "message_match",
        viewValue: "message match"
      },
      {
        value: "missed_potential_traffic",
        viewValue: "missed potential traffic"
      },
      {
        value: "missed_potential_conversions",
        viewValue: "missed potential conversions"
      }
    ],
    defaultValue: "message_match"
  }
};

export interface InitTemplateDataPayload {
    req: DataQueryValue;
    opt: DataQueryValue;
}

export interface InitTemplateDetailPayload extends InitTemplateDataPayload {
    id: number;
}

export interface StatefulPaginatedInterfaceActionPayload {
    qState: ParamsState;
    qStr: string
}

export interface PaginateInterfaceActionPayload {
    next: StatefulPaginatedInterfaceActionPayload;
    cb: Function;
}

export interface DeleteActionInterfacePayload {
    id: string | number;
}

export interface DetailActionInterfacePayload {
    id: string | number;
}

export interface DetailActionWithCb extends DetailActionInterfacePayload {
    onSuccess: Function;
}
