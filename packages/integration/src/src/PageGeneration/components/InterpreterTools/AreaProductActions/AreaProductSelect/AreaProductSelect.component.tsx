import makeStyles from "@mui/styles/makeStyles";
import { InputLabel, MenuItem, Select } from "src/deps";
import { ChangeEvent as ReactChangeEvent, useRef } from "react";
import { TemplateCatalogApi } from "../../../../model";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 auto",
    padding: "15px",
    width: "100%"
  },
  formInput: {
    border: `1px solid ${theme.palette.grey.middle2}`,
    borderRadius: theme.shape.border.radiusMin
  },

  select: {
    width: "100% !important"
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

interface AreaProductSelectProps {
    list: TemplateCatalogApi[];
    onSelected: Function;
    selIdx: number
}

/* @DEPRECATED */
export function AreaProductSelect({ list, onSelected, selIdx }: AreaProductSelectProps) {
  const classes = useStyles({});

  const cbInstance = useRef(onSelected);

  function handleInputChange(ev: ReactChangeEvent<HTMLInputElement | any>) {
    const val = ev.target.value;
    const idx = list.findIndex(el => el.id === val.id);
    cbInstance.current.call(null, idx);
  }

  return (

    <div className={classes.root}>
      <InputLabel htmlFor="variable_name_label">
        select source
      </InputLabel>
      <Select
        labelId="select-variables"
        id="select_source"
        value={list.length === 0 ? "" : list[selIdx]}
        onChange={e => handleInputChange(e)}
        classes={{ root: classes.select }}

      >
        {list.map((v, idx) => (
          <MenuItem
            key={`cat_file__${idx}`}
            value={v as any}>
            {v.name}
          </MenuItem>
        ))}
      </Select>
    </div>

  );
}
