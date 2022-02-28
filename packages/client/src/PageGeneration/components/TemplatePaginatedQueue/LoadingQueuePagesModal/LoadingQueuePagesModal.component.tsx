import { CircularProgress, Modal } from "src/deps";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector } from "react-redux";
import { StoreState } from "src/model";
import { AppText } from "src/components/AppText/AppText.component";

const useStyles = makeStyles({
  root: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  dialog: {
    fontSize: ".8em",
    width: 300,
    backgroundColor: "white",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    borderRadius: 6
  },
  txt: {
    width: "50%",
    margin: "0 auto"
  },
  icon_wrap: {
    textAlign: "center"
  }
});

interface ErrorGenerationModalProps {}

export function LoadingQueuePagesModal(_props: ErrorGenerationModalProps) {
  const classes = useStyles({});
  const loadState = useSelector((state: StoreState) => state.pageQueue.loadPages);

  return (
    <Modal open={loadState === "loading"}
    >
      <div className={classes.root}>
        <div className={classes.dialog}>
          <AppText text={` Fetching the data.
                        Please wait, it may take some times`}
          props={{ classes: { root: classes.txt } }}
          />
          <div className={classes.icon_wrap}>
            <CircularProgress color="secondary"/>
          </div>
        </div>
      </div>

    </Modal>
  );
}
