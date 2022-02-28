import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { useEffect } from "react";
import projectConstruction from "src/assets/img/UnderConstruction.svg";
import { Typography } from "src/deps";
import { AppLink } from "src/components/AppLink/AppLink";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { SetupAppState, StoreState } from "../../model";
import { resetSetup } from "../store/setupApp";

const useStyles = makeStyles(theme => ({
  article: {
    width: 600,
    height: 270,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    boxShadow: "0 0 10px 0 rgba(218,220,224,0.5)",
    borderRadius: 12,
    backgroundColor: "#ECF3FE",
    backgroundImage: `url(${projectConstruction})`,
    backgroundSize: "contain",
    fontSize: 12
  },
  title: {
    position: "absolute",
    top: 20,
    left: 20
  },
  wrap: {
    width: "100%",
    padding: "0 20px"
  },

  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  content_title: {
    fontWeight: 400,
    textAlign: "center",
    color: theme.palette.black
  },
  content_caption: {
    textAlign: "center"
  },

  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  link_btn: {
    color: theme.palette.blue.main,
    height: 40,
    lineHeight: "40px",
    padding: "0 10px"
  }
}));

interface SetupProcessingProps {}

export function SetupProcessing(props: SetupProcessingProps): JSX.Element {
  const classes = useStyles(props);
  const setupState: SetupAppState = useSelector(
    (state: StoreState) => state.setupApp
  );
  const dispatch = useDispatch();
  const isSetCompleted = setupState.isDone;
  const navigate = useNavigate();
  useEffect(() => () => {
    dispatch(resetSetup());
  }, [dispatch]);
  useEffect(() => {
    if(!isSetCompleted) {
      navigate("/setup-app/form/name/");
    }
  }, [navigate, isSetCompleted]);

  return (
    <article className={classes.article}>
      <main className={classes.content}>
        <div style={{ marginBottom: 20 }}>
          <Typography
            variant="h2"
            className={classes.content_title}
            gutterBottom
          >
            Under Construction
          </Typography>
        </div>

        <Typography
          variant="caption"
          className={classes.content_caption}
          gutterBottom
        >
          As soon as you click on « Send », Naister will receive your data. It
          will take some time to process everything, we will get back to you as
          soon as it is finished. If your informations are correct, please click
          « Send »
        </Typography>
      </main>
      <div className={classes.footer}>
        <AppLink
          path="/project/all/"
          label="project list"
          customclass={classes.link_btn}
        />
      </div>
    </article>
  );
}
