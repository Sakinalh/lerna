import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { useEffect } from "react";
import { Typography } from "src/deps";
import { AppLink } from "src/components/AppLink/AppLink";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { stepDone } from "src/shared/translation/en.json";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { SetupTitle } from "../components/SetupTitle/SetupTitle.component";
import { SetupAppState, StoreState } from "../../model";
import { areFieldsCompleted } from "./Setup-intro.container";
import { CreateProjectForm } from "../model";
import { tryCreateSetup } from "../store/setupApp";

const useStyles = makeStyles(theme => ({
  card: {
    width: 400,
    height: 300,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fafafa",
    boxShadow: "0 0 10px 0 rgba(218,220,224,0.5)",
    borderRadius: 12
  },
  text: {
    fontSize: 10,
    color: theme.palette.grey.dark
  },
  content: {
    width: "80%",
    margin: "0 auto",
    textAlign: "center",
    color: theme.palette.blue.main
  },
  link: {
    color: theme.palette.blue.main
  },
  success: {
    backgroundColor: theme.palette.green.main,
    pointerEvents: "none"
  },
  loading: {
    backgroundColor: theme.palette.grey.dark
  },
  error: {
    backgroundColor: theme.palette.red.main
  },
  idle: {
    background: theme.palette.blue.main,
    color: theme.palette.white
  }
}));

interface SetupDoneProps {}

export function SetupDone(props: SetupDoneProps): JSX.Element {
  const classes = useStyles(props);
  const setupState: SetupAppState = useSelector(
    (state: StoreState) => state.setupApp
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = areFieldsCompleted(setupState.project, "complete");
  const setupFsm = setupState.setupFsm;
  const text = stepDone;
  useEffect(() => {
    if(isAuth) {
      console.log("is authenticated");
    } else {
      navigate("/setup-app/form/name/");
    }
  }, [dispatch, navigate, isAuth]);

  useEffect(() => {
    if(setupFsm === "success") {
      navigate("/setup-app/processing");
    }
  }, [navigate, setupFsm, dispatch]);

  function createProject(e, payload: CreateProjectForm = setupState.project) {
    if(setupFsm === "idle") {
      dispatch(tryCreateSetup(payload));
    }
  }

  return (
    <article className={classes.card}>
      <SetupTitle title={text.title}/>

      <div className={classes.content}>
        <Typography className={classes.text} variant="body1">
          {text.desc}
          <AppLink
            customclass={classes.link}
            path="/setup-app/form/sem/"
            label={text.label}
          />
        </Typography>

      </div>
      <AppBtn
        classes={{
          root: clsx(classes[setupFsm])
        }}
        variant="contained"
        onClick={e => createProject(e)}
      >
        {text.btn}
      </AppBtn>
    </article>
  );
}

//
