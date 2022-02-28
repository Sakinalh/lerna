import { BaseAsyncState, DataQuery, PaginatedListApi, PaginationQuery, PaginationQueryDateRange } from "../../model";

export type AnalyticsFilterSliderKey =
    "start_date"
    | "end_date"
    | "clicks_min"
    | "clicks_max"
    | "cpc_min"
    | "cpc_max"
    | "cr_min"
    | "cr_max"
    | "bounce_rate_min"
    | "bounce_rate_max"
    | "message_match_min"
    | "message_match_max";

export type AnalyticsFilterRangeKeyApi =
    | "cost"
    | "impr"
    | "conv"
    | "ctr";
export type AnalyticsFilterRangeViewKey =
    | "cost_min"
    | "cost_max"
    | "impr_min"
    | "impr_max"
    | "conv_min"
    | "conv_max"
    | "ctr_min"
    | "ctr_max";
export type AnalyticsFilterDataKey = "lp_url" | "search_name" | "campaign_name" | "adgroup_name" | "keyword_name";
export type AnalyticsFilterRangeKeysView =
    AnalyticsFilterSliderKey
    | AnalyticsFilterRangeViewKey
    | AnalyticsFilterDataKey;
export type AnalyticsFilterRangeKeysApi =
    AnalyticsFilterSliderKey
    | AnalyticsFilterRangeKeyApi
    | AnalyticsFilterDataKey;

export type AnalyticsFilter = Record<AnalyticsFilterRangeKeysView, string | number>;

export interface StatefulAnalyticsPaginatedPayload {
    qState: DataQuery;
    qStr: string
}

export interface StatefulTablePaginatedPayload {
    qState: PaginationQuery;
    qStr: string
}

export interface PaginatedAnalyticsView<T> extends BaseAsyncState {
    query: PaginatedListApi<T>;
    selected: Record<string | "all", boolean>
}

export type LpKpiType = "message_match" | "clicks" | "bounce_rate" | "cpc";

export interface LpKpiItem {
    name: LpKpiType;
    value: number,
    display_name: string
}

export interface AnalyticsTableItemApi {
    keyword_name: string;
    keyword_id: number;
    lp_id: number;
    lp_url: string;
    lp_title: string;
    kpis: LpKpiItem[];
}

export interface AnalyticsSavedQueryItem {
    search_id: string;
    search_name: string;
    date: string;
}

export type AnalyticsSavedQuery = AnalyticsSavedQueryItem[];

/* QUERY */
export interface SaveQueryItem {
    search_name: string;
    keyword_IDS: number[];
}

export interface SavedQueryItem {
    search_name: string;
    search_id: string;
    date: string;
}

/* FILTER */
interface AnalyticFilterItemAPIBase {
    filter_name: Partial<AnalyticsFilterRangeKeysApi>;
    filter_display: string;
    filter_type: "numeric" | "text";

}

export interface AnalyticFilterItemAPIRange extends AnalyticFilterItemAPIBase {
    min: number;
    max: number;
}

export interface AnalyticFilterItemAPISingle extends AnalyticFilterItemAPIBase {
    value: string
}

export type AnalyticFilterItemAPI = AnalyticFilterItemAPIRange | AnalyticFilterItemAPISingle;

export interface AnalyticFilterItemView {
    filter_name: Partial<AnalyticsFilterRangeKeysApi>;
    filter_display: string;
    filter_type: "numeric" | "text" | "";
    value: string;
    min: number;
    max: number;
    _ui_type: "slider" | "range" | "single" | "date" | "unknown"

}

export interface AnalyticsPaginationQuery extends PaginationQueryDateRange {
    search_id: string
}

export interface GraphLine {
    x: string;
    y: number;
}

export interface KpiLineView extends GraphLine {
    kpi_display_name: string,

}

export interface AnalyticGlobalKpiApi {
    kpi_name: string,
    kpi_display_name: string,
    global_kpi: GraphLine[]

}

export interface KpiEvolutionGraphView {
    kpi_display_name: string,
    id: string;
    data: KpiLineView[];
    color: string;

}

export interface AnalyticsPageDetails {
    page_id: number,
    page_name: string,
    page_url: string,
    page_generation_date: string,
    template_id: number,
    template_name: string
}