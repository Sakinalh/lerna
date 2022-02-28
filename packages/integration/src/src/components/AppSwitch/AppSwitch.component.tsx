import React from "react";
import { Grid, Typography } from "@mui/material";
import clsx from "clsx";
import { useStyles, AntSwitch } from "./AppSwitch.style";

export interface AppSwitchProps {
    onToggle: (value: boolean) => void;
    isActivated: boolean;
    before?: any;
    after?: any;
    customClass?: string;
}

export const AppSwitch: React.FC<AppSwitchProps> = ({onToggle, isActivated, before= "", after= "", customClass= ""}) => {
  const [activated, setActivated] = React.useState(isActivated);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setActivated(value);
    onToggle(value);
  };

  return (
    <Typography component="div" className={clsx(classes.root, "appSwitch", customClass)}>
      <Grid component="label" container alignItems="center" spacing={1} className={ activated && "appSwitch__label--checked" } >
        { before && <Grid item>{before}</Grid>}
        <Grid item>
          <AntSwitch
            className="appSwitch"
            checked={activated}
            onChange={handleChange}
            name="checkedC"
          />
        </Grid>
        { after && <Grid item>{after}</Grid>}
      </Grid>
    </Typography>
  );
};
