import React from "react";
import clsx from "clsx";
import { Button, Grid, LinearProgress, Radio } from "@mui/material";
import { PageCardPreview } from "src/PageGeneration/components/PageCardPreview/PageCardPreview.component";
import { useStyles } from "./SelectedPage.style";
import { PageInterface, TemplatePageApi } from "../../../model/api";
interface SelectedPageProps {
  page: PageInterface;
  onSelectPage: (page: PageInterface) => void;
}

export function SelectedPage(props: SelectedPageProps) {
  const classes = useStyles({});
  const { page, onSelectPage } = props;
  return (
    <Grid
      item
      component="aside"
      className={clsx("container container--little")}
    >
      <div className="container--center container--sticky container--screen">
        {page && (
          <PageCardPreview
            noBtn
            little={true}
            actionPreview={() => {}}
            actionPublish={() => {}}
            actionSelect={() => {}}
            isActive={true}
            page={page}
            onSelect={() => onSelectPage(page)}
          />
        )}
      </div>
    </Grid>
  );
}
