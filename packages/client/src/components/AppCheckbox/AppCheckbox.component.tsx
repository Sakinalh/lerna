import React, {useEffect, useState} from "react";
import { CheckboxProps } from "@mui/material/Checkbox";
import clsx from "clsx";
import { Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useStyles } from "./AppCheckbox.style";

export interface AppCheckboxProps {
  whiteBg: boolean;
  customClass?: string;
  isSmall?: boolean;
  isHide?: boolean;
  noPadding?: boolean;
  fluid?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppCheckbox: React.FC<AppCheckboxProps & CheckboxProps> = ({isHide, whiteBg, customClass, isSmall, noPadding, fluid, onChange, ...props }) => {
  const classes = useStyles();
  const [value, setValue] = useState(props.checked);

  useEffect(() => {
    setValue(props.checked); // pour bien s'assurer de passage du props
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.checked;
    setValue(val);
    onChange && onChange(event);
  };

  return (
    <Checkbox
      className={clsx(classes.root, "checkbox", customClass)}
      {...props}
      checked={value}
      onChange={e => handleChange(e)}
      icon={
        whiteBg ? (
          <span className={"checkbox--white"}>
            <CheckBoxOutlineBlankIcon />
          </span>
        ) : (
          <CheckBoxOutlineBlankIcon />
        )
      }
      classes={{
        root: `checkbox checkbox--root ${noPadding ? "checkbox--noPadding" : ""} ${fluid ? "checkbox--fluid" : ""}  ${isSmall ? "checkbox--small" : ""}  ${isHide ? "checkbox--hide" : ""}`,
        checked: "checkbox checkbox--focused  ",
        disabled: "checkbox checkbox--disabled"
      }}
    />
  );
};