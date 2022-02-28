import {
  DataQueryValue,
  PaginatedListApi,
  PaginationQuery,
  PaginationQuerySortDateRange,
  ValidateState
} from "src/model";
import { CreateProjectForm, SetupFormState } from "src/PageSetupApp/model";
import {
  FilterRange,
  FormArrayState,
  FormCtrlValidator,
  FormElementState,
  FormGroupState
} from "src/shared/form";
import { TemplatePageApi } from "src/PageGeneration/model";
import { AdlinkInterface, GetCampaignTestByKeywordSucessInterface } from "src/api/accessors/Adwords/SemAccessors";
import { setTxtContentInterface } from "src/api/accessors/pageAccessor";
import { ProductInterface } from "src/PageGeneration/store/areaProduct.epic";
import { GetProductDetailsResponseInterface } from "src/api/accessors/Rules/ProductAccessor/interfaces";
import { GetAnalyticsPageTimeLineResponseInterface } from "src/api/accessors/Analytics/PageAccessor/interfaces";
import {
  AreaProductRule,
  AreaProductRuleFilter,
  AreaProductSubzone,
  BaseTemplateKeywordApi,
  CatalogFilterApi,
  CollectionItemApi,
  CollectionNameApi,
  ExtendedTemplateZoneApi,
  KeywordListResultApi,
  PageAdgroupInterface,
  PageCampaignInterface,
  PageKwdInterfaceView,
  RuleKewordSummary,
  SubProduct,
  TemplateAreaItemImg,
  TemplateAreaItemProduct,
  TemplateAreaItemText,
  TemplateCatalogApi,
  TemplateImageBankApi,
  TemplateImageBankImageItemApi,
  TemplateListItemApi,
  TemplateListItemNormalizedApi,
  TemplatePageKdwApi,
  TemplatePageRuleListApi,
  TemplateRuleNormalizedApi,
  TemplateZoneApi,
  VariableFormInterface,
  VariableTemplateApi
} from "../PageGeneration/model";
import { FormState } from "./form";
import { EnvVariablesResponse, UserResponse } from "./user";
import {
  ANALYTICS_PARAMS,
  INIT_GENERATED_PARAMS,
  INIT_TEMPLATE_PARAMS
} from "../PageGeneration/store/default";
import {
  AnalyticFilterItemView,
  AnalyticsFilterRangeKeysView,
  AnalyticsPaginationQuery,
  AnalyticsTableItemApi,
  KpiEvolutionGraphView,
  PaginatedAnalyticsView,
  SavedQueryItem,
  SaveQueryItem
} from "../PageData/model/analytics";
import { INIT_LIST_PARAMS } from "../api/routes/api_routes";
import { CampaignInterface, KeywordInterface } from "./api";
import { BaseKeywordListApi } from "../PageGeneration/model/api";

export type ValidPayload =
  | string
  | number
  | boolean
  | Array<any>
  | Object
  | null;

export interface DispatchAction<T extends ValidPayload> {
  type: string;
  payload: T;
}

export type ListLoadState = "idle" | "loading" | "complete" | "error";

export interface DataQuery {
  required: DataQueryValue;
  option: DataQueryValue;
}

export interface SetupAppState {
  currentStep: SetupFormState;
  project: CreateProjectForm;
  uploadFSM: {
    adt_loc_file: DataMachineState;
    kwd_loc_file: DataMachineState;
    imgb_loc_file: DataMachineState;
    prod_loc_file: DataMachineState;
  };
  fileLocCache: {
    adt_loc_file: string | null;
    kwd_loc_file: string | null;
    imgb_loc_file: string | null;
    prod_loc_file: string | null;
  };
  setupFsm: DataMachineState;
  isDone: boolean;
}

export type theme = "dark" | "light";

export interface AppError {
  hasError: boolean;
  msg: string;
}

export type PageQueryType =
  | "template"
  | "queue"
  | "generated"
  | "analytics_table"
  | "analytics_query";
export type PageQuery = Record<PageQueryType, DataQuery>;

export const PROCESSING = "PROCESSING";
export const DONE = "DONE";
export const FAIL = "FAIL";

export enum PROCESS_STATUS {
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  FAIL = "FAIL",
  ONHOLD = "ONHOLD"
}
export enum LINK_TO_ADS_STATUS {
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  FAIL = "FAIL",
  ONHOLD = "ONHOLD"
}
export enum CREATE_TEST_STATUS {
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  FAIL = "FAIL",
  ONHOLD = "ONHOLD"
}

export interface AppState {
  theme: theme;
  user: UserResponse;
  userDetail: any;
  error: AppError;
  success: string
  pageQuery: PageQuery;
  isLoading: boolean;
  processStatus: PROCESS_STATUS.PROCESSING | PROCESS_STATUS.DONE | PROCESS_STATUS.FAIL,
  linkToAdsStatus: LINK_TO_ADS_STATUS.PROCESSING | LINK_TO_ADS_STATUS.DONE | LINK_TO_ADS_STATUS.FAIL
  createTestStatus: CREATE_TEST_STATUS.PROCESSING | CREATE_TEST_STATUS.DONE | CREATE_TEST_STATUS.FAIL
}

export interface ContentAreaImgInterface {
  img_list: PaginatedListApi<TemplateImageBankImageItemApi>;
  source_list: PaginatedListApi<TemplateImageBankApi>;
}

export type FilterDesign = "height" | "width" | "aspect_ratio";
export type AreaSettingValue = FilterRange<FilterDesign>;

export interface AreaImgInterface {
  content: ContentAreaImgInterface;
}

export interface AreaTxtInterface {

  results: Record<number, Array<[]>>;
  next: string | null;
  previous: string | null;
  count: number;

}

export interface AreaProductItemInterface {
  id: string;
  image_url: string;
  title: string;
  description: string;
}

export interface AreaProductMetasInterface {
  product_filters: CatalogFilterApi[];
  form: MetaFormInterface;
}

export interface SubZoneItemFormInterface {
  comment: FormElementState;
  rule: FormGroupState;
  zone_id: FormElementState;
  type: FormElementState;
}

export interface AreaSubZoneItemFormInterface {
  isPristine: boolean;
  isValid: ValidateState;
  __value: AreaProductSubzone;
  getValue: Function;
  __key: string;
  __validations: FormCtrlValidator;
  __path: string[];
  formGroup: SubZoneItemFormInterface;
}

export interface ProductFilterItemForm {
  isPristine: boolean;
  isValid: ValidateState;
  __value: AreaProductRuleFilter;
  __key: string;
  __validations: FormCtrlValidator;
  __path: string[];
  getValue: Function;
  formGroup: {
    type: FormElementState;
    max_value: FormElementState;
    min_value: FormElementState;
    value: FormArrayState;
    filter_name: FormElementState;
  };
}

export interface ProductFormRuleFilterInterface {
  isPristine: boolean;
  isValid: ValidateState;
  __value: AreaProductRule;
  getValue: Function;
  __key: string;
  __validations: FormCtrlValidator;
  __path: string[];
  formGroup: {
    filters: ProductFilterItemForm[];
    optimize_images_order: FormElementState;
    sources: FormArrayState;
    n_products: number;
  };
}

export interface ProductFormSubzonesFormInterface {
  isPristine: boolean;
  isValid: ValidateState;
  __value: AreaProductRule;
  getValue: Function;
  __key: string;
  __validations: FormCtrlValidator;
  __path: string[];
  formArray: AreaSubZoneItemFormInterface[];
}

export interface ProductFormInterface {
  sub_zones: ProductFormSubzonesFormInterface;
  rule: ProductFormRuleFilterInterface;
}

export interface SubProductFormInterface {
  type: FormElementState;
  rule: FormGroupState;
}

export interface MetaFormInterface {
  product_filters: FormArrayState;
}

export interface AreaProductCatalogInterface {
  product_list: PaginatedListApi<AreaProductItemInterface>;
  source_list: TemplateImageBankApi[];
  variable_list: string[];
  catalog_list: PaginatedListApi<TemplateCatalogApi>;
  metas: AreaProductMetasInterface;
}

/*
export interface VariableImage {
    id: string;
    value: string;
}
*/

export interface VariableSource {
  id: string;
  value: string;
}

export interface SourceText {
  id: string;
  value: string;
}

/*

export interface VariableText {
    id: string;
    value: string;
}
*/

export interface AreaTextReviewInterface {
  title: string;
  description: string;
}

export interface TemplateTagApi {
  id: number;
  name: string;
}

export interface SelectablePage {
  isSelected: boolean;
  selectedPage: string;
  ruleId: number;
}

export type SelectableKwdPages = Record<string, SelectablePage>;

export interface QueuePageValue {
  state: Partial<FormState>; // the action of publishing/linking can be error/success/pending
  msg: string;
}

//! TODO maybe use rule && page as key. maybe duplicate page across different rule
export interface QueuePageState {
  [prop: string]: QueuePageValue;
}

export interface PaginatedQueueListApi {
  results: Record<number, Array<ExtendedTemplateZoneApi[]>>;
  next: string | null;
  previous: string | null;
  count: number;
}

export type ModalActionState = "idle" | "start" | "processing" | "error";

export interface QueueListInterface {
  list: PaginatedListApi<TemplatePageRuleListApi>;
  selectedKeywords: SelectableKwdPages;
  isSelectAll: boolean;
  asyncPageState: QueuePageState;
  loadPages: DataMachineState;
  formattedList: Record<number, PaginatedListApi<ExtendedTemplateZoneApi[]>>;
  deleteActionState: {
    state: ModalActionState;
    action: DispatchAction<any> | null;
  };
}

export interface QueueDetailInterface {
  product: {
    list: PaginatedListApi<AreaProductItemInterface>;
    dataState: ListLoadState;
    item: AreaProductItemInterface;
  };
}

export type SelectedKwdInterface = Record<string, Record<string, string>>;

export interface GeneratedListInterface {
  list: PaginatedListApi<TemplatePageKdwApi>;
  selectedKwd: SelectedKwdInterface;
}

export interface MetaAtomElement {
  type: "text" | "image";
  comment: string | null;
  parent: string | null;
  rule: any;
  zone_id: string;
}

export interface MetaProductElement {
  type: "product";
  comment: string | null;
  aggregate: boolean;
  rule: null | any;
  zone_id: string;
  sub_zones: SubProduct[];
}

export type MetaElement =
  | TemplateAreaItemText
  | TemplateAreaItemImg
  | TemplateAreaItemProduct;

export interface TemplateDetailSelectQuery {
  queries: any[];
  pages: any[];
  keywords: any[];
  adgroups: any[];
  campaigns: PageCampaignInterface[];
}

export interface TemplateRuleStateInterface {
  datum: TemplateRuleNormalizedApi;
  form: VariableFormInterface;
  selected_queries: TemplateDetailSelectQuery;
}

export interface CollectionsStateInterface {
  names: PaginatedListApi<CollectionNameApi>;
  datum: CollectionItemApi;
}

export interface KeywordListStateInterface {
  list: PaginatedListApi<PageKwdInterfaceView>;
}

export interface CampaignListStateInterface {
  list: PaginatedListApi<PageCampaignInterface>;
}

export interface AdgroupListStateInterface {
  list: PaginatedListApi<PageAdgroupInterface>;
}

export interface ProposalListStateInterface {
  list: PaginatedListApi<TemplateZoneApi>;
}

export interface InterpreterInterface {
  selectedZone: MetaElement | null;
}

export interface GenerateAppState {
  formState: FormState;
  dataState: ListLoadState;
  asyncMsgState: string;
}

export interface BaseAsyncState {
  dataState: ListLoadState;
  asyncMsgState: string | { type: string; msg: string };
}
export interface AppSuccess {
  hasSuccess: boolean;
  msg: string;
}

export interface PageQueueAppState extends BaseAsyncState {
  formState: FormState;
  list: PaginatedListApi<TemplatePageRuleListApi>;
  selectedKeywords: SelectableKwdPages;
  isSelectAll: boolean;
  asyncPageState: QueuePageState;
  loadPages: DataMachineState;
  formattedList: Record<number, PaginatedListApi<ExtendedTemplateZoneApi[]>>;
  deleteActionState: { state: ModalActionState; action: DispatchAction<any> | null, msg: string };
  proposals: ProposalListStateInterface;
  queryStr: string;
  queryState: PaginationQuery;
  selectedRule: RuleInterface | null;
  ruleCampains: CampaignInterface[] | null;
  selectedCampain: CampaignInterface | null;
  selectedKwd: KeywordInterface | null;
  nextSelectedIndex: number | null;
  selectedLabel: string;
  selectedCategory: any | null;
  kwdsSummary: RuleKewordSummary[] | null;
  kwdsByCategories: BaseKeywordListApi | null;
  proposedPages: TemplatePageApi[] | null;
  pageDetails: TemplatePageApi[] | null;
  productFilters: any;
  successMessage: AppSuccess;
  successAdd: any;
  currentTextZone: setTxtContentInterface;
  selectedPage: any;
  proposedProducts: PaginatedListApi<ProductInterface> | null;
  currentEmail: string;
  productToEdit: GetProductDetailsResponseInterface | null;
  successRemove: any;
  replacingProductSatus: string;
  processStatus: PROCESS_STATUS.DONE;
  linkToAdsStatus: LINK_TO_ADS_STATUS.DONE
  createTestStatus: CREATE_TEST_STATUS.DONE
  publishSuccess: boolean;
  linkSuccess: boolean;
  createSuccess: boolean;
}

export interface FiltersAppState {
  data: TemplateFilters;
  date_range: string;
}
export interface TemplateFilterBase {
  name: string;
  type: string;
  value: string;
  operator: string;

}
export interface TemplateIndexBase {
  index: string;
}
export interface TemplateFilterApi {
  filters: TemplateFilterBase [],
  indexes: TemplateIndexBase []
}
export type TemplateFilters = TemplateFilterApi;
export interface RuleListAppState extends BaseAsyncState {
  results: TemplateListItemApi[];
  next: string | null;
  previous: string | null;
  count: number;
  queryStr: string;
  queryState: PaginationQuerySortDateRange;
}

export interface RuleDetailAppState extends BaseAsyncState {
  formState: FormState;

  interpreter: InterpreterInterface;
  areaImg: AreaImgInterface;
  areaTxt: AreaTxtInterface;
  areaProduct: AreaProductCatalogInterface;
  variableData: VariableTemplateApi;
  templateDetail: TemplateListItemNormalizedApi;
  rule: TemplateRuleStateInterface;
  collections: CollectionsStateInterface;
  keywords: KeywordListStateInterface;
  campaigns: CampaignListStateInterface;
  adgroups: AdgroupListStateInterface;
}

export interface PageGeneratedAppState extends BaseAsyncState {
  list: PaginatedListApi<TemplatePageKdwApi>;
  selectedKwd: SelectedKwdInterface;
  queryStr: string;
  queryState: PaginationQuerySortDateRange;
}

export interface CampaignTestState extends BaseAsyncState {
  asyncMsgState: string,
  campaignTest: GetCampaignTestByKeywordSucessInterface | null,
  adLink: AdlinkInterface | null,
}

/* DATA */
export type MessageMatchLegend =
  | "to optimize"
  | "to improve"
  | "to check again";

export interface MessageMatchCategory {
  percentage: number;
  volume: number;
  legend: MessageMatchLegend;
}

export interface AnalyticsMessageMatchApi {
  global_message_match: number;
  categories: MessageMatchCategory[];
}

export interface AnalyticsMessagePieItem {
  id: string;
  label: string;
  value: number;
}

export interface AnalyticsMessageMatchView extends AnalyticsMessageMatchApi {
  graph: AnalyticsMessagePieItem[];
}

export type AnalyticsParamsQuery = Record<
  AnalyticsFilterRangeKeysView,
  string | number
>;

export interface ScatterPointLegendItemApi {
  text: string;
  color: string;
}

export interface ScatterPointGraItemApi {
  x: number;
  y: number;
  color: string;
}

export interface ScatterPointGraphDataView {
  x: number;
  y: number;
}

export interface ScatterPintItemApi {
  kpi_name: string;
  kpi_display_name: string;
  legend: ScatterPointLegendItemApi[];
  graph_data: ScatterPointGraItemApi[];
}

export interface ScatterPointGraphItemView {
  id: string;
  data: ScatterPointGraphDataView[];
}

export interface ScatterPointItemView {
  kpi_name: string;
  kpi_display_name: string;
  legend: ScatterPointLegendItemApi[];
  graph_data: ScatterPointGraphItemView[];
  colors: string[];
}

export interface AnalyticsAppState extends BaseAsyncState {
  table: PaginatedAnalyticsView<AnalyticsTableItemApi>;
  truncate: boolean;
  message_match: AnalyticsMessageMatchView;
  globalKpi: KpiEvolutionGraphView[];
  mostUsedContent: ScatterPintItemApi;
  filters: {
    api: AnalyticFilterItemView[];
    userQuery: AnalyticsParamsQuery;
  };
  paginationParams: AnalyticsPaginationQuery;
  nextQuery: string;
  optPages: {
    formState: FormState;
    asyncMsgState: string;
    optIds: string[];
  };
  page: {
    timeLine: GetAnalyticsPageTimeLineResponseInterface | null;
    pageDetails: GetAnalyticsPageTimeLineResponseInterface | null;
  }
}

export interface AnalyticsQueryAppState extends BaseAsyncState {
  formState: FormState;
  list: PaginatedListApi<SavedQueryItem>;
  detail: SaveQueryItem;
  queryStr: string;
  queryState: PaginationQuery;
}

export interface TimelineItemAPI {
  name: string;
  value: string;
  datetime: string;
}

export interface TimelineItemView {
  formattedDate: string;
  changes: TimelineItemAPI[];
}

export interface MessageMatchTimelineApi {
  start_date: string;
  end_date: string;
  modifications: TimelineItemAPI[];
}

export interface MessageMatchTimelineView {
  modifications: TimelineItemView[];
  timeSeries: string[];
}

export interface MessageMatchAppState extends BaseAsyncState {
  mmEvolution: KpiEvolutionGraphView[];
  mmTimeline: MessageMatchTimelineView;
}

export interface OptPageItemApi {
  lp_id: string;
  lp_title: string;
  lp_url: string;
}

export interface OptTemplateApi {
  template_id: string;
  template_name: string;
  pages_associated: OptPageItemApi[];
}

export interface OptimizationPagesApi {
  pages_without_template: OptPageItemApi[];
  pages_with_template: OptTemplateApi[];
  optimization_id: string;
}

export interface OptimizationAppState extends BaseAsyncState {
  pages: OptimizationPagesApi;

  step: {
    formState: "idle";
    asyncMsgState: "";
  };
}

export interface StoreState {
  app: AppState;
  setupApp: SetupAppState;
  ruleDetail: RuleDetailAppState;
  ruleList: RuleListAppState;
  pageQueue: PageQueueAppState;
  pageGenerated: PageGeneratedAppState;
  analytics: AnalyticsAppState;
  optimization: OptimizationAppState;
  messageMatch: MessageMatchAppState;
  analyticsQuery: AnalyticsQueryAppState;
  campaignTest: CampaignTestState
  filters: FiltersAppState,
  business: TemplateBusiness
}

export type DataMachineState = "idle" | "loading" | "success" | "error";

export const PAGE_QUERY_KEYS = [
  "template",
  "queue",
  "generated",
  "analytics_table",
  "analytics_query"
];

export type TemplateRequiredValidationType =
  | "template"
  | "queue"
  | "generated"
  | "analytics_table"
  | "analytics_query";
export const PAGE_QUERY_REQ: Record<
  TemplateRequiredValidationType,
  string[]
> = {
  template: [
    "limit",
    "offset",
    "sort_order",
    "sort_criteria",
    "start_date",
    "end_date"
  ],
  queue: ["limit", "offset"],
  generated: [
    "limit",
    "offset",
    "sort_order",
    "sort_criteria",
    "start_date",
    "end_date"
  ],
  analytics_table: ["limit", "offset"],
  analytics_query: ["limit", "offset"]
};

export const INIT_PAGE_QUERY = {
  template: INIT_TEMPLATE_PARAMS,
  queue: INIT_LIST_PARAMS,
  generated: INIT_GENERATED_PARAMS,
  analytics_table: ANALYTICS_PARAMS,
  analytics_query: ANALYTICS_PARAMS
};

export interface SetupFile {
  name: string;
  file: File;
}

export interface RuleInterface {
  id: number,
  creation_date: string,
  template_id: number,
  status: "processing" | "finished",
  processed_pages: number,
  total_pages: number,
  name: string
}
export interface TemplateBusiness {
  business : string;
}