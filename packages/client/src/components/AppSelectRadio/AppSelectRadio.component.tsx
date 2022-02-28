import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import EventIcon from "@mui/icons-material/Event";
import { ListItemText, OutlinedInput, Radio, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDateRange } from "src/PageGeneration/store/filters.actions";

export interface AppSelectRadioProps {
  radio?: boolean;
  items: any;
  customClass?: string;
  onChangeFormat?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const MenuProps = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  PaperProps: {
    style: {
      width: 172
    }
  }

};
export const AppSelectRadio: React.FC<AppSelectRadioProps> = ({
  radio,
  items,
  customClass,
  onChangeFormat,
  ...props
}) => {
  const dispatch = useDispatch();
  const [val, setValue] = React.useState(["Last month"]);
  const handleChange = (event) => {
    setValue([event.target.value]);
    const date = items.filter(item => item.display_name === event.target.value);
    dispatch(setDateRange(date[0].name));
  };
  return (
    <FormControl sx={{ width: 165 }}>
      <Select
        labelId="select-simple-radio"
        id="select-simple-radio"
        value={val}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <EventIcon />
          </InputAdornment>
        }
        input={<OutlinedInput sx={{ height: "100%" }} label="Range Date" />}
        variant="outlined"
        renderValue={selected => selected}
        MenuProps={MenuProps}
      >
        {items?.map(item => (
          <MenuItem key={item.name} value={item.display_name}>
            <Radio checked={val.indexOf(item.display_name) > -1} />
            <ListItemText primary={item.display_name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
