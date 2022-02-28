import * as React from "react";
import { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { makeReactiveStateForm } from "src/shared/form";
import { VariableFormInterface, VariableFormValueInterface, VariableItemType } from "src/PageGeneration/model";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { partialVariableFormAction } from "src/PageGeneration/store/rule.epic";
import { VariableFormValueList } from "../VariableFormValueList/VariableFormList.component";
import { VariableFormValueExcel } from "../VariableFormValueExcel/VariableFormValueExcel.component";
import { FormElementState } from "../../../../../shared/form";

const useStyles = makeStyles({
  root: {}
});

const MAP_VALUE_INIT = {
  text: "",
  "text list": [],
  "excel text list": []
};

function partialReset(
  datum: VariableItemType
): VariableFormValueInterface {
  const _value = MAP_VALUE_INIT[datum];
  return {
    value: makeReactiveStateForm(
      _value,
      [],
      false,
      "value"
    ),
    selected_columns: makeReactiveStateForm(
      [],
      [],
      false,
      "selected_columns"
    ),
    source_files: makeReactiveStateForm(
      [],
      [],
      false,
      "source_files"
    )
  };
}

interface VariableFormValueProps {
}

export function VariableFormValue(_props: VariableFormValueProps) {
  const classes = useStyles({});

  const form: VariableFormInterface = useSelector((state: StoreState) => state.ruleDetail.rule.form);

  const varType = form.type.getValue();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(partialVariableFormAction(partialReset(varType)));
  }, [varType, dispatch]);

  function handleFormUpdate(f: VariableFormValueInterface) {
    dispatch(partialVariableFormAction(f));
  }

  function renderFormValue(varType: VariableItemType) {
    if(varType === "text") {
      return (<AppFormGroup
        inputKey="value"
        inputState={form.value as FormElementState}
        formGroupChange={handleFormUpdate}
        inputProps={{
          "aria-describedby": "variable_value",
          multiline: true,
          rows: 3,
          type: "textarea"
        }}
        placeholder="Placeholder text"
        label="Textarea label"
      />);
    }

    if(varType === "text list") {
      if(!(form as any).value.hasOwnProperty("formArray")) {
        return null;
      }

      return <VariableFormValueList/>;
    }
    if(varType === "excel text list") {
      return <VariableFormValueExcel/>;
    }
  }

  return (
    <div className={classes.root}>

      {renderFormValue(varType)}

    </div>

  );
}
