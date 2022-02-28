import * as React from "react";
import { Fragment, useState } from "react";
import { TabPanel } from "src/components/TabPanel/TabPanel.component";
import { TabsActions } from "src/components/TabsActions/TabsActions.component";
import { BaseActionsModalProps } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { VariablesActionList } from "./VariablesActionsList/VariablesActionsList.component";
import { ModalActions } from "../../shared/ModalActions/ModalActions.component";
import { VariablesSourceActions } from "./VariablesSourceActions/VariablesSourceActions.component";

interface VariableActionsProps extends BaseActionsModalProps {

}

export function VariableActions(props: VariableActionsProps) {
  const { onClose, index = "0" } = props;
  const [focus, setFocus] = useState(index);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setFocus(newValue);
  };

  const LIST = [
    {
      value: "0",
      viewValue: "variables"
    },
    {
      value: "1",
      viewValue: "sources"
    }
  ];

  return (
    <ModalActions title={TRANSLATE.modal.variableSettings} onClose={onClose}>
      <Fragment>
        <TabsActions
          defaultValue="variables"
          values={LIST}
          onValueChange={handleChange}
          value={focus}

        />
        <TabPanel value={focus} index="0">
          <VariablesActionList isFocused={focus === "0"}
            onClose={onClose}/>
        </TabPanel>

        <TabPanel value={focus} index="1">
          <VariablesSourceActions isFocused={focus === "1"}/>
        </TabPanel>

      </Fragment>

    </ModalActions>
  );
}
