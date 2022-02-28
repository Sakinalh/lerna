export const templateQeue_QParamsTypes = [
  { ruleId: "number" },
  { limit: "number" }
];

export const campains_QParamsTypes = [
  { ruleId: "number" },
  { k_limit: "number" },
  { k_offset: "number" },
  { campaignId: "number" },
  { keywordId: "number" },
  { kwdLabel: "string" },
  { pageId: "string" }
];

export const editPage_QParamsTypes = [
  ...campains_QParamsTypes,
  { pageNumber: "number" },
  { category: "string" },
  { zoneType: "string" },
  { zoneId: "string" }
];

export const previewPage_QParamsTypes = [
  { campaignId: "number" },
  { kwdLabel: "string" },
  { ruleId: "number" },
  { pageId: "string" },
  { keywordId: "number" }
];

export const areaTextEdit_QParamsType = [
  { pageId: "string" },
  { keywordId: "number" },
  { ruleId: "number" },
  { zoneId: "string" },
  { zoneScore: "number" }
];

export const areaProductEdit_QParamsType = [
  { pageId: "string" },
  { keywordId: "number" },
  { ruleId: "number" },
  { zoneId: "string" }
];

export const ReplaceProduct_QParamsType = [
  { pageId: "string" },
  { keywordId: "number" },
  { ruleId: "number" },
  { zoneId: "string" }
];

export const keywordPage_QParamsType = [
  { pageNumber: "number" },
  { campaignId: "number" },
  { ruleId: "number" },
  { k_limit: "number" },
  { k_offset: "number" },
  { category: "string" },
  { keywordId: "number" },
  { pageId: "string" }
];

export const pageEdit_QParamsType = [
  { pageId: "string" },
  { keywordId: "number" },
  { ruleId: "number" },
  { zoneId: "string" }
];

export const areaEdit_QParamsType = [
  { zoneType: "string" },
  { zoneId: "string" },
  { pageId: "string" },
  { keywordId: "number" },
  { ruleId: "number" }
];

export const BlockArea_QParamsType = [
  { zoneId: "string" }
];

export const page_query_params = [
  {"generation/template/queue": templateQeue_QParamsTypes },
  {"generation/campain": campains_QParamsTypes },
  {"generation/editPage": editPage_QParamsTypes },
  {"previewPage": previewPage_QParamsTypes },
  {"keywordPage": keywordPage_QParamsType },
  {"pageEdit": pageEdit_QParamsType }

];
