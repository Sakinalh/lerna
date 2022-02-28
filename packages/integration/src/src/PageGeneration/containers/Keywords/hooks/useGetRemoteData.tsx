import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { StoreState } from "../../../../model";
import { tryGetKewordsByCategoryAction, tryGetKeywordSummaryListAction } from "../../../store/actions";

export const useGetRemoteData = (defaultFilters, currentRule, currentCampain) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryGetKewordsByCategoryAction(defaultFilters));
    currentRule && currentCampain && dispatch(tryGetKeywordSummaryListAction({ ruleId: currentRule, campainId: currentCampain.id }));
  }, []);
  const kwdByCategoryResult = useSelector((state: StoreState) => state.pageQueue.kwdsByCategories);

  const keywordsSummary = useSelector((state: StoreState) => state.pageQueue.kwdsSummary);

  return { kwdByCategoryResult, keywordsSummary };
};