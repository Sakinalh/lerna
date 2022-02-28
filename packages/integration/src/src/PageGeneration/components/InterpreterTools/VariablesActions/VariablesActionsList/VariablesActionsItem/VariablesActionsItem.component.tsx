import * as React from "react";
import { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Code } from "@mui/icons-material";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { FormArrayState, FormElementState, getInputValidations, updateFormArray } from "src/shared/form";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { GenerationCancelBtn } from "src/PageGeneration/components/shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { AppText } from "src/components/AppText/AppText.component";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.grey.middle1,
    paddingLeft: 20
  },
  listRow: {
    display: "grid",
    gridTemplateColumns: "10% 30% 30% 5%",
    alignItems: "center",
    border: heme.shape.border.solidGrey,
    borderRadius: theme.shape.border.radiusMin,
    backgroundColor: "white",
    padding: 8,
    marginBottom: 8
  },
  rowActions: {
    display: "flex"
  },
  valueCell: {
    paddingRight: 15,
    maxHeight: 100,
    overflowY: "auto"
  },
  formInput: {
    border: heme.shape.border.solidGrey,
    borderRadius: 0.4,
    color: "black"
  },
  inputLabel: {
    color: theme.palette.grey.middle2,
    padding: "inherit"
  },
  input: {
    color: "black"
  },
  btn_delete_label: {
    textDecoration: "underline"
  },
  btn_edit: {
    textDecoration: "underline"
  }
}));

/**
 * this field is editable is the user has checked specified col on creatio
 *
 * hacky way to determine it
 * one way, is to save the choice with var name
 * or
 * based on saved form, if source files && selected col are both filled, can assume specified col was true
 * only if the form validation works correctly
 * @param sourceFiles
 * @param selectCols
 * @param isEditable
 */
function canEditField(sourceFiles: string[], selectCols: string, isEditable: boolean) {
  return sourceFiles.length > 0 && selectCols.length > 0 && isEditable;
}

type VarItemFormState = Record<"value" | "name" | "type" | "selected_columns" | "source_files", FormElementState | FormArrayState>;

interface VariablesActionItemProps {
    datum: VarItemFormState;
    idx: number;
    onDelete: Function;
    onChange: Function;
}

export function VariablesActionItem({ datum, idx, onDelete, onChange }: VariablesActionItemProps) {
  const classes = useStyles({});
  const [isEditable, setIsEditable] = useState(false);
  const varList = useSelector((state: StoreState) => (state.ruleDetail.rule.datum.variables));

  function handleFormGroupChange(idx: number, formState: VarItemFormState) {
    return (payload: VarItemFormState) => {
      const value = { ...formState, ...payload };

      const isValid = getInputValidations(payload);
      onChange({ idx, value, isValid });
    };
  }

  function handleFormItemChange(rowIdx: number, formArrayIdx: number, formState: VarItemFormState, key: string) {
    return (payload: VarItemFormState) => {
      const isValid = getInputValidations(payload);
      const updatedFormArr = updateFormArray(formState[key], payload[formArrayIdx.toString()], formArrayIdx);

      const _update: any = { ...datum, [key]: updatedFormArr };
      onChange({ idx: rowIdx, value: _update, isValid });
    };
  }

  function handleEdit(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, bool: boolean) {
    ev.preventDefault();
    setIsEditable(!bool);
  }

  function handleDelete(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) {
    ev.preventDefault();

    onDelete({ idx });
  }

  // https://stackoverflow.com/questions/51076747/grid-layout-on-fieldset-bug-on-chrome
  // https://bugs.chromium.org/p/chromium/issues/detail?id=262679
  //! thanks chrome, DO NOT USE grid with fieldset

  function renderItemValue() {
    const inputType = datum.type.getValue();

    if(inputType === "text") {
      return <AppFormGroup inputState={datum.value as FormElementState}
        inputKey={"value"}
        formGroupChange={handleFormGroupChange(idx, datum)}
        customValidations={["required"]}
        inputProps={{
          "aria-describedby": "var value",
          id: `${idx}__text__value`
        }}
        isEditable={isEditable}
        overrideClass={{
          label: classes.inputLabel,
          input: classes.input

        }}

      />;
    }

    if(inputType === "text list") {
      return (datum.value as any).formArray.map((d, jdx) => <AppFormGroup key={`var_item_key_${jdx}`}
          inputKey={jdx.toString()}
          inputState={d}
          formGroupChange={handleFormItemChange(idx, jdx, datum, "value")}
          isEditable={isEditable}
          inputProps={{
            "aria-describedby": "var value",
            id: `${idx}__${jdx}__text_list_value`
          }}
          customValidations={["required"]}
          overrideClass={{
            label: classes.inputLabel,
            input: classes.input

          }}/>);
    }

    if(inputType === "excel text list") {
      return (datum.selected_columns as any).formArray.map((d, jdx) => <AppFormGroup key={`var_item_key_${jdx}`}
          inputKey={jdx.toString()}
          inputState={d}
          formGroupChange={handleFormItemChange(idx, jdx, datum, "selected_columns")}
          isEditable={
            canEditField(varList[idx].source_files, varList[idx].selected_columns, isEditable)
          }
          inputProps={{
            "aria-describedby": "var selected_columns",
            id: `${jdx}_${datum.name.__value}_excel_value`
          }}
          customValidations={["required"]}
          overrideClass={{
            label: classes.inputLabel,
            input: classes.input
          }}/>);
    }
  }

  return (
    <div className={classes.listRow}>
      <Code classes={{ root: classes.icon }}/>
      <div className={classes.valueCell}>
        <AppFormGroup inputState={datum.name as FormElementState}
          inputKey={"name"}
          formGroupChange={handleFormGroupChange(idx, datum)}
          inputProps={{
            "aria-describedby": "var name",
            id: `${idx}__name`
          }}
          label="Variable Name"
          isEditable={isEditable}
          overrideClass={{
            label: classes.inputLabel,
            input: classes.input
          }}

        />
      </div>
      <div className={classes.valueCell}>
        <AppText text="Value" themeColor="neutralColor"/>
        {renderItemValue()}

      </div>
      <div className={classes.rowActions}>

        <GenerationCancelBtn
          label={"delete"}
          customStyle={{ label: classes.btn_delete_label }}
          onClick={ev => handleDelete(ev, idx)}/>

        <AppBtn color="secondary"
          classes={{ root: classes.btn_edit }}
          onClick={ev => handleEdit(ev, isEditable)}>
          edit
        </AppBtn>
      </div>
    </div>

  );
}
