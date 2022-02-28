import { List, ListItem, ListItemIcon, ListItemText } from "src/deps";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Close } from "@mui/icons-material";
import { Typography } from "@mui/material";
import upload from "src/assets/img/upload.svg";
import { DataMachineState } from "src/model/store";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 10
  },
  button: { display: "block", paddingBottom: 15 },
  drop_zone: {
    maxHeight: "350px",
    width: "95%",
    margin: "0 auto",
    textAlign: "center",
    border: "1px dashed",
    borderColor: theme.palette.grey.dark,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  list_item: {
    color: theme.palette.blue.main
  },
  img: {
    marginBottom: 16,
    width: "60%"
  }
}));

interface DropInputAltProps {
  fileLoad: Function;
  height?: number;
  isSuccess: [DataMachineState, DataMachineState];
}

export function DropInputAlt(props: DropInputAltProps): JSX.Element {
  const { fileLoad, isSuccess } = props;
  const classes = useStyles(props);
  const [files, setFiles] = useState<
    {
      name: string;
      file: any;
    }[]
  >([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
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
  // const _refFileLoad = useRef(fileLoad);

  const clearFileCb = useCallback(() => fileLoad([]), [fileLoad]);
  const remove = (_ev) => {
    setFiles([]);
    clearFileCb();
  };
  const [head, tail] = isSuccess;
  useEffect(() => {
    // on success upload, clean
    if(head === "success" || tail === "success") {
      //   _refFileLoad.current([]);
      clearFileCb();
      setFiles([]);
    }
  }, [head, tail, setFiles, clearFileCb]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <section className={classes.root}>
      <div
        className={classes.drop_zone}
        style={{ height: 132, width: 310 }}
        {...getRootProps()}
      >
        <AppBtn size="small" color="secondary" customclass={classes.button}>
          <img
            className={classes.img}
            src={upload}
            alt="upload file from desk"
          />
        </AppBtn>
        <input {...getInputProps()} accept=".csv" />
        <Typography style={{ fontSize: 8 }} variant="body1">
          {isDragActive
            ? "Drop the files here ..."
            : "Drag 'n' drop some files here, or click to browse"}
        </Typography>
      </div>

      <List aria-label="selected files">
        {files.map((f, idx) => (
          <ListItem dense button key={`file_upload_${idx}`} onClick={remove}>
            <ListItemIcon>
              <Close />
            </ListItemIcon>
            <ListItemText
              primary={f.name}
              classes={{ root: classes.list_item }}
            />
          </ListItem>
        ))}
      </List>
    </section>
  );
}
