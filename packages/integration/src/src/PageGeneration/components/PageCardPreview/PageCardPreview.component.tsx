import React, { ChangeEvent, Fragment, useState } from "react";
import { Button, Grid, Radio, Typography } from "@mui/material";
import clsx from "clsx";
import { PageInterface, TemplateZoneApi } from "src/PageGeneration/model";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { AppSkeleton } from "src/components";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { useTheme } from "@emotion/react";
import { BlockArea } from "../BlockArea/BlockArea.component";
import { useStyles } from "./PageCardPreview.style";

export interface PageCardPreviewProps {
  page: PageInterface;
  isActive: boolean;
  little?: boolean;
  onLinkTo?: any;
  pageStatus?: any;
  customCalss?: string | null;
  actionPreview: () => void;
  actionSelect: () => void;
  actionPublish: () => void;
  onSelect?: any;
  noBtn?: boolean;
  onPublish?: () => void
}

export const PageCardPreview = (props: PageCardPreviewProps) => {
  const {
    pageStatus = "",
    little = false,
    isActive = false,
    page,
    onSelect,
    onLinkTo,
    customCalss = null,
    noBtn = false,
    onPublish
  } = props;

  const classes = useStyles({});
  const theme = useTheme();

  const { updateUrl } = useUrlSearchParams();

  const editZone = (zone) => {
    updateUrl("zoneType", zone.type, null, true);
    updateUrl("zoneId", zone.id, "/generation/editPage/", true);
    zone.type === "text" && updateUrl("zoneScore", zone.score + "", "/generation/editPage/", true);
  };

  const handleLinkTo = () => {
    onLinkTo();
  };

  const switchBtnLeft = (pageStatus) => {
    if(!isActive && pageStatus !== "linked") {
      return "select";
    } else {
      switch (pageStatus) {
        case "pending":
          return "select";
        case "published":
          return "Published";
        case "linked":
          return "linked";
      }
    }
  };
  const onChangePage = () => {
    onSelect(page.page_id);
    updateUrl("pageId", page.page_id, "/previewPage/");
  };
  const StylePct = (pct) => {
    const style = "PageCardPreview__pct";

    if(pct >= 0 && pct < 30) {
      return `${style}--negative`;
    }

    if(pct >= 50 && pct < 70) {
      return `${style}--neutral`;
    }

    if(pct >= 70) {
      return `${style}--positive`;
    }
  };
  const HandleOnSelectPage = (
    event: ChangeEvent<HTMLInputElement> | any,
    pageId: string
  ) => {
    updateUrl("pageId", page.page_id);
    // change page class and call onSelect  prop
    onSelect(event, pageId);
  };

  return (
    <Grid
      item
      className={clsx(classes.root, customCalss, " PageCardPreview", {
        "PageCardPreview--active": isActive && page.status !== "linked",
        "PageCardPreview--linked": page.status === "linked",
        "PageCardPreview--little": little
      })}
    >
      <header
        className="PageCardPreview__header"
      >
        <label
          htmlFor={page.page_id}
          className="PageCardPreview__header--label"
        >
          <Radio
            disableRipple={true}
            focusRipple={true}
            classes={{
              root: `radio radio--root radio--little ${ page.status === "linked" ? "isWhite" : "isBlue"}`
            }}
            checked={isActive}
            id="test"
            value={page.page_id}
            name="test"
            inputProps={{ "aria-label": "A" }}
            onChange={(event) => {
              HandleOnSelectPage(event, page.page_id);
            }}
          />
        </label>
        <Button
            sx={{color: page.status === "linked" ? theme.palette.white : theme.palette.blue.main}}
            disableRipple={true}
            focusRipple={true}
            className="PageCardPreview__header--preview"
            variant="text"
            onClick={onChangePage}

        >
          <Typography sx={{fontWeight: 700}} variant="caption">
            Preview
          </Typography>

        </Button>

      </header>
      <div className="PageCardPreview__body">
        <div className="PageCardPreview__body--description">
          <p className="PageCardPreview__label">Page title</p>
          <p
            data-cy="titleProposedPage"
            title={page.title}
            className="PageCardPreview__title ellipsisMulti"
          >
            {page.title}
          </p>

          <p className="PageCardPreview__label">Message match score</p>
          <p
            className={clsx("PageCardPreview__pct", StylePct(page.score))}
          >{`${page.score}%`}</p>

        </div>

        <div className="PageCardPreview__body--blockAreas blockAreas">
          {(page.zones ? page.zones : Array.from(new Array(1))).map(
            (area: TemplateZoneApi, index: number) => area ? (
              <BlockArea key={index} id={index} area={area} action={editZone} />
            ) : (
              <AppSkeleton
                    isScale={true}
                    key={index}
                    type="BLOCKAREA"
                  />
            )
          )}
        </div>
      </div>
      <div className="PageCardPreview__footer">

        {!noBtn ? (
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              { !isActive && <AppBtn
                customclass={page.status === "linked" ? "isLinked" : "isBlue"}
                disabled={isActive}
                disableRipple={true}
                disableFocusRipple={true}
                fluid
                noPadding
                typeBtn="customSimple"
                onClick={event => HandleOnSelectPage(event, page.page_id)}
              >
                {switchBtnLeft(page.status)}
              </AppBtn>}
            </Grid>
            <Grid item>
              { page.status !== "linked" && <AppBtn
                onClick={page.status === "pending" ? onPublish : handleLinkTo}
                disabled={!isActive}
                fluid
                typeBtn="customPrimary"
                data-cy="publishBtn"
              >
                {page.status === "pending" ? "Publish" : "Link to campaign"}
              </AppBtn>
              }
            </Grid>
          </Grid>
        ) : ("")}
      </div>
    </Grid>
  );
};
