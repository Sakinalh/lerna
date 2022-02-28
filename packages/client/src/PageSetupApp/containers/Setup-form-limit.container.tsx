import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { FormControlLabel, Radio, RadioGroup } from "src/deps";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { stepLim } from "src/shared/translation/en.json";
import { SetupContent } from "../components/SetupContent/SetupContent.component";
import { SetupFormHeading } from "../components/SetupFormHeading/SetupFormHeading.component";
import { NextSetupBtn } from "../components/NextSetupBtn/NextSetupBtn.component";
import { setSetupStep } from "../store/setupApp";
import { SetupAppState, StoreState } from "../../model";
import { areFieldsCompleted } from "./Setup-intro.container";
import { UploadFile } from "../components/UploadFile/UploadFile.component";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "80%",
    position: "relative"
  },
  content: {
    bottom: "inherit",
    top: "8%"
  },
  step: {
    fontSize: 10
  },
  radioGrps: {
    flexDirection: "row",
    paddingBottom: 30
  },
  form: {
    width: "100%",
    display: "flex"
  },
  block: {
    position: "absolute"
  },
  label: {
    fontSize: 9
  },
  text: {
    fontSize: 10
  }
}));

export function isUploadFormValid(
  limit: boolean,
  caches: [string, string]
): boolean {
  const [head, tail] = caches;
  if(!limit) {
    return true;
  }
  return !!head && !!tail;
}

interface SetupFormLimitProps {}

export function SetupFormLimit(props: SetupFormLimitProps): JSX.Element {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const setupState: SetupAppState = useSelector(
    (state: StoreState) => state.setupApp
  );
  const text = stepLim;

  const { kwd_loc_file, adt_loc_file } = useSelector(
    (state: StoreState) => (state.setupApp as SetupAppState).fileLocCache
  );
  const [limit, setLimit] = React.useState(false);

  const navigate = useNavigate();

  const isAuth = areFieldsCompleted(setupState.project, "limitation");
  useEffect(() => {
    if(isAuth) {
      dispatch(setSetupStep("limitation"));
    } else {
      navigate("/setup-app/form/name/");
    }
  }, [dispatch, navigate, isAuth]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit((event.target as HTMLInputElement).value === "true");
  };

  return (
    <SetupContent custom={classes.content}>
      <div className={classes.root}>
        <div className={classes.step}>{text.number}</div>
        <SetupFormHeading text={text.heading}/>

        <form className={classes.form} noValidate autoComplete="off">
          <RadioGroup
            classes={{ root: classes.radioGrps }}
            aria-label="limit"
            name="limit"
            value={limit}
            onChange={handleChange}
          >
            <FormControlLabel
              value={true}
              control={<Radio size="small"/>}
              classes={{ label: classes.text }}
              label={text.labelYes}
            />
            <FormControlLabel
              value={false}
              control={<Radio size="small"/>}
              classes={{ label: classes.text }}
              label={text.labelNo}
            />
          </RadioGroup>
        </form>
        {/* <UploadLimit display={limit} /> */}
        <UploadFile display={limit} type="limitation"/>

        <NextSetupBtn
          disabled={!isUploadFormValid(limit, [kwd_loc_file, adt_loc_file])}
          payload={{ loadFile: limit }}
          url="/setup-app/form/url/"
        />
      </div>
    </SetupContent>
  );
}
