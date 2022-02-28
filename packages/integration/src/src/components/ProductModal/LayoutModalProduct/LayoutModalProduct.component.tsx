import React from "react";

import clsx from "clsx";
import { Grid, Typography } from "@mui/material";
import { AppText } from "src/components/AppText/AppText.component";
import { Close } from "@mui/icons-material";
import { useStyles } from "./LayoutModalProduct.style";
export interface LayoutModalProductProps {
  header ?: any;
  children: any;
  footer: any;
  type: "withSidebar" | "full";
  aside ?: any
  title ?: string
}

export function LayoutModalProduct(props: LayoutModalProductProps) {
  const classes = useStyles({});

  const {
    header = null,
    children = null,
    footer = null,
    type = "full",
    aside = null,
    title = "newTitle"
  } = props;

  return (
    <div className={clsx(classes.root, "container  container--action")}>
      {title.length > 0
        ?
          <header className="container__header">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className="gridHeader">
                <Typography className="container__header--title" component="h2" variant="h1">{title}</Typography>
              </Grid>
              <Grid item>
                <Close />
              </Grid>
            </Grid>

          </header>
        :
          <header className="container__header">{header}</header>
      }

      {type === "full" ? (
        <>
          <div className="container__body">{children}</div>
          <footer className="container__footer">{footer}</footer>
        </>
      ) : (
        <div className="container__body container__body--aside">
          <aside className="container__aside">
            {aside}
          </aside>
          <div className="container__data">
            {children}
            <footer className="container__footer">{footer}</footer>
          </div>
        </div>
      )}
    </div>
  );
}
