import React, { ChangeEvent as _ChangeEvent, FormEvent as _FormEvent, useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { FormProps, TemplateSourceApi, VariableFormInterface, VariableItemType } from "src/PageGeneration/model";
import { FormState, StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import * as TRANSLATE from "src/shared/translation/en.json";
import { FormElementState, formStateValidation, patchRootFormState } from "src/shared/form";
import { AppFormGroupSelect } from "src/components/AppFormGroupSelect/AppFormGroupSelect.component";
import { VariableFormValue } from "src/PageGeneration/components/InterpreterTools/VariablesActions/VariableFormValue/VariableFormValue.component";
import { patchVariableFormAction, setVariableFormAction } from "src/PageGeneration/store/rule.epic";
import { INIT_VAR_FORM } from "src/PageGeneration/store/app.ruleDetail.reducer";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { GenerationCancelBtn } from "src/PageGeneration/components/shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { AppText } from "src/components/AppText/AppText.component";
import { VariableList } from "../VariableList/VariableList.component";

const useStyles = makeStyles(theme => ({
  formWrap: {
    display: "flex",
    flexDirection: "column"
  },
  form: {},
  container: {
    maxHeight: 556,
    overflow: "auto",
    display: "grid",
    gridTemplateColumns: "60% 40%",
    border: theme.shape.border.solidGrey,
    backgroundColor: "white",
    borderRadius: 6
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: 30
  },
  formContent: {
    width: "100%"
  },
  formActions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column"
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  variable: {
    paddingRight: 30,
    padding: "30px 30px 10px 0"
  },
  borderVariable: {
    border: theme.shape.border.dashedGrey,
    marginTop: 5,
    height: "80%"
  }
}));

function listToStr(sel: string[]) {
  return sel.filter(el => Boolean(el)).toString();
}

export function formatVarFormPayload<T, U>(
  formState: U & any
): T {
  try {
    return {
      name: formState.name.getValue(),
      type: formState.type.getValue(),
      value: formState.value.getValue(),
      selected_columns: listToStr(formState.selected_columns.getValue()),
      source_files: formState.source_files.getValue()
    } as any;
  } catch (e) {
    // eslint-disable-next-line
    console.warn(e, "parsing ", formState);
    return {
      name: "",
      type: "text",
      value: "",
      selected_columns: "",
      source_files: []
    } as any;
  }
}

const VAR_TYPE_LIST_BASE: { value: VariableItemType; viewValue: string }[] = [
  {
    value: "text",
    viewValue: "text"
  },
  {
    value: "text list",
    viewValue: "tex list "
  }

];
const VAR_TYPE_LIST_EXT: { value: VariableItemType; viewValue: string }[] = [
  ...VAR_TYPE_LIST_BASE,
  {
    value: "excel text list",
    viewValue: "excel "
  }
];

function labelGetter(d: { value: VariableItemType; viewValue: string }) {
  return d.viewValue;
}

function valueGetter(d: { value: VariableItemType; viewValue: string }) {
  return d.value;
}

export function VariableForm(props: FormProps) {
  const classes = useStyles(props);
  const { onFormSubmit } = props;

  const form = useSelector((state: StoreState) => state.ruleDetail.rule.form);
  const fileList: TemplateSourceApi[] = useSelector(
    (state: StoreState) => state.ruleDetail.variableData.sources.rawResults
  );

  const list = fileList.length === 0 ? VAR_TYPE_LIST_BASE : VAR_TYPE_LIST_EXT;
  const [formValidity, setFormValidity] = useState<Partial<FormState>>("idle");

  const dispatch = useDispatch();
  useEffect(() => {
    setFormValidity(formStateValidation(form));
  }, [form]);

  function handleSubmit(ev: _FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    onFormSubmit(formatVarFormPayload(form));
  }

  function handleCancel(ev: _ChangeEvent<EventTarget>) {
    ev.preventDefault();
    dispatch(setVariableFormAction(INIT_VAR_FORM));
  }

  function handleFormGroupChange(formState: VariableFormInterface, key) {
    return (payload: VariableFormInterface) => {
      dispatch(setVariableFormAction(
        patchRootFormState<VariableFormInterface, FormElementState>(
          formState,
          key,
          payload[key]
        )
      ));
    };
  }

  function patchForm(payload: [Partial<VariableFormInterface>]) {
    const [[key, value]] = Object.entries(payload);

    dispatch(patchVariableFormAction({ key, value }));
  }

  return (
    <div className={classes.formWrap}>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={classes.container}>
          <div className={classes.content}>
            <main className={classes.formContent}>
              <AppFormGroup
                inputKey="name"
                inputState={form.name}
                formGroupChange={handleFormGroupChange(form, "name")}
                inputProps={{
                  "aria-describedby": "meta title"
                }}
                label="variable name"
                placeholder="Type a product catalog name"
                customValidations={["required"]}
              />

              <AppFormGroupSelect
                list={list}
                inputKey="type"
                inputState={form.type}
                formGroupChange={patchForm}
                labelGetter={labelGetter}
                valueGetter={valueGetter}
                label="Variable type"
              />
              <VariableFormValue/>

            </main>
          </div>
          <div className={classes.variable}>
            <AppText text={TRANSLATE.modal.available}
              themeColor="neutralColor"/>
            <div className={classes.borderVariable}>
              <VariableList/>
            </div>
          </div>
        </div>
        <footer className={classes.formActions}>
          <div className={classes.actions}>

            <GenerationCancelBtn onClick={handleCancel}/>

            <AppSaveBtn formValidity={formValidity}/>

          </div>
        </footer>
      </form>
    </div>
  );
}
