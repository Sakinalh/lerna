export interface GetPageDetailsParamsInterface {
    keyword_ID: number;
    page_ID: string;
}

export interface GetPageTimeLineParamsInterface {
  keyword_ID: number;
  page_ID: number;
  start_date?: string;
  end_date?: string;
}

export interface GetAnalyticsPageDetailsResponseInterface {
  page_id: number,
  page_name: string,
  page_url: string,
  page_generation_date: string,
  template_id: number,
  template_name: string
}
export interface GetAnalyticsPageTimeLineResponseInterface {
  start_date: string,
  end_date: string,
  modifications: [
    {
      name: string,
      value: string,
      datetime: string
    }
  ]
}
