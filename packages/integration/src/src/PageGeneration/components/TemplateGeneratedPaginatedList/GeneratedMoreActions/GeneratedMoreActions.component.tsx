import { ChangeEvent as ReactChangeEvent, useState } from "react";
import { PageKwdInterface } from "src/PageGeneration/model";
import { FormControl, InputLabel, MenuItem, Select } from "src/deps";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  formControl: {
    width: "65%",
    paddingBottom: 20,
    color: theme.palette.blue.main
  },
  label: {
    color: theme.palette.blue.main
  },
  select: {
    marginTop: 0
  },
  icon: {
    color: theme.palette.blue.main,
    position: "relative",
    right: "-10px"
  },
  hide: {
    opacity: 0
  }
}));

interface GeneratedMoreActionsProps {
    datum: PageKwdInterface;
    pageId: string;

}

export function GeneratedMoreActions(_props: GeneratedMoreActionsProps) {
  const [actionSelect, setActionSelect] = useState("");
  const classes = useStyles({});

  function handleActionChange(event: ReactChangeEvent<{ value: unknown }>) {
    const _value: any = event.target.value;
    setActionSelect(_value);
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel classes={{ animated: classes.label, root: clsx({ [classes.hide]: actionSelect.length > 0 }) }}>Other
        options</InputLabel>
      <Select
        disableUnderline={true}
        labelId="more-row-actions"
        id="more-row-actions"
        value={actionSelect}
        onChange={handleActionChange}
        classes={{ root: classes.select, icon: classes.icon }}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          getContentAnchorEl: null
        }}
      >
        <MenuItem value="1">Opt 1</MenuItem>
        <MenuItem value="2">Opt 2</MenuItem>
      </Select>
    </FormControl>
  );
}
