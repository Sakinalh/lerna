/* ******************************************
 *      TEMPLATE RECAPS
 ****************************************** */
import { AreaSettingValue, DataByDate, PaginatedDataByDate, SetupFile } from "src/model";

export type VariableItemType = "text list" | "text" | "excel text list";

export interface TemplateVariableBase {
    name: string;
    type: VariableItemType;
    value: string | string[];
    source_files: string[];

}

export interface TemplateVariableApi extends TemplateVariableBase {
    selected_columns: string;
}

export type TemplateVariables = TemplateVariableApi[];

export type TemplateAreaType = "product" | "text" | "bank image";

export interface BaseTextRule {
    is_advanced: boolean;
    use_existing_titles: boolean;
    text_template: string;
    default_value: string;
    text_max_length: number;
    text_length: number;
    text_lists: string[];
    format: string;

}

export interface TextDefaultRule extends BaseTextRule {

}

export interface TextAdvancedRule extends BaseTextRule {

}

export interface TemplateAreaItemApi<T> {
    zone_id: string;
    type: string;
    comment: string | null;
    rule: T | string;
}

export interface TemplateAreaItem<T> {
    zone_id: string;
    type: string;
    comment: string | null;
    rule: T;

}

export interface BankImageMetas {
    positive_tags: string[];
    negative_tags: string[];
}

export interface BankImageRule {
    sources: number[];
    design: AreaSettingValue[];
    meta: BankImageMetas;
}

export type AreaProductRuleFilterType = "numeric" | "text";
export type AreaProductRuleFilter = {
    "type": AreaProductRuleFilterType;
    "max_value": number | null;
    "min_value": number | null;
    "value": string[];
    "filter_name": string;
}

export interface AreaProductRule {
    "filters": AreaProductRuleFilter [],
    "sources": number[];
    "optimize_images_order": boolean;
    "n_products": number;
}

export interface AreaProductSubzoneRule {
    "type": "template",
    "value": string,
    "format": string
}

export interface AreaProductSubzone {
    "type": "text" | "image";
    "rule": AreaProductSubzoneRule | SubProductImageInterface;
    "comment": string;
    "zone_id": string;
}

export interface TemplateAreaItemImg extends TemplateAreaItem<BankImageRule> {}

export interface TemplateAreaItemText extends TemplateAreaItem<BaseTextRule> {}

export interface SubProductTextInterface {
    type: "template";
    value: string;
    format: "title";
}

export interface SubProductImageInterface {optimize_sequence: boolean, height: 200, width: 200}

export interface SubProduct {
    zone_id: string;
    type: "text" | "image";
    comment: string | null;
    rule: SubProductTextInterface | SubProductImageInterface;

}

export interface TemplateAreaItemProduct extends TemplateAreaItem<AreaProductRule> {
    aggregate?: boolean;
    sub_zones: AreaProductSubzone[];
}

export interface UtmVar {
    name: string;
    value: string;
}

export interface TemplateUrl {
    url_pattern: string;
    utm_variables: UtmVar[];
}

export interface TemplateMeta {
    description: string;
    title: string;
    kwds: string;
}

export interface VariableTemplateApi {
    sources: {
        list: PaginatedDataByDate<DataByDate<TemplateSourceApi>>;
        pagination: {
            offset: string;
            limit: string;
        };
        selected: Record<string, boolean>;
        file: SetupFile | {};
        datum: TemplateSourceApi;
        rawResults: TemplateSourceApi[];

    };
}

/* ******************************************
 *      TEMPLATE LIST
 ****************************************** */

export interface TemplateListRuleApi {
    rule_id: string;
    rule_name: string;
}

export interface RuleKeyword {
    id: number;
    name: string;
}

export interface BaseTemplateListItem {
    id: number;
    cached_temp_rule_id: string;
    name: string;
    html: string;
    creation_date: string;
    url: string;
    modification_date: string;
    rules: TemplateListRuleApi[];

}

export interface TemplateAreaItemImgApi extends TemplateAreaItemApi<BankImageRule> {}

export interface TemplateAreaItemTextApi extends TemplateAreaItemApi<BaseTextRule> {}

export interface AreaProductSubzoneApi {
    "type": "text" | "image";
    "rule": AreaProductSubzoneRule | SubProductImageInterface | string;
    "comment": string;
    "zone_id": string;
}

export interface TemplateAreaItemProductApi extends TemplateAreaItemApi<AreaProductRule> {
    sub_zones: AreaProductSubzoneApi[];
}

// the api return "null" | proper rule | whatever. It's always on object
export interface TemplateListItemApi extends BaseTemplateListItem {
    zones: Array<TemplateAreaItemImgApi | TemplateAreaItemTextApi | TemplateAreaItemProductApi>[];
}

// the normalize version will cast it into proper model

export interface TemplateListItemNormalizedApi extends BaseTemplateListItem {
    zones: Array<TemplateAreaItemText | TemplateAreaItemImg | TemplateAreaItemProduct>[];
}

/* ******************************************
 *      TEMPLATE Queue
 ****************************************** */

export type QueuedItemStatus = "validation" | "in_progress" | "processed" | "error";
export type QueuedItemDelimiter = "," | "|" | ":" | ";";

/* ******************************************
 *      TEMPLATE generated
 ****************************************** */

export type ZoneDataType = "text" | "image" | "product" | null;

export interface TemplateZoneApi {
    id: string;
    type: ZoneDataType;
    name: string;
    content: string;
    score: number | string;
}

export interface ExtendedTemplateZoneApi extends TemplateZoneApi {
    keyword_id: number;
    page_id: string;
    _parentZoneId: string | null;

}

// deprecated ?
export interface TemplatePageApi {
    page_id: string;
    page_name: string;
    message_match: number | string;
    massageMatchScoreProgress?: number; // TEMP REMOVE
    zones: TemplateZoneApi[];
    page_url: string;
    status : string;
    is_published: boolean;
    is_linked: boolean;
    is_dismissed: boolean;

    // generation_url?: string;
}

export interface PageInterface {
    page_id: string;
    preview_url: string;
    score: string;
    status: string;
    title: string;
    zones: TemplateZoneApi[];
}
export interface PageKwdInterface {
    keyword_id: number;
    keyword_name: string;
    conv: number;
    naister_score: number;
    impr: number;
    mean_cpc: number;
    cr: number;
    first_impr: number;
    clics: number;
    ctr: number;
    ad_rel: number;
    qs: number;
}

export interface PageKwdInterfaceView extends PageKwdInterface {
    adgroup_id: string;
}

export interface PageInterface {
    page_id: string;
    page_name: string;
    campaigns: PageCampaignInterface[];
}

export interface PageKwdExtendedInterface extends PageKwdInterface {
    pages: PageInterface[];
}

export interface PageAdgroupInterface {
    adgroup_id: string;
    adgroup_name: string;
}

export interface PageCampaignInterface {
    campaign_id: string;
    campaign_name: string;
    adgroups: PageAdgroupInterface[];
}

export interface TemplatePageKdwApi {
    page_id: string;
    page_name: string;
    keywords: PageKwdInterface[];
}

export interface BaseTemplateKeywordApi {
    id: number;
    text: string;
    category: "pending" | "published" | "linked";
    template_id: number;
    keyword_id: number;
    keyword_name: string;
    // keyword_ad_id: string;
}

export interface RuleKewordSummary {
    name: string;
    keyword_count: number;
}

export interface TemplateKeywordApi extends BaseTemplateKeywordApi {

    pages: TemplatePageApi[];
}

export interface TemplatePageRuleListApi {
    id: number;
    name: string;
    status: QueuedItemStatus;
    number_products: number;
    processed_products: number;
    creation_date: string;
    modification_date: string;
    keywords: TemplateKeywordApi[];

}

/* Template Image banks */
export interface TemplateImageBankApi {
    id: number;
    imgb_path: string;
    name: string;
    neo_id: string;
    creation_date: string;
    modification_date: string;
    delimiter: QueuedItemDelimiter;
}

export interface TemplateImageBankImageItemApi {
    id: string;
    url: string;

}

export interface TemplateImageSourceApi {
    id: number;
    name: string;

}

/* ******************************************
 *      TEMPLATE Source
 ****************************************** */

export interface TemplateSourceApi {
    id: number;
    name: string;
    source_path: string;
    delimiter: QueuedItemDelimiter;
    creation_date: string;
    modification_date: string;
    author_username: string;
    author_photo: string;

}

/* ******************************************
 *      TEMPLATE Keywords Collections
 ****************************************** */

export interface TemplateKeywordsCollectionsApi {
    id: string;
    name: string;
    keywords: BaseTemplateKeywordApi[];
    rule_id: string;
    creation_date: string;
    modification_date: string;

}

export interface BaseKeywordListApi {
    count: number,
    next: string,
    previous: string,
    results: KeywordListResultApi[]
}

export interface KeywordListResultApi{
    id: string,
    template_id: number,
    category: string,
    kwd_text: string
}

/* ******************************************
 *      TEMPLATE RULES
 ****************************************** */

export interface TemplateRuleNormalizedApi {
    name: string;
    template_id: number,
    variables: TemplateVariables;
    url_pattern: string;
    utm: UtmVar[];
    meta: TemplateMeta;
    zones: Array<TemplateAreaItemText | TemplateAreaItemImg | TemplateAreaItemProduct>;
    keywords: RuleKeyword[];

}

export interface TemplateVariableCoerced {
    name: string;
    type: VariableItemType;
    value: string | string[] | null;
    source_files: string[] | null;
    selected_columns: string | null;
}

export interface BaseTextRuleCoerced {
    is_advanced: boolean;
    use_existing_titles: boolean;
    text_template: string | null;
    default_value: string | null;
    text_max_length: number | null;
    text_length: number | null;
    text_lists: string[] | null;
    format: string | null;
}

export interface TemplateAreaItemTextCoerced extends TemplateAreaItem<BaseTextRuleCoerced> {}

export interface TemplateRuleApiDenormalized {
    name: string;
    template_id: number,
    variables: TemplateVariableCoerced[];
    url_pattern: string;
    utm: UtmVar[];
    meta: TemplateMeta;
    zones: Array<TemplateAreaItemTextCoerced | TemplateAreaItemImg | TemplateAreaItemProduct>;
    keywords: RuleKeyword[];
}

/* ******************************************
 *      ADWORD
 ****************************************** */
export interface AdwordItemApi {

    "id": string,
    "customer_id": string

}

/* ******************************************
 *      CATALOG
 ****************************************** */
export interface TemplateCatalogApi {
    name: string;
    number_products: number;
    processed_product: number;
    catalog_file: string;
    creation_date: string;
    last_update: string;
    status: QueuedItemStatus;
    delimiter: QueuedItemDelimiter,
    fields: string[];
    id: number;

}

/* COLLECTIONS */
export interface CollectionItemApi {
    "id": number,
    "name": string,
    "keywords": BaseTemplateKeywordApi[],
    "creation_date": string,
    "modification_date": string,
    "rule_id": number
}

export interface CollectionNameApi {
    "collection_id": number,
    "collection_name": string
}

/* ******************************************
 *      CATALOG FILTERS
 ****************************************** */

export interface CatalogFilterItemApi {
    filter_display: string;
    filter_name: string;
    filter_type: string;
    filter_values: any[];
    get_from_db: boolean;

}

export interface CatalogFilterApi {
    category_name: string;
    category_display: string;
    filters: CatalogFilterItemApi[];
}

export interface ProductsByRuleKeywordPageApi {
    keyword_id: string;
    rule_id: number;
    page_id: string;
    zone_id: number;
    filters?: {};
}

export interface KeywordPagesApi {
    keyword_id: number;
    rule_id: number;
}

/* ******************************************
 *      PAGE GEN > EDIT
 ****************************************** */
export interface KeywordsSummaryApi {
  name: string;
  keyword_count: number;
}

export interface ProductsRemovePageApi {
    page_id: string,
    zone_id: string,
    keyword_id: string,
    products: string[]
  }