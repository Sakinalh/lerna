import { ChangeEvent, useEffect, useState } from "react";
import { FormElementState, makeReactiveStateForm } from "src/shared/form";
import { TextField } from "src/deps";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { patchVariableFormAction } from "src/PageGeneration/store/rule.epic";

function listToStr(formArr: FormElementState[]) {
  if(formArr) {
    return formArr.map((f: FormElementState) => f.getValue()).join("\n");
  }
  return "";
}

interface VariableFormValueListProps {}

export function VariableFormValueList(_props: VariableFormValueListProps) {
  const valueFormArr = useSelector((state: StoreState) => state.ruleDetail.rule.form.value.formArray);

  const [formValue, setFormValue] = useState(listToStr(valueFormArr as any));

  const dispatch = useDispatch();

  useEffect(() => {
    setFormValue(listToStr(valueFormArr as any));
  }, [valueFormArr]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    const list = val.split("\n");
    const _formArr = makeReactiveStateForm(list, [], false, "value");

    dispatch(patchVariableFormAction({ key: "value", value: _formArr }));
  }

  return (

    <TextField
      id="text_list"
      label="text list"
      multiline
      rows={4}
      value={formValue}
      onChange={handleChange}
      variant="outlined"
    />

  );
}
