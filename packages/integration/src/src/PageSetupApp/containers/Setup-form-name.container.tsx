import makeStyles from "@mui/styles/makeStyles";
import { TextField } from "src/deps";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stepName } from "src/shared/translation/en.json";
import { SetupContent } from "../components/SetupContent/SetupContent.component";
import { SetupFormHeading } from "../components/SetupFormHeading/SetupFormHeading.component";
import { NextSetupBtn } from "../components/NextSetupBtn/NextSetupBtn.component";
import { setSetupStep } from "../store/setupApp";
import { SetupAppState, StoreState } from "../../model";

const useStyles = makeStyles({
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
    width: "100%"
    // marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 20,
    fontSize: 12
  }
});

interface SetupFormNameProps {}

export function SetupFormName(props: SetupFormNameProps): JSX.Element {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const text = stepName;

  const setupState: SetupAppState = useSelector(
    (state: StoreState) => state.setupApp
  );

  const [formValue, setFormValue] = React.useState(
    setupState.project.project_name
  );

  useEffect(() => {
    dispatch(setSetupStep("name"));
  }, [dispatch]);

  return (
    <SetupContent>
      <div className={classes.block}>
        <div className={classes.step}>{text.number}</div>
        <SetupFormHeading text={text.heading}/>

        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            classes={{ root: classes.input }}
            id="setup-name"
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
          payload={{ project_name: formValue }}
          url="/setup-app/form/credential/"
        />
      </div>
    </SetupContent>
  );
}
