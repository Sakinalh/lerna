import React, {
  ChangeEvent as ReactChangeEvent,
  FormEvent as ReactFormEvent,
  useEffect,
  useState
} from "react";
import makeStyles from "@mui/styles/makeStyles";
import { FormState, StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel } from "src/deps";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import {
  FormElementState,
  formStateToPayload,
  formStateValidation,
  makeReactiveStateForm,
  patchAppFormGroup
} from "src/shared/form";
import {
  TemplateAreaItemImg,
  TemplateAreaItemProduct,
  TemplateAreaItemText,
  TextAdvancedRule
} from "src/PageGeneration/model";
import { safeGet } from "src/shared/utils";
import { patchRuleZonesAction } from "src/PageGeneration/store/rule.epic";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { AppSelect } from "src/components/AppSelect/AppSelect.component";
import { saveZoneTextPayload } from "../helper";
import { patchRootFormState } from "../../../../../shared/form";
import { GenerationCancelBtn } from "../../../shared/GenerationCancelBtn/GenerationCancelBtn.component";

const useStyles = makeStyles(theme => ({
  form: {},
  content: {
    display: "grid",
    gridTemplateColumns: "60% 40%",
    boxShadow: theme.shape.objectShadow.boxShadowLight,
    padding: "20px 0 20px 20px",
    backgroundColor: "white",
    border: theme.shape.border.solidGrey,
    borderRadius: theme.shape.border.radiusMin
  },
  formMain: {},
  formGrp: {
    border: "none"
  },
  formLabel: {},
  formActions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "flex-end"
  },
  textTitle: {
    paddingTop: 10
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  formAside: {},
  inputLabel: {
    opacity: 0.8
  },
  actionGroup: {
    padding: "inherit",
    border: "none"
  }
}));

function getAdvancedTextRule(
  list: Array<
    TemplateAreaItemText | TemplateAreaItemImg | TemplateAreaItemProduct
  >,
  zoneId
): TextAdvancedRule {
  const fallbackTextAdvancedRule: TextAdvancedRule = {
    is_advanced: true,
    use_existing_titles: true,
    text_max_length: 140,
    text_template: "",
    default_value: "",
    text_length: 0,
    text_lists: [],
    format: "title"
  };
  const getSelection = list.find(z => z.zone_id === zoneId);
  if(getSelection === undefined) {
    return fallbackTextAdvancedRule;
  }

  const _rule = safeGet(getSelection as TemplateAreaItemText, "rule");
  if(_rule == null) {
    return fallbackTextAdvancedRule;
  }

  return _rule;
}

interface TextSetterAdvFormInterface {
  text_template: FormElementState;
  default_value: FormElementState;
  is_advanced: FormElementState;
  use_existing_titles: FormElementState;
  text_max_length: FormElementState;
  text_length: FormElementState;
  text_lists: FormElementState;
  format: FormElementState;
}

function parseForm(
  datum: TextAdvancedRule,
  isPristine = true
): TextSetterAdvFormInterface {
  const {
    text_template,
    default_value,
    text_max_length,
    use_existing_titles,
    format
  } = datum;
  return {
    text_template: makeReactiveStateForm(
      text_template,
      [],
      isPristine,
      "text_template"
    ),
    default_value: makeReactiveStateForm(
      default_value,
      ["required"],
      isPristine,
      "default_value"
    ),
    text_max_length: makeReactiveStateForm(
      text_max_length,
      [],
      isPristine,
      "text_max_length"
    ),
    use_existing_titles: makeReactiveStateForm(
      use_existing_titles,
      [],
      isPristine,
      "use_existing_titles"
    ),
    is_advanced: makeReactiveStateForm(true, [], isPristine, "is_advanced"),
    text_length: makeReactiveStateForm(0, [], isPristine, "text_length"),
    text_lists: makeReactiveStateForm([], [], isPristine, "text_lists"),
    format: makeReactiveStateForm(format, [], isPristine, "format")
  };
}

interface AreaTextSetterAdvancedProps {
  selectedZone: TemplateAreaItemText;
  onClose: Function;
}

export function AreaTextSetterAdvanced({
  selectedZone,
  onClose
}: AreaTextSetterAdvancedProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const textAdvancedRule = useSelector((state: StoreState) =>
    getAdvancedTextRule(state.ruleDetail.rule.datum.zones, selectedZone.zone_id));

  const [areaForm, setAreaForm] = useState<TextSetterAdvFormInterface>(
    parseForm(textAdvancedRule)
  );
  const [formValidity, setFormValidity] = useState<Partial<FormState>>("idle");

  useEffect(() => {
    setFormValidity(formStateValidation(areaForm));
  }, [areaForm]);

  function handleCancel(ev: ReactChangeEvent<EventTarget>) {
    ev.preventDefault();
    setAreaForm(parseForm(textAdvancedRule));
  }

  function handleSubmit(ev: ReactFormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const updatedZone = saveZoneTextPayload(
      selectedZone,
      formStateToPayload<TextAdvancedRule, TextSetterAdvFormInterface>(areaForm)
    );

    dispatch(
      patchRuleZonesAction({ id: selectedZone.zone_id, value: updatedZone })
    );

    onClose();
  }

  function handleFormGroupChange(
    formState: TextSetterAdvFormInterface,
    key: string
  ) {
    return (payload: Partial<TextSetterAdvFormInterface>) => {
      setAreaForm(
        patchRootFormState<TextSetterAdvFormInterface, FormElementState>(
          formState,
          key,
          payload[key]
        )
      );
    };
  }

  function handleCheckboxChange(
    type: string,
    formState: TextSetterAdvFormInterface
  ) {
    return (ev: ReactChangeEvent<HTMLInputElement>) => {
      setAreaForm(
        patchAppFormGroup<TextSetterAdvFormInterface>(
          type,
          ev.target.checked,
          formState,
          []
        )
      );
    };
  }
  function onChangeFormat(value, type: string, formState: TextSetterAdvFormInterface) {
    return (
      setAreaForm(
        patchAppFormGroup<TextSetterAdvFormInterface>(
          type,
          value,
          formState,
          []
        )
      )
    );
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
          <AppFormGroup
            inputKey="text_template"
            inputState={areaForm.text_template}
            formGroupChange={handleFormGroupChange(areaForm, "text_template")}
            inputProps={{
              multiline: true,
              rows: 3,
              type: "textarea",
              "aria-describedby": "template value"
            }}
            overrideClass={{
              label: classes.inputLabel
            }}
            label="Text template"
          />
          <AppFormGroup
            inputKey="default_value"
            inputState={areaForm.default_value}
            formGroupChange={handleFormGroupChange(areaForm, "default_value")}
            inputProps={{
              multiline: true,
              rows: 3,
              type: "textarea",
              "aria-describedby": "default value"
            }}
            overrideClass={{
              label: classes.inputLabel
            }}
            label="Default value"
          />

          <AppFormGroup
            inputKey="text_max_length"
            inputState={areaForm.text_max_length}
            formGroupChange={handleFormGroupChange(areaForm, "text_max_length")}
            inputProps={{
              "aria-describedby": "text length",
              type: "number"
            }}
            overrideClass={{
              root: classes.actionGroup,
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
                onChangeFormat={val => onChangeFormat(val, "format", areaForm)}
            />
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
