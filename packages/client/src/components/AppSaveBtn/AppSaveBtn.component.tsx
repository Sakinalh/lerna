import makeStyles from "@mui/styles/makeStyles";
import { StateActionSubmit } from "src/components/StateActionSubmit/StateActionSubmit.component";
import { FormState } from "src/model";
import * as React from "react";
import { AppText } from "src/components/AppText/AppText.component";

const useStyles = makeStyles({

  disable: {
    backgroundColor: "rgba(57, 126, 245, .4)",
    pointerEvents: "none"
  }
});

export interface AppSaveBtnProps {
    formValidity: Partial<FormState>;
    onClick?: (ev: any) => void;
    defaultLabel?: string;
    labelState?: Record<Partial<FormState>, string> | {}

}

function getBtnLabel(state: FormState, defaultValue: string, labelStates) {
  return labelStates[state];
}

export function AppSaveBtn({
  formValidity,
  onClick,
  defaultLabel = "save",
  labelState = {}
}: AppSaveBtnProps) {
  const btnValid = formValidity === "valid" ? "" : "disable";
  const classes = useStyles();
  const BTN_LABEL = {
    idle: defaultLabel,
    valid: defaultLabel,
    invalid: defaultLabel,
    pending: "saving",
    success: defaultLabel,
    error: "error",
    canceled: defaultLabel
  };
  return (
    <StateActionSubmit
      formState={formValidity}
      disable={btnValid}
      overrideClass={classes}
      onClick={onClick}
    >
      <AppText text={getBtnLabel(formValidity, defaultLabel, { ...BTN_LABEL, ...labelState })}
        props={{ variant: "caption" }}/>
    </StateActionSubmit>
  );
}
