import makeStyles from "@mui/styles/makeStyles";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { mergeAppFormGroup, UtmGroupFormInterface } from "src/shared/form";
import React from "react";
import { AppText } from "../../../../../components/AppText/AppText.component";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "40% 60%",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 30px"

  },
  formGroup: {
    padding: "15px 0"
  },
  title: {
    // fontSize: "1.4em"
  },

  textParams: {
    width: "40%",
    fontSize: "1.2em"

  }
});

export interface UtmValueFormProps {
    onUpdate: Function;
    datum: UtmGroupFormInterface
}

export function UtmValueForm({ onUpdate, datum }: UtmValueFormProps) {
  const classes = useStyles({});

  function handleValueFormChange(formState: UtmGroupFormInterface) {
    return (payload: Partial<UtmGroupFormInterface> & any) => {
      onUpdate(
        mergeAppFormGroup({ value: payload.value.getValue() }, formState)
      );
    };
  }

  return (
    <div className={classes.root}>

      <AppText capitalize="first"
        text={datum.getValue().name}
        props={{ classes: { root: classes.textParams } }}/>
      <AppFormGroup
        inputKey="value"
        inputState={datum.formGroup.value}
        formGroupChange={handleValueFormChange(datum)}
        inputProps={{
          "aria-describedby": "utm item value"
        }}
      />

    </div>
  );
}
