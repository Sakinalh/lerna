import { useDispatch, useSelector } from "react-redux";
import { Grid, Snackbar, Alert, AlertTitle, Typography } from "@mui/material";
import { AppText, AppBtn, AppAlert, AppError, AppSkeleton } from "src/components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState, useCallback } from "react";
import { CampaignInterface, KeywordInterface, StoreState } from "src/model";
import { RuleKewordSummary } from "src/PageGeneration/model";
import {
  setSelectedPageAction,
  tryGetKewordsByCategoryAction,
  tryGetKeywordSummaryListAction,
  tryPublishPage,
  setSelectedKwdAction,
  setSelectedLabelKwdAction,
  tryGetRuleCampaignsAction,
  setNextSelectedIndexAction,
  resetPublishSuccessStatusAction,
  resetLinkSuccessStatusAction,
  resetCreateSuccessStatusAction,
  resetCampiagnTestByKeywordAction
} from "src/PageGeneration/store/actions";
import { useNavigate } from "react-router";
import {
  LinkToCampaign
} from "src/PageGeneration/components";
import { getlabelFromId } from "src/shared/utils";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { getItemFromLocalStorage, setItemToLocalStorage } from "src/shared/form";
import { keywordPage_QParamsType } from "src/PageGeneration/shared/page_query_params";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { AppAlertMessage } from "src/components/AppAlertMessage/AppAlertMessage.component";
import __ from "lodash";
import clsx from "clsx";
import { createTestStatusAction, linkToAdsStatusAction } from "src/redux/store/app";
import { useQuery } from "react-query";
import { getCampaign, getKewordsByCategory, getKeywordPages, getKeywordSummaryList, publishPage } from "src/api/react-query/keywords.store";
import { PageInterface } from "../../model/api";
import {
  KeywordsAccordion
} from "../../components/KeywordsAccordion/KeywordsAccordion.component";
import { tryGetKeywordPagesAction } from "../../store/actions";
import { useStyles } from "./Keywords.style";
import { PageCardsPreview } from "../../components/PageCardsPreview/PageCardsPreview.container";
import { AsideKeywords } from "../../components/AsideKeywords/AsideKeywords.component";

export default function KeywordsPage() {
  const DEFAULT_LIMIT = 10;
  const classes = useStyles({});
  const dispatch = useDispatch();

  const { getQueryParams, updateUrl } = useUrlSearchParams();
  const navigate = useNavigate();

  const [_currentPaginationPage, _campaignId, _ruleId, _k_limit, _K_offset, _category, _keywordId, _pageId] =
    getQueryParams(keywordPage_QParamsType);
  // const storedCampains = useSelector((state: StoreState) => state.pageQueue.ruleCampains);
  // const storedPages = useSelector((state: StoreState) => state.pageQueue.proposedPages);
  // const storedKwdByCategoryResult = useSelector((state: StoreState) => state.pageQueue.kwdsByCategories);
  // const storedKeywordsSummary = useSelector((state: StoreState) => state.pageQueue.kwdsSummary && [...state.pageQueue.kwdsSummary] || null);
  const publishSuccess = useSelector((state: StoreState) => state.pageQueue.publishSuccess);
  const linkSuccess = useSelector((state: StoreState) => state.pageQueue.linkSuccess);
  const storedPage = useSelector((state: StoreState) => state.pageQueue.selectedPage);
  const storedSelectKeyword = useSelector((store: StoreState) => store.pageQueue.selectedKwd);
  const storedNextSelectedIndex = useSelector((store: StoreState) => store.pageQueue.nextSelectedIndex);

  const [currentCategory, setCurrentCategory] = useState(_category || null);
  const [selectedKeyword, setSelectedKeyword] = useState((storedSelectKeyword && storedSelectKeyword.id) || null);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [keywordValue, setKeywordValue] = useState("");
  const [minScore, setMinScore] = useState(NaN);
  const [maxScore, setMaxScore] = useState(NaN);
  const [categoriesToShow, setCategoriesToShow] = useState(["pending", "published", "linked"]);

  const [keywordsToBePublished, setKeywordsToBePublished] = useState<number[]>([]);
  const [pagination, setPagination] = useState({ limit: _k_limit || 10, offset: _K_offset || 0 });
  const [paginationPage, setPaginationPage] = useState(_currentPaginationPage || 1);
  // const [currentCampain, setCurrentCampain] = useState(storedCampains && storedCampains.filter((campain: CampaignInterface) => campain.id === _campaignId)[0] || null);
  const [emptyCategory, setEmptyCategory] = useState(false);
  const [openCampaignModal, setOpenCampaignModal] = useState(false);
  // const [displayAlertMessage, setDisplayAlertMessage] = useState(publishSuccess || false);
  const [categoryCheckAll, setCategoryCheckAll] = useState<any>(null);
  const [filterCategoryPopUp, setfilterCategoryPopUp] = React.useState([{ name: "pending", value: true }, { name: "published", value: true }, { name: "linked", value: true }]);
  const [checkNonCurrentCategory, setCheckNonCurrentCategory] = useState(false);
  const [pageDatas, setPageDatas] = useState(null);

  const { data: currentCampain } = useQuery(
    ["getCampaign", { id: _ruleId, campaign_id: _campaignId }],
    getCampaign,
    { enabled: !!(_ruleId && _campaignId) }
  );

  const { data: storedPages } = useQuery(
    ["getKeywordPages", { keyword_id: _keywordId, rule_id: _ruleId, publishSuccess, linkSuccess }],
    getKeywordPages,
    { enabled: !!_keywordId}
  );

  const { data: storedKwdByCategoryResult = [], refetch: _refetchResults} = useQuery(
    ["getKewordsByCategory", {
      ruleId: _ruleId,
      category: _category,
      campainId: _campaignId,
      limit: _k_limit,
      offset: _K_offset,
      min: minScore,
      max: maxScore,
      keywordValue: keywordValue
    }, currentCategory],
    getKewordsByCategory,
    {
      enabled: !!_category
    }
  );

  const { data: storedKeywordsSummary = [], refetch: _refetchSummary} = useQuery(["getKeywordSummaryList",
    {
      ruleId: _ruleId, campainId: _campaignId
    }], getKeywordSummaryList, { enabled: !!(_ruleId && _campaignId) });

  const { data } = useQuery(
    ["publishPage", dispatch, pageDatas],
    publishPage,
    {enabled: !!(pageDatas)}
  );

  useEffect(() => {
    setCategoryCheckAll(null);
    setKeywordsToBePublished([]);
  }, [filterCategoryPopUp]);

  useEffect(() => {
    dispatch(resetPublishSuccessStatusAction());
    dispatch(resetLinkSuccessStatusAction());
  }, []);

  useEffect(() => {

  }, [storedKeywordsSummary]);

  const changeFilterCategoryPopUp = (event: React.ChangeEvent<HTMLInputElement>, catName) => {
    const val = event.target.checked;
    let _countCheckFilter = 0;
    const newFilteredArr = [];
    __.forEach(filterCategoryPopUp, (item) => {
      if(item.name === catName) {
        if(val) _countCheckFilter = _countCheckFilter + 1;
        newFilteredArr.push({ name: item.name, value: val });
      } else {
        if(item.value) _countCheckFilter = _countCheckFilter + 1;
        newFilteredArr.push(item);
      }
    });
    _countCheckFilter !== 0 && setfilterCategoryPopUp(newFilteredArr);
  };

  const handleCategoryCheckAll = (event, category) => {
    const isChecked = event.target.checked;
    // updateUrl('category',category)
    // const _defaultFilters = {
    //   ruleId: _ruleId,
    //   page: paginationPage,
    //   category: category,
    //   campainId: currentCampain ? currentCampain.id : _campaignId,
    //   ...pagination,
    // };
    // dispatch(tryGetKewordsByCategoryAction(_defaultFilters));
    if(isChecked && currentCategory === category) {
      setKeywordsToBePublished(storedKwdByCategoryResult.results.map(product => product.id));
      setCategoryCheckAll({ category: category, checkAll: true });
    } else {
      setCategoryCheckAll(null);
      setKeywordsToBePublished([]);
      setCheckNonCurrentCategory(true);
      setCurrentCategory(category);
    }
  };

  const defaultFilters = {
    ruleId: _ruleId,
    page: paginationPage,
    category: currentCategory,
    campainId: currentCampain ? currentCampain.id : _campaignId,
    ...pagination
  };

  // useEffect(() => {
  //   if (!storedCampains) {
  //     dispatch(tryGetRuleCampaignsAction(_ruleId));
  //   }
  // });

  // useEffect(() => {
  //   dispatch(tryGetKeywordSummaryListAction({ ruleId: _ruleId, campainId: _campaignId }))

  // }, []);

  useEffect(() => {
    if(checkNonCurrentCategory) {
      setCheckNonCurrentCategory(false);

      setKeywordsToBePublished(storedKwdByCategoryResult.results.map(product => product.id));
      setCategoryCheckAll({ category: currentCategory, checkAll: true });
    }
  }, []);

  useEffect(() => {
    if(storedKeywordsSummary.length !== 0 && currentCategory === null) {
      const categoryInit = storedKeywordsSummary?.filter(category => category.keyword_count > 1 && category.name)[0].name;
      // const _defaultFilters = {
      //   ruleId: _ruleId,
      //   page: paginationPage,
      //   category: categoryInit,
      //   campainId: currentCampain ? currentCampain.id : _campaignId,
      //   ...pagination,
      // };
      // dispatch(tryGetKewordsByCategoryAction(_defaultFilters));
      updateUrl("category", categoryInit);
      setCurrentCategory(categoryInit);
    } else {
      const keywordSummary = storedKeywordsSummary && storedKeywordsSummary.filter(category => category.name === currentCategory)[0];

      if(keywordSummary && keywordSummary.keyword_count === 0) {
        setEmptyCategory(true);
        setCurrentCategory("");
      }
    }
  }, [storedKeywordsSummary]);

  useEffect(() => {
    const _defaultFilters = {
      ruleId: _ruleId,
      page: paginationPage,
      category: currentCategory,
      campainId: currentCampain ? currentCampain.id : _campaignId,
      ...pagination
    };
    if((publishSuccess || linkSuccess) && currentCategory) {
      // dispatch(tryGetKewordsByCategoryAction(_defaultFilters));
      // dispatch(tryGetKeywordSummaryListAction({ ruleId: _ruleId, campainId: _campaignId }))
      const lastKeyword = keywordsToBePublished.pop();
      dispatch(setNextSelectedIndexAction(getNextIndex(lastKeyword, false)));
      dispatch(resetPublishSuccessStatusAction());
      setPageDatas(null);
      setCategoryCheckAll(null);
      setKeywordsToBePublished([]);
      _refetchSummary();
      _refetchResults();
    }
  }, [publishSuccess, linkSuccess]);

  // useEffect(() => {
  //   if (!currentCampain && storedCampains) {
  //     setCurrentCampain(storedCampains.filter((campain: CampaignInterface) => campain.id === _campaignId)[0]);
  //   }
  // }, [storedCampains]);

  useEffect(() => {
    if(storedKwdByCategoryResult && storedKwdByCategoryResult.results && storedKwdByCategoryResult.results.length > 0) {
      let selectedKeyword = storedKwdByCategoryResult.results[0];
      if(!_keywordId) {
        updateUrl("keywordId", "" + selectedKeyword.id);
        dispatch(setSelectedKwdAction(selectedKeyword.id));
      }

      if(_keywordId) {
        const res = storedKwdByCategoryResult.results.filter(
          (keyword: KeywordInterface) => _keywordId === keyword.id
        )[0];
        if(res) {
          selectedKeyword = res;
        }
      }

      if(storedNextSelectedIndex && getKeywordByIndex(storedNextSelectedIndex)) {
        selectedKeyword = getKeywordByIndex(storedNextSelectedIndex);
        dispatch(setNextSelectedIndexAction(null));
      }

      setSelectedKeyword(selectedKeyword.id);
      // dispatch(tryGetKeywordPagesAction({ keyword_id: selectedKeyword.id, rule_id: _ruleId }));
      dispatch(setSelectedLabelKwdAction(getlabelFromId(selectedKeyword.id, storedKwdByCategoryResult)));
      updateUrl("kwdLabel", getlabelFromId(selectedKeyword.id, storedKwdByCategoryResult));
      dispatch(setSelectedKwdAction(selectedKeyword.id));
      updateUrl("keywordId", "" + selectedKeyword.id);
      // dispatch(tryGetKeywordSummaryListAction({ ruleId: _ruleId, campainId: _campaignId }))
    } else if(paginationPage > 1) {
      const _defaultFilters = {
        ruleId: _ruleId,
        page: paginationPage - 1,
        category: _category,
        campainId: currentCampain ? currentCampain.id : _campaignId,
        offset: _K_offset - DEFAULT_LIMIT,
        limit: DEFAULT_LIMIT
      };
      setPaginationPage(paginationPage - 1);
      updateUrl("pageNumber", paginationPage - 1 + "");
      updateUrl("k_offset", _K_offset - DEFAULT_LIMIT + "");
      dispatch(tryGetKewordsByCategoryAction(_defaultFilters));
    }
  }, [storedKwdByCategoryResult]);

  useEffect(() => {
    if(storedPages && storedPages[0]) {
      updateUrl("pageId", storedPages[0].page_id);

      if(!_pageId) {
        updateUrl("pageId", storedPages[0].page_id);
        dispatch(setSelectedPageAction(storedPages[0]));
      }

      let selectedPage = storedPages[0];

      if(_pageId) {
        selectedPage = storedPages.filter((page: PageInterface) => (String(_pageId) === String(page.page_id)))[0];
        selectedPage && updateUrl("pageId", selectedPage.page_id);
      }

      dispatch(setSelectedPageAction(selectedPage || storedPages[0]));
      updateUrl("pageId", selectedPage && selectedPage.id || storedPages[0].id);
    }
  }, [storedPages]);

  const handleBack = () => {
    navigate("/generation/template/queue");
  };

  const onCloseLinkToCampaign = () => {
    setOpenCampaignModal(false);
    dispatch(resetCampiagnTestByKeywordAction(null));
    dispatch(createTestStatusAction(null));
    dispatch(linkToAdsStatusAction(null));
    setCategoryCheckAll(null);
    setKeywordsToBePublished([]);
  };

  const onLinkSinglePage = () => {
    setCategoryCheckAll(null);
    setKeywordsToBePublished([]);
    onLinktoKPage();
  };

  const onLinktoKPage = () => {
    dispatch(createTestStatusAction(null));
    dispatch(linkToAdsStatusAction(null));
    dispatch(resetLinkSuccessStatusAction());
    dispatch(resetCreateSuccessStatusAction());
    setOpenCampaignModal(true);
  };

  const onPublish = () => {
    // const filters = { ...defaultFilters, offset: _K_offset, category: currentCategory };
    setPageDatas({pages_data: [
      {
        page_id: storedPage.page_id.toString(),
        keyword_id: storedSelectKeyword
      }
    ]});

    // tryPublishPage({
    //   pages_data: [
    //     {
    //       page_id: storedPage.page_id.toString(),
    //       keyword_id: storedSelectKeyword,
    //     },
    //   ],
    // })
    // dispatch(tryGetKewordsByCategoryAction(filters));
    dispatch(setNextSelectedIndexAction(getNextIndex(_keywordId, false)));
  };

  const onChangeCategory = (categoryName: string) => {
    const keywordSummary = storedKeywordsSummary.filter(category => category.name === categoryName)[0];
    if(keywordSummary.keyword_count !== 0) {
      if(categoryName !== currentCategory) {
        setMinScore(NaN);
        setMaxScore(NaN);
        setKeywordValue("");
        setPaginationPage(1);
        setPagination({limit: "10", offset: "0"});
        updateUrl("category", categoryName);
        updateUrl("k_offset", "0");
        updateUrl("pageNumber", "0");
      }

      setEmptyCategory(false);

      // const filters = { ...defaultFilters, offset: 0, category: categoryName, keywordValue: keywordValue, min: minScore, max: maxScore };
      setCurrentCategory(categoryName);
      // dispatch(tryGetKewordsByCategoryAction(filters));
      setCategoryCheckAll(null);
      setKeywordsToBePublished([]);
    }
  };

  const restorePagination = (keywordValue, min_score, max_score, isReset) => {
    setKeywordValue(keywordValue);
    setMinScore(min_score);
    setMaxScore(max_score);
    isReset && setPaginationPage(1);
  };
  const onSelectKeword = async (keywordId: number) => {
    // await dispatch(
    //   tryGetKeywordPagesAction({
    //     keyword_id: keywordId,
    //     rule_id: _ruleId,
    //   })
    // );
    updateUrl("keywordId", "" + keywordId);
    // updateUrl('pageId', storedPages[0].page_id )
    // eslint-disable-next-line
    console.log('pagination', pagination)
    updateUrl("k_offset", pagination.offset);
    updateUrl("k_limit", DEFAULT_LIMIT);
    updateUrl("pageNumber", paginationPage);

    const category = storedKwdByCategoryResult.results.filter(kwd => kwd.id === keywordId)[0].category;
    updateUrl("category", category);

    dispatch(setSelectedKwdAction(keywordId));

    dispatch(setSelectedLabelKwdAction(getlabelFromId(keywordId, storedKwdByCategoryResult)));
    setSelectedLabel(getlabelFromId(keywordId, storedKwdByCategoryResult));
    updateUrl("kwdLabel", getlabelFromId(keywordId, storedKwdByCategoryResult));
    setSelectedKeyword(keywordId);
  };

  const getNextIndex = (keywordId: number, changeOffset = true) => {
    let nextIndex = null;

    storedKwdByCategoryResult && storedKwdByCategoryResult.results && storedKwdByCategoryResult.results.forEach((kwd, idx) => {
      if(kwd.id === keywordId) {
        nextIndex = idx < 9 ? idx : 9;
      }
    });

    return nextIndex;
  };

  const getKeywordByIndex = (index: number) => storedKwdByCategoryResult.results.find((elem, idx) => idx === index);

  const onCheckKeyword = (keyword: number) => {
    if(keywordsToBePublished.includes(keyword)) {
      keywordsToBePublished.splice(keywordsToBePublished.indexOf(keyword), 1);
      setKeywordsToBePublished([...keywordsToBePublished]);
    } else {
      setKeywordsToBePublished([...keywordsToBePublished, keyword]);
    }
  };

  const paginate = (_page, keywordValue = null) => {
    const page = Number(_page);
    updateUrl("pageNumber", page);
    updateUrl("k_limit", DEFAULT_LIMIT);
    const newPagination = { offset: (page - 1) * DEFAULT_LIMIT };
    updateUrl("k_offset", newPagination.offset + "");
    setPagination({ ...pagination, offset: (page - 1) * DEFAULT_LIMIT });
    setPaginationPage(page);
    // dispatch(
    //   tryGetKewordsByCategoryAction({ ...defaultFilters, ...newPagination, keywordValue: keywordValue, min: minScore, max: maxScore })
    // );
    if(setCategoryCheckAll !== null) {
      setCategoryCheckAll(null);
      setKeywordsToBePublished([]);
    }
  };

  const onSelectPage = useCallback((page: any) => {
    updateUrl("pageId", page.page_id);
    dispatch(setSelectedPageAction(page));
  }, []);

  // const [openWelcomeAlert, setOpenWelcomeAlert] = React.useState(false);

  // const handleToggleWelcomeAlert = () => {
  //   setOpenWelcomeAlert(!openWelcomeAlert);
  // };
  const getNextCategory = (categoryName: string) => {
    switch (categoryName) {
      case "pending":
        return "published";
      case "published":
        return "linked";
    }
  };

  const payload_T = {
    base_campaign_id: _campaignId,
    customer_id: window.localStorage.getItem("naister_user_customer_id")
  };

  const publishPages = () => {
    // eslint-disable-next-line
    console.log('on publish publishPages')
    const pages = storedKwdByCategoryResult.results
      .filter(keywords => keywordsToBePublished.includes(keywords.id))
      .map(keyword => ({ page_id: keyword.page_ids[0], keyword_id: "" + keyword.id }));

    setPageDatas({ pages_data: pages });

    // dispatch(tryPublishPage({ pages_data: pages }));
  };

  if(!currentCampain || !storedKeywordsSummary || !storedKwdByCategoryResult) {
    return <div>loading ...</div>;
  }

  return (
    <div className={classes.root}>

      <LinkToCampaign
        onCloseLinkToCampaign={onCloseLinkToCampaign}
        open={openCampaignModal}
        payload={payload_T}
        onSetpayload={() => { }}
        ruleId={_ruleId}
        keywordsToBePublished={keywordsToBePublished}
      />

      <header className="header">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item className="gridHeader">
            <AppBtn
              onClick={handleBack}
              typeBtn="back"
              customclass="header__back"
            >
              <ArrowBackIcon />
            </AppBtn>

            <Typography className={classes.currentCampaignName} component="span" variant="subtitle1">
              {currentCampain?.name.toLowerCase()}
            </Typography>
          </Grid>
        </Grid>
      </header>
      <Grid container className="container container--aside">
        <Grid item component="aside" className="container__item">
          {storedKwdByCategoryResult ? (
            <AsideKeywords
              categoriesToShow={categoriesToShow}
              currentCategory={currentCategory}
              keywordTobePublished={keywordsToBePublished}
              handleCategoriesToShow={(categories: string[]) => {
                // eslint-disable-next-line
                console.log('Keyword contaier on set les nouvelle cat to show', categories)
                setCategoriesToShow([...categories]);
              }}
              filterCategoryPopUp={filterCategoryPopUp}
              onChangeFilterCategoryPopUp={changeFilterCategoryPopUp}
              onPublish={publishPages}
              onLinkToK={onLinktoKPage}>
              {(storedKeywordsSummary || Array.from(new Array(3))
              ).map((category: RuleKewordSummary, i) => {
                if(category) {
                  const index = filterCategoryPopUp.findIndex(item => item.name === category.name);
                  if(categoriesToShow.includes(category.name)) {
                    return (
                      <KeywordsAccordion
                        restorePagination={restorePagination}
                        key={i}
                        keywordList={
                          storedKwdByCategoryResult && storedKwdByCategoryResult.results
                        }
                        category={category}
                        storedKwdByCategoryResult={storedKwdByCategoryResult}
                        paginate={paginate}
                        total={storedKwdByCategoryResult && storedKwdByCategoryResult.count}
                        nextPage={paginationPage}
                        itemPerPage={DEFAULT_LIMIT}
                        onChangeCategory={onChangeCategory}
                        currentCategory={currentCategory}
                        onSelectKeword={onSelectKeword}
                        selectedKeyword={selectedKeyword}
                        onCheckKeyword={onCheckKeyword}
                        keywordTobePublished={keywordsToBePublished}
                        handleCategoryCheckAll={handleCategoryCheckAll}
                        categoryCheckAll={categoryCheckAll}
                      />

                    );
                  }
                } else return <AppSkeleton key={i} type="KEYWORDS_LI" />;
              })}
            </AsideKeywords>
          ) : (<AppSkeleton isScale={true} type="FULL" />)}
        </Grid>
        <Grid item className={clsx("container__item PageCardPreviews", { "isEmpty": emptyCategory })}>

          {!currentCampain &&
            <AppError
              message={"Oops, something went wrong !"}
              isError={true}
              className={"noPageCards"}
            />}

          {emptyCategory &&
            <AppError
              message={"You have no pages to publish."}
              className={"noPageCards"}
            />}

          { storedPages && !emptyCategory && <PageCardsPreview
            label={
              selectedKeyword == null &&
                storedKwdByCategoryResult &&
                storedKwdByCategoryResult.results &&
                storedKwdByCategoryResult.results[0]
                ? storedKwdByCategoryResult.results[0].kwd_text
                : selectedLabel
            }
            onPublish={onPublish}
            onLinkToK={onLinkSinglePage}
            onSelectPage={onSelectPage}
            pagesProposed={storedPages}
            selectedPage={storedPage}

          />}

        </Grid>
      </Grid>
    </div>
  );
}
