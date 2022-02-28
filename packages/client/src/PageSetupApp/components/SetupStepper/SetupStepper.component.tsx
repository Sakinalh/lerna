import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { SetupAppState, StoreState } from "src/model";
import { useNavigate } from "react-router";
import { stepper } from "src/shared/translation/en.json";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { ProjectProp, SetupFormState } from "../../model";
import { Typography } from "../../../deps";

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%",
    margin: "0 auto",
    position: "relative"
  },
  stepper: {
    listStyle: "none",
    display: "flex",
    position: "relative",
    flexDirection: "column",
    height: 300,
    justifyContent: "space-between"
  },
  row: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between"
  },
  block: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "75%"
  },
  bar: {
    width: 2,
    height: "120%",
    backgroundColor: theme.palette.grey.light,
    position: "absolute",
    right: 11,
    top: -30,
    zIndex: 1
  },
  step: {
    width: 25,
    height: 25,
    textAlign: "center",
    borderRadius: 25,
    color: theme.palette.white,
    lineHeight: "25px",
    zIndex: 10,
    position: "initial"
  },
  btn: {
    justifyContent: "flex-end"
  },
  btnText: {
    padding: "6px 0"
  },
  links: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    width: "75%"
  },
  title: {
    color: theme.palette.grey.dark,
    fontSize: 12
  },
  subtitle: {
    color: theme.palette.grey.middle1,
    fontSize: 10
  },
  current: {
    backgroundColor: theme.palette.blue.main
  },
  completed: {
    backgroundColor: theme.palette.green.main
  },
  uncompleted: {
    backgroundColor: theme.palette.white,
    color: theme.palette.blue.main
  }
}));

export const MAP_STATE_INDEX: Record<SetupFormState, number> = {
  name: 0,
  cred: 1,
  limitation: 2,
  url: 3,
  sem: 4
};
export const STEP_ORDER: Array<ProjectProp> = [
  "project_name",
  "customer_id",
  "adt_loc_file",
  "kwd_loc_file",
  "website",
  "imgb_loc_file",
  "prod_loc_file"
];

function isInputValid(prop: ProjectProp, val: string | null) {
  if(typeof val !== "string") {
    return false;
  }
  // loc can be "" or "fullPath to file". as long as long it's not null. it's truthy
  return prop.includes("loc_file") ? true : val.length > 0;
}

export function lastValidStep(form, list = STEP_ORDER) {
  let isValid = true;
  let count = 0;
  while(isValid) {
    const key = list[count];
    const value = form[key];

    // loc file could be "" when not selected.
    // should not be null though
    const isInpValid = isInputValid(key, value);
    if(isInpValid) {
      count = count + 1;
    } else {
      isValid = false;
    }
  }
  return count;
}

interface SetupStepperProps {}

export function SetupStepper(_props: SetupStepperProps) {
  const classes = useStyles();
  const { project, currentStep } = useSelector(
    (state: StoreState) => state.setupApp as SetupAppState
  );
  const navigate = useNavigate();
  const statePosition = MAP_STATE_INDEX[currentStep];

  function goTo(path: string): void {
    navigate(path);
  }

  const completedStep = lastValidStep(project);
  const etapes = stepper;
  return (
    <div className={classes.root}>
      <div className={classes.bar}/>
      <ul className={classes.stepper}>
        {etapes.map((etape, index) => (
          <li key={`step_${index}`} className={classes.row}>
            <div className={classes.links}>
              <AppBtn
                  classes={{ root: classes.btn, text: classes.btnText }}
                  disabled={index >= completedStep}
                  onClick={_e => goTo(etape.path)}
                >
                <Typography className={classes.title} variant="body1">
                  {etape.title}
                </Typography>
              </AppBtn>
              <Typography className={classes.subtitle} variant="caption">
                {etape.subtitle}
              </Typography>
            </div>
            <div
                className={clsx(classes.step, {
                  [classes.completed]: index < statePosition,
                  [classes.current]: index === statePosition,
                  [classes.uncompleted]: index > statePosition
                })}
              >
              <span>{index + 1}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
