import produce from "immer";
import { DEFAULT_PAGINATION_PARAMS } from "src/api/routes/api_routes";
import { makeReactiveStateForm } from "src/shared/form";
import { updateList, updateSelection } from "src/shared/utils";
import {
  CollectionsStateInterface,
  DispatchAction,
  GenerateAppState,
  PageQueueAppState,
  RuleDetailAppState,
  TemplateRuleStateInterface
} from "../../model";
import {
  SELECTED_COLUMNS_SEP,
  TemplateListItemNormalizedApi,
  TemplateRuleNormalizedApi,
  TemplateSourceApi,
  TemplateVariableApi,
  TemplateZoneApi,
  VariableFormInterface,
  VariableTemplateApi
} from "../model";
import { normalizeTemplateDetail } from "../shared/helper";
import { RESET_AREA_IMGS, SET_AREA_IMGS, SET_AREA_IMGS_BANK } from "./areaImage.epic";
import {
  PATCH_PRODUCT_META_FORM,
  SET_AREA_PRODUCTS,
  SET_CATALOG_LIST,
  SET_CATALOG_PRODUCT_LIST,
  SET_PRODUCT_META_FORM,
  SET_PRODUCTS_META_FILTERS
} from "./areaProduct.epic";
import { SET_COLLECTION_ITEM, SET_COLLECTIONS_NAMES } from "./collection.epic";
import {
  ADD_VARIABLES,
  ADD_ZONES,
  CLEAR_RULE_DETAIL_ASYNC_MSG,
  CLEAR_RULE_DETAIL_SHARED_STATE,
  DELETE_VARIABLES,
  PARTIAL_VARIABLE_FORM,
  PATCH_RULE_DETAIL,
  PATCH_RULE_KEYWORDS,
  PATCH_RULE_META,
  PATCH_RULE_UTM,
  PATCH_SELECT_TEMPLATE_QUERIES,
  PATCH_VARIABLE_FORM,
  PATCH_VARIABLES,
  PATCH_ZONES,
  RESET_RULE_DETAIL,
  RESET_VARIABLE_FORM,
  SET_RULE_DETAIL,
  SET_RULE_DETAIL_DATA_STATE,
  SET_RULE_DETAIL_FORM_STATE,
  SET_RULE_DETAIL_TEMPLATE_ID,
  SET_SELECT_TEMPLATE_QUERIES,
  SET_VARIABLE_FORM,
  SET_VARIABLES
} from "./rule.epic";
import { CONCAT_KEYWORD_LIST, SET_ADGROUP_LIST, SET_CAMPAIGN_LIST, UPDATE_KEYWORD_LIST } from "./sem.epic";
import { SET_SELECTED_ZONE } from "./shared.epic";
import { PATCH_TEMPLATE_DETAIL, SET_TEMPLATE_DETAIL } from "./template.epic";
import {
  PATCH_SELECTED_SOURCE,
  RESET_SELECTION_SOURCE,
  SET_SOURCE_FILE,
  SET_VAR_SOURCE_DETAIL,
  SET_VAR_SOURCE_LIST,
  SET_VAR_SOURCES_PAGINATION
} from "./variableSources.epic";
import { SET_PRODUCTS_LIST_FOR_ZONE_PRODUCTS, SET_TXT_PROPOSALS_ZONE } from "./const";

function compZoneList(opt, value) {
  return opt.zone_id === value.zone_id;
}

function compKeywords(opt, value) {
  return opt.id === value.id;
}

export const INIT_AREA_IMG_CONTENT = {
  source_list: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  img_list: {
    count: 0,
    next: null,
    previous: null,
    results: []
  }
};

export const INIT_AREA_TXT = {

  count: 0,
  next: null,
  previous: null,
  results: []

};

export const INIT_AREA_IMG = {
  content: INIT_AREA_IMG_CONTENT
};
export const INIT_AREA_PRODUCT_ITEM = {
  id: "",
  image_url: "",
  title: "",
  description: ""
};
const DEFAULT_NPRODUCTS = 24;

export const INIT_AREA_PRODUCT = {
  product_list:
        {
          next: null,
          previous: null,
          count: 0,
          results: [
            INIT_AREA_PRODUCT_ITEM,
            INIT_AREA_PRODUCT_ITEM,
            INIT_AREA_PRODUCT_ITEM,
            INIT_AREA_PRODUCT_ITEM
          ]
        },
  source_list: [],
  variable_list: [],
  catalog_list: {
    next: null,
    previous: null,
    count: 0,
    results: []
  },
  form: {
    rule: makeReactiveStateForm({ filters: [], sources: [], optimize_images_order: true, n_products: DEFAULT_NPRODUCTS }, [], true, "rule"),
    sub_zones: makeReactiveStateForm([], [], true, "sub_zones")

  },
  metas: {
    product_filters: [],
    form: {
      product_filters: makeReactiveStateForm([], ["required"], true, "product_filters")

    }
  }
};

export const INIT_TEMPLATE_ITEM: TemplateListItemNormalizedApi = {
  id: 0,
  cached_temp_rule_id: "",
  name: "",
  rules: [],
  zones: [],
  html: "",
  creation_date: "",
  modification_date: "",
  url: ""
};

export const INIT_TEMPLATE_ZONE: TemplateZoneApi = {
  id: "",
  name: "",
  content: "",
  score: 0,
  type: "text"
};

const INIT_TEMPLATE_META = {
  description: "",
  title: "",
  kwds: ""
};

const INIT_VAR_SOURCE: TemplateSourceApi = {
  id: 0,
  name: "",
  source_path: "",
  delimiter: ",",
  creation_date: "",
  modification_date: "",
  author_username: "",
  author_photo: ""

};
export const INIT_VARIABLE: VariableTemplateApi = {
  sources: {
    list: {
      value: "0",
      viewValue: "today",
      data: {
        count: 0,
        results: [],
        previous: null,
        next: null
      }
    },
    rawResults: [],
    pagination: DEFAULT_PAGINATION_PARAMS,
    selected: {},
    file: {},
    datum: INIT_VAR_SOURCE
  }
};

export const INIT_TEMPLATE_RULE_ITEM: TemplateRuleNormalizedApi = {
  template_id: 0,
  name: "default_name",
  url_pattern: "",
  utm: [],
  meta: INIT_TEMPLATE_META,
  zones: [],
  variables: [],
  keywords: []
};

const FORM_INIT: TemplateVariableApi = {
  name: "",
  type: "text",
  value: "",
  source_files: [],
  selected_columns: ""
};

function parseForm(
  datum: TemplateVariableApi,
  isPristine
): VariableFormInterface {
  return {
    name: makeReactiveStateForm(
      datum.name,
      ["required"],
      isPristine,
      "name"
    ),
    type: makeReactiveStateForm(
      datum.type,
      [],
      isPristine,
      "type"
    ),
    value: makeReactiveStateForm(
      datum.value,
      [],
      isPristine,
      "value"
    ),
    selected_columns: makeReactiveStateForm(
      datum.selected_columns.split(SELECTED_COLUMNS_SEP),
      [],
      isPristine,
      "selected_columns"
    ),
    source_files: makeReactiveStateForm(
      datum.source_files,
      [],
      isPristine,
      "source_files"
    )
  };
}

export const INIT_VAR_FORM = parseForm(FORM_INIT, true);
export const INIT_TEMPLATE_RULE: TemplateRuleStateInterface = {
  datum: INIT_TEMPLATE_RULE_ITEM,
  form: INIT_VAR_FORM,
  selected_queries: {
    queries: [],
    pages: [],
    keywords: [],
    adgroups: [],
    campaigns: []
  }
};

export const INIT_COLLECTION_ITEM = {
  id: 0,
  name: "",
  keywords: [],
  creation_date: "",
  modification_date: "",
  rule_id: 0
};
export const INIT_COLLECTIONS: CollectionsStateInterface = {
  names: {
    results: [],
    count: 0,
    next: null,
    previous: null
  },
  datum: INIT_COLLECTION_ITEM
};

export const INIT_KEYWORD_LIST = {

  list: {
    results: [],
    count: 0,
    next: null,
    previous: null
  }
};

export const INIT_CAMPAIGN_LIST = {
  list: {
    results: [],
    count: 0,
    next: null,
    previous: null
  }
};

export const INIT_ADGROUP_LIST = {
  list: {
    results: [],
    count: 0,
    next: null,
    previous: null
  }
};

const INTERPRETER_INIT = {
  selectedZone: null
};
export const initialRuleDetailState: RuleDetailAppState = {
  formState: "idle",
  dataState: "idle",
  asyncMsgState: "",
  templateDetail: INIT_TEMPLATE_ITEM,
  interpreter: INTERPRETER_INIT,
  rule: INIT_TEMPLATE_RULE,
  variableData: INIT_VARIABLE,
  areaImg: INIT_AREA_IMG,
  areaTxt: INIT_AREA_TXT,
  areaProduct: INIT_AREA_PRODUCT,
  // template /rule end
  collections: INIT_COLLECTIONS,
  keywords: INIT_KEYWORD_LIST,
  campaigns: INIT_CAMPAIGN_LIST,
  adgroups: INIT_ADGROUP_LIST
};

export function ruleDetailReducer(
  state = initialRuleDetailState,
  action: DispatchAction<any>
): RuleDetailAppState {
  const { payload, type } = action;
  switch (type) {
    case SET_RULE_DETAIL_DATA_STATE: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.dataState = payload.state;
        draftState.asyncMsgState = payload.msg;
      });
    }

    case SET_RULE_DETAIL_FORM_STATE: {
      return produce(state, (draftState: PageQueueAppState) => {
        draftState.formState = payload.state;
        draftState.asyncMsgState = payload.msg;
      });
    }

    case CLEAR_RULE_DETAIL_SHARED_STATE: {
      return produce(state, (draftState: GenerateAppState) => {
        draftState.formState = "idle";
        draftState.dataState = "idle";
        draftState.asyncMsgState = "";
      });
    }

    case CLEAR_RULE_DETAIL_ASYNC_MSG: {
      return produce(state, (draftState: GenerateAppState) => {
        draftState.asyncMsgState = "";
      });
    }

    case SET_SELECTED_ZONE: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.interpreter.selectedZone = payload;
      });
    }

    // ares txt
    case SET_TXT_PROPOSALS_ZONE: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.areaTxt = payload;
      });
    }

    // ares imgs
    case SET_AREA_IMGS: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.areaImg.content.img_list = payload;
      });
    }
    case RESET_AREA_IMGS: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.areaImg.content.img_list = {
          results: [],
          next: null,
          previous: null,
          count: 0
        };
      });
    }
    case SET_AREA_IMGS_BANK: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.areaImg.content.source_list = payload;
      });
    }

    // product
    case SET_AREA_PRODUCTS: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.areaProduct.source_list = payload;
      });
    }

    case SET_CATALOG_PRODUCT_LIST: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.areaProduct.product_list = payload;
      });
    }
    case SET_CATALOG_LIST: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.areaProduct.catalog_list = payload;
      });
    }

    case SET_PRODUCT_META_FORM: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.areaProduct.metas.form = payload;
      });
    }
    case PATCH_PRODUCT_META_FORM: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.areaProduct.metas.form.product_filters = payload;
      });
    }

    case SET_PRODUCTS_META_FILTERS: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.areaProduct.metas.product_filters = payload;
      });
    }

    case SET_PRODUCTS_LIST_FOR_ZONE_PRODUCTS: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.areaProduct.product_list.results = payload.results;
      });
    }

    /*
  * template detail
  */

    case SET_TEMPLATE_DETAIL: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.templateDetail = normalizeTemplateDetail(payload);

        draftState.rule.datum.template_id = payload.id;
      });
    }
    case PATCH_TEMPLATE_DETAIL: {
      const { key, value } = payload;
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.templateDetail[key] = value;
      });
    }

    /*
  * variable source
  */

    case SET_VAR_SOURCE_LIST: {
      return produce(state, (draftState: RuleDetailAppState) => {
        const { data, selection, rawResults } = payload;
        draftState.variableData.sources.list.data = data;
        draftState.variableData.sources.selected = selection;
        draftState.variableData.sources.rawResults = rawResults;
      });
    }
    case SET_VAR_SOURCES_PAGINATION: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.variableData.sources.pagination = payload;
      });
    }

    case PATCH_SELECTED_SOURCE: {
      return produce(state, (draftState: RuleDetailAppState) => {
        const { key, value } = payload;
        draftState.variableData.sources.selected[key] = value;
      });
    }

    case SET_SOURCE_FILE: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.variableData.sources.file = payload;
      });
    }

    case RESET_SELECTION_SOURCE: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.variableData.sources.file = {};
        draftState.variableData.sources.selected = payload;
      });
    }

    case SET_VAR_SOURCE_DETAIL: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.variableData.sources.datum = payload;
      });
    }

    // rule

    case SET_RULE_DETAIL_TEMPLATE_ID: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.rule.datum.template_id = payload;
      });
    }

    case SET_RULE_DETAIL: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.rule.datum = payload;
      });
    }

    case RESET_RULE_DETAIL: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.rule.datum = {
          ...INIT_TEMPLATE_RULE_ITEM,
          template_id: payload
        };
        draftState.rule.form = INIT_VAR_FORM;
      });
    }

    // variable form

    case SET_VARIABLE_FORM: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.rule.form = payload;
      // draftState.formState = "idle";
      });
    }

    case PATCH_VARIABLE_FORM: {
      return produce(state, (draftState: RuleDetailAppState) => {
        const { key, value } = payload;
        draftState.rule.form[key] = value;
      });
    }

    case PATCH_VARIABLES: {
      return produce(state, (draftState: RuleDetailAppState) => {
        const { idx, value } = payload;
        draftState.rule.datum.variables[idx] = value;
      // draftState.formState = "valid"
      });
    }

    case DELETE_VARIABLES: {
      return produce(state, (draftState: RuleDetailAppState) => {
        const { idx } = payload;
        draftState.rule.datum.variables.splice(idx, 1);
      });
    }

    case ADD_VARIABLES: {
      return produce(state, (draftState: RuleDetailAppState) => {
        if(!Array.isArray(state.rule.datum.variables)) {
          draftState.rule.datum.variables = [payload];
        } else {
          draftState.rule.datum.variables.push(payload);
        }

        draftState.rule.form = INIT_VAR_FORM;
      });
    }
    case SET_VARIABLES: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.rule.datum.variables = payload;
      });
    }

    case PARTIAL_VARIABLE_FORM: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.rule.form = {
          ...state.rule.form,
          ...payload
        };
      });
    }
    case RESET_VARIABLE_FORM: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.rule.form = INIT_VAR_FORM;
      });
    }
    // RULE DETAIL

    case PATCH_RULE_DETAIL: {
      return produce(state, (draftState: RuleDetailAppState) => {
        const { key, value } = payload;
        draftState.rule.datum[key] = value;
      });
    }
    case PATCH_RULE_META: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.rule.datum.meta = payload;
      });
    }
    case PATCH_RULE_UTM: {
      return produce(state, (draftState: RuleDetailAppState) => {
        const { utm, url_pattern } = payload;
        draftState.rule.datum.utm = utm;
        draftState.rule.datum.url_pattern = url_pattern;
      });
    }

    // zones

    case ADD_ZONES: {
      return produce(state, (draftState: RuleDetailAppState) => {
        if(!Array.isArray(state.rule.datum.zones)) {
          draftState.rule.datum.zones = [payload];
        } else {
          const update = updateList(state.rule.datum.zones, payload, compZoneList);
          // eslint-disable-next-line
        console.log(state.rule.datum.zones, "->", payload, update);
          draftState.rule.datum.zones = update;
        }

        draftState.rule.form = INIT_VAR_FORM;
      });
    }

    case PATCH_ZONES: {
      return produce(state, (draftState: RuleDetailAppState) => {
        const selectedIndex = state.rule.datum.zones.findIndex(el => el.zone_id === payload.id);

        if(selectedIndex < 0) {
          draftState.rule.datum.zones.push(payload.value);
        }
        const currentValue = draftState.rule.datum.zones[selectedIndex];

        draftState.rule.datum.zones[selectedIndex] = {
          ...currentValue,
          ...payload.value
        };
      });
    }

    case PATCH_RULE_KEYWORDS: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.rule.datum.keywords = updateSelection(state.rule.datum.keywords, payload, compKeywords);
      });
    }

    case SET_SELECT_TEMPLATE_QUERIES: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.rule.selected_queries = payload;
      });
    }
    case PATCH_SELECT_TEMPLATE_QUERIES: {
      return produce(state, (draftState: RuleDetailAppState) => {
        const { key, value } = payload;

        if(key === "campaigns") {
          if(value.length === 0) {
            draftState.keywords.list.results = [];
          } else {
            const _adgroups = value.map(c => c.adgroups).flat();
            draftState.keywords.list.results = state.keywords.list.results.filter(kwd => _adgroups.find(ag => ag.adgroup_id === kwd.adgroup_id));
          }
        }
        draftState.rule.selected_queries[key] = value;
      });
    }
    /* collections */

    case SET_COLLECTIONS_NAMES: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.collections.names = payload;
      });
    }
    case SET_COLLECTION_ITEM: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.collections.datum = payload;
      });
    }
    // adgroups
    case SET_ADGROUP_LIST: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.adgroups.list = payload;
      });
    }
    // campaigns
    case SET_CAMPAIGN_LIST: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.campaigns.list = payload;
      });
    }
    // keywords
    case CONCAT_KEYWORD_LIST: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.keywords.list.results = draftState.keywords.list.results.concat(payload.results);
        draftState.keywords.list.count += payload.count;
      });
    }

    case UPDATE_KEYWORD_LIST: {
      return produce(state, (draftState: RuleDetailAppState) => {
        draftState.keywords.list = payload;
      });
    }

    default: {
      return state;
    }
  }
}
