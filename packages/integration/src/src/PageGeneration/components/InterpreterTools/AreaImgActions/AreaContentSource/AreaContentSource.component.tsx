import React, { FormEvent as ReactFormEvent, MouseEvent as ReactMouseEvent, useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { PaginatedListApi, StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppAutoComplete } from "src/components/AppAutoComplete/AppAutoComplete";
import { BankImageRule, TemplateAreaItemImg, TemplateImageBankApi } from "src/PageGeneration/model";
import {
  resetAreaSourceImgsAction,
  setAreaSourceImgsAction,
  setAreaSourceImgsBankAction,
  trySetAreaImgsAction,
  trySetAreaImgsBankAction
} from "src/PageGeneration/store/areaImage.epic";
import { getProp } from "src/PageGeneration/shared/helper";
import { patchRuleZonesAction } from "src/PageGeneration/store/rule.epic";
import { AppSaveBtn } from "src/components/AppSaveBtn/AppSaveBtn.component";
import { AppText } from "src/components/AppText/AppText.component";
import { getImageRuleZone, saveZoneImagePayload } from "../helper";
import { GenerationCancelBtn } from "../../../shared/GenerationCancelBtn/GenerationCancelBtn.component";
import { TagList } from "../../TagList/TagList.component";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  form: {
    paddingBottom: 30

  },
  formActions: {
    paddingTop: 10,
    display: "flex",
    justifyContent: "flex-end"
  },
  content: {
    width: "50%"
  }
});

interface AreaContentSourceProps {
    selectedZone: TemplateAreaItemImg
    onClose: Function
}

function filterSelection(fullList: TemplateImageBankApi[], selection: number[]) {
  return fullList.filter(l => selection.find(s => s === l.id));
}

export function AreaContentSource({ selectedZone, onClose }: AreaContentSourceProps) {
  const classes = useStyles({});

  const dispatch = useDispatch();
  const { results }: PaginatedListApi<TemplateImageBankApi> = useSelector((state: StoreState) => state.ruleDetail.areaImg.content.source_list);

  const imgRule: BankImageRule = useSelector((state: StoreState) => getImageRuleZone(state.ruleDetail.rule.datum.zones, selectedZone.zone_id));

  const [selectedImgBank, setSelectedImgBank] = useState<number[]>(imgRule.sources);

  useEffect(() => {
    dispatch(trySetAreaImgsBankAction({ setter: setAreaSourceImgsBankAction }));
  }, [dispatch]);

  useEffect(() => {
    if(selectedImgBank.length > 0) {
      dispatch(trySetAreaImgsAction(
        {
          setter: setAreaSourceImgsAction,
          body: {
            ids: selectedImgBank,
            is_sample: false
          }
        }
      ));
    } else {
      dispatch(resetAreaSourceImgsAction());
    }
  }, [selectedImgBank, dispatch]);

  function handleCancel(_ev: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
    setSelectedImgBank(imgRule.sources);
  }

  function handleSubmit(ev: ReactFormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const updatedZone = saveZoneImagePayload(selectedZone, {
      ...imgRule,
      sources: selectedImgBank
    });
    dispatch(patchRuleZonesAction({ id: selectedZone.zone_id, value: updatedZone }));
    onClose();
  }

  function handleSelectChange(selection: number[]) {
    setSelectedImgBank(selection);
  }

  function coerceType(opt: TemplateImageBankApi | string) {
    return opt.hasOwnProperty("id") ? (opt as TemplateImageBankApi).id : opt;
  }

  const formValidity = selectedImgBank.length > 0 ? "valid" : "invalid";

  return (
    <form className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}>
      <div className={classes.content}
      >
        <AppText themeColor="neutralColor" capitalize="first" text={TRANSLATE.imageBank}/>
        <AppAutoComplete<TemplateImageBankApi>
          inputKey="image_bank"
          keyProp="id"
          data={results}
          placeholder="Type an image bank name"
          selectedData={selectedImgBank as any}
          getOptionLabel={option => option.name}
          getOptionSelected={(opt: any, value: any) => value === (coerceType(opt))}
          getSelectedOptionValue={coerceType}
          getCheckboxLabel={opt => opt.name}
          onUpdateSelection={handleSelectChange}
        />
        <TagList sources={filterSelection(results, selectedImgBank)}
          type="default"
          getter={getProp("name")}/>
      </div>

      <footer className={classes.formActions}>

        <GenerationCancelBtn onClick={handleCancel}/>

        <AppSaveBtn formValidity={formValidity}
        />
      </footer>
    </form>
  );
}
