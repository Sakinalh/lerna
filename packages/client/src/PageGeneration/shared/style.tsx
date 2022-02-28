import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";

import clsx from "clsx";
import { ReactComponent as CheckBoxOutlineBlankOutlinedIcon } from "src/assets/img/checkedTick.svg";

const useStyles = makeStyles(theme => ({
  icon: {
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.blue.main}`,
    borderRadius: 3
  },
  checkedIcon: {
    backgroundColor: theme.palette.blue.main,
    border: `1px solid ${theme.palette.blue.main}`
  },
  sm: {
    width: 12,
    height: 12
  },
  md: {
    width: 14,
    height: 14
  },
  lg: {
    width: 16,
    height: 16
  }

}));

interface IconProps {
    size?: "sm" | "md" | "lg",
    override?: Object;
}

export function OutlinedCheckboxIcon({ size = "md", override = {} }: IconProps) {
  const classes = useStyles({});

  return <span className={clsx(classes.icon, classes[size], override)}/>;
}

export function OutlinedCheckboxCheckedIcon({ size = "md", override = {} }: IconProps) {
  const classes = useStyles({});

  return <CheckBoxOutlineBlankOutlinedIcon
    className={clsx(classes.icon, classes.checkedIcon, classes[size], override)}/>;
}
