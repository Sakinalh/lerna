import React, { ChangeEvent as ReactChangeEvent, FormEvent as ReactFormEvent, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { FormElementState, formStateToPayload, makeReactiveStateForm } from "src/shared/form";
import { TemplateMeta } from "src/PageGeneration/model";
import { patchRuleMetaAction } from "src/PageGeneration/store/rule.epic";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { patchRootFormState } from "../../../../../shared/form";
import { GenerationCancelBtn } from "../../../shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { AppText } from "../../../../../components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  formWrap: {
    padding: "30px 40px",
    backgroundColor: "white"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: 465,
    padding: "10px 95px",
    border: theme.shape.border.solidGrey,
    borderRadius: theme.shape.border.radiusMin
  },
  formActions: {
    padding: "20px 0",
    display: "flex",
    justifyContent: "flex-end"
  },
  item: {
    display: "grid",
    gridTemplateColumns: "40% 60%",
    alignItems: "center",
    borderRadius: 5,
    padding: "10px 0"
  },
  text: {
    fontSize: "1.17em"
  },
  inputLabel: {
    display: "none"
  }
}));

interface MetaFormInterface {
    title: FormElementState;
    description: FormElementState;
    kwds: FormElementState;
}

function parseForm(datum: TemplateMeta, isPristine): MetaFormInterface {
  return {
    title: makeReactiveStateForm(datum.title, ["required"], isPristine, "title"),
    description: makeReactiveStateForm(datum.description, [], isPristine, "description"),
    kwds: makeReactiveStateForm(datum.kwds, [], isPristine, "kwds")

  };
}

export function MetaForm(_props: {}) {
  const classes = useStyles({});
  const {
    title,
    description,
    kwds
  }: TemplateMeta = useSelector((state: StoreState) => state.ruleDetail.rule.datum.meta);

  const [form, setForm] = useState<MetaFormInterface>(() =>
    parseForm({
      title,
      description,
      kwds
    }, true));

  const dispatch = useDispatch();

  function handleCancel(ev: ReactChangeEvent<EventTarget>) {
    ev.preventDefault();
    setForm(parseForm({
      title,
      description,
      kwds
    }, false));
  }

  function handleSubmit(ev: ReactFormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const payload = formStateToPayload<TemplateMeta, MetaFormInterface>(form);

    dispatch(patchRuleMetaAction(payload));
  }

  function handleFormGroupChange(formState: MetaFormInterface, prop: string) {
    return (payload: Partial<MetaFormInterface>) => {
      setForm(
        patchRootFormState(formState, prop, payload[prop])
      );
    };
  }

  const formValidity = (form.title.isValid !).value ? "valid" : "invalid";

  const MAP_LABEL = {
    title: {
      label: "meta title",
      inputProps: {}
    },
    description: {
      label: "meta description",
      inputProps: {
        multiline: true,
        rows: 3,
        type: "textarea"
      }
    },
    kwds: {
      label: "meta keywords",
      inputProps: {}
    }

  };
  const formOrder = ["title", "description", "kwds"];

  return (
    <div className={classes.formWrap}>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {formOrder.map((input_key, idx) =>
          (
            <div className={classes.item}
              key={`action_form_${input_key}_${idx}`}
            >

              <AppText capitalize="first"
                text={MAP_LABEL[input_key].label}
                props={{ classes: { root: classes.text } }}/>
              <AppFormGroup
                inputKey={input_key}
                inputState={form[input_key]}
                formGroupChange={handleFormGroupChange(form, input_key)}
                inputProps={
                  {
                    "aria-describedby": `${input_key}_control`,
                    ...MAP_LABEL[input_key].inputProps
                  }
                }
              />

            </div>
          ))}

        <footer className={classes.formActions}>

          <GenerationCancelBtn onClick={handleCancel}/>
          <AppSaveBtn formValidity={formValidity}/>

        </footer>
      </form>
    </div>
  );
}
