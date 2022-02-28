import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Button, List, ListItem, ListItemText } from "src/deps";
import makeStyles from "@mui/styles/makeStyles";
import { useDropzone } from "react-dropzone";
import { ListLoadState } from "src/model";
import upload from "src/assets/img/upload.svg";
import { Close } from "@mui/icons-material";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 10,
    width: "100%"

  },
  button: { display: "block", paddingBottom: 15 },
  drop_zone: {
    maxHeight: "350px",
    width: "100%",
    margin: "0 auto",
    textAlign: "center",
    border: `1px dashed ${theme.palette.grey.middle1}`,
    display: "grid",
    gridTemplateColumns: "60% 40%",
    alignContent: "center"
  },
  list_item: {
    color: theme.palette.blue.main
  },
  img: {
    marginBottom: 16,
    pointerEvents: "none",
    width: "100%"
  }
}));

interface VariableDropzoneProps {
    fileLoad: Function;
    isSuccess: ListLoadState;
}

export function VariableDropzone(props: VariableDropzoneProps): JSX.Element {
  const { fileLoad, isSuccess } = props;
  const classes = useStyles(props);
  const [files, setFiles] = useState<{
        name: string;
        file: any;
    }[]>([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader();
      // eslint-disable-next-line
      reader.onabort = () => console.log("file reading was aborted");
      // eslint-disable-next-line
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        //      console.log(useFileName);

        const payload = [
          {
            name: acceptedFiles[0].name,
            file: acceptedFiles[0]
          }
        ];
        fileLoad(payload);
        setFiles(payload);
      };

      acceptedFiles.forEach((file: Blob) => reader.readAsText(file));
    },
    [fileLoad]
  );

  const clearFileCb = useCallback(() => fileLoad([]), [fileLoad]);
  const remove = (_ev) => {
    setFiles([]);
    clearFileCb();
  };
  useEffect(() => {
    // on success upload, clean
    if(isSuccess === "complete") {
      //   _refFileLoad.current([]);
      clearFileCb();
      setFiles([]);
    }
  }, [isSuccess, setFiles, clearFileCb]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <section className={classes.root}>
      <List aria-label="selected files">
        {files.map((f, idx) => (
          <ListItem dense button key={`file_upload_${idx}`} onClick={remove}>
            <ListItemText
              primary={f.name}
              classes={{ root: classes.list_item }}
            />
            <Close color="secondary"/>

          </ListItem>
        ))}
      </List>
      <div className={classes.drop_zone}
        {...getRootProps()}
      >

        <AppBtn size="small"
          color="secondary"
          onClick={e => e.preventDefault()}
          customclass={classes.button}>

          {isDragActive
            ? "Drop the files here ..."
            : "Drag 'n' drop some files here, or click to browse"}
        </AppBtn>
        <input {...getInputProps()} accept=".csv"/>
        <img
          className={classes.img}
          src={upload}
          alt="upload file from desk"
        />
      </div>

    </section>
  );
}
