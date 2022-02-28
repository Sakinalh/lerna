import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Close } from "@mui/icons-material";
import { MenuItem, Select, TextField, Typography, Button, IconButton } from "@mui/material";
import { AppBtn, AppCheckbox } from "src/components";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useStyles } from "./AnalyticsInputGroup.style";

export interface AnalyticsInputGroupProps {
  currentFilter: any,
  idx: number,
  filterFields,
  onHandleSave,
}

export function AnalyticsInputGroup(_props: AnalyticsInputGroupProps) {
  const {
    currentFilter,
    idx,
    filterFields,
    onHandleSave
  } = _props;

  const classes = useStyles();
  const filters = useSelector((state: StoreState) => state.filters.data.filters);
  const [Operator, setOperator] = useState(filters[idx]?.operator);
  const [value, setValue] = useState(filters[idx]?.value);

  function onChangeOperator(e) {
    setOperator(e.target.value);
    onHandleSave(
      {
        operator: e.target.value,
        value: value,
        name: currentFilter.name,
        type: currentFilter.type
      }
    );
  }

  function onChangeValue(e) {
    setValue(e.target.value);
    onHandleSave(
      {
        operator: Operator || currentFilter.operators[0].name,
        value: currentFilter.type === "enum" ? (e.target.value === "true") : e.target.value,
        name: currentFilter.name,
        type: currentFilter.type
      }
    );
  }

  function getfilterContent(typeFilter) {
    switch (typeFilter) {
      case "numeric":
        return (
          <>
            <Select
              // displayEmpty
              native
              variant="filled"
              onChange={e => onChangeOperator(e)}
              value={Operator}
              disableUnderline
              inputProps={{
                name: `${currentFilter.name}_${idx}_operator`,
                id: `${currentFilter.name}_${idx}_operator`
              }}
            >

              {
                currentFilter.operators.map((operator, idx) => (
                  <option key={idx} aria-label={operator.display_name} value={operator.name} >
                    {operator.display_name}
                  </option>
                ))
              }
            </Select>

            <TextField
              variant="filled"
              value={value}
              onChange={e => onChangeValue(e)}
              name={`${currentFilter.name}_${idx}_value`}
              id={`${currentFilter.name}_${idx}_value`}
              placeholder="Value"
              type="number"
              InputProps={{
                disableUnderline: true
              }} />
            { idx === 1 || filterFields === 1 && <IconButton classes={{ root: classes.errorBtn }} aria-label="close" size="small">
              <Close />
            </IconButton>}

          </>
        );
      case "text":
        return (
          <>
            <Select
              variant="filled"
              native
              onChange={e => onChangeOperator(e)}
              value={Operator}
              disableUnderline
              inputProps={{
                name: `${currentFilter.name}_${idx}`,
                id: `${currentFilter.name}_${idx}`
              }}
            >

              {
                currentFilter.operators.map((operator, idx) => (
                  <option key={idx} aria-label={operator.display_name} value={operator.name} >
                    {operator.display_name}
                  </option>
                ))
              }

            </Select>
            <TextField
              onChange={e => onChangeValue(e)}
              placeholder="Value"
              type="text"
              variant="filled"
              value={value}
              name={`${currentFilter.name}_${idx}_value`}
              id={`${currentFilter.name}_${idx}_value`}
              InputProps={{
                disableUnderline: true
              }} />

            { filterFields !== 1 && <IconButton classes={{ root: classes.errorBtn }} onClick={(e) => { }} aria-label="close" size="small">
              <Close />
            </IconButton>}
          </>
        );
      case "checkbox":
        return (
          <FormControlLabel
            classes={{
              label: "isFilter"
            }}
            control={
              <AppCheckbox
                onChange={e => onChangeValue(e)}
                // {...registerCallback(`${currentFilter.name}_${idx}_checkbox`, { defaultValue: `${currentFilter.name}_${idx}_checkbox` } )}
                noPadding
                whiteBg
                checked={true}
                name={`${currentFilter.name}_${idx}_checkbox`}
                id={`${currentFilter.name}_${idx}_checkbox`}
              />
            }
            label={<Typography variant="subtitle2">test</Typography>}
          />
        );
      case "enum":
        return (
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              defaultValue={value}
              name="radio-buttons-group"
              onChange={e => onChangeValue(e)}
            >
              <FormControlLabel sx={{ margin: 1 }} value="true" control={<Radio />} label="true" />
              <FormControlLabel sx={{ margin: 1 }} value="false" control={<Radio />} label="false" />
            </RadioGroup>
          </FormControl>
        );
    }
  }

  return (
    <div>
      <div className={clsx(classes.root, "analyticsInputGroup", currentFilter.type)}>
        {getfilterContent(currentFilter.type)}
      </div>
    </div>
  );
}
