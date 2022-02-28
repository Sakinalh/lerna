import * as React from "react";
import { useState } from "react";
import { VariableFormInterface } from "src/PageGeneration/model";
import { StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { partialVariableFormAction, setRuleDetailFormStateAction } from "src/PageGeneration/store/rule.epic";
import { VariableFormSwitch } from "../VariableFormSwitch/VariableFormSwitch.component";
import { VariableFormSelectFile } from "../VariableFormSelectFile/VariableFormSelectFile.component";
import { VariableFormSelectedCols } from "../VariableFormSelectedCols/VariableFormSelectedCols.component";

function _updateFormValidState(
  isFillCol: boolean,
  selList: string[]
) {
  if(isFillCol) {
    const hasValue = selList.reduce(
      (acc, curr) => Boolean(curr) && acc,
      true
    );

    return selList.length === 0 || !hasValue ? "invalid" : "valid";
  }

  return "valid";
}

interface VariableFormValueExcelProps {}

export function VariableFormValueExcel(_props: VariableFormValueExcelProps) {
  const { selected_columns }: VariableFormInterface = useSelector((state: StoreState) => state.ruleDetail.rule.form);

  const dispatch = useDispatch();

  const [isColDetail, setIsColDetail] = useState(false);

  function handleToggle(next: boolean) {
    const nextState = _updateFormValidState(next, selected_columns.getValue());
    dispatch(setRuleDetailFormStateAction(nextState));
    setIsColDetail(next);
  }

  function onFormUpdate(f: Partial<VariableFormInterface>) {
    dispatch(partialVariableFormAction(f));
  }

  return (
    <div>
      <VariableFormSelectFile
        onFormArrayUpdate={onFormUpdate}
        label="Choose excel files in this list"
        showList={isColDetail}
      />
      <VariableFormSwitch
        onToggle={handleToggle}
        isColDetail={isColDetail}
      />

      <VariableFormSelectedCols
        onFormArrayUpdate={onFormUpdate}
        showList={isColDetail}
      />

    </div>
  );
}
