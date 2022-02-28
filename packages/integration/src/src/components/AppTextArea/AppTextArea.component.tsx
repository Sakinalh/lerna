import React from "react";
import TextareaAutosize, {
  TextareaAutosizeProps
} from "@mui/material/TextareaAutosize";
import clsx from "clsx";
import { useStyles } from "./AppTextArea.style";

export interface AppTextAreaProps {
  customclass?: string;
  inputRef?: any;
}

export const AppTextArea: React.FC<AppTextAreaProps & TextareaAutosizeProps> = (
  props
) => {
  const classes = useStyles();

  const { customclass = null } = props;

  const AppTextArea = () => (
    <TextareaAutosize
        {...props}
        className={clsx("textArea textArea__outline--root", classes.root, customclass)}
      ></TextareaAutosize>
  );

  return AppTextArea();
};
