import { ChangeEvent as ReactChangeEvent, SyntheticEvent } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TextField } from "src/deps";
import Autocomplete from "@mui/material/Autocomplete";
import { updateSelection } from "../../shared/utils";
import { AppCheckbox } from "../AppCheckbox/AppCheckbox.component";

const useStyles = makeStyles(theme => ({
  root: {},
  input: {
    borderColor: theme.palette.red.main
  },
  autoComplete: {
    border: theme.shape.border.solidGrey,
    backgroundColor: theme.palette.white,
    paddingLeft: 4
  }
}));

interface AppAutoCompleteProps<T> {
    data: T[];
    selectedData: T[];
    inputKey: string;
    onUpdateSelection?: Function; // return list of selected values
    onSelectValue?: Function; // return the selected value
    getOptionLabel: (opt: T) => string;
    getOptionSelected: (opt: T, value: T) => boolean;
    getCheckboxLabel: (opt: T) => string;
    groupBy?: (option: T) => string;
    keyProp: string;
    overrideClass?: Object;
    getSelectedOptionValue?: (option: T) => any;
    placeholder: string;
}

export function AppAutoComplete<T>(props: AppAutoCompleteProps<T>) {
  const {
    data,
    selectedData,
    inputKey,
    getOptionLabel,
    getOptionSelected,
    getCheckboxLabel,
    keyProp,
    groupBy,
    overrideClass = {},
    getSelectedOptionValue,
    placeholder,
    onSelectValue = val => val,
    onUpdateSelection = (sel: T[]) => sel
  } = props;
  const _classes = useStyles(props);

  function handleChange(event, value) {
    const formatValue = getSelectedOptionValue ? getSelectedOptionValue.call(null, value) : value;
    const next = updateSelection<T>(selectedData, formatValue, getOptionSelected);
    onSelectValue(value);
    onUpdateSelection(next);
  }

  const classes = { ..._classes, ...overrideClass };
  return (
    <div className={classes.root}>
      <Autocomplete
        classes={{ root: classes.autoComplete }}
        multiple
        value={selectedData}
        id={inputKey}
        key={`${inputKey}`}
        options={data}
        getOptionLabel={getOptionLabel}
        disableClearable
        size="small"
        isOptionEqualToValue={getOptionSelected}
        onFocus={event => event.stopPropagation()}
        onClick={event => event.stopPropagation()}
        renderTags={(_value: any, _getTagProps) => null}
        groupBy={groupBy}
        renderOption={(props, option, state) => (
          <li key={`${inputKey}__${props.id}__${(option as any).hasOwnProperty(keyProp) ? option[keyProp] : option}`}>
            <AppCheckbox
                whiteBg
                style={{ marginRight: 8 }}
                onChange={ev => handleChange(ev, option)}
                checked={state.selected}
              />
            {getCheckboxLabel.call(null, option)}
          </li>
        )}
        renderInput={params => (<TextField
            {...params}
            variant="standard"
            placeholder={placeholder}
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            classes={{ root: classes.input }}
            InputProps={{ ...params.InputProps, disableUnderline: true }}

          />)
        }
      />
    </div>
  );
}
