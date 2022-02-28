import { FormControl, MenuItem } from "src/deps";
import { Select, TextField, Typography, Grid } from "@mui/material";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { FilterProductInterface } from "src/PageGeneration/model";
import React, { useState, useRef, useEffect } from "react";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

export interface OperatorFormFilterProps {
  filterSelected: FilterProductInterface;
  handleClickPrev: () => void;
  onAddFilter: (operator: string, value: string, edit?: boolean) => void;
  filterToEdit?: any;
  onCloseFilter?: () => void;
}

export const OperatorFormFilter: React.FC<OperatorFormFilterProps> = ({
  filterSelected,
  handleClickPrev,
  onAddFilter,
  filterToEdit,
  onCloseFilter
}) => {
  const TYPE_ENUMERABLE = "text enumerable";
  const TYPE_TEXT = "text";
  const TYPE_NUMERIC = "numeric";
  const TYPE_DATE = "text (date iso ISO 8601 or date field ?)";
  const TYPE_BOOLEAN = "boolean";

  const FORM_FILTER_TYPES = [
    TYPE_ENUMERABLE,
    TYPE_TEXT,
    TYPE_NUMERIC,
    TYPE_DATE,
    TYPE_BOOLEAN
  ];

  const operatorModalRef = useRef<HTMLInputElement>(null);

  const [operator, setOperator] = useState(filterToEdit ? filterToEdit.operator : "");
  const [value, setValue] = useState(filterToEdit ? filterToEdit.value : "");

  const handleChangeOperator = (e: any) => {
    setOperator(e.target.value);
  };

  const handleChangeValue = (e: any) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    onAddFilter(operator, value, filterToEdit);
  };

  const onCancel = () => {
    setOperator("");
    setValue("");
  };

  const handleClickPrevForm = () => {
    handleClickPrev();
  };

  const getInputByFilterType = (filterType: string) => {
    switch (filterType) {
      case TYPE_ENUMERABLE:
        return (
          <TextField
            onBlur={handleBlur}
            onFocus={handleFocus}
            id="outlined-select-gender"
            select
            label={"Values"}
            value={value}
            name={"value"}
            onChange={handleChangeValue}
            className="input--noLegend"
            InputProps={{
              classes: {
                root: "input input__outline--root ",
                focused: "input input__outline--focused",
                disabled: "input input__outline--disabled"
              }
            }}
          >
            {filterSelected.possible_values &&
              filterSelected.possible_values.map((value, index: number) => (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
          </TextField>
        );
      case TYPE_NUMERIC:
      case TYPE_TEXT:
        return (
          <TextField
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={handleChangeValue}
            value={value}
            name={"value"}
            placeholder="value"
            id="outlined-basic"
            variant="outlined"
            InputProps={{
              classes: {
                root: "input input--noLegend input__outline--root",
                focused: "input input__outline--focused",
                disabled: "input input__outline--disabled"
              }
            }}
          />
        );
      case TYPE_DATE:
        return (
          <TextField
            onBlur={handleBlur}
            onFocus={handleFocus}
            className="input--noLegend"
            id="outlined-select-gender"
            type="date"
            value={value}
            name={"value"}
            onChange={handleChangeValue}
            InputProps={{
              classes: {
                root: "input input--noLegend input__outline--root",
                focused: "input input__outline--focused",
                disabled: "input input__outline--disabled"
              }
            }}
          />
        );
      case TYPE_BOOLEAN:
        return (
          <TextField
            onBlur={handleBlur}
            onFocus={handleFocus}
            className="input--noLegend"
            id="outlined-select-gender"
            select
            label={"Values"}
            value={value}
            name={"value"}
            onChange={handleChangeValue}
            InputProps={{
              classes: {
                root: "input input--noLegend input__outline--root",
                focused: "input input__outline--focused",
                disabled: "input input__outline--disabled"
              }
            }}
          >
            {["false", "true"].map((value, index: number) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        );
      default:
        return "input type not found";
    }
  };

  const [isStateEscape, setIsStateEscape] = useState(false);
  const [isStateBlur, setIsStateBlur] = useState(true);

  const handleKeyDown = (event) => {
    if(event.key === "Escape") {
      setIsStateEscape(true);
    } else {
      setIsStateEscape(false);
    }
    if(event.key === "Enter") {
      value.length > 0 && operator !== "" && onSubmit();
    }
  };

  const handleBlur = () => { setIsStateBlur(true); };
  const handleFocus = () => { setIsStateBlur(false); };

  useEffect(() => {
    operatorModalRef.current.focus();
  }, []);

  useEffect(() => {
    isStateBlur && operatorModalRef.current.focus();
  }, [isStateBlur]);

  useEffect(() => {
    if(isStateEscape !== false) {
      onCloseFilter();
    }
  }, [isStateEscape]);

  return (
    <div
      tabIndex={-1}
      ref={operatorModalRef}
      onKeyDown={event => handleKeyDown(event)}
      className="filterProd">
      <header className="filterProd__header">
        {!filterToEdit && (
          <div onClick={handleClickPrevForm}>
            <KeyboardArrowLeftRoundedIcon />
          </div>
        )}
        <h4>filter</h4>
      </header>
      <Typography component="p" className="filterProd__subTitle" variant="subtitle1"> {filterSelected.display_name}</Typography>

      <FormControl
        className="filterProd__input"
        fullWidth={true}
        variant="outlined"
      >
        <Select
          value={operator}
          displayEmpty
          onChange={handleChangeOperator}
          name="operator"

        >
          <MenuItem value="">
            select the operator
          </MenuItem>

          {filterSelected.operators &&
            filterSelected.operators.map((operator, index: number) => (
              <MenuItem
                  key={index}
                  value={
                    TYPE_ENUMERABLE === filterSelected.type ? "equal" : operator
                  }
                >
                {TYPE_ENUMERABLE === filterSelected.type ? "equal" : operator}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl
        className="filterProd__input"
        fullWidth={true}
        variant="outlined"
      >
        {getInputByFilterType(filterSelected.type)}
      </FormControl>

      <Grid
        container
        alignItems="center"
        justifyContent="flex-end"
        component="footer"
        className="filterProd__footer"
      >
        <AppBtn typeBtn="secondary" onClick={onCloseFilter}>
          Cancel
        </AppBtn>
        <AppBtn typeBtn="primary" onClick={onSubmit} disabled={(operator === "" || value === "")}>
          {filterToEdit ? "modify" : "apply"}
        </AppBtn>
      </Grid>
    </div>
  );
};
