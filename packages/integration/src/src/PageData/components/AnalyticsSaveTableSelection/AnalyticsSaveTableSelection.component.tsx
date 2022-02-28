import makeStyles from "@mui/styles/makeStyles";

import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { FormEvent as ReactFormEvent, MouseEvent as ReactMouseEvent, useState } from "react";
import { BaseFormElementState, makeReactiveStateForm, mergeAppFormGroup } from "src/shared/form";

import { GenerationCancelBtn } from "src/PageGeneration/components/shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";

const useStyles = makeStyles({
  root: {
    fontSize: 12,
    width: 300,
    overflowY: "auto",
    height: 250,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    padding: "0 30px"
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  }

});

export interface QueryNameForm extends BaseFormElementState {

    formGroup: Record<"search_name", BaseFormElementState>
}

interface NameSelectionModalProps {
    onApply: (f: string) => void;
    onToggle: (e: ReactMouseEvent<HTMLButtonElement>, b: boolean) => void;

}

export function NameSelectionModal({ onApply, onToggle }: NameSelectionModalProps) {
  const classes = useStyles({});

  const [modalForm, setModalForm] = useState<QueryNameForm>(makeReactiveStateForm({ search_name: "" }, ["required"], true, "search_name"));

  function onInputChange(f: { search_name: BaseFormElementState }) {
    setModalForm(mergeAppFormGroup({
      search_name: f.search_name.getValue()
    }, modalForm));
  }

  function handleSubmit(ev: ReactFormEvent<HTMLFormElement>) {
    ev.preventDefault();
    onApply(modalForm.getValue().search_name);
  }

  function dismiss(ev: ReactMouseEvent<HTMLButtonElement>) {
    onToggle(ev, false);
  }

  const val = modalForm.formGroup.search_name.isValid?.value ? "valid" : "invalid";
  return (

    <form className={classes.root} onSubmit={handleSubmit}>
      <AppFormGroup
        inputState={modalForm.formGroup.search_name}
        inputKey="search_name"
        formGroupChange={f => onInputChange(f)}
        label="name your query"
        inputProps={{
          "aria-describedby": "name query"
        }}/>

      <div className={classes.actions}>

        <GenerationCancelBtn onClick={dismiss}/>

        <AppSaveBtn formValidity={val}/>
      </div>

    </form>

  );
}
