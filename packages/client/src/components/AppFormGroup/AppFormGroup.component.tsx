import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { InputBase, InputLabel } from "src/deps";
import { InputBaseProps } from "@mui/material/InputBase/InputBase";
import { displayHint, FormCtrlValidator, FormElementState, updateCtrlInput } from "src/shared/form";
import { InputHint } from "../InputHint/InputHint.component";

const useStyles = makeStyles(theme => ({
  root: {
    border: "none",
    padding: 0
  },
  label: {
    color: theme.palette.grey.middle2,
    textTransform: "capitalize"
  },
  input: {
    width: "100%",
    borderRadius: 5
  },
  formInput: {
    border: `1px solid ${theme.palette.grey.middle2}`,
    paddingLeft: 4
  },
  inputSm: {},
  inputWrap: {
    width: "inherit"
  }
}));

interface FormStateInputProps extends InputBaseProps {
    "aria-describedby": string;
    type?: "text" | "number" | "textarea" | "password" | "email";
    multiline?: boolean;
    rows?: number,
    autoComplete?: string
}

interface AppFormGroupProps {
    inputState: FormElementState;
    inputKey: string;
    formGroupChange: Function;
    inputProps: FormStateInputProps;
    label?: string;
    customValidations?: FormCtrlValidator;
    isEditable?: boolean;
    overrideClass?: Object;
    hint?: string;
    onEnter?: Function;
    placeholder?: string
}

export function AppFormGroup(props: AppFormGroupProps) {
  const _classes = useStyles({});

  const {
    inputState,
    inputKey,
    formGroupChange,
    label = "",
    customValidations = [], // override or append runtime ? validation
    isEditable = true,
    inputProps = {
      "aria-describedby": "default description",
      type: "text"
    },
    overrideClass = {},
    hint = "invalid",
    onEnter = d => d,
    placeholder = ""
  } = props;

  function handleInputChange(ctrlKey: string, formCtrlState: FormElementState, event: "change" | "enter") {
    return (ev: React.ChangeEvent<HTMLInputElement | any>) => {
      ev.preventDefault();

      const coerceValue = inputProps.type === "number" ? +ev.target.value : ev.target.value;
      const update = updateCtrlInput(coerceValue, formCtrlState, customValidations);
      if(event === "change") {
        formGroupChange({ [ctrlKey]: update });

        return;
      }
      if(event === "enter") {
        onEnter({ [ctrlKey]: update });
      }
    };
  }

  const classes = { ..._classes, ...overrideClass };

  if(!inputState) {
    // eslint-disable-next-line
    console.warn("not a valid input while reading the input key ", inputKey);

    return <p> failed to display input</p>;
  }
  return (
    <fieldset className={classes.root}>
      <InputLabel className={classes.label} htmlFor="variable_name_label">{label}</InputLabel>

      <div className={classes.inputWrap}>
        <InputBase
          classes={{
            root: classes.input,
            input: isEditable ? classes.formInput : undefined
          }}
          onInput={handleInputChange(inputKey, inputState, "change")}
          error={inputState.isValid!.value}
          value={inputState.getValue()}
          readOnly={!isEditable}
          id={inputKey}
          {...inputProps}
          placeholder={placeholder}
          onKeyPress={(ev) => {
            const partInput = handleInputChange(inputKey, inputState, "enter");
            if(ev.key === "Enter") {
              partInput(ev);
            }
          }}
        />
      </div>

      <InputHint
        display={displayHint(inputState)}
        inputKey={`${inputKey}__hint`}
        hint={hint}
      />
    </fieldset>

  );
}
