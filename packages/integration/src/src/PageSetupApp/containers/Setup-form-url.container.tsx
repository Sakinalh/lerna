import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { TextField } from "src/deps";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { SetupContent } from "../components/SetupContent/SetupContent.component";
import { SetupFormHeading } from "../components/SetupFormHeading/SetupFormHeading.component";
import { NextSetupBtn } from "../components/NextSetupBtn/NextSetupBtn.component";
import { setSetupStep } from "../store/setupApp";
import { SetupAppState, StoreState } from "../../model";
import { areFieldsCompleted } from "./Setup-intro.container";

const useStyles = makeStyles((theme: Theme) => ({
  block: {
    width: "80%",
    position: "relative",
    top: "50%",
    transform: "translateY(50%)"
  },
  step: {
    fontSize: 10
  },
  content: {
    width: "100%"
  },
  form: {
    width: "100%",
    marginBottom: 30
  },
  input: { width: "100%" }
}));

interface SetupFormUrlProps {}

export function SetupFormUrl(props: SetupFormUrlProps): JSX.Element {
  const classes = useStyles(props);
  const dispatch = useDispatch();

  const setupState: SetupAppState = useSelector(
    (state: StoreState) => state.setupApp
  );

  const [formValue, setFormValue] = React.useState(setupState.project.website);
  // eslint-disable-next-line
    const expresion = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g;
  const url = new RegExp(expresion);
  const navigate = useNavigate();
  const isAuth = areFieldsCompleted(setupState.project, "url");

  useEffect(() => {
    if(isAuth) {
      dispatch(setSetupStep("url"));
    } else {
      navigate("/setup-app/form/name/");
    }
  }, [dispatch, navigate, isAuth]);

  return (
    <SetupContent>
      <div className={classes.block}>
        <div className={classes.step}>Step 4</div>
        <SetupFormHeading text="Write your website’s URL"/>

        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            classes={{ root: classes.input }}
            id="setup-url"
            label="www.mywebsite.com"
            variant="outlined"
            value={formValue}
            size="small"
            color="secondary"
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onChange={event => setFormValue(event.target.value)}
          />
        </form>
        <NextSetupBtn
          disabled={!url.test(formValue)}
          payload={{ website: formValue }}
          url="/setup-app/form/sem/"
        />
      </div>
    </SetupContent>
  );
}
