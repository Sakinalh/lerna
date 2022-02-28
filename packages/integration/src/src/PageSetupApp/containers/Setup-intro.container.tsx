import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography } from "src/deps";
import { Add, HistoryOutlined } from "@mui/icons-material";
import { AppLink } from "src/components/AppLink/AppLink";
import { useDispatch } from "react-redux";
import { SetupTitle } from "../components/SetupTitle/SetupTitle.component";
import { CreateProjectForm, SetupFormState } from "../model";
import { lastValidStep, STEP_ORDER } from "../components/SetupStepper/SetupStepper.component";
import { trySetUserDetailAction } from "../../redux/store/app/app.actions";

export function areFieldsCompleted(
  form: CreateProjectForm,
  state: SetupFormState | "complete"
) {
  if(lastValidStep(form) === STEP_ORDER.length) {
    return true;
  }
  switch (state) {
    case "cred": {
      return lastValidStep(form) >= 1;
    }
    case "limitation": {
      return lastValidStep(form) >= 2;
    }
    case "url": {
      return lastValidStep(form) >= 4;
    }
    case "sem": {
      return lastValidStep(form) >= 5;
    }

    case "complete": {
      return lastValidStep(form) === STEP_ORDER.length;
    }

    default: {
      return false;
    }
  }
}

const useStyles = makeStyles(theme => ({
  card: {
    width: 600,
    height: 270,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fafafa",
    boxShadow: "0 0 10px 0 rgba(218,220,224,0.5)",
    borderRadius: 12
  },
  heading: {
    textAlign: "center"
  },
  headerText: {
    color: theme.palette.grey.dark
  },
  content: {
    position: "relative",
    display: "flex",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  block: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.palette.grey.dark,
    textAlign: "center",
    width: 160
  },
  icon: {
    fontSize: 52,
    color: theme.palette.grey.light
  },

  btn: {
    backgroundColor: "transparent",
    fontSize: 12,
    fontWeight: 500
  },
  btnText: {
    fontWeight: 500,
    fontSize: 12,
    color: theme.palette.grey.dark
  },
  text: {
    color: theme.palette.grey.dark,
    fontSize: 10
  },
  line: {
    borderLeft: "2px solid #E7E7E7",
    height: "100%",
    position: "absolute",
    left: "50%",
    marginLeft: "-3px"
  },
  link_btn: {
    height: 40,
    lineHeight: "40px",
    padding: "0 10px"
  }
}));

interface SetupIntroProps {}

export function SetupIntro(props: SetupIntroProps): JSX.Element {
  const classes = useStyles(props);
  /*  const dispatch = useDispatch();
    /!*  useEffect(() => {
      return () => dispatch(tryHasCompleteSetup());
    }, [dispatch]);*!/ */
  // const app = useSelector((state: StoreState) => state.app);
  // check token validation
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(trySetUserDetailAction());
  }, [dispatch]);

  return (
    <article className={classes.card}>
      <div className={classes.heading}>
        <SetupTitle title="Welcome to Naister"/>
        <Typography className={classes.headerText} variant="body1">
          Please select an option below
        </Typography>
      </div>

      <div className={classes.content}>
        <div className={classes.block}>
          <HistoryOutlined className={classes.icon}/>
          <AppLink
            customclass={classes.btnText}
            path="/project/all/"
            label="Browse projects"
          />
          <Typography className={classes.text} variant="body1">
            Access to ongoing projects
          </Typography>
        </div>
        <div className={classes.line} />
        <div className={classes.block}>
          <Add className={classes.icon}/>
          <AppLink
            customclass={classes.btnText}
            path="/setup-app/form/name/"
            label="Create Project"
          />
          <Typography className={classes.text} variant="body1">
            You can create a new project with differents options
          </Typography>
        </div>
      </div>
    </article>
  );
}
