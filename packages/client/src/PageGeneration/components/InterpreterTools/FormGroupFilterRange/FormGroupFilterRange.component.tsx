import makeStyles from "@mui/styles/makeStyles";
import { InputLabel, TextField } from "src/deps";
import { FormFilterRangeState, updateCtrlInput, updateFormState } from "src/shared/form";
import clsx from "clsx";
import * as React from "react";
import produce from "immer";
import { AppText } from "src/components/AppText/AppText.component";

function handleUndefinedInput(
  value: number | undefined
) {
  return Number.isFinite(value as any) ? value : 0;
}

const useStyles = makeStyles({
  root: {
    textAlign: "center"
  },
  inputs: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    gridColumnGap: 5
  },
  input: {
    backgroundColor: "white"
  },
  label: {
    display: "block",
    width: "100%"
  },
  err: {
    fontSize: ".85em",
    minHeight: 15,
    lineHeight: "15px"
  }
});

interface FormGroupFilterRangeProps {
    inputState: FormFilterRangeState;
    onValueChange: Function;
    override?: any;
    keys: [string, string];
    label?: string;
}

function rangeIsValid(values: [number, number]) {
  const [lBound, hBound] = values;
  return lBound < hBound;
}

function setRangeValidateMsg(values: [number, number], isPristine: boolean) {
  if(isPristine) {
    return "";
  }
  const validity = rangeIsValid(values);
  return validity ? "" : `expect ${values[0]} to be higher than ${values[1]}`;
}

function updateFilterField(filterForm: FormFilterRangeState, field: string, nextValue: number, rangeFields: [string, string]) {
  const [lBound, hBound] = rangeFields;
  // update nested field inside form group then update form group
  const ctrl = updateCtrlInput(
    nextValue,
    filterForm.formGroup[field],
    []
  );

  return produce<FormFilterRangeState>(updateFormState(filterForm, ctrl), (draftState) => {
    const _value = draftState.getValue();
    const values: [number, number] = [_value[lBound], _value[hBound]];
    const validity = rangeIsValid(values);
    draftState.formGroup[lBound].isValid.value = validity;
    draftState.formGroup[hBound].isValid.value = validity;
    draftState.isPristine = false;
    (draftState.isValid !).value = validity;
  });
}

/*  component to handle only form group with model
*
* {
*   filter,
*   min,
*   max
* }
*
* */
export function FormGroupFilterRange({
  onValueChange,
  inputState,
  override,
  keys,
  label = ""
}: FormGroupFilterRangeProps): JSX.Element {
  const classes = useStyles({});
  const [lBound, hBound] = keys;
  const { formGroup } = inputState;

  function onUpdate(e, field: string): void {
    onValueChange(
      updateFilterField(
        inputState,
        field,
        +e.target.value, // parse int && float,
        keys
      )
    );
  }

  const minValue = handleUndefinedInput(formGroup[lBound].getValue());
  const maxValue = handleUndefinedInput(formGroup[hBound].getValue());

  return (
    <div className={clsx(classes.root, override)}>
      <InputLabel className={classes.label} htmlFor="range">{label}</InputLabel>
      <div className={classes.inputs}>
        <TextField
          helperText={(inputState.formGroup[lBound].isValid as any).message}
          classes={{
            root: classes.input
          }}
          value={minValue}
          onChange={e => onUpdate(e, lBound)}
          variant="outlined"
          color="secondary"
          size="small"
          type="number"
        />
        <TextField
          helperText={(inputState.formGroup[hBound].isValid as any).message}
          classes={{
            root: classes.input
          }}
          value={maxValue}
          onChange={e => onUpdate(e, hBound)}
          variant="outlined"
          color="secondary"
          size="small"
          type="number"

        />
      </div>

      <AppText
        text={setRangeValidateMsg([inputState.getValue()[lBound], inputState.getValue()[hBound]], inputState.isPristine)}
        themeColor="dangerColor"
        props={{ classes: { root: classes.err } }}
      />

    </div>
  );
}
