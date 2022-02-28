import * as React from "react";
import { Fragment } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TabPanel } from "src/components/TabPanel/TabPanel.component";
import { TabsActions } from "src/components/TabsActions/TabsActions.component";
import { BaseActionsModalProps } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { ModalActions } from "../../shared/ModalActions/ModalActions.component";
import { AreaTextPanel } from "../AreaTextPanel/AreaTextPanel.component";

const useStyles = makeStyles({
  panel: {
    padding: "10px 25px",
    backgroundColor: "white"
  }
});

interface AreaTextActionsProps extends BaseActionsModalProps {
}

export function AreaTextActions(props: AreaTextActionsProps) {
  const { onClose, index } = props;
  const classes = useStyles(props);
  const [value, setValue] = React.useState(index);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const LIST = [
    {
      value: "0",
      viewValue: "content"
    }

  ];

  return (
    <ModalActions title={TRANSLATE.modal.areasSettings} onClose={onClose}>
      <Fragment>
        <TabsActions
          defaultValue="content"
          values={LIST}
          onValueChange={handleChange}
          value={value}
        />
        <div className={classes.panel}>
          <TabPanel value={value} index="0">
            <AreaTextPanel onClose={onClose}/>
          </TabPanel>
        </div>
      </Fragment>
    </ModalActions>
  );
}
