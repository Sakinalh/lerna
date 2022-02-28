import * as React from "react";
import { SyntheticEvent } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TextField } from "src/deps";
import Autocomplete from "@mui/material/Autocomplete";
import { InputHint } from "src/components/InputHint/InputHint.component";
import { displayHint } from "src/shared/form";

const useStyles = makeStyles({
  root: {},
  input: {
    borderColor: "red",
    "& div": {
      "&::before": {
        border: "none"
      }
    }
  },
  autoComplete: {}
});

/**
 * fom clicked label, get the original value in list
 * the predicate func is needed as the model will differ
 * @param value
 * @param list
 * @param listPredicate
 * @returns {T}
 */
function makeUpdatePayload<T>(value, list: T[], listPredicate: (orig: T, target: unknown) => boolean): T {
  return list.find(el => listPredicate.call(null, el, value))!;
}

interface FormGroupAutoCompleteProps<T> {
    data: T[];
    getDataPredicate: (orig: T, target: T) => boolean;
    inputKey: string;
    onUpdate: Function;
    getOptionLabel: (opt: T) => string;
    getOptionSelected: (opt: T, value: T) => boolean;
    getCheckboxLabel: (opt: T) => string;
    groupBy?: (option: T) => string;
    keyProp: string;
    state: any;
    overrideClass?: Object;
    placeholder?: string;
}

export function FormGroupAutoComplete<T>(props: FormGroupAutoCompleteProps<T>) {
  const {
    data,
    getDataPredicate,
    inputKey,
    getOptionLabel,
    getOptionSelected,
    getCheckboxLabel,
    onUpdate,
    state,
    keyProp,
    groupBy,
    placeholder,
    overrideClass = {}
  } = props;
  const _classes = useStyles(props);

  function handleChange(ev: React.ChangeEvent<HTMLInputElement> | SyntheticEvent, checked, value) {
    ev.stopPropagation();

    const next = makeUpdatePayload(value, data, getDataPredicate as any);
    onUpdate(next);
  }

  const classes = { ..._classes, ...overrideClass };

  return (
    <div className={classes.root}>

      <Autocomplete
        classes={{ root: classes.autoComplete }}
        multiple
        value={state.getValue()}
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
        renderOption={(props: Object, option, state) => (
          <p>"temp"</p>
          /* <li key={`${inputKey}_${props.key}_opt__${(option as any).hasOwnProperty(keyProp) ? option[keyProp] : option}`}>
                            <Checkbox
                                icon={<OutlinedCheckboxIcon/>}
                                checkedIcon={<OutlinedCheckboxCheckedIcon/>}
                                style={{ marginRight: 8 }}
                                onChange={(ev, checked) => handleChange(ev, checked, option)}
                                checked={state.selected}
                            />
                            {getCheckboxLabel.call(null, option)}
                        </li> */
        )}
        renderInput={params => (<TextField
            {...params}
            variant="standard"
            placeholder={placeholder}
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            classes={{ root: classes.input }}
            // InputProps={{ disableUnderline: true}}

          />)
        }

      />
      <InputHint display={displayHint(state)}
        inputKey={inputKey}
        hint={"required field"}/>
    </div>
  );
}
