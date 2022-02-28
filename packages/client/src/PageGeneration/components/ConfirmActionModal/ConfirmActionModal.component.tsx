import { Modal } from "src/deps";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { setModalActionStateAction } from "src/PageGeneration/store/shared.epic";
import { MouseEvent as ReactMouseEvent } from "react";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { DispatchAction, ModalActionState } from "../../../model";
import { AppText } from "../../../components/AppText/AppText.component";
import { GenerationCancelBtn } from "../shared/GenerationCancelBtn/GenerationCancelBtn.component";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  dialog: {
    fontSize: ".8em",
    width: 300,
    backgroundColor: theme.palette.white,
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    borderRadius: 6
  },
  btnDialog: {
    color: theme.palette.blue.main
  },
  actions: {
    display: "flex",
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    width: "80%",
    margin: "0 auto"
  }
}));

interface ConfirmActionModalProps {

}

export function ConfirmActionModal(_props: ConfirmActionModalProps) {
  const classes = useStyles({});
  const modalActionState: { state: ModalActionState, action: null | DispatchAction<any>, msg: string } = useSelector((state: StoreState) => state.pageQueue.deleteActionState);
  const dispatch = useDispatch();

  function dismiss(ev: ReactMouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    dispatch(setModalActionStateAction({ state: "idle", action: null, msg: "" }));
  }

  function process(e: ReactMouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if(modalActionState.action) {
      dispatch(modalActionState.action);
    }
  }

  const labelState: Record<ModalActionState, string> = {
    idle: "confirm",
    start: "confirm",
    processing: "processing",
    error: "operation failed"
  };

  return (<Modal open={modalActionState.state !== "idle"}>
    <div className={classes.root}>
      <div className={classes.dialog}>
        <AppText text={modalActionState.msg} props={{ classes: { root: classes.text } }}/>
        <div className={classes.actions}>
          <GenerationCancelBtn onClick={dismiss}/>
          <AppBtn
            classes={{
              label: classes.btnDialog
            }}
            onClick={process}>
            {labelState[modalActionState.state]}
          </AppBtn>
        </div>
      </div>

    </div>

  </Modal>);
}
