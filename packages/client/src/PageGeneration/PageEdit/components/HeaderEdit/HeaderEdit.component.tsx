import clsx from "clsx";
import { Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { CampaignInterface, StoreState } from "src/model";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { tryGetRuleCampaignsAction } from "src/PageGeneration/store/actions";
import { previewPage_QParamsTypes } from "src/PageGeneration/shared/page_query_params";
import { AppSkeleton } from "src/components";
import { useQuery } from "react-query";
import { getCampaign } from "src/api/react-query/keywords.store";
import { useStyles } from "./HeaderEdit.style";

interface HeaderEditProps {
  pageIndex: any;
  pages: any;
  showPageInfo: boolean;
  onNext: any;
  handleBack: any;
}

export function HeaderEdit({
  pageIndex,
  pages,
  showPageInfo,
  onNext,
  handleBack
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {getQueryParams} = useUrlSearchParams();

  const [
    _campaignId,
    _kwdLabel,
    _ruleId,
    _pageId,
    _keywordId
  ] = getQueryParams(previewPage_QParamsTypes);

  const { data: currentCampain } = useQuery(
    ["getCampaign", { id: _ruleId, campaign_id: _campaignId }],
    getCampaign,
    { enabled: !!(_ruleId && _campaignId) }
  );

  const classes = useStyles({});

  return (
    <header className={clsx(classes.root, "header")}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className="gridHeader">
          <AppBtn fluid noPadding typeBtn="back" customclass="header__back">
            <ArrowBackIcon
              onClick={() => (showPageInfo ? handleBack() : navigate(-1))}
            />
          </AppBtn>

          <span className="breadcrumb ">
            {currentCampain ? (
              <>
                {currentCampain.name + "/"}
                <Typography className="breadcrumb__current" component="strong" variant="h3">
                  {_kwdLabel}
                </Typography>

              </>
            ) : (
              <AppSkeleton isInline type="TXT_HEADER_TOP"></AppSkeleton>
            )}
          </span>
        </Grid>
        {showPageInfo ? (
          <Grid item>
            <Grid container justifyContent="flex-start" alignItems="center">
              <span className="header__recommendations">
                { // eslint-disable-next-line
                console.log('Page index', pageIndex)}
                { pageIndex}/{pages?.length || 1} Recommendations
              </span>
              <div className="header__btns">
                <AppBtn
                  typeBtn="secondary"
                  onClick={() => onNext()}
                  disabled={pages === null || pageIndex === pages?.length}
                >
                  next
                </AppBtn>
                <AppBtn typeBtn="secondary">publish</AppBtn>
              </div>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </header>
  );
}
