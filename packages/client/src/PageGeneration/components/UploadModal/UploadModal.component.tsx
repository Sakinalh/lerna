import React from "react";
import { Dialog, Grid, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import { UploadLayout, Preview, Input, Submit } from "./UploadLayout.component";
import { AppText } from "../../../../src/components/AppText/AppText.component";
import { UploadModalContainer } from "./UploadModal.container";
import { useStyles } from "./UploadModal.style";
import { AppBtn } from "../../../../src/components/AppBtn/AppBtn.component";

export interface UploadModalProps {
  title: string;
}

export function UploadModal(props: UploadModalProps) {
  const classes = useStyles({});

  const getUploadParams = () => ({ url: "https://httpbin.org/post" });

  const handleSubmit = (files, allFiles) => {
    // eslint-disable-next-line
    console.log(files.map((f) => f.meta));
    allFiles.forEach(f => f.remove());
  };

  const getFilesFromEvent = (event:any) => new Promise<File[]>((resolve) => {
    getDroppedOrSelectedFiles(event).then((chosenFiles) => {
      resolve(chosenFiles.map(f => f.fileObject));
    });
  });

  return (
    <Dialog
      open={true}
      fullScreen={true}
      classes={{
        paperFullScreen: classes.uploadModal
      }}
    >
      <UploadModalContainer
        header={
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item className="container__header--title">
              <Typography component="h2" className="container__header--title" variant="h1">
                Upload Image
              </Typography>
            </Grid>
            <Grid item className="container__header--close">
              <Close />
            </Grid>
          </Grid>
        }
        footer={
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid className="container__footer--first" item></Grid>
            <Grid className="container__footer--last" item>
              <AppBtn typeBtn="secondary" >Close</AppBtn>
            </Grid>
          </Grid>
        }
      >
        <Dropzone
          SubmitButtonComponent={Submit}
          getUploadParams={getUploadParams}
          InputComponent={Input}
          LayoutComponent={UploadLayout}
          PreviewComponent={Preview}
          onSubmit={handleSubmit}
          getFilesFromEvent={getFilesFromEvent}
          classNames={{ inputLabelWithFiles: classes.dropZoneArea }}
          inputContent="Drop Files (Custom Layout)"
        />
      </UploadModalContainer>
    </Dialog>
  );
}
