import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { TextField } from "src/deps";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { stepCred } from "src/shared/translation/en.json";
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
  content: {
    width: "100%"
  },
  step: {
    fontSize: 10
  },
  form: {
    width: "100%",
    marginBottom: 20
  },
  input: { width: "100%" }
}));

interface SetupFormIdProps {}

export function SetupFormCred(props: SetupFormIdProps): JSX.Element {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const setupState: SetupAppState = useSelector(
    (state: StoreState) => state.setupApp
  );

  const navigate = useNavigate();
  const text = stepCred;

  const [formValue, setFormValue] = React.useState(
    setupState.project.customer_id
  );

  const isAuth = areFieldsCompleted(setupState.project, "cred");
  useEffect(() => {
    if(isAuth) {
      dispatch(setSetupStep("cred"));
    } else {
      navigate("/setup-app/form/name/");
    }
  }, [dispatch, navigate, isAuth]);

  return (
    <SetupContent>
      <div className={classes.block}>
        <div className={classes.step}>{text.number}</div>
        <SetupFormHeading text={text.heading}/>

        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            classes={{ root: classes.input }}
            id="setup-credentials"
            label={text.label}
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
          disabled={formValue.length === 0}
          payload={{ customer_id: formValue }}
          url="/setup-app/form/limitation/"
        />
      </div>
    </SetupContent>
  );
}
