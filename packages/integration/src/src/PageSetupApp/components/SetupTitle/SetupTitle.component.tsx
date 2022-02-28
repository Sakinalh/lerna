import makeStyles from "@mui/styles/makeStyles";
import { Typography } from "src/deps";
import * as React from "react";

const useStyles = makeStyles({
  page_title: {
    fontWeight: 400,
    fontSize: 18
  }
});

interface SetupTitleProps {
    title: string;
}

export function SetupTitle(props: SetupTitleProps): JSX.Element {
  const classes = useStyles(props);
  const { title } = props;
  return (
    <Typography
      className={classes.page_title}
      variant="h2"
      data-testid="setup-title"
    >
      {title}
    </Typography>
  );
}
