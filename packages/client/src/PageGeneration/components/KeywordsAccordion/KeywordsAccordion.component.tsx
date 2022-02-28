import { Grid, IconButton, InputAdornment, Popover, TextField, Typography } from "@mui/material";
import clsx from "clsx";
import TuneIcon from "@mui/icons-material/Tune";
import React, { useState, useEffect, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch, dispatch } from "react-redux";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage
} from "src/shared/form";
import { KeywordInterface, StoreState } from "src/model";
import {
  setSelectedCampainAction,
  setSelectedKwdAction,
  tryGetKewordsByCategoryAction
} from "src/PageGeneration/store/actions";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { AppCheckbox, AppSkeleton, AppText } from "src/components";
import { keywordPage_QParamsType } from "src/PageGeneration/shared/page_query_params";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import {
  BaseTemplateKeywordApi,
  RuleKewordSummary,
  TemplatePageApi
} from "../../model/api";
import { ReactComponent as ArrowRight } from "../../../styles/global/icons/icon-arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../../../styles/global/icons/icon-arrow-left.svg";
import { KeywordListItem } from "../../../components/KeywordListItem/KeywordListItem.component";
import { useStyles } from "./KeywordsAccordion.style";
import { Accordion, AccordionDetails, AccordionSummary } from "../../../deps";

export interface KeywordsAccordionProps {
  keywordList: KeywordInterface[];
  category: RuleKewordSummary;
  paginate: (value: number) => void;
  nextPage: number;
  total: number;
  itemPerPage: number;
  onChangeCategory: (categoryName: string) => void;
  currentCategory: string;
  onSelectKeword: (id: number) => void;
  selectedKeyword: number;
  onCheckKeyword: (keywordId: number) => void;
  keywordTobePublished: number[];
  handleCategoryCheckAll: (event: any, category: string) => void;
  categoryCheckAll: any;
  storedKwdByCategoryResult: any;
  restorePagination: any;
  setFiltersValues:any;
  categoriesToShow: string[];
  keywordValue: string;
}

export const KeywordsAccordion: React.FC<KeywordsAccordionProps> = ({
  keywordTobePublished,
  onCheckKeyword,
  onSelectKeword,
  selectedKeyword = 2,
  keywordList,
  category,
  onChangeCategory,
  paginate,
  total,
  nextPage,
  itemPerPage,
  currentCategory,
  categoryCheckAll,
  handleCategoryCheckAll,
  storedKwdByCategoryResult,
  restorePagination,
  setFiltersValues,
  categoriesToShow

}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {getQueryParams} = useUrlSearchParams();
  const [_currentPaginationPage, _campaignId, _ruleId, _k_limit, _K_offset, _category, _keywordId, _pageId] =
  getQueryParams(keywordPage_QParamsType);
  const [panel, setPanel] = useState(category.name);
  const [isLoading, setIsLoading] = useState(false);
  const refKeywords = useRef(null);
  const FIRST_PAGE = 1;
  const stopPropagation = (e) => {
    e.stopPropagation();
    // e.target.checked = !e.target.checked
  };
  const showFilterCategoriePopup = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFilterCategoriePopup(event.currentTarget);
  };

  const [
    filterCategoriePopup,
    setFilterCategoriePopup
  ] = React.useState<HTMLElement | null>(null);

  const openFilterCategoriePopup = Boolean(filterCategoriePopup);

  const [isFilters, setIsFilters] = useState(false);
  const [minScore, setMinScore] = React.useState(0);
  const [maxScore, setMaxScore] = React.useState(0);
  const [lastMax, setLastMax] = React.useState(0);
  const [lastMin, setLastMin] = React.useState(0);
  const [isDirty, setIsDirty] = React.useState(false);

  const defaultFilters = {
    ruleId: _ruleId,
    campainId: _campaignId,
    category: currentCategory,
    offset: 0,
    limit: 10,
    keywordValue: ""
  };
  const [keywordsFilters, setKeywordsFilters] = React.useState(defaultFilters);

  const _onChangeCategory = (categoryName: string) => {
    setKeywordsFilters({...keywordsFilters, keywordValue: ""});
    onChangeCategory(categoryName);
  };

  const onClearFilters = () => {
    setMinScore(0);
    setMaxScore(0);
    restorePagination(keywordsFilters.keywordValue, 0, 0, true);
    setIsFilters(false);
    setIsDirty(false);
  };

  const onClosePopup = () => {
    if(minScore > 0 || maxScore > 0) {
      setMinScore(lastMin);
      setMaxScore(lastMax);
      restorePagination(keywordsFilters.keywordValue, lastMin, lastMax, true);
    }
    !(lastMin > 0 || lastMax > 0 || keywordsFilters.keywordValue !== "") && setIsFilters(false);

    setFilterCategoriePopup(null);
  };

  const onFilterKeywords = () => {
    (minScore > 0 || maxScore > 0) && setIsFilters(true);
    minScore > 0 && setLastMin(minScore);
    maxScore > 0 && setLastMax(maxScore);
    restorePagination(minScore, maxScore);
    setIsDirty(false);
    restorePagination(keywordsFilters.keywordValue, minScore, maxScore, false);
  };

  useEffect(() => {
    keywordList && keywordList.length <= 0 ? setIsLoading(true) : setIsLoading(false);
  }, [keywordList]);

  useEffect(() => {
    if(selectedKeyword) {
      const elem = document.body.querySelector(`[data-id="${selectedKeyword}"]`);

      if(elem) {
        const elemHeight = elem.offsetHeight + 55;
        const offsetTop = elem.offsetTop;
        refKeywords.current.scrollTop = offsetTop - elemHeight;
      }
    }
  }, [selectedKeyword, keywordList]);

  const updateMinScore = (e) => {
    (e.target.value === lastMin+"" && maxScore === lastMax) ? setIsDirty(false) : setIsDirty(true);
    setMinScore(e.target.value);
  };

  const updateMaxScore = (e) => {
    (e.target.value === lastMax+"" && minScore === lastMin)? setIsDirty(false) : setIsDirty(true);
    setMaxScore(e.target.value);
  };

  return (
    <Accordion
      expanded={panel === currentCategory}
      classes={{
        expanded: "isOpen"
      }}
      data-cy="keyAccordion"
      className={clsx(classes.root, "accordion keyAccordion")}
    >
      <AccordionSummary
        classes={{
          expandIconWrapper: "accordionSummary__expandIconWrapper accordionSummary__expandIconWrapper--keyAccordion"
        }}
        expandIcon={<ExpandMoreIcon />}
        className="accordion__summary keyAccordion__summary"
        onClick={() => { _onChangeCategory(category.name); }}
      >

        <Grid container flexDirection="column" className="keyAccordion__summaryItems ">

          <Grid item className={clsx(
            "keyAccordion__summaryItem keyAccordion__summaryItem--naming",
            { "keyAccordion__summaryCheckbox--remove": category.keyword_count === 0 },
            { "keyAccordion__summaryCheckbox--linked": category.name === "linked" }
          )}>
            <Grid container justifyContent="flex-start" alignItems="center" >
              {/* //https://github.com/mui-org/material-ui/issues/9427 */}
              <div className={clsx("keyAccordion__summaryCheckbox--container", { "keyAccordion__summaryCheckbox--check": categoryCheckAll && categoryCheckAll.category === category.name })}>

                <div onClick={stopPropagation} className="keyAccordion__summary--checkboxWrapper keyAccordion__summaryCheckbox">
                  <AppCheckbox
                    disabled={category.keyword_count === 0}
                    customClass={"keyAccordion__summary--checkbox beforeCheckBox"}
                    isSmall
                    noPadding
                    whiteBg
                    color="default"
                    disableRipple={true}
                    checked={categoryCheckAll && categoryCheckAll.category === category.name}
                    onChange={(event) => { handleCategoryCheckAll(event, category.name); }}
                  />

                </div>
              </div>
              <Typography data-cy='category'>
                {category.name} (<span data-cy='categoryCount'>{category.keyword_count}</span>)
              </Typography>

            </Grid>
          </Grid>

          { category.keyword_count !== 0 &&
          <Grid onClick={stopPropagation} item className="keyAccordion__summaryItem keyAccordion__summaryItem--searchBar" >

            <Grid container justifyContent="flex-start" alignItems="center" >

              <TextField
                sx={{paddingRight: "24px"}}
                fullWidth
                placeholder="Search Keyword"
                id="outlined-basic"
                value={keywordsFilters.keywordValue}
                onChange={e => setKeywordsFilters({...keywordsFilters, keywordValue: e.target.value})}
                onKeyPress={(ev) => {
                  if(ev.key === "Enter") {
                    onFilterKeywords();
                    ev.preventDefault();
                  }
                }}
                variant="outlined"
                InputProps={{
                  readOnly: false,
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        focusRipple={false}
                        disableRipple={true}
                        disableFocusRipple={true}
                        onClick={() => onFilterKeywords()}
                        size="large">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <AppBtn
                typeBtn="iconRounded"
                noPadding
                fluid
                customclass="keyAccordion__summary--filters keyAccordion__filtersSummary"
                onClick={showFilterCategoriePopup}
              >
                <TuneIcon />
                { isFilters && <span className="keyAccordion__filtersSummary--round" />}
              </AppBtn>

              {/* popup */}

              <Popover
                id="mouse-over-popoverF"
                classes={{
                  paper:
                    "popover--paper popover--noOverflow popover--triangle popover--triangleLeft filterPop",
                  root: "popover"
                }}
                open={openFilterCategoriePopup}
                onClose={() => onClosePopup()}
                anchorEl={filterCategoriePopup}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                disableRestoreFocus
              >

                <Typography component="p" variant="h3" className="replaceProductModal--title">
                  Message match score
                </Typography>

                <div className="filterPop__inputs">
                  <TextField
                    value={minScore}
                    type="number"
                    onChange={updateMinScore}
                    InputProps={{
                      classes: {
                        root:
                          "input input__outline--root filterPop__inputs--item",
                        focused: "input input__outline--focused",
                        disabled: "input input__outline--disabled"
                      }
                    }}
                    placeholder="Min"
                    id="filled-required"
                    variant="outlined"
                  />

                  <span className="filterPop__inputs--separator">-</span>

                  <TextField
                    value={maxScore}
                    type="number"
                    onChange={updateMaxScore}
                    InputProps={{
                      classes: {
                        root:
                          "input input__outline--root filterPop__inputs--item",
                        focused: "input input__outline--focused",
                        disabled: "input input__outline--disabled"
                      }
                    }}
                    placeholder="Max"
                    id="filled-required2"
                    variant="outlined"
                  />
                </div>

                <div className="filterPop__btns">
                  <AppBtn onClick={() => onClearFilters()} typeBtn="secondary" noPadding>
                    Reset
                  </AppBtn>
                  <AppBtn typeBtn="primary" disabled={!isDirty} onClick={() => onFilterKeywords()} noPadding>
                    Apply
                  </AppBtn>
                </div>

              </Popover>

              {/* popup end */}

            </Grid>

          </Grid>}
        </Grid>
      </AccordionSummary>

      <AccordionDetails className="accordion__details keyAccordion__details accordion__details--key">
        <ul ref={refKeywords} className="keywords" data-cy="keyAccordionKeywords">
          {(Array.isArray(keywordList) && keywordList
            ? keywordList
            : Array.from(new Array(3))
          ).map((keyword: any, i: number) => (
            <li key={i} className="keywords__li" data-cy="keyAccordionKeywordsLi">
              {keyword && !isLoading ? (
                <KeywordListItem
                    tooltip="Number of recommendations"
                    totalPages={keyword.total_pages}
                    value={keyword.id} // set total page for kwd
                    category={category}
                    isSelected={
                      !selectedKeyword && i === 0
                        ? true
                        : selectedKeyword === keyword.id
                    }
                    label={keyword.kwd_text}
                    onSelectKeyword={() => onSelectKeword(keyword.id)}
                    onCheckKeyword={onCheckKeyword}
                    isCheckedToBePublished={keywordTobePublished.includes(
                      keyword.id
                    )}
                  />
              ) : (
                <AppSkeleton type="KEYWORDS_LI" />
              )}
            </li>
          ))}
        </ul>

        {Array.isArray(keywordList) && keywordList.length > 0 && (<Grid className="keywords__kwdBtns" container alignItems="center" justifyContent="flex-end">
          <AppBtn
            data-cy='kwdPrevButton'
            typeBtn="kwdBtn"
            disabled={FIRST_PAGE === nextPage}
            onClick={() => {
              refKeywords.current.scrollTop = 0;
              paginate(nextPage - 1, keywordsFilters.keywordValue);
            }}
          >
            Previous
          </AppBtn>
          <AppBtn
            data-cy='kwdNextButton'
            typeBtn="kwdBtn"
            disabled={(nextPage === Math.ceil(total / itemPerPage)) || total === 0}
            onClick={() => {
              refKeywords.current.scrollTop = 0;
              paginate(nextPage + 1, keywordsFilters.keywordValue);
            }}
          >
            Next
          </AppBtn>
        </Grid>)}
      </AccordionDetails>
    </Accordion>
  );
};
