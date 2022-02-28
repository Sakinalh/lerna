export interface FormattedLIstItem {
    viewValue: string,
    value: string,
    icon: any,

}

export interface PaginationQuery {
    offset: string;
    limit: string;
}

export interface PaginationQueryDateRange extends PaginationQuery {
    start_date: string;
    end_date: string;
}

export interface PaginationQuerySortDateRange extends PaginationQueryDateRange {
    sort_criteria: string;
    sort_order: string;
}
