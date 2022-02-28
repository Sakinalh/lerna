import React, { ChangeEvent as ReactChangeEvent, FormEvent as ReactFormEvent, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { FormElementState, makeReactiveStateForm, patchRootFormState, UtmGroupFormInterface } from "src/shared/form";
import produce from "immer";
import { patchRuleUtmAction } from "src/PageGeneration/store/rule.epic";
import { TemplateRuleNormalizedApi, UtmVar } from "src/PageGeneration/model";
import { GenerationCancelBtn } from "src/PageGeneration/components/shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { AppText } from "src/components/AppText/AppText.component";
import { UtmValueForm } from "../UtmValueForm/UtmValueForm.component";
import { UtmItemForm } from "../UtmItemForm/UtmItemForm.component";

const useStyles = makeStyles(theme => ({
  formWrap: {
    padding: "0px 5%",
    backgroundColor: theme.palette.white
  },
  form: {
    padding: "10px 0"
  },
  formGroup: {
    padding: "15px 0"
  },
  formContent: {
    marginTop: "5px",
    border: theme.shape.border.solidGrey,
    borderRadius: theme.shape.border.radiusMin
  },
  formActions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "flex-end"
  },
  title: {
    fontSize: "1.39em",
    paddingBottom: 3
  },
  item: {
    display: "grid",
    gridTemplateColumns: "40% 60%",
    alignItems: "center",
    padding: "10px 30px",
    marginTop: "5px",
    border: "1px solid #E6E8ED",
    borderRadius: theme.shape.border.radiusMin
  },
  text: {
    width: "70%",
    fontSize: "1.2em"
  }
}));

interface UtmFormValue {
    utm: UtmVar[];
    url_pattern: string;
}

export interface UtmFormInterface {
    utm: UtmGroupFormInterface[];
    url_pattern: FormElementState;
}

export function parseUtmForm(datum: UtmFormValue | TemplateRuleNormalizedApi, isPristine): UtmFormInterface {
  return {
    utm: datum.utm.map(f => makeReactiveStateForm(f, [], isPristine, "utm")),
    url_pattern: makeReactiveStateForm(datum.url_pattern, ["isUrl"], isPristine, "url_pattern")
  };
}

export interface UtmActionFormProps {
    onClose: Function;
}

export function UtmActionForm({ onClose }: UtmActionFormProps) {
  const classes = useStyles({});

  const {
    url_pattern,
    utm
  }: TemplateRuleNormalizedApi = useSelector((state: StoreState) => state.ruleDetail.rule.datum);

  const [form, setForm] = useState<UtmFormInterface>(() =>
    parseUtmForm({
      url_pattern,
      utm
    }, true));

  const dispatch = useDispatch();

  function handleCancel(ev: ReactChangeEvent<EventTarget>) {
    ev.preventDefault();
    setForm(parseUtmForm({
      url_pattern,
      utm
    }, true));

    onClose();
  }

  function handleSubmit(ev: ReactFormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const payload = {
      utm: form.utm.map(f => f.getValue()),
      url_pattern: form.url_pattern.getValue()
    };

    dispatch(patchRuleUtmAction(payload));

    onClose();
  }

  function handleUrlFormChange(formState: UtmFormInterface, prop: string) {
    return (payload: Partial<UtmFormInterface>) => {
      setForm(
        patchRootFormState(formState, prop, payload[prop])
      );
    };
  }

  function handleAddUtm(f: UtmGroupFormInterface) {
    setForm(
      produce(form, (draftState) => {
        draftState.utm.push(f);
      })
    );
  }

  function handleItemUpdate(idx: number) {
    // eslint-disable-next-line
    return function (value: UtmGroupFormInterface) {
      setForm(
        produce(form, (draftState) => {
          draftState.utm[idx] = value;
        })
      );
    };
  }

  const formValidity = (form.url_pattern.isValid !).value ? "valid" : "invalid";

  return (
    <div className={classes.formWrap}>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={classes.formGroup}>
          <AppText capitalize="first"
            text={TRANSLATE.modal.titleUtm}
            props={{ classes: { root: classes.title } }}/>
          <AppText text={TRANSLATE.modal.someText}
            props={{ variant: "caption" }}/>
          <div className={classes.formContent}>
            {
              form.utm.map((f, idx) => <UtmValueForm
                  key={`utm_key_${idx}`}
                  datum={f}
                  onUpdate={handleItemUpdate(idx)}
                />)
            }
            <UtmItemForm
              onAddUtm={handleAddUtm}/>
          </div>
        </div>
        <div className={classes.formGroup}>
          <AppText capitalize="first"
            text={TRANSLATE.modal.titleUrl}
            props={{ classes: { root: classes.title } }}/>
          <AppText text={TRANSLATE.modal.someText}
            props={{ variant: "caption" }}/>
          <div className={classes.item}
            key={"form_url_pattern"}>
            <AppText capitalize="first"
              text=" Url pattern"
              props={{ classes: { root: classes.text } }}/>
            <AppFormGroup
              inputKey="url_pattern"
              inputState={form.url_pattern}
              formGroupChange={handleUrlFormChange(form, "url_pattern")}
              inputProps={{
                "aria-describedby": "url_pattern"
              }}
            />
          </div>
        </div>

        <footer className={classes.formActions}>
          <GenerationCancelBtn onClick={handleCancel}/>
          <AppSaveBtn formValidity={formValidity}/>
        </footer>
      </form>
    </div>
  );
}
