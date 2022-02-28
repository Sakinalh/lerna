import makeStyles from "@mui/styles/makeStyles";
import { FormControlLabel, Radio, RadioGroup } from "src/deps";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { stepSem } from "src/shared/translation/en.json";
import { SetupContent } from "../components/SetupContent/SetupContent.component";
import { SetupFormHeading } from "../components/SetupFormHeading/SetupFormHeading.component";
import { NextSetupBtn } from "../components/NextSetupBtn/NextSetupBtn.component";
import { setSetupStep } from "../store/setupApp";
import { SetupAppState, StoreState } from "../../model";
import { areFieldsCompleted } from "./Setup-intro.container";
import { isUploadFormValid } from "./Setup-form-limit.container";
import { UploadFile } from "../components/UploadFile/UploadFile.component";

const useStyles = makeStyles({
  root: {},
  content: {
    top: "4%",
    bottom: "inherit"
  },
  radioGrps: {
    flexDirection: "row",
    paddingBottom: 30
  },
  step: {
    fontSize: 10
  },
  form: {
    width: "100%",
    display: "flex"
  },

  text: {
    fontSize: 10
  }
});

interface SetupFormSemProps {}
export function SetupFormSem(props: SetupFormSemProps): JSX.Element {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const setupState: SetupAppState = useSelector(
    (state: StoreState) => state.setupApp
  );

  const { imgb_loc_file, prod_loc_file } = useSelector(
    (state: StoreState) => (state.setupApp as SetupAppState).fileLocCache
  );

  const [updateFile, setUpdateFile] = React.useState(false);
  const text = stepSem;

  const navigate = useNavigate();
  const isAuth = areFieldsCompleted(setupState.project, "sem");

  useEffect(() => {
    if(isAuth) {
      dispatch(setSetupStep("sem"));
    } else {
      navigate("/setup-app/form/name/");
    }
  }, [dispatch, navigate, isAuth]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateFile((event.target as HTMLInputElement).value === "true");
  };

  const [showResults, setShowResults] = React.useState(false);
  const show = () => setShowResults(true);

  return (
    <SetupContent custom={classes.content}>
      <div className={classes.root}>
        <div className={classes.step}>{text.number}</div>
        <SetupFormHeading text={text.heading}/>

        <form className={classes.form} noValidate autoComplete="off">
          <RadioGroup
            classes={{ root: classes.radioGrps }}
            aria-label="isUpdated"
            name="isUpdated"
            value={updateFile}
            onChange={handleChange}
            onClick={show}
          >
            <FormControlLabel
              value={false}
              control={<Radio size="small"/>}
              classes={{ label: classes.text }}
              label={text.labelYes}
            />
            <FormControlLabel
              value={true}
              control={<Radio size="small"/>}
              classes={{ label: classes.text }}
              label={text.labelNo}
            />
          </RadioGroup>
        </form>
        {/* <UploadSem display={isUpdated} /> */}

        <div>
          {showResults ? <UploadFile display={updateFile} type="sem"/> : null}
        </div>

        <NextSetupBtn
          disabled={
            !isUploadFormValid(updateFile, [imgb_loc_file, prod_loc_file])
          }
          payload={{ loadFile: updateFile }}
          url="/setup-app/form/completed/"
        />
      </div>
    </SetupContent>
  );
}
