import { FormElementState, makeReactiveStateForm } from "src/shared/form";
import { ValidateState } from "src/model";
import { TemplateZoneApi } from "src/PageGeneration/model";
import produce from "immer";
import { TemplatePageRuleListApi } from "../../../model";
import { traverseQueue } from "../../../store/rule.epic";

export interface ZoneProductForm {
    isPristine: boolean;
    isValid: ValidateState;
    __key: string;
    __validations: [];
    __value: string[];
    formArray: FormElementState[];
    getValue: Function
}

export function parseValueForm(datum: TemplateZoneApi, isPristine = true) {
  const _zoneV = Array.isArray(datum.content) ? datum.content : [""];
  return makeReactiveStateForm(_zoneV, [], isPristine, "root");
}

export function makeZoneUpdatePayload(ids: { rowId: number, pageId: string; zoneId: string; }, data: TemplateZoneApi) {
  return {
    rule_id: ids.rowId,
    page_id: ids.pageId,
    zone_id: ids.zoneId,
    data
  };
}

export function getSelectedZone(ids: { ruleId: number, keywordId: number, pageId: string; zoneId: string; }, list: TemplatePageRuleListApi[]): TemplateZoneApi | undefined {
  return produce(list, (draftState: TemplatePageRuleListApi[]) => {
    const [zoneList] = traverseQueue(draftState, [ids.ruleId, ids.keywordId, ids.pageId, ids.zoneId], "root");
    if(!zoneList) {
      return [] as [];
    }
    return zoneList.find(d => d.zone_id === ids.zoneId);
  });
}
