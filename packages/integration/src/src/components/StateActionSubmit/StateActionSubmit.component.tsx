import makeStyles from "@mui/styles/makeStyles";
import { Button } from "src/deps";
import * as React from "react";

import clsx from "clsx";
import { FormState } from "src/model";
import { AppBtn } from "../AppBtn/AppBtn.component";

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: 9
  },
  text: {
    fontSize: ".75em"
  },
  btnRoot: {
    maxHeight: 36
  },
  idle: {},
  valid: {},
  invalid: {},
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

interface StateActionSubmitProps {
    formState: Partial<FormState>;
    children: JSX.Element
    disable: string;
    overrideProps?: Object;
    onClick?: (ev: any) => void;
    overrideClass?: Object;
}

export function StateActionSubmit(props: StateActionSubmitProps): JSX.Element {
  const { formState, children, disable, onClick, overrideProps = {}, overrideClass = {} } = props;
  const _classes = useStyles({});
  const classes = { ..._classes, ...overrideClass };
  return (
    <AppBtn
    arrow
      variant="contained"
      color="secondary"
      type="submit"
      onClick={onClick}
      classes={{
        label: classes.label,
        root: clsx(classes.btnRoot, classes[formState], classes[disable])
      }}
      {...overrideProps}
    >
      {children}
    </AppBtn>
  );
}
