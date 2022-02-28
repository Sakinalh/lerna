import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { DataMachineState } from "src/model/store";
import clsx from "clsx";
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
  success: {
    backgroundColor: theme.palette.green.main,
    pointerEvents: "none"
  },
  error: {
    backgroundColor: theme.palette.red.main
  },
  loading: {
    backgroundColor: theme.palette.grey.middle2,
    pointerEvents: "none"
  },
  disable: {
    pointerEvents: "none"
  }
}));

export interface AppStateBtnProps {
    dataState: DataMachineState;
    onAction: Function;
    children: JSX.Element
    disable: string
}

export function AppStateBtn(props: AppStateBtnProps): JSX.Element {
  const classes = useStyles(props);
  const { onAction, dataState, children, disable } = props;

  return (
    <AppBtn
      variant="contained"
      color="secondary"
      onClick={_ => onAction()}
      classes={{
        label: classes.label,
        root: clsx(classes.btnRoot, classes[dataState], classes[disable])
      }}
    >
      {children}
    </AppBtn>
  );
}
