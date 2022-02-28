import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import clsx from "clsx";
import { setup } from "src/shared/translation/en.json";
import { SetupStepper } from "../SetupStepper/SetupStepper.component";
import { Typography } from "../../../deps";

const useStyles = makeStyles(theme => ({
  card: {
    width: 600,
    height: 560,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fafafa",
    boxShadow: "0 0 10px 0 rgba(218,220,224,0.5)",
    borderRadius: 12
  },
  wrap: {
    width: "100%",
    display: "flex",
    height: "80%",
    alignItems: "center"
  },
  titles: {
    marginLeft: 25,
    color: theme.palette.black,
    position: "relative",
    top: "-14%",
    width: "120%"
  },
  subtitle: {
    color: theme.palette.grey.dark,
    fontSize: 10,
    width: "75%",
    marginTop: 5
  },
  steps: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    height: "80%",
    justifyContent: "space-between"
  },
  content: {
    width: "60%",
    display: "flex",
    bottom: "12%",
    position: "relative",
    alignItems: "center",
    flexDirection: "column"
  }
}));

interface SetupCardProps {
    children: React.ReactElement;
    custom?: any;
}

export function SetupContent(props: SetupCardProps): JSX.Element {
  const classes = useStyles(props);
  const { children, custom } = props;
  const text = setup;

  return (
    <div className={classes.card}>
      <div className={classes.wrap}>
        <aside className={classes.steps}>
          <div className={classes.titles}>
            <Typography variant="body1">{text.title}</Typography>
            <Typography className={classes.subtitle} variant="body1"> {text.subtitle}</Typography>
          </div>

          <SetupStepper/>
        </aside>
        <main className={clsx(classes.content, custom)}>{children}</main>
      </div>
    </div>
  );
}
