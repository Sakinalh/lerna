import { Fragment, SyntheticEvent as ReactSyntheticEvent, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TabPanel } from "src/components/TabPanel/TabPanel.component";
import { TabsActions } from "src/components/TabsActions/TabsActions.component";
import { BaseActionsModalProps, TemplateAreaItemImg } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { InterpreterInterface, StoreState } from "src/model";
import { useSelector } from "react-redux";
import { AreaImgSetting } from "./AreaImgSetting/AreaImgSetting.component";
import { ModalActions } from "../../shared/ModalActions/ModalActions.component";
import { AreaImgContent } from "./AreaImgContent/AreaImgContent.component";

const useStyles = makeStyles({
  root: {
    width: 400,
    backgroundColor: "white"
  },
  panel: {
    padding: "10px 25px"
  }
});

interface AreaImgActionsProps extends BaseActionsModalProps {}

export function AreaImgActions(props: AreaImgActionsProps) {
  const { onClose, index } = props;
  const classes = useStyles(props);
  const [value, setValue] = useState(index);

  const { selectedZone }: InterpreterInterface = useSelector((state: StoreState) => state.ruleDetail.interpreter);

  const handleChange = (_event: ReactSyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const LIST = [
    {
      value: "0",
      viewValue: "content"
    },
    {
      value: "1",
      viewValue: "design"
    }
  ];

  return (
    <ModalActions override={classes.root} title={TRANSLATE.modal.areasSettings} onClose={onClose}>
      <Fragment>
        <TabsActions
          defaultValue="content"
          values={LIST}
          onValueChange={handleChange}
          value={value}
        />
        <div className={classes.panel}>
          <TabPanel value={value} index="0">
            <AreaImgContent selectedZone={selectedZone as TemplateAreaItemImg} onClose={onClose}/>
          </TabPanel>
          <TabPanel value={value} index="1">
            <AreaImgSetting selectedZone={selectedZone as TemplateAreaItemImg} onClose={onClose}/>
          </TabPanel>
        </div>
      </Fragment>
    </ModalActions>
  );
}
