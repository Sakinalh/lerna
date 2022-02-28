import React from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { ReactComponent as OopsErrorIcon } from "src/styles/global/icons/oops.svg";
import { Typography } from "@mui/material";
import { useStyles } from "./AppError.style";

export interface AppErrorProps {
  message: string;
  isError?: boolean;
  className: string;
}

export const AppError: React.FC<AppErrorProps> = (props) => {
  const classes = useStyles();

  const {
    message,
    isError = false,
    className
  } = props;

  const Icon = isError ? OopsErrorIcon : AddPhotoAlternateOutlinedIcon;
  const AppError = () => (
    <div className={className}>
      <Icon className="noPageCards__icon" />
      <Typography component="div" className="noPageCards__txt" variant="h1">
        {isError && <p style={{ textAlign: "center" }}>Error</p>}
        {message}
      </Typography>
    </div>
  );
  return AppError();
};
