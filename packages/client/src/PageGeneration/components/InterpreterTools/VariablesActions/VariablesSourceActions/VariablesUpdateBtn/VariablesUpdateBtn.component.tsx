import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tryUpdateSourceAction } from "src/PageGeneration/store/variableSources.epic";
import { SetupFile, StoreState } from "src/model";
import { StateActionSubmit } from "src/components/StateActionSubmit/StateActionSubmit.component";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppText } from "src/components/AppText/AppText.component";

interface VariablesUpdateBtnProps {}

export function VariablesUpdateBtn(_props: VariablesUpdateBtnProps) {
  const {
    selected,
    file
  }: { selected: Record<string, boolean>; file: SetupFile } = useSelector((state: StoreState) => state.ruleDetail.variableData.sources);
  const formState = useSelector((state: StoreState) => state.ruleDetail.formState);
  const dispatch = useDispatch();

  function onUpdate(_e) {
    dispatch(tryUpdateSourceAction({ selection: selected, file }));
  }

  const btnValid = file.file ? "" : "disable";
  return (

    <StateActionSubmit
      formState={formState}
      disable={btnValid}
      overrideProps={
        {
          onClick: onUpdate,
          type: "button"
        }
      }
    >
      <AppText text={TRANSLATE.btn.done}/>

    </StateActionSubmit>

  );
}
