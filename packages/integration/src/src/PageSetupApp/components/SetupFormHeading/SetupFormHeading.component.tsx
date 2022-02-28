import makeStyles from "@mui/styles/makeStyles";
import { Typography } from "src/deps";
import * as React from "react";
import { useEffect } from "react";

const useStyles = makeStyles(theme => ({
  txt: {
    fontSize: 10
  },
  txt_section: {
    paddingBottom: 15,
    color: theme.palette.black
  }
}));

interface SetupFormHeadingProps {
    text: string;
}

export function SetupFormHeading(props: SetupFormHeadingProps): JSX.Element {
  const classes = useStyles(props);
  const { text } = props;
  useEffect(() => {
  }, []);
  return (
    <div className={classes.txt_section}>
      <Typography variant="body1" className={classes.txt}>
        {text}
      </Typography>
    </div>
  );
}
