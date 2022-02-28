import { Button, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { AppText } from "src/components/AppText/AppText.component";
import { useSelector, useDispatch } from "react-redux";
import { CampaignInterface, StoreState } from "src/model";
import { setSelectedCampainAction, setSelectedPageAction, tryGetRuleCampaignsAction, tryPublishPage } from "src/PageGeneration/store/actions";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { PageInterface } from "src/PageGeneration/model";
import { HeaderEdit } from "src/PageGeneration/PageEdit/components/HeaderEdit/HeaderEdit.component";
import {previewPage_QParamsTypes} from "src/PageGeneration/shared/page_query_params";
import { useKeywordsStore } from "../Keywords/keywordsPage.ui.state";

const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: "border-box",
    margin: "0 auto",
    fontSize: 10,
    contentVisibility: "auto",
    containIntrinsicSize: 3000,
    width: "100%",
    "& .preview": {
      height: "calc(100vh - 52px)",
      width: "100%"
    },
    "& .header": {
      borderBottom: `1px solid ${theme.palette.grey.middle1}`,
      background: theme.palette.white,
      padding: "10px 16px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 55,
      "&__btns": {
        "&>*:first-child": {
          marginRight: 16
        }
      },
      "&__recommendations": {
        display: "inline-flex",
        marginRight: 14,
        color: "rgba(35, 31, 32, 0.87)",
        fontFamily: "Open Sans",
        fontSize: 14
      },
      "&__title": {
        position: "relative",
        top: 2,
        paddingLeft: 12,
        color: theme.palette.black
      },
      "&__back": {
        height: 34,
        width: 34,
        "& > span:first-child": {
          height: 34,
          width: 34
        }
      }
    }
  }
}));

interface PreviewPageProps {}

export default function PreviewPage(_props: PreviewPageProps) {
  const classes = useStyles({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {getQueryParams} = useUrlSearchParams();

  const [_campaignId, _kwdLabel, _ruleId, _pageId, _keywordId] = getQueryParams(previewPage_QParamsTypes);

  const pages = useSelector((state: StoreState) => state.pageQueue.proposedPages);

  // const actions = useKeywordsStore(state => state.actions);

  const selectedCampain = useSelector((state: StoreState) => state.pageQueue.selectedCampain);
  const selectedPage = useSelector((state: StoreState) => state.pageQueue.selectedPage);

  const campains = useSelector((state: StoreState) => state.pageQueue.ruleCampains);

  const [urlPage, setUrlPage] = useState(selectedPage && selectedPage.preview_url);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    dispatch(tryGetRuleCampaignsAction(_ruleId));
  }, []);

  // useEffect(() => {
  //   if(!selectedPage && pages){
  //     dispatch(setSelectedPageAction(pages.filter((page: PageInterface) => page.page_id === _pageId)[0]))
  //   }
  // },[pages]);

  useEffect(() => {
    if(!selectedCampain && campains) {
      dispatch(setSelectedCampainAction(campains.filter((campain: CampaignInterface) => campain.id === _campaignId)[0]));
    }
  }, [campains]);

  useEffect(() => {
    if(selectedPage) {
      setUrlPage(selectedPage.preview_url);
      setPageIndex(getPageIndex());
    }
  }, [selectedPage]);

  const getPageIndex = () => {
    const index = pages?.findIndex(p => p.page_id === selectedPage.page_id);
    return index + 1;
  };
  const handleBack = () => {
    if(pageIndex === 1) {
      navigate(-1);
    }
    if(pageIndex > 1) {
      setPageIndex(pageIndex-1);
      setUrlPage(pages[pageIndex-2].preview_url);
    }
  };

  function onclick() {
    if(pageIndex < pages.length) {
      setPageIndex(pageIndex + 1);
      setUrlPage(pages[pageIndex].preview_url);
    }
  }
  const handlePublish = () => {
    dispatch(
      tryPublishPage({
        pages_data: [
          {
            page_id: selectedPage.page_id,
            keyword_id: _keywordId
          }
        ]
      })
    );
  };

  return (
    <div className={classes.root}>
      <HeaderEdit showPageInfo={true} pageIndex={pageIndex} pages={pages} handleBack={() => handleBack()} onNext={() => onclick()}/>
      <iframe title="previewContainer" className="preview" src={urlPage}></iframe>
    </div>
  );
}
