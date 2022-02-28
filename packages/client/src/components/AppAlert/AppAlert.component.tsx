import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import clsx from "clsx";
import { Close } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { AppBtn } from "../AppBtn/AppBtn.component";
import { useStyles } from "./AppAlert.style";
export interface AppAlertProps {

  title?: HTMLElement | string,
  txt?: HTMLElement | string,
  action?: any
  openModal: boolean,
  closeModal: () => void
}

export const AppAlert : React.FC<AppAlertProps> = (props) => {
  const classes = useStyles();

  const {
    openModal = false,
    title = "Title",
    txt = "txt",
    action = null,
    closeModal

  } = props;

  return (
    <Dialog
      classes={{
        paper: "dialog--paper dialog--noOverflow"
      }}
      className={clsx(classes.root, "appAlert")}
      open={openModal}
      onClose={() => { }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >

      {title &&
        <DialogTitle
          classes={{
            root: "dialogTitle--root dialogTitle--icon"
          }}
          className="appAlert__title"
          id="alert-dialog-title"
        >

          <Grid className="appAlert__header" container>

            <Grid item className="appAlert__titleWrapper">
              {title}
            </Grid>
            <Grid item className="appAlert__closeWrapper">
              <Close className="appAlert__close"
                data-cy="modalAlertProductClose"
                onClick={closeModal}
              />
            </Grid>
          </Grid>
        </DialogTitle>
      }
      <DialogContent
        classes={{
          root: "dialogContent--root"
        }}
        className="appAlert__body"
      >
        {txt &&
          <DialogContentText
            component={"div"}
            classes={{
              root: `dialogContentTxt--root ${typeof (txt) === "string" && "dialogContentTxt--paddingBottom"}`
            }}
            className="appAlert__txt"
            id="alert-dialog-description"
          >
            {txt}
          </DialogContentText>
        }
      </DialogContent>
      {action &&
        <DialogActions className="appAlert__action">
          {action}
        </DialogActions>
      }
    </Dialog>
  );
};
