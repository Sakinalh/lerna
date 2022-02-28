import * as React from "react";
import { Apple } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { StoreState } from "src/model";
import { DetailFigureCard } from "../DetailFigureCard/DetailFigureCard.component";

interface DetailMessageMatchProps {}

export function DetailMessageMatch(_props: DetailMessageMatchProps) {
  const selection = useSelector(
    (state: StoreState) =>
      state.ruleDetail.rule.selected_queries
  );
  return (
    <DetailFigureCard
      icon={<Apple/>}
      title=" Message Match"
      content={`${selection.keywords.length} keywords - ${selection.adgroups.length} ads`}

    />
  );
}
