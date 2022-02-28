import React from "react";
import { ButtonProps } from "@mui/material/Button";
import { Button } from "@mui/material";
import clsx from "clsx";
import { useStyles } from "./AppBtn.style";

export interface AppBtnProps {
 color?: string;
 variant?: string;
 label?: string;
 disabled?: boolean;
 size?: "large" | "medium" | "small";
 Icon?: any;
 onClick?: Function;
 type?: string;
}

export const AppBtnNext: React.FC<AppBtnProps & ButtonProps> = ({type = "button", Icon, color= "primary", variant= "contained", label="Next", disabled= false, size = "medium", onClick}) => {
  const classes = useStyles();
  const AppBtn = () => (
    <Button
        onClick={onClick}
        size={"large"}
        type={type}
        disabled={disabled}
        disableElevation={true}
        color={color}
        variant={variant}
        classes={classes}>
      {label}

    </Button>
  );

  return AppBtn();
};
