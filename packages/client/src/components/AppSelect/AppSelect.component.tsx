import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export interface AppSelectProps {
  value: string;
  customClass?: string;
  onChangeFormat?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppSelect: React.FC<AppSelectProps> = ({
  value,
  customClass,
  onChangeFormat,
  ...props
}) => {
  const handleChange = (event) => {
    onChangeFormat(event.target.value);
  };
  return (
    <div style={{ marginLeft: 5 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Format</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          <MenuItem value={"none"}>None</MenuItem>
          <MenuItem value={"title"}>title</MenuItem>
          <MenuItem value={"capitalize"}>capitalize</MenuItem>
          <MenuItem value={"uppercase"}>uppercase</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
