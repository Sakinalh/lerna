import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropInputAlt } from "src/PageSetupApp/components/DropZoneAlt/DropZoneAlt.component";
import clsx from "clsx";
import { Typography } from "src/deps";
import { tryPostContent } from "../../store/setupApp";
import { SetupAppState, StoreState } from "../../../model";
import { UploadStateBtn } from "../UploadStateBtn/UploadStateBtn.component";
import { SetupFile } from "../../model";

const useStyles = makeStyles({
  form: {
    width: "100%",
    display: "flex"
  },
  btns: {
    position: "relative",
    display: "flex",
    right: "5%",
    justifyContent: "space-evenly"
  },
  deactivate: {
    opacity: 0,
    pointerEvents: "none",
    height: 0,
    overflow: "hidden" // dropin remplacement for display none
    // to keep inmemory info
  },

  label: {
    fontSize: 9
  },
  text: {
    fontSize: 10
  },
  btnRoot: {},
  error: {
    padding: "7px 0",
    fontSize: 9,
    textAlign: "center",
    opacity: 0
  },
  show: {
    opacity: 1
  }
});
export type DataMachineState = "idle" | "loading" | "success" | "error";

interface UploadFileProps {
    display: boolean;
    type: "limitation" | "sem";
}

export function UploadFile(props: UploadFileProps): JSX.Element {
  const classes = useStyles(props);
  const { display, type } = props;
  const dispatch = useDispatch();
  const [content, setContent] = useState<[SetupFile] | []>([]);
  const firstFile = type === "limitation" ? "kwd_loc_file" : "imgb_loc_file";
  const secondFile = type === "limitation" ? "adt_loc_file" : "prod_loc_file";

  const [hasError, setHasError] = useState(false);
  const fsm = useSelector(
    (state: StoreState) => (state.setupApp as SetupAppState).uploadFSM
  );
  const firstFileFsm = fsm[firstFile];
  const secondFileFsm = fsm[secondFile];

  const [machineState, setMachineState] = useState<Record<any, DataMachineState>>({
    [firstFile]: firstFileFsm,
    [secondFile]: secondFileFsm
  });
  useEffect(() => {
    setMachineState({ [firstFile]: firstFileFsm, [secondFile]: secondFileFsm });
  }, [firstFile, secondFile, firstFileFsm, secondFileFsm]);

  function handleFormUpload(payload: [SetupFile] | []) {
    setHasError(false);
    setContent(payload);
  }

  function onKwdsUpload() {
    if(content.length === 1) {
      const _file: SetupFile = (content as [SetupFile])[0];
      dispatch(
        tryPostContent({
          data: _file as SetupFile,
          type: firstFile
        })
      );
      return;
    }
    setHasError(true);
  }

  function onAdsUpload() {
    if(content.length === 1) {
      const _file: SetupFile = (content as [SetupFile])[0];
      dispatch(
        tryPostContent({
          data: _file,
          type: secondFile
        })
      );

      return;
    }

    setHasError(true);
  }

  // hide to keep form sta while toggling
  return (
    <div className={clsx({ [classes.deactivate]: !display })}>
      <div className={classes.btns}>
        <UploadStateBtn type={firstFile} onAction={onKwdsUpload}/>
        <UploadStateBtn type={secondFile} onAction={onAdsUpload}/>
      </div>
      <Typography
        classes={{ root: clsx(classes.error, { [classes.show]: hasError }) }}
        color="error"
        variant="body1"
      >
        did you forget to load a file?
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <DropInputAlt
          fileLoad={handleFormUpload}
          height={150}
          isSuccess={[machineState[firstFile], machineState[secondFile]]}
        />
      </form>
    </div>
  );
}
