import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { SetupFile, StoreState } from "src/model";
import { setSourceFileAction } from "src/PageGeneration/store/variableSources.epic";
import { VariableDropzone } from "../VariableDropzone/VariableDropzone.component";

const useStyles = makeStyles({
  form: {
    paddingBottom: 20
  }

});

interface SourceUploadFileProps {
}

export function SourceUploadFile(props: SourceUploadFileProps): JSX.Element {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const dataState = useSelector(
    (state: StoreState) => (state.ruleDetail.dataState)
  );

  function handleFormUpload(payload: [SetupFile] | []) {
    if(payload.length === 1) {
      dispatch(setSourceFileAction(payload[0]));
    }
  }

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <VariableDropzone
        fileLoad={handleFormUpload}
        isSuccess={dataState}
      />
    </form>
  );
}
