import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";

import bg from "src/assets/img/login_background.svg";

import { Outlet } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flex: 1,
    "background-image": `url(${bg})`,
    "background-size": "cover"
  }
});

interface SetupAppContainerProps {}

const SetupAppContainer = (props: SetupAppContainerProps): JSX.Element => {
  const classes = useStyles(props);
  return (
    <section className={classes.root}>
      <Outlet/>
    </section>
  );
};

export default SetupAppContainer;
