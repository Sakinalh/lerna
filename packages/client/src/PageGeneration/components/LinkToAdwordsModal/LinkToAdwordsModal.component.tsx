import { Grid, Tooltip, Typography } from "@mui/material";
import { Slider } from "src/deps";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { setCampiagnTestByKeywordAction, tryGetCampaignTestByKeywordAction, tryPostLinkPageToAdwordsAction } from "src/PageGeneration/store/actions";
import React, { useEffect, useState } from "react";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { keywordPage_QParamsType } from "src/PageGeneration/shared/page_query_params";
import { createTestStatusAction } from "src/redux/store/app";
import withStyles from "@mui/styles/withStyles";
import makeStyles from "@mui/styles/makeStyles";

import { useQuery } from "react-query";
import { linkPage } from "src/api/react-query/keywords.store";
import { getCampaignTestByKeyword } from "src/api/react-query/linkProcess.store";
import { AppBtn } from "../../../components/AppBtn/AppBtn.component";

export interface LinkToAdwordsModalProps {
  onLinktoAd: any;
  selectedCampaign: any;
  onCloseLinkToCampaign: any;
  payload: any;
  setTxt: any;
  setActiveStep: any;
  keywordsToBePublished: any;
  ruleId: any;
}

export function LinkToAdwordsModal(props: LinkToAdwordsModalProps) {
  const { onLinktoAd, selectedCampaign, onCloseLinkToCampaign, payload, setTxt, setActiveStep, keywordsToBePublished, ruleId } = props;
  const { getQueryParams } = useUrlSearchParams();
  const [_currentPaginationPage, _campaignId, _ruleId, _k_limit, _K_offset, _category, _keywordId, _pageId] =
    getQueryParams(keywordPage_QParamsType);

  const dispatch = useDispatch();
  const { handleSubmit, formState, control } = useForm({
    mode: "onChange"
  });

  // const _campaign = useSelector(
  //   (state: StoreState) => state.campaignTest
  // );
  // const campaign = _campaign.campaignTest

  const { data: campaign} = useQuery(
    ["getCampaignTestByKeywordAction", payload],
    getCampaignTestByKeyword,
    {
      enabled: !!payload
    }
  );
  const payloadLinkTo = {
    ...payload,
    rule_id: ruleId,
    keywords_ids: keywordsToBePublished.length === 0 ? [_keywordId] : keywordsToBePublished,
    test_campaign_id: campaign?.id
  };
  const { base_campaign_id, ...data_ } = payloadLinkTo;
  const { data, refetch } =
  useQuery(
    ["linkPage", dispatch, data_],
    linkPage,
    {
      enabled: false
    }
  );

  useEffect(() => {
  }, [campaign]);

  const onLink = async () => {
    await refetch();
    // dispatch(tryPostLinkPageToAdwordsAction(newObj));
    dispatch(createTestStatusAction(null));
    dispatch(setCampiagnTestByKeywordAction(null));
    setTxt("your test campaign is being linked.");
    setActiveStep(1);
  };

  function valueLabelFormat(value) {
    return value + "%";
  }

  return (
    < >
      <div className="linkToAdwordsModal__body container__body">
        <Typography variant="h1" sx={{marginBottom: "11px"}} >Link to Adwords</Typography>
        <Typography variant="subtitle1" color="secondary" >Campaign name</Typography>
        <Typography variant="subtitle2" color="secondary" sx={{marginBottom: "32px"}} >{campaign && campaign.name}</Typography>

        <Grid justifyContent="space-between" container>
          <Grid width="50%" item>

            <h2
              className={"linkToAdwordsModal__subTitle"}
            >start Date</h2>

            <p className="linkToAdwordsModal__txt">
              {campaign && campaign.start_date}
            </p>

          </Grid>
          <Grid width="50%" item>

            <h2
              className={"linkToAdwordsModal__subTitle"}
            >End Date</h2>

            <p className="linkToAdwordsModal__txt">
              {campaign && campaign.end_date}
            </p>

          </Grid>

        </Grid>

        <h2
          className={"linkToAdwordsModal__subTitle"}
        >Traffic Split</h2>

        <div >
          <Slider
           defaultValue={campaign && campaign.traffic_split}
           value={campaign && campaign.traffic_split}
           disabled
           getAriaValueText={valueLabelFormat}
           valueLabelFormat={valueLabelFormat}
           valueLabelDisplay="on"
           aria-labelledby="non-linear-slider"
         />
        </div>

      </div>

      <footer className="linkToAdwordsModal__footer container__footer">
        <Grid
          className="container__btns"
          container
          justifyContent="flex-end"
          alignItems="center"
        >
          <AppBtn onClick={onCloseLinkToCampaign} typeBtn="customSimple">Cancel</AppBtn>
          <AppBtn onClick={() => onLink()} typeBtn="customPrimary">
            Link
          </AppBtn>
        </Grid>
      </footer>
    </>
  );
}
