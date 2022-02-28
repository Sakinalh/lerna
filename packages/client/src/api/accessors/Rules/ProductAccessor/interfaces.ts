export interface GetProductFiltersParamsInterface {
    keyword_id: number;
    page_id: number;
}

export interface GetZoneProductsParamsInterface {
    page_id: string,
    keyword_id: any,
    rule_id: any,
    zone_id: any,
}

export interface AddProductParams {
    page_id: string;
    keyword_id: string;
    products: { zone_id: string, content_id: string }[]
}

export interface RemoveProductInterface {
    page_id: string,
    zone_id: string,
    keyword_id: string,
    products: string[]
  }

export interface AddProductParams {
    page_id: string;
    keyword_id: string;
    products: { zone_id: string, content_id: string }[]
}
export interface SendReorderedProductParams {
    page_id: string;
    sorted_products: string[];
}

export interface GetZoneProductsParamsInterface {

}

export interface GetProductDetailsParamsInterface {
    page_id: string;
    keyword_id: string;
    rule_id: string;
    product_id: string;
    zone_id: string;
}

export interface GetProposedProductsParamsInterface {
    keyword_id: number;
    rule_id: number;
    page_id: string;
    zone_id: string;
    filters:{"name": string, "operator": string, "value": string}[];
    offset: number;
    limit:number;
}

export interface GetProductDetailsResponseInterface {
    name: string;
    score: number;
    id: string;
    neo_id: number;
    zone_id: string;
    is_active: boolean;
    sub_zones: [
        {
        zone_id: string;
        zone_label: string;
        zone_value: any;
        currency?: string;
        }
    ]
  }

export interface EditProductParamsInterface
  {
    rule_id: number;
    keyword_id: number;
    page_id: string;
    edits: [
      {
        product_id: string;
        sub_zones: [
          {
            zone_id: string;
            value: string;
          }
        ]
      }
    ]
  }

export interface ReplaceProductParamsInterface
  {
    rule_id: number;
    keyword_id: number;
    zone_id: string;
    page_id: string;
    current_product_id: string;
    new_product_id: string;

  }