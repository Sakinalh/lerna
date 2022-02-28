import { SyntheticEvent as ReactSyntheticEvent, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TemplateZoneApi } from "src/PageGeneration/model";
import { TabsActions } from "src/components/TabsActions/TabsActions.component";
import { TabPanel } from "src/components/TabPanel/TabPanel.component";
import { INIT_TEMPLATE_ZONE } from "src/PageGeneration/store/app.ruleDetail.reducer";
import { ProposalListDetail } from "../../ProposalListDetail/ProposalListDetail.component";
import { QueueZoneImgEditForm } from "./QueueZoneImgEditForm/QueueZoneImgEditForm.component";

const useStyles = makeStyles({
  root: {},
  panel: {
    padding: "10px 25px",
    backgroundColor: "white"
  }

});

interface QueueZoneImgEditProps {
    ids: {
        rowId: number,
        pageId: string;
        zoneId: string;
    };
    onClose: (e ?: any) => void;
    keywordId: number;
}

export function QueueZoneImgEdit({ ids, onClose, keywordId }: QueueZoneImgEditProps) {
  const classes = useStyles({});

  const [selection, setSelection] = useState<TemplateZoneApi>(INIT_TEMPLATE_ZONE);

  const [value, setValue] = useState("0");

  const handleChange = (_event: ReactSyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const LIST = [
    {
      value: "0",
      viewValue: "List"
    },
    {
      value: "1",
      viewValue: "Manual"
    }
  ];

  function onChange(value: TemplateZoneApi) {
    setSelection(value);
  }

  return (
    <div className={classes.root}>
      <TabsActions
        defaultValue="content"
        values={LIST}
        onValueChange={handleChange}
        value={value}
      />
      <div className={classes.panel}>
        <TabPanel value={value} index="0">
          <ProposalListDetail ids={ids}
            keywordId={keywordId}
            handleChange={onChange}/>
        </TabPanel>
        <TabPanel value={value} index="1">
          <QueueZoneImgEditForm
            ids={ids}
            datum={selection}
            onClose={onClose}/>
        </TabPanel>
      </div>
    </div>
  );
}
