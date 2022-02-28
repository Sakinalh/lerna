import { AnalyticGlobalKpiApi, KpiEvolutionGraphView } from "../model/analytics";

export const STACK_LINE_COLOR_DICT = {
  message_match: "83, 0, 234",
  bounce_rate: "220, 90, 50",
  cost: "30, 179, 0",
  cr: "255, 165, 0",
  impr: "178,132, 190"

};

export function formatGraphModal(d: AnalyticGlobalKpiApi, prop: "global_kpi" | "global_kpis"): KpiEvolutionGraphView {
  return {
    kpi_display_name: d.kpi_display_name,
    id: d.kpi_name,
    data: d[prop].map(k => ({ ...k, kpi_display_name: d.kpi_display_name })),
    color: STACK_LINE_COLOR_DICT.hasOwnProperty(d.kpi_name) ? STACK_LINE_COLOR_DICT[d.kpi_name] : "83, 0, 234"

  };
}
