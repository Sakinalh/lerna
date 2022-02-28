import React from "react";
import {Chip, ChipProps } from "@mui/material";
import { useStyles } from "./AppChip.style";

export interface AppChipProps {
  isactif ?: boolean
}

export const AppChip : React.FC<AppChipProps & ChipProps > = ({isactif = true, ...rest}) => {
  const classes = useStyles(isactif);

  return (
    <Chip
      {...rest}
      classes={classes}
    />
  );
};