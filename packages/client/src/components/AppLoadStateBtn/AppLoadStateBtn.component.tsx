import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { ListLoadState } from "src/model/store";

import clsx from "clsx";
import { ButtonBaseTypeMap, ExtendButtonBase } from "@mui/material/ButtonBase/ButtonBase";
import { AppText } from "src/components/AppText/AppText.component";
import { AppBtn } from "../AppBtn/AppBtn.component";

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: 9
  },
  text: {
    fontSize: 10
  },
  btnRoot: {},
  idle: {},
  complete: {
    backgroundColor: theme.palette.green.main
  },
  error: {
    backgroundColor: theme.palette.red.main
  },
  loading: {
    pointerEvents: "none"
  }
}));

function getBtnLabel(state: ListLoadState, defaultValue: string, labelStates) {
  return labelStates[state];
}

export interface AppLoadStateBtnProps {
    dataState: ListLoadState;
    onClick: (ev: any) => void;
    props?: ExtendButtonBase<ButtonBaseTypeMap> | {};
    defaultLabel?: string;
    labelState?: Record<Partial<ListLoadState>, string> | {};
    overrideClass?: string;

}

export function AppLoadStateBtn({
  onClick,
  dataState,
  props = {},
  defaultLabel = "load",
  labelState = {},
  overrideClass = ""
}: AppLoadStateBtnProps): JSX.Element {
  const classes = useStyles(props);

  const BTN_LABEL = {
    idle: defaultLabel,
    pending: "loading",
    success: "loaded",
    error: "error"
  };

  return (
    <AppBtn
      variant="contained"
      color="secondary"
      onClick={onClick}
      classes={{
        label: classes.label,
        root: clsx(classes.btnRoot, overrideClass, classes[dataState])
      }}
      {...props}
    >
      <AppText props={{ variant: "caption" }}
        text={getBtnLabel(dataState, defaultLabel, { ...BTN_LABEL, ...labelState })}
      />

    </AppBtn>
  );
}
