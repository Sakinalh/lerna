import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Modal } from "src/deps";
import { tryDeleteSourceItem, tryGetVarSourceDetailAction } from "src/PageGeneration/store/variableSources.epic";
import { useDispatch } from "react-redux";
import { TemplateSourceApi } from "src/PageGeneration/model";
import { ModalActions } from "src/PageGeneration/components/shared/ModalActions/ModalActions.component";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { GenerationCancelBtn } from "../../../../shared/GenerationCancelBtn/GenerationCancelBtn.component";

const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: "auto"
  },
  btn: {
    minWidth: 50,
    textDecoration: "underline"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

interface SourceListActionProps {
    datum: TemplateSourceApi;
    path: string[];
    overrideStyle?: Object;
}

export function SourceListAction(props: SourceListActionProps) {
  const { datum } = props;
  const classes = useStyles({});
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  function onDelete(_e, id: number) {
    dispatch(tryDeleteSourceItem({ id }));
  }

  function handleClose(_e) {
    setOpen(!open);
  }

  function handlePreview(id: number) {
    dispatch(tryGetVarSourceDetailAction({ id }));
  }

  return (
    <div
      className={classes.root}
    >
      <AppBtn size="small"
        color="secondary"
        classes={{ root: classes.btn }}
        onClick={_e => handlePreview(datum.id)}>

        {TRANSLATE.btn.preview}

      </AppBtn>

      <GenerationCancelBtn
        onClick={ev => onDelete(ev, datum.id)}/>

      <Modal
        open={open}
        aria-labelledby="preview"
        aria-describedby="preview"
        className={classes.modal}
      >
        <div>
          <ModalActions title={TRANSLATE.modal.preview}
            onClose={handleClose}>
            <div>
              {JSON.stringify(datum)}

            </div>
          </ModalActions>
        </div>

      </Modal>
    </div>
  );
}
