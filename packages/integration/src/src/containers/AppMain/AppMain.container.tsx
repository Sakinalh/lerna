import { Alert, LinearProgress, Snackbar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Outlet } from "react-router-dom";
import { AppSideNav } from "src/components/AppSideNav/AppSideNav.components";
import { useDispatch, useSelector } from "react-redux";
import { PROCESS_STATUS, StoreState } from "src/model";
import { useEffect, useState } from "react";
import { clearAppErrorStateAction, clearAppSuccessMessageAction, processStatusAction } from "src/redux/store/app";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    fontSize: 12
  },
  main: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    maxHeight: "100vh",
    scrollbarWidth: "thin",
    overflowY: "auto",
    position: "relative",

    " & .linearProgress--absoulte": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 999
    },

    "&--Noverflow": {
      overflowY: "hidden"
    }
  }
});

interface AppMainProps {}

export default function AppMain(_props: AppMainProps): JSX.Element {
  const classes = useStyles({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAppErrorStateAction());
    dispatch(clearAppSuccessMessageAction());
  }, []);

  const app_process_status = useSelector((state: StoreState) => state.app.processStatus);

  const success = useSelector((state: StoreState) => state.app.success);

  const error = useSelector((state: StoreState) => state.app.error);

  const [processStatus, setProcessStatus]= useState(app_process_status);
  const [successMessage, setSuccessMessage]= useState<string | null>(null);

  const onCloseSnackbar = () => {
    setSuccessMessage(null);
    dispatch(clearAppSuccessMessageAction());
    dispatch(clearAppErrorStateAction());
  };

  useEffect(() => {
    setProcessStatus(app_process_status);
  }, [app_process_status]);

  useEffect(() => {
    // when we get commun response success & error response re-write these conditions
    const timeout = setTimeout(() => {
      if(processStatus === "DONE") {
        setSuccessMessage(success && success.Success ? success.Success : success != null ? JSON.stringify(success) : success);
      }
      if(processStatus === "FAIL") {
        setSuccessMessage(error && error.msg ? error.msg : error != null ? JSON.stringify(error) : error);
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [processStatus]);

  return (
    <div className={classes.root}>
      <AppSideNav />
      <main className={classes.main} id="container_top">
        <Snackbar
          data-cy="snackBarGlobal"
          open={!!successMessage}
          onClose={() => onCloseSnackbar()}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
        >
          <Alert severity={processStatus === "DONE" ? "success" : "error"}>{successMessage}</Alert>
        </Snackbar>

        {/* {PROCESS_STATUS.PROCESSING == processStatus ?  <LinearProgress
          classes={{ root: "linearProgress--absoulte" }}
          color={"secondary"}
        /> : null } */}
        <Outlet />

      </main>
    </div>
  );
}
