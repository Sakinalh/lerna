import React, { useEffect, useState } from "react";
import { Grid, Step, StepIconProps, StepLabel, Stepper, StepperProps } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { Close } from "@mui/icons-material";
import { CampaignModal, LinkToAdwordsModal, LoaderLinkModal } from "src/PageGeneration/components";
import { useStyles } from "./AppStepper.style";

export interface AppStepperProps {
  payload: any;
  onCloseLinkToCampaign: any;
  _setActiveStep: any;
  keywordsToBePublished: any;
  ruleId: any;
  open: any;
}

export const AppStepper: React.FC<AppStepperProps & StepperProps> = (props) => {
  const { payload, onCloseLinkToCampaign, _setActiveStep, keywordsToBePublished, ruleId, open } = props;
  const stepperStep = ["Search", "Create", "Link"];
  const [activeStep, setActiveStep] = useState(1);
  const [newActive, setNewActive] = useState(false);
  const [txt, setTxt] = useState("We are looking for a test campaign.");
  const [campaign, setCampaign] = useState(null);

  const linkToAds_status = useSelector((state: StoreState) => state.app.linkToAdsStatus);
  const createTest_status = useSelector((state: StoreState) => state.app.createTestStatus);

  const getClassCurrentModal = (step) => {
    switch (step) {
      case 1: return "loaderLinkModal";
      case 2: return "campaignModal";
      case 3: return "linkToAdwordsModal";
    }
  };

  useEffect(() => {
    if(!open || createTest_status === "PROCESSING" || linkToAds_status === "PROCESSING" || linkToAds_status === "DONE" || linkToAds_status === "FAIL") {
      setNewActive(true);
    } else {
      setNewActive(false);
    }
  }, [createTest_status, linkToAds_status, open]);

  function getStepContent(step) {
    _setActiveStep(step);
    switch (step) {
      case 1:
        return <LoaderLinkModal
          isValid={false}
          title="Please wait"
          txt={txt}
          onClose={() => { }}
          payload={payload}
          onCloseLinkToCampaign={onCloseLinkToCampaign}
          setActiveStep={activeStep => setActiveStep(activeStep)}
          setSelectedCampaign={campaign => setCampaign(campaign)}
        />;
      case 2:
        return <CampaignModal
          payload={payload}
          onCloseLinkToCampaign={onCloseLinkToCampaign}
          setActiveStep={activeStep => setActiveStep(activeStep)}
          setTxt={text => setTxt(text)}
        />;
      case 3:
        return <LinkToAdwordsModal
          payload={payload}
          onCloseLinkToCampaign={onCloseLinkToCampaign}
          setTxt={text => setTxt(text)}
          selectedCampaign={campaign}
          keywordsToBePublished={keywordsToBePublished}
          setActiveStep={activeStep => setActiveStep(activeStep)}
          ruleId={ruleId}
          onLinktoAd={() => { }}
        />;
      default:
        return "Unknown step";
    }
  }
  const useQontoStepIconStyles = makeStyles({
    root: {

      "& .stepper": {
        "&--root": {
        },
        "&__label": {
          "&--txt": {
            fontFamily: "Open Sans",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: 10,
            lineHeight: "14px",
            color: "#7B7B7B"
          }
        },
        "&__step": {
          "&--root": {
            width: 100
          }
        }
      },

      display: "flex",
      height: 22,
      alignItems: "center",
      position: "relative",
      zIndex: 1,
      color: "white",

      "& svg": {
        fontSize: 10,
        transform: "scale(2)"
      },

      "&::before": {
        border: "1px solid #B6B6B6",
        boxSizing: "border-box",
        boxShadow: "0px 1px 2px #F1F3F9",
        background: "white",
        zIndex: -1,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        content: "''",
        height: 25,
        width: 25,
        borderRadius: "50%"
      }

    },
    active: {
      color: "#397EF5"
    },
    completed: {
      color: "white",
      zIndex: 1,
      fontSize: 18,

      "&::before": {
        background: "#397EF5",
        border: "1px solid transparent"
      }

    }
  });

  function QontoStepIcon(props: StepIconProps) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed
        })}
      >
        {completed ? <CheckRoundedIcon /> : null}
      </div>
    );
  }

  return (<>
    <header className={clsx(`${getClassCurrentModal(activeStep)}__header, container__header`)}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid justifyContent="space-between" alignItems="center" item className="container__header--stepper container__stepper">
          <div className="container__stepper--wrapper">

            {!newActive ? <Stepper {...props} activeStep={activeStep} classes={{
              root: "stepper--root",
              horizontal: "stepper--horizontal",
              alternativeLabel: "stepper--alternativeLabel"

            }} alternativeLabel >

              {
              stepperStep.map((step, i) => (

                <Step classes={{
                  root: "stepper__step--root",
                  horizontal: "stepper__step--horizontal",
                  alternativeLabel: "stepper__step--alternativeLabel",
                  completed: "stepper__step--completed"

                }

                  } key={i}>
                  <StepLabel classes={{
                    root: "stepper__label--root",
                    horizontal: "stepper__label--horizontal",
                    alternativeLabel: "stepper__label--alternativeLabel",
                    completed: "stepper__label--completed",
                    label: "stepper__label--txt",
                    active: "stepper__label--active",
                    iconContainer: "stepper__label--active",
                    labelContainer: "stepper__label--labelContainer"
                  }} StepIconComponent={QontoStepIcon} >{step}</StepLabel>
                </Step>

              ))

            }

            </Stepper> : null}

          </div>
        </Grid>

        <Grid item className="container__header--close">
          <Close className="closeIcon" onClick={onCloseLinkToCampaign} />
        </Grid>
      </Grid>
    </header>

    {getStepContent(activeStep)}
  </>);
};
