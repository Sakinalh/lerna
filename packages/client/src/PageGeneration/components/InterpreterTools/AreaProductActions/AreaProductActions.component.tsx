import { ChangeEvent as ReactChangeEvent, Fragment, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TabPanel } from "src/components/TabPanel/TabPanel.component";
import { TabsActions } from "src/components/TabsActions/TabsActions.component";
import { BaseActionsModalProps, TemplateAreaItemProduct } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { InterpreterInterface, StoreState } from "src/model";
import { useSelector } from "react-redux";
import { AreaProductMeta } from "./AreaProductMeta/AreaProductMeta.component";
import { AreaProductCatalog } from "./AreaProductCatalog/AreaProductCatalog.component";
import { ModalActions } from "../../shared/ModalActions/ModalActions.component";

const useStyles = makeStyles({
  panel: {
    padding: "10px 25px",
    backgroundColor: "white"
  }
});

interface AreaProductActionsProps extends BaseActionsModalProps {}

export function AreaProductActions(props: AreaProductActionsProps) {
  const { onClose, index } = props;
  const classes = useStyles(props);
  const [value, setValue] = useState(index);
  const { selectedZone }: InterpreterInterface = useSelector((state: StoreState) => state.ruleDetail.interpreter);

  const LIST = [
    {
      value: "0",
      viewValue: "content"
    },
    {
      value: "1",
      viewValue: "metas"
    }
  ];

  function handleChange(_event: ReactChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  }

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
            <AreaProductCatalog
              isActiveTab={value === "0"}
              selectedZone={selectedZone as TemplateAreaItemProduct} onClose={onClose}/>
          </TabPanel>
          <TabPanel value={value} index="1">

            <AreaProductMeta
              selectedZone={selectedZone as TemplateAreaItemProduct}
              onClose={onClose}/>

          </TabPanel>
        </div>
      </Fragment>
    </ModalActions>
  );
}
