import makeStyles from "@mui/styles/makeStyles";
import { VariableFormInterface } from "src/PageGeneration/model";
import clsx from "clsx";
import { FormArrayState, FormElementState, updateFormState, ValidationKey } from "src/shared/form";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { Fragment, useEffect, useRef } from "react";
import produce from "immer";
import { AppText } from "src/components/AppText/AppText.component";
import { useTheme } from "@mui/material";
import { upliftChildNodesValidity } from "../../../../../shared/form";

const useStyles = makeStyles({
  inputLabel: {
    paddingTop: 10,
    width: "100%",
    color: "black"
  },
  inputValue: {
    fontWeight: "bold",
    paddingLeft: 3
  },
  inputWrap: {
    width: "100%"
  },
  remove: {
    display: "none"
  }

});

function getFileName(list: string[], idx: number) {
  return list[idx];
}

interface VariableFormSelectedColsProps {
    showList: boolean;
    onFormArrayUpdate: Function;
}

export function VariableFormSelectedCols({
  showList,
  onFormArrayUpdate
}: VariableFormSelectedColsProps) {
  const theme = useTheme();
  const classes = useStyles({});
  const {
    selected_columns,
    source_files
  }: VariableFormInterface = useSelector((state: StoreState) => state.ruleDetail.rule.form);

  const selected_columnsInstance = useRef<FormArrayState>(selected_columns);
  selected_columnsInstance.current = selected_columns;
  const onFormArrayUpdateInstance = useRef<Function>(onFormArrayUpdate);

  useEffect(() => {
    if(!showList) {
      const clearSelectedValue = produce<FormArrayState>(selected_columnsInstance.current, (draftState) => {
        for(let i = 0; i < draftState.formArray.length; i++) {
          // @ts-ignore
          draftState.formArray[i].__value = "";
          (draftState.formArray[i].isValid as any).value = true;
        }
        draftState.__value = new Array(draftState.formArray.length).fill("");
        (draftState.isValid as any).value = true;
      });

      onFormArrayUpdateInstance.current.call(
        null,
        { selected_columns: clearSelectedValue }
      );
    }
  }, [showList]);

  function handleFormListUpdate(formState: FormArrayState, idx: number) {
    return (payload: VariableFormInterface) => {
      // payload could be a stall value on idx changes (removing/inserting)
      // sync key/path
      const ctrlState = {
        ...payload[idx.toString()],
        __key: idx.toString(),
        __path: ["formArray"].concat([idx.toString()])
      };

      // update existing index;
      const _updateFormArr = updateFormState(formState, ctrlState);
      const updateFormArrValidValue = produce<FormArrayState>(_updateFormArr, (draftState) => {
        (draftState.isValid !).value = upliftChildNodesValidity(_updateFormArr.formArray);
      });
      onFormArrayUpdate.call(
        null,
        { selected_columns: updateFormArrValidValue }
      );
    };
  }

  const validations: ValidationKey[] = showList ? ["required"] : [];
  return (
    <div className={clsx(showList ? null : classes.remove)}>
      {
        (selected_columns.formArray as any).map((f: FormElementState, idx) => (
          <div key={`fgm_${idx}`}
              className={classes.inputWrap}>
            <AppText text={<Fragment>
              fill in columns for
              <span className={classes.inputValue}>
                {getFileName(source_files.getValue(), idx)}
              </span>
            </Fragment>}
              capitalize="first"
              themeColor={theme.palette.black}
              />
            <AppFormGroup
                inputKey={idx.toString()}
                inputState={f}
                formGroupChange={handleFormListUpdate(selected_columns, idx)}
                inputProps={{
                  "aria-describedby": "meta title"
                }}
                customValidations={validations}
              />
          </div>
        ))
      }
    </div>

  );
}
