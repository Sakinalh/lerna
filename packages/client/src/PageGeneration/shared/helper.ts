import { isObject, parsePathRouteParams } from "src/shared/utils";
import { AreaSettingValue } from "src/model";

import {
  AreaProductRule,
  BankImageRule,
  SubProduct,
  SubProductImageInterface,
  SubProductTextInterface,
  TemplateAreaItemImg,
  TemplateAreaItemImgApi,
  TemplateAreaItemProduct,
  TemplateAreaItemProductApi,
  TemplateAreaItemText,
  TemplateAreaItemTextApi,
  TemplateAreaItemTextCoerced,
  TemplateListItemApi,
  TemplateListItemNormalizedApi,
  TemplateRuleApiDenormalized,
  TemplateRuleNormalizedApi,
  TemplateVariableApi,
  TemplateVariableCoerced,
  TextAdvancedRule,
  TextDefaultRule
} from "../model";

export function getProp(prop: string) {
  return obj => obj[prop];
}

/*
 on template detail, the zones can have invalid data model
* its rule should be an object with key depending on type, but can send it as "null"| null or whatever
so wil go through every rule in zone/subzone yo set proper value
* */

export const fallbackTextDefaultRule: TextDefaultRule = {
  is_advanced: false,
  use_existing_titles: true,
  text_length: 140,
  text_lists: [],
  text_template: "",
  default_value: "",
  text_max_length: 0,
  format: "title"
};

function setValidValue(key: string, value) {
  switch (key) {
    case "text_length":
    case "text_max_length": {
      return Number.isFinite(value) ? value : 0;
    }
    case "default_value":
    case "text_template": {
      return typeof value === "string" ? value : "";
    }
    case "is_advanced":
    case "use_existing_titles": {
      return typeof value === "boolean" ? value : false;
    }
    case "text_lists": {
      return Array.isArray(value) ? value : [];
    }
    case "format": {
      return typeof value === "string" ? value : "";
    }
    default: {
    // eslint-disable-next-line
    console.warn(key, "is not handled yet. value was no not checked");
    }
  }
}

export function validateDefaultTextRule(orig, fallback = fallbackTextDefaultRule): TextDefaultRule {
  const expectedKeys = ["is_advanced", "use_existing_titles", "text_length", "text_lists", "format"];
  const _textRule: any = {
    text_template: "",
    default_value: "",
    text_max_length: 0

  }; // required static default values

  for(const k of expectedKeys) {
    if(!orig.hasOwnProperty(k)) {
      _textRule[k] = fallback[k];
    } else {
      _textRule[k] = setValidValue(k, orig[k]);
    }
  }

  return _textRule;
}
const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 200;
const fallbackTextAdvancedRule: TextAdvancedRule = {
  is_advanced: true,
  use_existing_titles: true,
  text_max_length: 140,
  text_template: "",
  default_value: "",
  text_length: 0,
  text_lists: [],
  format: "title"
};

export function validateAdvancedTextRule(orig, fallback = fallbackTextAdvancedRule): TextAdvancedRule {
  const expectedKeys = ["is_advanced", "use_existing_titles", "text_max_length", "text_template", "default_value", "format"];
  const _textRule: any = {
    text_length: 0,
    text_lists: []
  };// base static value

  for(const k of expectedKeys) {
    if(!orig.hasOwnProperty(k)) {
      _textRule[k] = fallback[k];
    } else {
      _textRule[k] = setValidValue(k, orig[k]);
    }
  }
  return _textRule;
}

function tryMatchAdvancedText(datum: TextAdvancedRule | TextDefaultRule | any) {
  if(!isObject(datum)) {
    return false;
  }
  return Boolean(datum.is_advanced);
}

export function getValidAreaProductRule(rule): AreaProductRule {
  const fallbackAreaProductRule: AreaProductRule = {
    filters: [],
    sources: [],
    optimize_images_order: true,
    n_products: 24
  };

  if(!isObject(rule)) {
    return fallbackAreaProductRule;
  }

  const expectedFilterKeys = ["filters", "sources", "optimize_images_order", "n_products"];
  const _productZonePayload: any = {};

  for(const k of expectedFilterKeys) {
    _productZonePayload[k] = !rule.hasOwnProperty(k) ? fallbackAreaProductRule[k] : rule[k];
  }
  return _productZonePayload;
}

export function getValidSubZones(sub_zones: SubProduct[]) {
  return sub_zones.map(s => ({
    ...s,
    rule: !isObject(s.rule) ? setDefaultSubzoneRuleByType(s.type) : s.rule
  }));
}

export const INIT_AREA_IMG_SETTING: AreaSettingValue[] = [
  {
    filter: "height",
    max_value: 0,
    min_value: 0
  },
  {
    filter: "width",
    max_value: 0,
    min_value: 0
  },
  {
    filter: "aspect_ratio",
    max_value: 1.2,
    min_value: 1
  }

];
const fallbackImageRule: BankImageRule = {
  meta: { positive_tags: [], negative_tags: [] },
  design: INIT_AREA_IMG_SETTING,
  sources: []
};

function isImgValueValid(key: "meta" | "design" | "sources", value) {
  if(key === "meta") {
    return value.hasOwnProperty("positive_tags") && value.hasOwnProperty("negative_tags")
      ? {
        negative_tags: value.negative_tags,
        positive_tags: value.positive_tags
      }
      : { positive_tags: [], negative_tags: [] };
  }
  if(key === "sources") {
    return Array.isArray(value) ? value : [];
  }

  if(key === "design") {
    // TODO check design object shape is value
    return Array.isArray(value) ? value : INIT_AREA_IMG_SETTING;
  }
  // eslint-disable-next-line
  console.warn(key, "is not known. should be deleted I guess");
  return value;
}

export function validateImageRule(orig, fallback = fallbackImageRule): BankImageRule {
  const expectedKeys: ["meta", "design", "sources"] = ["meta", "design", "sources"];
  const _imgRule: any = {};

  for(const k of expectedKeys) {
    if(!orig.hasOwnProperty(k)) {
      _imgRule[k] = fallback[k];
    } else {
      _imgRule[k] = isImgValueValid(k, orig[k]);
    }
  }
  return _imgRule;
}

function setValidRule(zone: TemplateAreaItemImgApi | TemplateAreaItemTextApi | TemplateAreaItemProductApi): TemplateAreaItemImg | TemplateAreaItemText | TemplateAreaItemProduct {
  if(zone.type === "product") {
    return {
      ...zone,
      rule: getValidAreaProductRule(zone.rule),
      sub_zones: getValidSubZones((zone as any).sub_zones)
    } as any;
  }
  if(zone.type === "text") {
    return {
      ...zone,
      rule: tryMatchAdvancedText(zone.rule) ? validateAdvancedTextRule(zone.rule) : validateDefaultTextRule(zone.rule)
    };
  }

  if(zone.type === "image") {
    return {
      ...zone,
      rule: validateImageRule(zone.rule)
    };
  }
  // eslint-disable-next-line
  console.warn(zone.type, "is not handled. careful");
  return zone as any;
}

export function normalizeTemplateDetail(datum: TemplateListItemApi): TemplateListItemNormalizedApi {
  return {
    ...datum,
    zones: datum.zones.map(z => setValidRule(z as any)) as any

  };
}

/*
 *   put back  normalized value to API format
 * the api expect certains value like null for unused integer field
 * so first, has to transform it to expected format.
 * then force casting value like "null" or "true"
* */
function coerceVarExcelList(datum: TemplateVariableApi): TemplateVariableCoerced {
  return {
    ...datum,
    selected_columns: null,
    source_files: null
  };
}

function coerceVarItem(datum: TemplateVariableApi): TemplateVariableCoerced {
  return {
    ...datum,
    value: null
  };
}

function coerceZoneTextAdvanced(datum: TemplateAreaItemText): TemplateAreaItemTextCoerced {
  return {
    ...datum,
    rule: {
      ...datum.rule,
      text_length: null,
      text_lists: null
    }

  };
}

function coerceZoneTextDefault(datum: TemplateAreaItemText): TemplateAreaItemTextCoerced {
  return {
    ...datum,
    rule: {
      ...datum.rule,
      text_template: null,
      default_value: null,
      text_max_length: null
    }
  };
}

function coerceZoneProductDefault(datum: TemplateAreaItemProduct) {
  return {
    ...datum,
    rule: {
      ...datum.rule,
      filters: datum.rule.filters.map(f => (
        {
          ...f,
          max_value: Number.isFinite(f.max_value as any) ? f.max_value : null,
          min_value: Number.isFinite(f.min_value as any) ? f.min_value : null
        }
      ))
    },
    sub_zones: datum.sub_zones.map((s) => {
      if(s.type === "image") {
        return {
          ...s,
          rule: {
            ...s.rule,
            optimize_sequence:
            typeof ((s.rule as SubProductImageInterface).optimize_sequence) === "boolean"
              ? (s.rule as SubProductImageInterface).optimize_sequence
              : (s.rule as SubProductImageInterface).optimize_sequence as any === "true",
            height: (s.rule as SubProductImageInterface).height,
            width: (s.rule as SubProductImageInterface).width
          }
        };
      }
      if(s.type === "text") {
        return {
          ...s,
          rule: {
            ...s.rule,
            format: (s.rule as SubProductTextInterface).format
          }
        };
      }
      return s;
    })

  };
}

/**
 * to handle picky api,
 * handle remaining faulty value
 * "null"-> null
 * "true"/"false"-> Bool
 * @param datum
 */
function forceCasting(datum) {
  if(Array.isArray(datum)) {
    return datum.map(d => forceCasting(d));
  }

  if(isObject(datum)) {
    const _obj = {};
    for(const prop in datum) {
      _obj[prop] = forceCasting(datum[prop]);
    }

    return _obj;
  }

  if(datum === "null") {
    return null;
  }
  if(datum === "true") {
    return true;
  }
  if(datum === "false") {
    return false;
  }
  return datum;
}

export function denormalizeRulePayload(datum: TemplateRuleNormalizedApi): TemplateRuleApiDenormalized {
  const { variables, zones } = datum;
  const _variables = variables.map((v) => {
    if(v.type !== "excel text list") {
      return coerceVarExcelList(v);
    }
    return coerceVarItem(v);
  });
  const _zones = zones.map((z) => {
    if(z.type === "text") {
      if((z.rule as any).is_advanced) {
        return coerceZoneTextAdvanced(z as TemplateAreaItemText);
      }
      return coerceZoneTextDefault(z as TemplateAreaItemText);
    }

    if(z.type === "product") {
      return coerceZoneProductDefault(z as TemplateAreaItemProduct);
    }
    return z;
  });
  return forceCasting({
    ...datum,
    variables: _variables,
    zones: _zones
  });
}

export function getInterpreterRouteParams(path: string) {
  const tryCreate = parsePathRouteParams(path, "generation/template/:templateId/rule/create/");
  if(tryCreate) {
    return {
      ruleId: "create",
      templateId: parseInt(tryCreate.params.templateId, 10)
    };
  }

  const tryGet = parsePathRouteParams(path, "generation/template/:templateId/rule/:ruleId/edit/");
  if(tryGet) {
    return {
      ruleId: parseInt(tryGet.params.ruleId, 10),
      templateId: parseInt(tryGet.params.templateId, 10)
    };
  }
  // eslint-disable-next-line
  console.warn("failed to get ids from ", path);
  return {
    ruleId: "create",
    templateId: 0
  };
}

export function setDefaultSubzoneRuleByType(type: "image" | "text") {
  return type === "image" ? { optimize_sequence: true, height: DEFAULT_HEIGHT, width: DEFAULT_WIDTH } : { type: "template", value: "", format: "title" };
}

/* VARIABLES formatting */

/**
 * check rule validation
 * as of today,
 * if type excel text list -> value:"" (actually null bu stringify to avoid weird behaviour)
 *  if type text list -> value:[]
 *  if type text -> value:""
 * @param v
 */
function isValidVariableValue(v: TemplateVariableCoerced) {
  if(v.type === "excel text list") {
    return "";
  }
  if(v.type === "text list") {
    return Array.isArray(v.value) ? v.value : [];
  }
  if(v.type === "text") {
    return typeof v.value === "string" ? v.value : "";
  }
  // eslint-disable-next-line
  console.warn("failed to check var type ", v.type, "value was set as empty string");
  return "";
}

/**
 * the coerced interface === api interface. has null value and weird value based on type
 * @param datum
 */
function normalizeVariables(datum: TemplateVariableCoerced): TemplateVariableApi {
  return {
    ...datum,
    selected_columns: typeof datum.selected_columns === "string" ? datum.selected_columns : "",
    source_files: Array.isArray(datum.source_files) ? datum.source_files : [],
    value: isValidVariableValue(datum)
  };
}

export function normalizeRuleItemApi(datum: TemplateRuleApiDenormalized): TemplateRuleNormalizedApi {
  return {
    ...datum,
    variables: datum.variables.map(v => normalizeVariables(v)),
    zones: datum.zones.map(z => setValidRule(z as any)) as any
  };
}

export const isFilterDuplicate = (array, name: string, operator:string | null = null, value:any= null) => {
  let duplicate = array.find((filter) => {
    if(filter.name === name && operator === filter.operator && value === filter.value) {
      return true;
    }
  });

  duplicate = array.find((filter) => {
    if(filter.name === name) {
      // eslint-disable-next-line
      console.log('filter.name', filter.name)
      return true;
    }
  });

  return !!duplicate;
};

/**
 * find and object and replace with the new value
 */
export const editOneFilter = (array, filterToEdit, name: string, operator:string | null = null, value:any= null) => {
  const obj = array.find((filter) => {
    if(filter.id === filterToEdit.id) {
      return true;
    }
  });

  if(!obj) {
    // eslint-disable-next-line
    console.log('no filter found');
    return;
  }
  const index = array.indexOf(obj);
  operator && array.fill(obj.operator=operator, index, index);
  value && array.fill(obj.value=value, index, index);
};

/**
 * find and delete
 */
export const deleteOneFilter = (array, name: string, operator:string | null = null, value:any= null) => {
  const obj = array.find(filter =>
    (filter.name === name && operator === filter.operator && value === filter.value));
  const index = array.indexOf(obj);
  index > -1 && array.splice(index, 1);
};