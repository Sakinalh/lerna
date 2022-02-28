import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Button, Modal } from "src/deps";
import { useDispatch } from "react-redux";
import * as TRANSLATE from "src/shared/translation/en.json";
import { tryGetVarSourceAction } from "src/PageGeneration/store/variableSources.epic";
import { CHEAT_PAGINATION_PARAMS } from "src/api/routes/api_routes";
import { addVariablesAction } from "src/PageGeneration/store/rule.epic";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { ModalActions } from "../../../shared/ModalActions/ModalActions.component";
import { VariableForm } from "../VariableForm/VariableForm.component";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "10px 15px 0",
    backgroundColor: "white"
  },
  sizeModal: {
    width: 783
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    borderRadius: theme.shape.border.radiusMin
  },
  content: {
    backgroundColor: "white",
    padding: "20px 40px"
  }
}));

interface VariableActionsProps {
    onClose: Function;
}

export function VariableCreate({ onClose }: VariableActionsProps) {
  const classes = useStyles({});
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(tryGetVarSourceAction(CHEAT_PAGINATION_PARAMS));
  }, [dispatch]);

  function handleClose() {
    setOpen(false);
  }

  const form_order = ["name", "type", "value", "selected_columns", "source_files"];

  function handleFormSubmit(payload) {
    dispatch(addVariablesAction(payload));
    onClose();
  }

  return (
    <section className={classes.root}>
      <AppBtn
        type="button"
        color="secondary"
        variant="outlined"
        onClick={handleOpen}
        classes={{ root: classes.btn }}
      >
        {TRANSLATE.shared.createVariable}
      </AppBtn>
      <Modal
        open={open}
        aria-labelledby=" form create variables"
        aria-describedby="add new variables"
        className={classes.modal}
      >
        <div>
          <ModalActions override={classes.sizeModal} title={TRANSLATE.shared.createVariable}
            onClose={handleClose}>
            <section className={classes.content}>
              <VariableForm
                onFormSubmit={handleFormSubmit}
                formOrder={form_order}
              />

            </section>

          </ModalActions>
        </div>

      </Modal>
    </section>
  );
}
