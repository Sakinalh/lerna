import makeStyles from "@mui/styles/makeStyles";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { ProjectsHead } from "src/components/ProjectsHead/ProjectsHead.component";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    padding: "0 20px",
    overflowY: "scroll",
    height: "100%"
  }
});

export interface PageBgProps {
    children: any;
    customclass?: any;
}

export function PageBg(props: PageBgProps): JSX.Element {
  const { children, customclass } = props;
  const classes = useStyles(props);

  return (
    <Grid item xs={12} className={clsx(classes.root, customclass)}>
      <ProjectsHead/>
      {children}
    </Grid>
  );
}
