import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { makeReactiveStateForm, mergeAppFormGroup, UtmGroupFormInterface } from "src/shared/form";
import { AppText } from "src/components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 30,
    display: "grid",
    gridTemplateColumns: "40% 60%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  formGroup: {
    padding: "15px 0"
  },
  input: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  equal: {
    color: theme.palette.grey.middle2,
    position: "relative",
    top: 8
  },
  textParams: {
    fontSize: "1.2em"

  }
}));

interface UtmFormItemValue {
    name: string;
    value: string;
}

function parseForm(datum: UtmFormItemValue, isPristine): UtmGroupFormInterface {
  return makeReactiveStateForm(datum, [], isPristine, "root");
}

export interface UtmItemFormProps {
    onAddUtm: Function;
}

export function UtmItemForm({ onAddUtm }: UtmItemFormProps) {
  const classes = useStyles({});

  const [form, setForm] = useState<UtmGroupFormInterface>(() =>
    parseForm({
      name: "",
      value: ""
    }, true));

  function handleEnter(formState: UtmGroupFormInterface, key: "name" | "value") {
    return (payload: Partial<UtmGroupFormInterface>) => {
      onAddUtm(
        mergeAppFormGroup({ [key]: payload[key].getValue() }, formState)
      );

      setForm(
        parseForm({
          name: "",
          value: ""
        }, false)
      );
    };
  }

  function handleFormGroupChange(formState: UtmGroupFormInterface, key: "name" | "value") {
    return (payload: Partial<UtmGroupFormInterface>) => {
      setForm(
        mergeAppFormGroup({ [key]: payload[key].getValue() }, formState)
      );
    };
  }

  return (
    <div className={classes.root}>

      <AppText capitalize="first"
        text={TRANSLATE.modal.customParams}
        props={{ classes: { root: classes.textParams } }}/>
      <div className={classes.input}>
        <AppFormGroup
          inputKey="name"
          inputState={form.formGroup.name}
          formGroupChange={handleFormGroupChange(
            form,
            "name"
          )}
          label='Name'
          inputProps={{
            "aria-describedby": "utm item name"
          }}
          onEnter={handleEnter(form, "name")}
          placeholder="{name}"
        />

        <div className={classes.equal}>
          <span>&#x0003D;</span>
        </div>

        <AppFormGroup
          inputKey="value"
          inputState={form.formGroup.value}
          label='value'
          formGroupChange={handleFormGroupChange(
            form,
            "value"
          )}
          inputProps={{
            "aria-describedby": "utm item value"
          }}
          onEnter={handleEnter(form, "value")}
          placeholder="value"

        />
      </div>

    </div>
  );
}
