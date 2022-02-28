import React, {
  ChangeEvent as ReactChangeEvent,
  FormEvent as ReactFormEvent,
  useEffect,
  useState
} from "react";
import makeStyles from "@mui/styles/makeStyles";
import { FormState, SourceText, StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel } from "src/deps";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import {
  FormArrayState,
  FormElementState,
  formStateToPayload,
  formStateValidation,
  makeReactiveStateForm,
  patchAppFormGroup,
  patchRootFormState,
  updateFormStateSelection
} from "src/shared/form";
import {
  TemplateAreaItemImg,
  TemplateAreaItemProduct,
  TemplateAreaItemText,
  TemplateVariableApi,
  TemplateVariables,
  TextDefaultRule
} from "src/PageGeneration/model";
import { isObject, safeGet } from "src/shared/utils";
import { patchRuleZonesAction } from "src/PageGeneration/store/rule.epic";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { AppText } from "src/components/AppText/AppText.component";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { AppSelect } from "src/components/AppSelect/AppSelect.component";
import { GenerationCancelBtn } from "../../../shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { saveZoneTextPayload } from "../helper";
import { fallbackTextDefaultRule } from "../../../../shared/helper";
import { AreaLabelInput } from "../AreaLabelInput/AreaLabelInput.component";
import { FormGroupAutoComplete } from "../../FormGroupAutoComplete/FormGroupAutoComplete.component";

const useStyles = makeStyles(theme => ({
  form: {
    color: theme.palette.grey.middle1
  },
  content: {
    display: "grid",
    gridTemplateColumns: "60% 40%",
    paddingTop: 20,
    backgroundColor: "white",
    boxShadow: theme.shape.objectShadow.boxShadowLight,
    padding: "20px 0 20px 20px",
    border: theme.shape.border.solidGrey,
    borderRadius: theme.shape.border.radiusMin
  },
  formMain: {},
  formGrp: {
    border: "none",
    padding: "10px 0"
  },
  formLabel: {},
  formActions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "flex-end"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  textTitle: {
    paddingTop: 10
  },
  formAside: {},
  autoComplete: {
    border: theme.shape.border.solidGrey,
    marginTop: 5
  },
  inputLabel: {}
}));

interface TextSetterFormInterface {
  text_lists: FormArrayState;
  use_existing_titles: FormElementState;
  text_length: FormElementState;
  is_advanced: FormElementState;
  default_value: FormElementState;
  text_template: FormElementState;
  text_max_length: FormElementState;
  format: FormElementState;
}

function filterTextList(vars: TemplateVariables) {
  if(isObject(vars)) {
    return [];
  }
  return vars
    .filter(v => v.type === "text list")
    .reduce((acc: string[], curr: TemplateVariableApi) => [...acc, ...[curr.name]], []);
}

function getDefaultTextRule(
  list: Array<
    TemplateAreaItemText | TemplateAreaItemImg | TemplateAreaItemProduct
  >,
  zoneId
): TextDefaultRule {
  const getSelection = list.find(z => z.zone_id === zoneId);
  if(getSelection === undefined) {
    return fallbackTextDefaultRule;
  }
  const _rule = safeGet(getSelection as TemplateAreaItemText, "rule");
  if(_rule == null) {
    return fallbackTextDefaultRule;
  }
  return _rule;
}

function parseForm(datum: TextDefaultRule, isPristine = true) {
  const { text_lists, text_length, use_existing_titles } = datum;
  return {
    text_template: makeReactiveStateForm("", [], isPristine, "text_template"),
    text_max_length: makeReactiveStateForm(
      0,
      [],
      isPristine,
      "text_max_length"
    ),
    default_value: makeReactiveStateForm("", [], isPristine, "default_value"),
    text_lists: makeReactiveStateForm(text_lists, [], isPristine, "text_lists"),
    text_length: makeReactiveStateForm(
      text_length,
      [],
      isPristine,
      "text_length"
    ),
    use_existing_titles: makeReactiveStateForm(
      use_existing_titles,
      [],
      isPristine,
      "use_existing_titles"
    ),
    is_advanced: makeReactiveStateForm(false, [], isPristine, "is_advanced"),
    format: makeReactiveStateForm("title", [], isPristine, "format")
  };
}

interface AreaTextSetterProps {
  selectedZone: TemplateAreaItemText;
  onClose: Function;
}

export function AreaTextSetter({ selectedZone, onClose }: AreaTextSetterProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const textDefaultRule = useSelector((state: StoreState) =>
    getDefaultTextRule(state.ruleDetail.rule.datum.zones, selectedZone.zone_id));

  const [areaForm, setAreaForm] = useState<TextSetterFormInterface>(
    parseForm(textDefaultRule)
  );

  const varList = useSelector((state: StoreState) =>
    filterTextList(state.ruleDetail.rule.datum.variables));
  const [formValidity, setFormValidity] = useState<Partial<FormState>>("idle");

  useEffect(() => {
    setFormValidity(formStateValidation(areaForm));
  }, [areaForm]);

  function handleCancel(ev: ReactChangeEvent<EventTarget>) {
    ev.preventDefault();
    setAreaForm(parseForm(textDefaultRule));
  }

  function handleSubmit(ev: ReactFormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const updatedZone = saveZoneTextPayload(
      selectedZone,
      formStateToPayload<TextDefaultRule, TextSetterFormInterface>(areaForm)
    );
    dispatch(
      patchRuleZonesAction({ id: selectedZone.zone_id, value: updatedZone })
    );
    onClose();
  }

  function handleSelectChange<T>(type: string, formState, predicate) {
    // eslint-disable-next-line
    return function (value: T) {
      setAreaForm(
        patchRootFormState<TextSetterFormInterface, FormArrayState>(
          formState,
          type,
          updateFormStateSelection<T>(value, formState[type], predicate)
        )
      );
    };
  }
  function onChangeFormat(value, type: string, formState: TextSetterFormInterface) {
    return (
      setAreaForm(
        patchAppFormGroup<TextSetterFormInterface>(
          type,
          value,
          formState,
          []
        )
      )
    );
  }
  function handleFormGroupChange(
    formState: TextSetterFormInterface,
    key: string
  ) {
    return (payload: Partial<TextSetterFormInterface>) => {
      setAreaForm(
        patchRootFormState<TextSetterFormInterface, FormElementState>(
          formState,
          key,
          payload[key]
        )
      );
    };
  }

  function handleCheckboxChange(
    type: string,
    formState: TextSetterFormInterface
  ) {
    return (ev: ReactChangeEvent<HTMLInputElement>) => {
      setAreaForm(
        patchAppFormGroup<TextSetterFormInterface>(
          type,
          ev.target.checked,
          formState,
          []
        )
      );
    };
  }
  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className={classes.content}>
        <div className={classes.formMain}>
          <fieldset className={classes.formGrp}>
            <AreaLabelInput
              label="Text sources"
              selectLen={areaForm.text_lists.getValue().length}
            />
            <AppText text="Choose from an existing list to save in one of these variables" />
            <FormGroupAutoComplete<string>
              inputKey="text_lists"
              keyProp=""
              placeholder="Type a word"
              state={areaForm.text_lists}
              data={varList}
              getOptionLabel={option => option}
              getOptionSelected={(opt, value) => value === opt}
              getCheckboxLabel={opt => opt}
              getDataPredicate={(opt, value) => opt === value}
              onUpdate={handleSelectChange<SourceText>(
                "text_lists",
                areaForm,
                (opt, value) => value === opt
              )}
              overrideClass={{
                root: classes.autoComplete
              }}
            />
          </fieldset>

          <AppFormGroup
            inputKey="text_length"
            inputState={areaForm.text_length}
            formGroupChange={handleFormGroupChange(areaForm, "text_length")}
            inputProps={{
              "aria-describedby": "text length",
              type: "number"
            }}
            overrideClass={{
              label: classes.inputLabel
            }}
            label="Text length"
          />
          <p className={classes.textTitle}>{TRANSLATE.exploreTitle}</p>
          <div style={{display: "flex", flexDirection: "row"}}>
            <FormControlLabel
            control={
              <AppCheckbox
                whiteBg
                checked={areaForm.use_existing_titles.getValue()}
                onChange={handleCheckboxChange("use_existing_titles", areaForm)}
                name="use_existing_titles"
              />
            }
            label={TRANSLATE.searchTitle}
          />
            <AppSelect
           value={areaForm.format.getValue()}
           onChangeFormat={val => onChangeFormat(val, "format", areaForm)}/>

          </div>
        </div>
      </div>
      <footer className={classes.formActions}>
        <div className={classes.actions}>
          <GenerationCancelBtn onClick={handleCancel} />
          <AppSaveBtn formValidity={formValidity} />
        </div>
      </footer>
    </form>
  );
}
