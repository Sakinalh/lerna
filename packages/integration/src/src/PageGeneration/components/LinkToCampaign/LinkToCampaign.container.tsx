import {
  Dialog,
  Grid
} from "@mui/material";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import React from "react";
import { AppStepper } from "src/components";
import { useStyles } from "./LinkToCampaign.style";

export interface LinkToCampaignProps {
  open: boolean;
  onSetpayload: any;
  onCloseLinkToCampaign: any;
  payload: any;
  keywordsToBePublished: any;
  ruleId: any;
}

export function LinkToCampaign(props: LinkToCampaignProps) {
  const { open, onSetpayload, onCloseLinkToCampaign, payload, keywordsToBePublished, ruleId } = props;
  const { handleSubmit, formState, control } = useForm({ mode: "onChange" });
  const onSumbit = (data) => {
    onSetpayload(data);
  };

  const [activeStep, setActiveStep] = React.useState(1);
  const classes = useStyles();

  const getClassCurrentModal = (step) => {
    switch (step) {
      case 1: return "loaderLinkModal";
      case 2: return "campaignModal";
      case 3: return "linkToAdwordsModal";
    }
  };

  return (
    <Dialog
      open={open}
      fullScreen={false}
      classes={{
        paper: `${classes.dialog} dialog--paper`
      }}
    >
      <div
        className={clsx(classes.root, getClassCurrentModal(activeStep), "container")}
      >

        <AppStepper _setActiveStep={step => setActiveStep(step)} open={open} ruleId={ruleId} keywordsToBePublished={keywordsToBePublished} payload={payload} onCloseLinkToCampaign={onCloseLinkToCampaign} activeStep={activeStep} />

      </div>
    </Dialog>
  );
}
