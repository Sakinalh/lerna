import makeStyles from "@mui/styles/makeStyles";
import { FormState, StoreState, ValidateState } from "src/model";
import { TemplateZoneApi, ZoneDataType } from "src/PageGeneration/model";
import * as React from "react";
import { FormEvent as ReactFormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppFormState,
  FormArrayState,
  formArrayUpdate,
  FormElementState,
  makeReactiveStateForm,
  upliftChildNodesValidity
} from "src/shared/form";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { tryUpdateZoneProposalDetailAction } from "src/PageGeneration/store/rule.epic";
import produce from "immer";
import { GenerationCancelBtn } from "src/PageGeneration/components/shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { AppText } from "src/components/AppText/AppText.component";
import { makeZoneUpdatePayload } from "../../shared";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "20px 40px"
  },
  form: {
    padding: "30px 10px",
    backgroundColor: theme.palette.white
  },
  formActions: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "flex-end"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  content: {
    padding: 10

  },
  comment: {
    paddingTop: 10
  },
  text: {
    color: theme.palette.grey.light
  }
}));

interface QueueZoneProductFormProps {
    datum: TemplateZoneApi;
    ids: { rowId: number, pageId: string; zoneId: string; };
    onClose: (e?: any) => void
}

interface ZoneProductFormSubZoneInterface {
    formGroup: {
        zone_id: FormElementState;
        zone_type: FormElementState;
        data_type: FormElementState;
        comment: FormElementState;
        zone_value: FormArrayState;
        sub_zones: FormArrayState;
        score: FormElementState;
    },
    isPristine: boolean;
    isValid: ValidateState;
    __value: TemplateZoneApi;
    __key: string;
    __validations: [];
    __path: string[];
    getValue: Function;
}

type ZoneProductFormInterface = ZoneProductFormSubZoneInterface[]

function parseForm(datum: TemplateZoneApi, isPristine = true): ZoneProductFormInterface {
  const sub = []; //Array.isArray(datum.sub_zones) ? datum.sub_zones : [];
  return sub.map((s, idx) => makeReactiveStateForm(s, [], isPristine, idx.toString()));
}

function updateFormSubzones(subZones: ZoneProductFormInterface, index, nextZoneValueItem: FormElementState) {
  // the api returns three item, but only the first one is editable hence hard coded 0
  // update the zone value then the form it self

  const nextZoneValue = formArrayUpdate(subZones[index].formGroup.zone_value as any, 0, nextZoneValueItem);

  return produce(subZones, (draftState: ZoneProductFormInterface) => {
    draftState[index].formGroup.zone_value = nextZoneValue;
    //draftState[index].__value.zone_value = nextZoneValue.getValue();
    draftState[index].isValid.value = upliftChildNodesValidity<ZoneProductFormInterface>(draftState[index].formGroup as any);
  });
}

function formGroupProps(type: ZoneDataType): {
    inputProps: {
        "aria-describedby": string;
        type?: "text" | "number" | "textarea" | "password" | "email";
        multiline?: boolean;
        rows?: number,
    }, customValidations?: any[]
} {
  if(type === "image") {
    return {
      customValidations: ["isUrl"],
      inputProps: {
        "aria-describedby": "zone image"
      }
    };
  }

  return {
    inputProps: {
      "aria-describedby": "zone value",
      multiline: true,
      rows: 3,
      type: "textarea"
    }
  };
}

function isZoneFormValid(form: ZoneProductFormInterface) {
  const _isValid = form.reduce(
    (acc, curr) => acc && (curr.isValid !).value,
    true
  );

  return _isValid ? "valid" : "invalid";
}

export function QueueZoneProductForm({ datum, ids, onClose }: QueueZoneProductFormProps) {
  const classes = useStyles({});

  const zone = useSelector((state: StoreState) => state.pageQueue.proposals.list.results);

  const dispatch = useDispatch();

  const [form, setForm] = useState<ZoneProductFormInterface>(() => parseForm(datum));
  const [formValidity, setFormValidity] = useState<Partial<FormState>>("idle");

  const formState = useSelector((state: StoreState) => state.pageQueue.formState);
  const closeInstance = useRef(onClose);

  useEffect(() => {
    setFormValidity(isZoneFormValid(form));
  }, [form]);

  useEffect(() => {
    setFormValidity(formState);

    if(formState === "success") {
      closeInstance.current.call(null);
    }
  }, [formState]);

  useEffect(() => {
    setForm(parseForm(datum, false));
  }, [datum]);

  function onChange(index: number) {
    return (update: AppFormState) => {
      // the api returns three item, but only the first one is editable hence hard coded 0
      const nextElementState = Object.values(update)[0];
      setForm(
        updateFormSubzones(
          form,
          index,
          nextElementState
        )
      );
    };
  }

  function handleSubmit(ev: ReactFormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const _zone = zone.find(el => el.zone_id === ids.zoneId);

    // if (_zone) {
    //   const subs = form.map(f => f.getValue());

    //   // rather than update the data from the list
    //   // try to get the value from the proposal. it assumes IT IS THERE
    //   dispatch(
    //     tryUpdateZoneProposalDetailAction(
    //       makeZoneUpdatePayload(ids, {
    //         ...datum,
    //         sub_zones: subs
    //       })
    //     ));
    // } else {
    //   console.warn("failed to get the active zone from proposal", ids.zoneId, "in", zone);
    // }
  }

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className={classes.content}>
        {
          form.map(
            (f, idx) => <div className={classes.comment} key={`${idx}__sub`}>
              <AppText text={f.getValue().comment} capitalize="first"/>

              <AppFormGroup
                  inputState={f.formGroup.zone_value.formArray[0] as FormElementState}
                  inputKey={idx.toString()}
                  formGroupChange={onChange(idx)}
                  {...formGroupProps(f.getValue().data_type)}
                />
            </div>
          )
        }

      </div>

      <footer className={classes.formActions}>
        <div className={classes.actions}>
          <GenerationCancelBtn onClick={onClose}/>

          <AppSaveBtn formValidity={formValidity}/>

        </div>
      </footer>
    </form>
  );
}
