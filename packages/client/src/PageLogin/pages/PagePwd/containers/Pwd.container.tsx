import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { useEffect } from "react";
import bg from "src/assets/img/login_background.svg";

const useStyles = makeStyles({
  root: {
    flex: 1,
    fontSize: 12,
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    width: 300,
    minHeight: 250,
    padding: "20px 60px",
    display: "flex",
    flexDirection: "column",
    borderRadius: 16,
    boxShadow: "0 0 10px 0 rgba(218, 220, 224, 0.5)",
    backgroundColor: "#fff"
  }

});

interface PwdContainerProps {
    children: React.ReactNode;
    purge: Function;
}

export default function PwdContainer({ children, purge }: PwdContainerProps): JSX.Element {
  const classes = useStyles({});

  useEffect(() => {
    // eslint-disable-next-line
    purge.call(undefined).then((_) => console.log("cache cleared"));
  }, [purge]);

  return (
    <article className={classes.root}>
      <section className={classes.content}>
        {children}
      </section>
    </article>
  );
}
