import React from "react";
import { ButtonProps } from "@mui/material/Button";
import { Button } from "@mui/material";
import clsx from "clsx";
import { useStyles } from "./AppBtn.style";

export interface AppBtnProps {
  typeBtn?:
    | "PageCardPreview"
    | "light"
    | "iconRounded"
    | "icon"
    | "filterNav"
    | "back"
    | "secondary"
    | "secondaryDelete"
    | "delete"
    | "viewResults"
    | "kwdBtn"
    | "underline"
    | "primary"
    | "customPrimary"
    | "customSecondary"
    | "customSimple";
  arrow?: boolean;
  disabled?: boolean;
  noPadding?: boolean;
  fluid?: boolean;
  children: any;
  customclass? :string

}

export const AppBtn: React.FC<AppBtnProps & ButtonProps> = (props) => {
  const classes = useStyles();

  const {
    typeBtn = null,
    arrow = false,
    disabled = false,
    noPadding = false,
    fluid = false,
    customclass = null,
    children = null,
    ...rest
  } = props;

  const SwitchBtn = () => (
    <Button
        {...rest}
        disabled={disabled}
        className={clsx(
          "button",
          typeBtn && `button--${typeBtn}`,
          customclass,
          classes.root,
          arrow && "button--arrow",
          fluid && "button--fluid",
          noPadding && "button--noPadding"
        )}
      >
      {children}
    </Button>
  );

  return SwitchBtn();
};
