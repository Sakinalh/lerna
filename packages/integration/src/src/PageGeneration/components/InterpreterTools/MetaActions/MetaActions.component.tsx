import { ChangeEvent as ReactChangeEvent, Fragment } from "react";
import { TabsActions } from "src/components/TabsActions/TabsActions.component";
import { BaseActionsModalProps } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import makeStyles from "@mui/styles/makeStyles";
import { ModalActions } from "../../shared/ModalActions/ModalActions.component";
import { MetaForm } from "./MetaForm/MetaForm.component";

const useStyles = makeStyles(theme => ({
  sizeModal: {
    height: 658,
    backgroundColor: theme.palette.grey.light
  }
}));

interface MetaActionsProps extends BaseActionsModalProps {
}

export function MetaActions(props: MetaActionsProps) {
  const { onClose, index } = props;
  const classes = useStyles(props);

  function handleChange(_event: ReactChangeEvent<{}>, _newValue: string) {
  }

  const LIST = [
    {
      value: "0",
      viewValue: "meta"
    }
  ];

  return (
    <ModalActions override={classes.sizeModal} title={TRANSLATE.modal.metasSettings} onClose={onClose}>
      <Fragment>
        <TabsActions
          defaultValue={index}
          values={LIST}
          onValueChange={handleChange}
          value={index}
        />
        <MetaForm/>
      </Fragment>

    </ModalActions>
  );
}
