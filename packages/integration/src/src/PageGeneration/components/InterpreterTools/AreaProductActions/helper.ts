import { TemplateAreaItemImg, TemplateAreaItemProduct, TemplateAreaItemText } from "src/PageGeneration/model";
import { getValidAreaProductRule, getValidSubZones } from "../../../shared/helper";
import { makeReactiveStateForm } from "../../../../shared/form";

export function validateAreaProduct(orig, fallback: TemplateAreaItemProduct): TemplateAreaItemProduct {
  const { rule, subzones, ...rest } = orig;
  const _productZonePayload: any = {
    ...rest
  };

  _productZonePayload.sub_zones = !orig.hasOwnProperty("sub_zones") ? fallback.sub_zones : orig.sub_zones;

  _productZonePayload.rule = !orig.hasOwnProperty("rule") ? fallback.rule : orig.rule;

  if(orig.hasOwnProperty("rule")) {
    _productZonePayload.rule = getValidAreaProductRule(orig.rule);
  }

  return _productZonePayload;
}

export function getValidAreaProductZone(list: Array<TemplateAreaItemText | TemplateAreaItemImg | TemplateAreaItemProduct>, zone: any): TemplateAreaItemProduct {
  const getSelection: any = list.find(z => z.zone_id === zone.zone_id);
  if(getSelection === undefined) {
    return {
      ...zone,
      rule: getValidAreaProductRule(zone.rule),
      sub_zones: getValidSubZones(zone.sub_zones)
    };
  }

  return {
    ...getSelection,
    rule: getValidAreaProductRule(getSelection.rule),
    sub_zones: getValidSubZones(getSelection.sub_zones)
  };
}

export function parseAreaProductForm(datum: TemplateAreaItemProduct, isPristine = true) {
  return ({
    rule: makeReactiveStateForm(datum.rule, [], isPristine, "rule"),
    sub_zones: makeReactiveStateForm(datum.sub_zones, [], isPristine, "sub_zones"),
    zone_id: makeReactiveStateForm(datum.zone_id, [], isPristine, "zone_id"),
    comment: makeReactiveStateForm(datum.comment as string, [], isPristine, "comment"),
    type: makeReactiveStateForm(datum.type, [], isPristine, "type")

  });
}
