import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { AppLink } from "src/components/AppLink/AppLink";
import { Typography } from "src/deps";
import Security from "src/assets/img/undraw_security.svg";

const useStyles = makeStyles(theme => ({
  root: {},
  link: {
    paddingTop: 20,
    color: theme.palette.blue.main,
    display: "block",
    margin: "0 auto",
    width: "100%",
    textAlign: "center"
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  img: {
    maxHeight: 80
  },
  desc: {
    padding: "10px 20px"
  }

}));

interface PwdChangedProps {

}

export function PwdChanged(_props: PwdChangedProps): JSX.Element {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <img
          className={classes.img}
          src={Security}
          alt="password upaded"
        />
        <Typography classes={{ root: classes.desc }}>
          the password successfully updated
        </Typography>
      </div>

      <AppLink path="/login"
        label="go back to signin"
        customclass={classes.link}/>
    </div>
  );
}
