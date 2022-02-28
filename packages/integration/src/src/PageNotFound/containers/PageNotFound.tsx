import * as React from "react";
import error from "src/assets/img/404.svg";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch } from "react-redux";
import { trySetUserDetailAction } from "../../redux/store/app";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  },
  img: {
    width: "19%"
  },
  title: {
    fontSize: 24,
    color: theme.palette.blue.main
  },
  content: {
    height: 200,
    padding: "20px 0",
    display: "contents"
  },
  txt: {
    lineHeight: 1.8
  },
  link: {
    paddingTop: 20,
    textAlign: "center",
    width: "100%",
    display: "block"
  }
}));

export default function PageNotFound() {
  const classes = useStyles({});
  const SUCCESS_LOGIN_PATH: string = "/generation/template/list/";

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(trySetUserDetailAction());
  }, [dispatch]);

  return (
    <section className={classes.root}>
      <div className={classes.content}>
        <img className={classes.img} src={error} alt="page not found"/>
        <h1 className={classes.title}
          data-testid="not-found-title">
          We're sorry. We couldn't find the page
        </h1>
        <p className={classes.txt}>
          If you need immediate help, please contact us
        </p>
        <a className={classes.link} href={`${window.location.origin}${SUCCESS_LOGIN_PATH}`}>
          Go to the list of project
        </a>
      </div>
    </section>
  );
}
