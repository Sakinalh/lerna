import makeStyles from "@mui/styles/makeStyles";
import { FormState, StoreState } from "src/model";
import { TemplateZoneApi } from "src/PageGeneration/model";
import * as React from "react";
import { FormEvent as ReactFormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppFormState, formArrayUpdate } from "src/shared/form";
import { AppFormGroup } from "src/components/AppFormGroup/AppFormGroup.component";
import { tryUpdateZoneProposalDetailAction } from "src/PageGeneration/store/rule.epic";
import { GenerationCancelBtn } from "src/PageGeneration/components/shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { AppText } from "src/components/AppText/AppText.component";
import { ProposalImg } from "../../../ProposalImg/ProposalImg.component";
import { makeZoneUpdatePayload, parseValueForm, ZoneProductForm } from "../../shared";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "20px 40px"
  },
  form: {
    paddingBottom: 30,
    backgroundColor: "white"
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
  content: {},
  text: {
    color: theme.palette.grey.light
  },
  img__wrap: {
    marginTop: 10,
    overflow: "hidden",
    width: "100%",
    height: 200
  }
}));

interface QueueZoneTextEditFormProps {
    datum: TemplateZoneApi;
    ids: { rowId: number, pageId: string; zoneId: string; }
    onClose: (e ?: any) => void;
}

export function QueueZoneImgEditForm({ datum, ids, onClose }: QueueZoneTextEditFormProps) {
  const classes = useStyles({});

  const zone = useSelector((state: StoreState) => state.pageQueue.proposals.list.results);

  const dispatch = useDispatch();

  const [form, setForm] = useState<ZoneProductForm>(parseValueForm(datum));
  const formState = useSelector((state: StoreState) => state.pageQueue.formState);

  const [formValidity, setFormValidity] = useState<Partial<FormState>>("idle");
  const closeInstance = useRef(onClose);

  useEffect(() => {
    setForm(parseValueForm(datum, false));
  }, [datum]);

  useEffect(() => {
    const nextValidity = form.isValid.value ? "valid" : "invalid";

    setFormValidity(nextValidity);
  }, [form]);

  useEffect(() => {
    setFormValidity(formState);
    if(formState === "success") {
      closeInstance.current.call(null);
    }
  }, [formState]);

  function onChange(index: number) {
    return (update: AppFormState) => {
      const nextElementState = update["0"];
      setForm(
                formArrayUpdate(form as any, index, nextElementState) as any
      );
    };
  }

  function handleSubmit(ev: ReactFormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const _zone = zone.find(el => el.zone_id === ids.zoneId);

    if(_zone) {
      // rather than update the data from the list
      // try to get the value from the proposal. it assumes IT IS THERE

      dispatch(
        tryUpdateZoneProposalDetailAction(
          makeZoneUpdatePayload(ids, {
            ..._zone,
            zone_value: form.getValue()
          })
        )
      );
    } else {
      console.warn("failed to get the active zone from proposal", ids.zoneId);
    }
  }

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className={classes.content}>

        {/*<AppText text={datum.comment} capitalize="first"/>*/}

        <AppFormGroup
          inputState={form.formArray[0]}
          inputKey={"0"}
          formGroupChange={onChange(0)}
          inputProps={{
            "aria-describedby": "zone value"
          }}
          customValidations={["isUrl"]}
        />
        <div className={classes.img__wrap}>
          <ProposalImg
            src={form.formArray[0].getValue()}
            alt={form.formArray[0].getValue()}/>
        </div>

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
