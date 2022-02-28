import makeStyles from "@mui/styles/makeStyles";
import { InputLabel, Slider, TextField } from "src/deps";
import {
  FormFilterRangeState,
  FormGroupState,
  mergeAppFormGroup,
  updateCtrlInput,
  updateFormState
} from "src/shared/form";
import clsx from "clsx";
import { ChangeEvent as ReactChangeEvent } from "react";
import produce from "immer";
import { FormAnalyticsFilter } from "../AnalyticsFilter/model";

function handleUndefinedInput(
  value: number | undefined,
  limit: number,
  bound: "min" | "max",
  validateLimit: boolean
) {
  if(!validateLimit) {
    return value;
  }

  // return Number.isFinite(value as any) ? value as number : 0;
  if(bound === "min" && Number.isFinite(value as any)) {
    return (value as number) < limit ? limit : value;
  }
  if(bound === "max" && Number.isFinite(value as any)) {
    return (value as number) > limit ? limit : value;
  }
  return value;
}

const useStyles = makeStyles(theme => ({
  root: {},
  inputs: {
    display: "flex",
    justifyContent: "space-between"
  },
  input: {
    width: "40%",
    "& input": {
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  label: {
    display: "block",
    width: "100%",
    color: theme.palette.grey.middle1,
    fontSize: "12px",
    fontFamily: "Open Sans",
    fontWeight: 400
  },
  err: {
    fontSize: ".85em",
    minHeight: 15,
    lineHeight: "15px"
  },
  slider: {
    color: "#EBEFF2"
  },
  sliderThumb: {
    backgroundColor: theme.palette.white,
    border: "1px solid #334D6E"
  },
  sliderTrack: {
    color: "#494949"
  },
  sliderCircle: {
    color: theme.palette.grey.light
  }
}));

function rangeIsValid(values: [number, number]) {
  const [lBound, hBound] = values;
  return lBound < hBound;
}

function updateFilterField(filterForm: FormGroupState, field: string, nextValue: number, rangeFields: [string, string]) {
  const [lBound, hBound] = rangeFields;
  // update nested field inside form group then update form group
  try {
    const ctrl = updateCtrlInput(
      nextValue,
      filterForm.formGroup[field],
      []
    );

    return produce<FormFilterRangeState>(updateFormState(filterForm, ctrl), (draftState) => {
      const _value = draftState.getValue();
      const values: [number, number] = [_value[lBound], _value[hBound]];
      const validity = rangeIsValid(values);
      draftState.formGroup[lBound].isValid.value = validity;
      draftState.formGroup[hBound].isValid.value = validity;
      draftState.isPristine = false;
      (draftState.isValid !).value = validity;
    });
  } catch (e) {
    console.warn(e);
    return filterForm;
  }
}

function updateRange(
  event: any,
  nextValue: number | number[],
  form: FormGroupState,
  props: [string, string],
  cb: Function
) {
  event.preventDefault();
  const [lbound, hBound] = nextValue as number[];
  const [lBoundProp, hBoundProp] = props;
  cb.call(
    null,
    mergeAppFormGroup({ [lBoundProp]: lbound, [hBoundProp]: hBound }, form)
  );
}

interface AnalyticsRangeProps {
    form: FormAnalyticsFilter;
    props: [string, string];
    onValueChange: Function;
    override?: any;
    label: string;
    min: number;
    max: number;
    displaySlider?: boolean;
    onBlur?: () => void
}

export function AnalyticsRange({
  onValueChange,
  form,
  props,
  override,
  label,
  min,
  max,
  displaySlider = true,
  onBlur = () => undefined
}: AnalyticsRangeProps): JSX.Element {
  const classes = useStyles({});

  function onUpdate(e: ReactChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field): void {
    e.preventDefault();

    onValueChange(
      updateFilterField(
        form,
        field,
        +e.target.value, // parse int && float,
        props
      )
    );
  }

  const [lBoundProp, hBoundProp] = props;

  if(!form.formGroup[lBoundProp] || !form.formGroup[hBoundProp]) {
    console.warn(form.formGroup, " has no fg name ", lBoundProp, " or ", hBoundProp);
    return <p>failed to display control</p>;
  }
  const minValue: any = handleUndefinedInput(form.formGroup[lBoundProp].getValue(), min, "min", min !== max);
  const maxValue: any = handleUndefinedInput(form.formGroup[hBoundProp].getValue(), max, "max", min !== max);

  return (
    <div className={clsx(classes.root, override)}>
      <InputLabel className={classes.label} htmlFor="range">{label}</InputLabel>

      <div className={classes.inputs}>
        <TextField
                    margin='dense'
                    helperText={(form.formGroup[lBoundProp].isValid as any).message}
                    classes={{
                      root: classes.input
                    }}
                    InputProps={{
                      style: {
                        height: 20
                      }
                    }}
                    value={minValue}
                    onChange={e => onUpdate(e, lBoundProp)}
                    variant="outlined"
                    color="secondary"
                    size="small"
                    type="number"
                    onBlur={onBlur}
                />
        <TextField
                    margin='dense'
                    helperText={(form.formGroup[hBoundProp].isValid as any).message}
                    classes={{
                      root: classes.input
                    }}
                    InputProps={{
                      style: {
                        height: 20
                      }
                    }}
                    value={maxValue}
                    onChange={e => onUpdate(e, hBoundProp)}
                    onBlur={onBlur}
                    variant="outlined"
                    color="secondary"
                    size="small"
                    type="number"
                />
      </div>
      <Slider
                style={{ display: displaySlider ? "inherit" : "none" }}
                classes={{
                  root: classes.slider,
                  thumb: classes.sliderThumb,
                  track: classes.sliderTrack,
                  valueLabel: classes.sliderCircle
                }}
                value={[minValue, maxValue]}
                onChange={(e, nextValue) => updateRange(e, nextValue, form, props, onValueChange)}
                valueLabelDisplay="auto"
                aria-labelledby={`${label}`}
                min={min}
                max={max}

            />

    </div>
  );
}
