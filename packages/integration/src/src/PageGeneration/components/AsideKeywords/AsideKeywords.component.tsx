import { Grid, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import React, { ChangeEvent, useState } from "react";
import clsx from "clsx";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { keywordPage_QParamsType } from "src/PageGeneration/shared/page_query_params";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { useStyles } from "./AsideKeywords.style";
import { ButtonDisplayCategory } from "../KeywordsAccordion/ButtonDisplayCategory";

export interface AsideKeywordsProps {
  currentCategory: string;
  children: any;
  keywordTobePublished: number[];
  onChangeFilterCategoryPopUp: (event: ChangeEvent<HTMLInputElement>, catName: any) => void;
  filterCategoryPopUp: { name: string; value: boolean; }[];
  onLinkToK: any;
  onPublish: any;
  categoriesToShow: string[];
  handleCategoriesToShow: Function;
}

export const AsideKeywords: React.FC<AsideKeywordsProps> = ({
  children,
  currentCategory,
  keywordTobePublished,
  onChangeFilterCategoryPopUp,
  categoriesToShow,
  filterCategoryPopUp,
  onLinkToK,
  onPublish,
  handleCategoriesToShow
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {getQueryParams} = useUrlSearchParams();
  const [_currentPaginationPage, _campaignId, _ruleId, _k_limit, _K_offset, _category, _keywordId, _pageId] =
    getQueryParams(keywordPage_QParamsType);
  const [
    selectFilterPopup,
    setSelectFilterPopup
  ] = React.useState<HTMLElement | null>(null);

  const openSelectFilterPopup = Boolean(selectFilterPopup);

  const [filterPopUp, setfilterPopUp] = React.useState<HTMLElement | null>(
    null
  );

  const chooseBtnTxt = (currentCategory) => {
    switch (currentCategory) {
      case "pending":
        return "Publish";
      case "linked":
        return "Publish campaign";
      case "published":
        return "Link to campaign";
    }
  };

  const [anchorErrorShow, setAnchorErrorShow] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorErrorShow);

  return (
    <div className={clsx(classes.root, "asideKeywords")}>
      <div
        className={clsx("asideKeywords__filter", "keywordsFilter", {
          isOpen: openSelectFilterPopup
        })}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid
              container
              item
              justifyContent="flex-start"
              alignItems="center"
            >
              <span className="keywordsFilter__label">Keywords</span>

            </Grid>
          </Grid>
          <Grid item>

            <ButtonDisplayCategory categories={categoriesToShow} handleClickOnCategory={handleCategoriesToShow} />

          </Grid>
        </Grid>
      </div>
      <div className="asideKeywords__accordions">{children}</div>

      <div className="asideKeywords__btnAction">
        {currentCategory !== "linked" && currentCategory && (<Button
        variant="contained"
        color="primary"
        onClick={currentCategory === "pending" ? onPublish : onLinkToK}
        disabled={keywordTobePublished.length === 0}
      >
          {`${chooseBtnTxt(currentCategory)} (${keywordTobePublished && keywordTobePublished.length})`}
        </Button>)}
      </div>
    </div>
  );
};
