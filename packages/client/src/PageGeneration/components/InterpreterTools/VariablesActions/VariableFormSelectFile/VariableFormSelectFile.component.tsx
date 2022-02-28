import * as React from "react";
import { useRef } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { InputLabel } from "src/deps";
import {
  TemplateSourceApi,
  VariableFormInterface
} from "src/PageGeneration/model";
import {
  formArrayDelete,
  formArrayPush,
  FormArrayState,
  FormElementState,
  makeReactiveStateForm,
  ValidationKey
} from "src/shared/form";
import { StoreState, ValidateState } from "src/model";
import { useSelector } from "react-redux";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { AppText } from "../../../../../components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    color: "initial"
  },
  list: {
    minWidth: "100%",
    border: theme.shape.border.solidGrey
  },
  item: {
    display: "flex"
  },
  label: {
    color: theme.palette.grey.middle1
  }
}));

function isChecked(list: string[], name) {
  if(!Array.isArray(list)) {
    return false;
  }
  return list.findIndex(el => el === name) >= 0;
}

/*
 * on selection change, update formArray && keep previous value if any
 * */

function makeFileNewSelection(
  inputState: FormArrayState,
  nextList: string[],
  colsValidations: ValidationKey[]
) {
  if(inputState.getValue().length < nextList.length) {
    const key = inputState.getValue().length.toString();
    const find = nextList.find(
      el => !inputState.getValue().find(next => el === next)
    );
    const nextInputState = {
      ...makeReactiveStateForm(
        find as string,
        colsValidations,
        true,
        "source_files"
      ),
      __path: ["formArray", key]
    };
    return formArrayPush(inputState, nextInputState);
  } else {
    const find = inputState
      .getValue()
      .findIndex(el => !nextList.find(next => el === next));
    return formArrayDelete(inputState, find);
  }
}

/**
 * apply list item valid state to root
 * namely looking for any invalid state
 * @param list
 */
function childValidateState(list: FormElementState[]) {
  return list.reduce(
    (acc: ValidateState, curr: FormElementState) => {
      if((curr.isValid as ValidateState).value) {
        return acc;
      }

      return curr.isValid as ValidateState;
    },
    { value: true, message: "" }
  );
}

/**
 * on toggle display list, apply validation on every item and root
 * if display list, should fill col name field
 * @param selCol
 * @param showList
 */
function patchSelectionValidState(selCol: FormArrayState, showList: boolean) {
  const _cols = selCol.formArray.map(f => ({
    ...f,
    isValid:
        showList && (f as any).getValue().length === 0
          ? { value: false, message: "required" }
          : {
            value: true,
            message: ""
          }
  }));

  return {
    ...selCol,
    formArray: _cols,
    isValid: childValidateState(_cols as any)
  };
}

function updateSelectCol(
  selCol: FormArrayState,
  index: number,
  showList: boolean
) {
  if(index < 0) {
    const key = selCol.getValue().length.toString();

    const nextInputState = {
      ...makeReactiveStateForm("", showList ? ["required"] : [], false, key),
      __path: ["formArray", key]
    };
    return patchSelectionValidState(
      formArrayPush(selCol, nextInputState),
      showList
    );
  } else {
    return patchSelectionValidState(formArrayDelete(selCol, index), showList);
  }
}

interface VariableFormSelectFileProps {
  onFormArrayUpdate: Function;
  label: string;
  showList: boolean;
}

/**
 * on file selection update source list && selected column
 * the first contains file name
 * the second columns to display
 *
 * @param sourceList
 * @param onFormArrayUpdate
 * @param label
 * @param showList
 * @constructor
 */
export function VariableFormSelectFile({
  onFormArrayUpdate,
  label,
  showList
}: VariableFormSelectFileProps) {
  const classes = useStyles({});

  const fileList: TemplateSourceApi[] = useSelector(
    (state: StoreState) => state.ruleDetail.variableData.sources.rawResults
  );
  const { source_files, selected_columns }: VariableFormInterface = useSelector(
    (state: StoreState) => state.ruleDetail.rule.form
  );

  const selRef = useRef<string[]>([]);

  // TODO maybe do this in reducer
  function handleChangeListSelection(name: string) {
    const selection = selRef.current;

    const isSelected = selection.find(el => el === name);

    const update = isSelected
      ? selection.filter(el => el !== name)
      : [...selection, ...[name]];

    const elIndex = selection.findIndex(el => el === name);
    selRef.current = update;

    onFormArrayUpdate({
      source_files: makeFileNewSelection(
        source_files,
        update,
        showList ? ["required"] : []
      ),
      selected_columns: updateSelectCol(selected_columns, elIndex, showList)
    });
  }

  return (
    <div className={classes.root}>
      <InputLabel classes={{ root: classes.label }} htmlFor="file_select_name">
        {label}
      </InputLabel>
      <ul id="file_select_name" className={classes.list}>
        {fileList.map(source => (
          <li key={source.id} id={source.id.toString()} value={source.id}>
            <AppCheckbox
              whiteBg
              onClick={_e => handleChangeListSelection(source.name)}
              checked={isChecked(source_files.getValue(), source.name)}
            />

            <AppText text={source.name} props={{ variant: "caption" }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
