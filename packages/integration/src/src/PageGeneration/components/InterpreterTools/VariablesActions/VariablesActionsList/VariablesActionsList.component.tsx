import React, { FormEvent, MouseEvent as reactMouseEvent, useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { FormState, StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { initFormatVarList } from "src/PageGeneration/store/generate.epic";
import { FormItemChange } from "src/shared/form";
import { TemplateVariableApi, VariableFormInterface } from "src/PageGeneration/model";
import { setVariablesAction } from "src/PageGeneration/store/rule.epic";
import produce from "immer";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { formatVarFormPayload } from "../VariableForm/VariableForm.component";
import { VariablesActionItem } from "./VariablesActionsItem/VariablesActionsItem.component";
import { VariableCreate } from "../VariableCreate/VariableCreate.component";
import { GenerationCancelBtn } from "../../../shared/GenerationCancelBtn/GenerationCancelBtn.component";

const useStyles = makeStyles(theme => ({
  root: {},
  form: {
    padding: "20px 30px",
    backgroundColor: theme.palette.white
  },
  formActions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "flex-end"
  },
  actions: {
    color: theme.palette.red.main
  },
  btn_delete_label: {
    textDecoration: "underline"
  }
}));

interface VariablesActionListProps {
    isFocused: boolean;
    onClose: Function;
}

export function VariablesActionList({ onClose }: VariablesActionListProps) {
  const classes = useStyles({});

  const varList = useSelector((state: StoreState) => (state.ruleDetail.rule.datum.variables));
  const [list, setList] = useState<VariableFormInterface[]>(initFormatVarList(varList, true));

  const dispatch = useDispatch();

  const [formValidity, setFormValidity] = useState<Partial<FormState>>("idle");

  useEffect(() => {
    setList(initFormatVarList(varList));
  }, [varList]);

  function handleInputChange({ idx, value, isValid }: FormItemChange) {
    const fValid = isValid ? "valid" : "invalid";

    setFormValidity(fValid);

    setList(
      produce<VariableFormInterface[]>(list, (draftState) => {
        draftState[idx] = value as any;
      })
    );
  }

  function handleDelete({ idx }: { idx: number }) {
    setList(
      produce<VariableFormInterface[]>(list, (draftState) => {
        draftState.splice(idx, 1);
      })
    );
  }

  function handleCancel(ev: reactMouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault();

    setList(initFormatVarList(varList));
  }

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const formattedList: TemplateVariableApi[] = list.map(l => formatVarFormPayload(l));

    dispatch(setVariablesAction(formattedList));
  }

  return (
    <div className={classes.root}>
      <VariableCreate onClose={onClose}/>
      {
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >

          {
            list.map((fg, idx) => (
              <VariablesActionItem
                datum={fg}
                idx={idx}
                key={`act_${idx}`}
                onChange={handleInputChange}
                onDelete={handleDelete}
              />
            ))
          }

          <footer className={classes.formActions}>
            <div className={classes.actions}>
              <GenerationCancelBtn onClick={handleCancel}
                customStyle={{ label: classes.btn_delete_label }}
              />
              <AppSaveBtn formValidity={formValidity}/>

            </div>
          </footer>
        </form>
      }
    </div>
  );
}
