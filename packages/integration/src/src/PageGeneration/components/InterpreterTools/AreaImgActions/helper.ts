import { INIT_AREA_IMG_SETTING } from "src/PageGeneration/shared/helper";
import produce from "immer";
import {
  BankImageRule,
  TemplateAreaItemImg,
  TemplateAreaItemProduct,
  TemplateAreaItemText
} from "src/PageGeneration/model";
import { safeGet } from "src/shared/utils";

export function saveZoneImagePayload(state: TemplateAreaItemImg, next: BankImageRule) {
  return produce(state, (draftState) => {
    draftState.rule = next;
  });
}

export function getImageRuleZone(list: Array<TemplateAreaItemText | TemplateAreaItemImg | TemplateAreaItemProduct>, zoneId): BankImageRule {
  const fallbackImageRule = {
    meta: { positive_tags: [], negative_tags: [] },
    design: INIT_AREA_IMG_SETTING,
    sources: []
  };
  const getSelection = list.find(z => z.zone_id === zoneId);
  if(getSelection === undefined) {
    return fallbackImageRule;
  }
  const _rule = safeGet(getSelection as TemplateAreaItemImg, "rule");
  if(_rule == null) {
    return fallbackImageRule;
  }
  return _rule;
}
