import { Button, Modal } from "src/deps";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { AppText } from "../../../../components/AppText/AppText.component";
import { clearRuleDetailAsyncMsgAction } from "../../../store/rule.epic";

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
  }
}));

interface ErrorGenerationModalProps {}

export function ErrorGenerationModal(_props: ErrorGenerationModalProps) {
  const classes = useStyles({});
  const asyncMsg = useSelector((state: StoreState) => state.ruleDetail.asyncMsgState);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearRuleDetailAsyncMsgAction());
  };
  return (<div>
    <Modal open={asyncMsg.length > 0}
    >
      <div className={classes.root}>
        <div className={classes.dialog}>
          <AppText text={asyncMsg}/>
          <AppBtn
            classes={{
              label: classes.btnDialog
            }}
            onClick={handleClose}>
            close
          </AppBtn>
        </div>

      </div>

    </Modal>
  </div>);
}
