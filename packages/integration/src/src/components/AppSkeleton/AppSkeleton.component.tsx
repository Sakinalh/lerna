import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import clsx from "clsx";
import { Skeleton } from "@mui/material";
import { useStyles } from "./AppSkeleton.style";
import { listofType } from "./AppSkeleton.list";

export interface AppSkeletonProps {
  isScale?: boolean;
  isInline?: boolean;
  type?: string | "PAGINATED_QUEUE_SEARCH" | "PAGINATED_QUEUE_CHECKBOX" | "PAGINATED_QUEUE_TITLE_CAT" | "PAGINATED_QUEUE_RULE" | "PRODUCT_MODAL_CARD" | "REPLACE_PRODUCT_MODAL_PREVIEW" | "REPLACE_PRODUCT_MODAL_CARD" | "EDIT_PRODUCT_MODAL_SLIDE" | "KEYWORDS_LI" | "BLOCKAREA" | "PAGE_CARD_PREVIEW" | "FULL" | "TXT_SUGGESTIONS_LI" | "TXT_PAGE_CARD";
  key?: string | number;
  width?: string | number;
  height?: string | number;
  variant?: "text" | "rectangular" | "circular"
}

export function AppSkeleton(props: AppSkeletonProps): JSX.Element {
  const classes = useStyles(props);
  const { isScale = false, type, width, height, variant = "text", isInline = false } = props;

  return (
    <Skeleton
      classes={{
        root: clsx("skeleton", { "skeleton--noScale": isScale }, { "skeleton--inline": isInline })
      }}
      variant={variant}
      animation="wave"
      width={!type ? width : listofType[type].width}
      height={!type ? height : listofType[type].height}
    />
  );
}
