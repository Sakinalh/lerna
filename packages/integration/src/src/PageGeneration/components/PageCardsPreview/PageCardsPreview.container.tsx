import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { PROCESS_STATUS, StoreState } from "src/model";
import { AppBtn, AppSkeleton } from "src/components";
import { PageInterface, TemplatePageApi } from "../../model/api";
import { PageCardPreview } from "../PageCardPreview/PageCardPreview.component";
import { useStyles } from "./PageCardsPreview.style";

export interface PageCardsPreviewProps {
  pagesProposed: PageInterface[];
  selectedPage: PageInterface;
  onSelectPage: (page: PageInterface) => void;
  onLinkToK?: any;
  label: string;
  onPublish?: () => void;
}

export const PageCardsPreview: React.FC<PageCardsPreviewProps> = ({
  pagesProposed,
  selectedPage,
  onSelectPage,
  onLinkToK,
  label,
  onPublish

}) => {
  const classes = useStyles({});

  const selectedKwdLabel = useSelector((state: StoreState) => state.pageQueue.selectedLabel);

  const onLinkPage = () => {
    onLinkToK();
  };

  return (
    <div className={clsx("PageCardPreviews", classes.root)}>

      <p className="PageCardPreviews__title">
        Page recommandations for{" "}
        {selectedKwdLabel? (
          <strong data-cy="selectedKwdLabel" className="PageCardPreviews__bold">
            {selectedKwdLabel}
          </strong>
        ) : (
          <AppSkeleton isInline type="TXT_PAGE_CARD" />
        )}
      </p>
      <Grid container justifyContent="flex-start" alignItems="center">
        {(pagesProposed || Array.from(new Array(1))).map(
          (page: PageInterface, index: number) => page ? (
            <PageCardPreview
                    data-cy="pageCardProposed"
                    onPublish={onPublish}
                    key={index}
                    customCalss="PageCardPreview--keyWordsPage"
                    actionPreview={() => { }}
                    actionPublish={() => { }}
                    actionSelect={() => { }}
                    isActive={selectedPage && selectedPage.page_id === page.page_id}
                    page={page}
                    onSelect={() => onSelectPage(page)}
                    onLinkTo={onLinkPage}
                  />
          ) : (
            <AppSkeleton
                      isScale={true}
                      key={index}
                      type="PAGE_CARD_PREVIEW"
                    />
          )
        )}
      </Grid>
    </div>
  );
};
