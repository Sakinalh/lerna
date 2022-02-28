import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { FormControlLabel, Switch } from "src/deps";
import { AppText } from "src/components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "15px 0",
    color: "initial"
  },

  switchBase: {
    color: theme.palette.grey.light,
    "&$checked": {
      color: theme.palette.green.main
    },
    "&$checked + $track": {
      backgroundColor: theme.palette.green.main
    }
  },
  checked: {},
  track: {}
}));

interface VariableFormSwitchProps {
    onToggle: Function;
    isColDetail: boolean;
}

export function VariableFormSwitch({
  onToggle,
  isColDetail
}: VariableFormSwitchProps) {
  const classes = useStyles({});

  function handleToggleColumn(event: React.ChangeEvent<HTMLInputElement>) {
    onToggle.call(undefined, event.target.checked);
  }

  return (
    <div className={classes.root}>
      <AppText text="Do you want to indicate a specific column ?"
        themeColor="neutralColor"/>
      <FormControlLabel
        control={
          <Switch
            checked={isColDetail}
            onChange={handleToggleColumn}
            name="toggle_column"
            classes={{
              switchBase: classes.switchBase,
              checked: classes.checked,
              track: classes.track
            }}
          />
        }
        label={isColDetail ? "yes" : "no"}
      />

    </div>
  );
}
