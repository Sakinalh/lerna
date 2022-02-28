import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { Button, Grid, Typography, CircularProgress } from "@mui/material";
import clsx from "clsx";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { tryGetCampaignTestByKeywordAction } from "src/PageGeneration/store/actions";
import { AppBtn } from "src/components";
import { createTestStatusAction, linkToAdsStatusAction } from "src/redux/store/app";
import { getCampaignTestByKeyword } from "src/api/react-query/linkProcess.store";
import { useQuery } from "react-query";
import { resetCreateSuccessStatusAction, setCampiagnTestByKeywordAction, tryPostLinkPageToAdwordsAction } from "../../store/actions";
import { useStyles } from "./LoaderLinkModal.style";

export interface LoaderLinkModalProps {
  onClose: any;
  isValid: boolean;
  title: string;
  txt: string;
  payload: any;
  setActiveStep: any;
  onCloseLinkToCampaign: any;
  setSelectedCampaign: any;
}

export function LoaderLinkModal(props: LoaderLinkModalProps) {
  const {
    onClose,
    isValid = true,
    title = "Please wait",
    txt,
    payload,
    setActiveStep,
    onCloseLinkToCampaign,
    setSelectedCampaign
  } = props;

  const [resLink, setResLink] = useState({ status: null, msg: null, action: null, icon: null, text_1: null, text_2: null, text_3: null });
  const [abortAction, setAbortAction] = useState(false);
  const dispatch = useDispatch();

  const linkToAds_status = useSelector((state: StoreState) => state.app.linkToAdsStatus);
  const createTest_status = useSelector((state: StoreState) => state.app.createTestStatus);

  const linkSuccess = useSelector((state: StoreState) => state.pageQueue.linkSuccess);
  const createSuccess = useSelector((state: StoreState) => state.pageQueue.createSuccess || false);

  const classes = useStyles({});

  const { data: selectedCampaign, refetch: refetchCamapignTest} = useQuery(
    ["getCampaignTestByKeywordAction", payload],
    getCampaignTestByKeyword,
    {
      enabled: !!payload
    }
  );

  useEffect(() => {
    if(linkToAds_status !== "DONE") {
      const timeoutID = window.setTimeout(() => {
        refetchCamapignTest();
      }, 1000);
      return () => window.clearTimeout(timeoutID);
    }
  }, []);

  useEffect(() => {
    if(selectedCampaign) {
      if(selectedCampaign.exists === false && !createSuccess && !linkSuccess && createTest_status !== "FAIL" && createTest_status !== "PROCESSING") {
        setActiveStep(2);
      }
      if(linkToAds_status !== "PROCESSING" && linkToAds_status !== "FAIL" &&
        selectedCampaign.exists === true && selectedCampaign.id !== undefined && !createSuccess && !linkSuccess
      ) {
        setSelectedCampaign(selectedCampaign);
        setActiveStep(3);
      }
      if(!createSuccess && (createTest_status === "DONE" || createTest_status === "FAIL")) {
        setResLink({
          status: "Error", msg: "Sorry , We had a problem creating your pages.", action: "create", icon: HighlightOffIcon,
          text_1: "Create test campaign", text_2: "you will give up creating a test campaign",
          text_3: "Keywords will not be linked to Naister pages."
        });
      } else if(!linkSuccess && (linkToAds_status === "DONE" || linkToAds_status === "FAIL")) {
        setResLink({
          status: "Error", msg: "Sorry, We had a problem linking your pages.", action: "link", icon: HighlightOffIcon,
          text_1: "Link To campaign", text_2: "You are going to give up linking your pages", text_3: "Keywords are not activated with Naister pages in the test campaign"
        });
      } else {
        if(createSuccess) {
          setSelectedCampaign(selectedCampaign);
          setActiveStep(3);
          dispatch(resetCreateSuccessStatusAction());
        }
        if(linkSuccess) {
          setResLink({ status: "Success", msg: "your page has been succefully linked.", action: "", icon: CheckCircleOutlineIcon });
        }
      }
    } else {
      setActiveStep(1);
    }
  }, [selectedCampaign, linkSuccess, createSuccess, linkToAds_status, createTest_status]);

  const onRetry = () => {
    setResLink({ status: null, msg: null, action: null, icon: null, text_1: null, text_2: null, text_3: null });
    setSelectedCampaign(selectedCampaign);
    if(resLink.action === "create") {
      setActiveStep(2);
      dispatch(createTestStatusAction(null));
    }
    if(resLink.action === "link") {
      dispatch(linkToAdsStatusAction(null));
      setActiveStep(3);
    }
  };
  const onAbort = () => {
    if(abortAction) {
      onCloseLinkToCampaign();
    } else {
      setAbortAction(true);
    }
  };

  const renderAbortInterface = () => <div>
    <Typography className="loaderLinkModal__title" variant="h1">{resLink.text_1}</Typography>
    <p className=""><strong>{resLink.text_2}</strong></p>
    <p className="">{resLink.text_3}</p>
    <p className="">Are you sure you want to continue ?</p>
  </div>;
  const Icon = resLink && resLink.icon;
  return (<>

    <div className={clsx("loaderLinkModal__body container__body", classes.root, abortAction ? "container__body--abort" : "container__body--error")}>

      {abortAction ? renderAbortInterface() : resLink && resLink.msg ? (
        <> <Icon className={"loaderLinkModal__" + resLink.status} />
          <Typography className="loaderLinkModal__title" variant="h1">{resLink.status}</Typography>
          <Typography className="loaderLinkModal__txt" component="p" variant="subtitle2">{resLink.msg}</Typography>
        </>
      ) :
        <>
          <div className="loaderLinkModal__loaders">

            <CircularProgress
              variant="determinate"
              className={"loaderLinkModal__loaders--bottom loaderLinkModal__loaders--item"}
              size={117}
              thickness={3}
              {...props}
              value={100}
            />
            <CircularProgress
              variant="determinate"
              className={"loaderLinkModal__loaders--top loaderLinkModal__loaders--item"}
              classes={{
                circle: "loaderLinkModal__loaders--circle"
              }}
              size={117}
              thickness={3}
              {...props}
              value={25}
            />
          </div>
          <Typography className="loaderLinkModal__title" variant="h1" >{title}</Typography>
          <Typography className="loaderLinkModal__txt" variant="subtitle2" >{txt}</Typography>
        </>
      }
    </div>

    <footer className={clsx("loaderLinkModal__footer container__footer", resLink && resLink.status === "Success" && "container__footer--white")}>
      <Grid
        className="container__btns"
        container
        justifyContent="flex-end"
        alignItems="center"
      >
        {resLink && resLink.status === "Error" ? <Button onClick={() => onRetry()} color="primary" variant={abortAction ? "text" : "contained"}>Retry</Button> : null}
        {resLink && resLink.status === "Success" ? null : <Button onClick={() => resLink && resLink.status === "Error" ? onAbort() : onCloseLinkToCampaign()} color={abortAction ? "error" : "primary"} variant={abortAction ? "contained" : "text"}>{resLink && resLink.status === "Error" ? "Abort" : "Cancel"}</Button>}
      </Grid>
    </footer>

  </>
  );
}