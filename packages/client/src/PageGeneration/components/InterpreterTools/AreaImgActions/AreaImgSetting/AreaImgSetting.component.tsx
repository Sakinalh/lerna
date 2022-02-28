import React, { FormEvent as ReactFormEvent, MouseEvent as ReactMouseEvent, useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { AreaSettingValue, FormState, StoreState } from "src/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { FormFilterRangeState, formStateValidation, makeReactiveStateForm } from "src/shared/form";
import produce from "immer";
import { BankImageRule, TemplateAreaItemImg } from "src/PageGeneration/model";
import { patchRuleZonesAction } from "src/PageGeneration/store/rule.epic";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { AppText } from "src/components/AppText/AppText.component";
import { getImageRuleZone, saveZoneImagePayload } from "../helper";
import { GenerationCancelBtn } from "../../../shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { FormGroupFilterRange } from "../../FormGroupFilterRange/FormGroupFilterRange.component";

const useStyles = makeStyles({
  root: {},
  form: {
    paddingBottom: 30
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

  rootFilter: {
    width: "50%"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50
  },
  ratio: {
    display: "flex",
    width: "23%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  input: {
    width: "50%"
  },
  label: {

    opacity: 0.8
  },
  inputSm: {
    width: "25%"
  }
});

type AreaSettingFormInterface = [
    FormFilterRangeState,
    FormFilterRangeState,
    FormFilterRangeState
]

function parseFilterRange(list: AreaSettingValue[], isPristine = true): AreaSettingFormInterface {
  return list.map((f, idx) => makeReactiveStateForm(f, [], isPristine, idx.toString())) as any;
}

interface AreaImgSettingProps {
    selectedZone: TemplateAreaItemImg
    onClose: Function
}

export function AreaImgSetting({ selectedZone, onClose }: AreaImgSettingProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const imgRule: BankImageRule = useSelector((state: StoreState) => getImageRuleZone(state.ruleDetail.rule.datum.zones, selectedZone.zone_id));

  const [formList, setFormList] = useState<AreaSettingFormInterface>(() => parseFilterRange(imgRule.design));

  const [formValidity, setFormValidity] = useState<Partial<FormState>>("idle");

  useEffect(() => {
    setFormList(parseFilterRange(imgRule.design));
  }, [imgRule.design]);

  useEffect(() => {
    setFormValidity(formStateValidation(formList));
  }, [formList, dispatch]);

  function handleCancel(ev: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault();

    setFormList(parseFilterRange(imgRule.design));
  }

  function handleSubmit(ev: ReactFormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const payload = formList.map(f => f.getValue());
    const updatedZone = saveZoneImagePayload(selectedZone, {
      ...imgRule,
      design: payload
    });

    dispatch(patchRuleZonesAction({ id: selectedZone.zone_id, value: updatedZone }));
    onClose();
  }

  function handleRangeUpdate(idx) {
    return (updatedFilterItem) => {
      setFormList(
        produce(formList, (draftState) => {
          draftState[idx] = updatedFilterItem;
        })
      );
    };
  }

  const labels = [
    TRANSLATE.modal.textWidth,
    TRANSLATE.modal.textHeight,
    TRANSLATE.modal.textRatio
  ];
  return (
    <section className={classes.root}>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          {
            formList.map((fg: FormFilterRangeState, idx) => (
              <div className={classes.row} key={idx.toString().concat("__Filter")}>
                <AppText text={labels[idx]}
                    capitalize="first"
                    props={{
                      classes: { root: classes.label },
                      variant: "caption"
                    }}

                  />

                <FormGroupFilterRange
                    keys={["min_value", "max_value"]}
                    onValueChange={handleRangeUpdate(idx)}
                    inputState={fg}
                    override={classes.rootFilter}
                  />
              </div>
            ))
          }
        </div>

        <footer className={classes.formActions}>
          <div className={classes.actions}>
            <GenerationCancelBtn onClick={handleCancel}/>

            <AppSaveBtn formValidity={formValidity}/>

          </div>
        </footer>
      </form>
    </section>
  );
}
