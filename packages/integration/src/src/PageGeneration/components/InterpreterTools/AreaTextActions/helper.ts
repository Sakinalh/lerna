import { TemplateAreaItemText, TextAdvancedRule, TextDefaultRule } from "src/PageGeneration/model";
import produce from "immer";

export function saveZoneTextPayload(state: TemplateAreaItemText, next: TextDefaultRule | TextAdvancedRule) {
  return produce(state, (draftState) => {
    draftState.rule = next;
  });
}
