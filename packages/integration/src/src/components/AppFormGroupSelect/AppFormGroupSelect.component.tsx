import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { InputLabel, MenuItem, Select } from "src/deps";
import { FormElementState, updateCtrlInput } from "src/shared/form";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 auto",
    padding: "15px 0",
    width: "100%",
    color: "initial"
  },
  formInput: {
    border: `1px solid ${theme.palette.grey.middle2}`,
    borderRadius: theme.shape.border.radiusMin
  },
  label: {
    color: theme.palette.grey.middle2
  },
  select: {
    width: "100% !important",
    backgroundColor: theme.palette.white,
    border: theme.shape.border.solidGrey,
    textTransform: "capitalize",
    padding: 4
  },
  formActions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column"
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

interface AppFormGroupSelectProps {
    inputState: FormElementState;
    inputKey: string;
    formGroupChange: Function;
    valueGetter?: (opt, idx) => string;
    labelGetter?: (opt) => string;
    label?: string;
    disable?: (type: any) => boolean
    list: { value: string; viewValue: string }[];

}

export function AppFormGroupSelect(props: AppFormGroupSelectProps) {
  const classes = useStyles(props);
  const {
    inputState,
    inputKey,
    formGroupChange,
    valueGetter = opt => opt,
    labelGetter = opt => opt,
    disable = _v => false,
    label = "",
    list = []
  } = props;

  function handleInputChange(type: string, inputState: FormElementState) {
    return (ev: React.ChangeEvent<HTMLInputElement | any>) => {
      const update = updateCtrlInput(
        ev.target.value,
        inputState,
        []
      );
      formGroupChange({ [type]: update });
    };
  }

  return (

    <div className={classes.root}>
      <InputLabel className={classes.label} htmlFor="variable_name_label">
        {label}
      </InputLabel>
      <Select
        labelId="select-variables"
        id={inputKey}
        value={inputState.getValue()}
        onChange={handleInputChange(inputKey, inputState)}
        classes={{ root: classes.select }}
        disableUnderline
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left"
          }
        }}
      >
        {list.map((v, idx) => (
          <MenuItem
            disabled={disable(v.value)}
            key={`${inputKey}__${idx}`}
            value={valueGetter(v, idx)}>
            {labelGetter(v)}
          </MenuItem>
        ))}
      </Select>
    </div>

  );
}
