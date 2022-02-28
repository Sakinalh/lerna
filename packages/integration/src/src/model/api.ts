export interface PaginatedListApi<T> {
  results: T[];
  next: string | null;
  previous: string | null;
  count: number;
}

export interface PaginatedDataByDate<T> {
  data: PaginatedListApi<T>;
  value: "0" | "7" | "30" | "31";
  viewValue: "today" | "last 7 days" | "last 30 day" | "last 31 day";
}

export interface CampaignInterface {
  id: number;
  status: string;
  processed_pages: number;
  total_pages: number;
  name: string;
}

export interface KeywordInterface {
  id: number;
  template_id: number;
  category: string;
  kwd_text: string;
}

export interface FiltersApi {
 name: string;
 operator: string;
 type: string;
 value: string;
}
