import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { QueuedItemStatus } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { AppText } from "../../../../components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: { backgroundColor: theme.palette.white },
  labels: {
    display: "flex",
    justifyContent: "space-between"
  },
  label: {
    paddingBottom: 7,
    color: theme.palette.grey.dark
  },
  meter: {
    height: 10,
    border: `.5px solid ${theme.palette.grey.light}`,
    borderRadius: 3,
    overflow: "hidden"
  },
  progress: {
    display: "block",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    backgroundColor: theme.palette.grey.light,
    animation: "$progressBar 3s ease-in-out",
    animationFillMode: "both"
  },
  "@keyframes progressBar": {
    "0%": {
      width: 0
    },
    "100%": {}
  },
  validation: {
    backgroundColor: theme.palette.grey.light,
    color: theme.palette.grey.light
  },
  processed: {
    backgroundColor: theme.palette.green.main,
    color: theme.palette.green.main
  },
  in_progress: {
    backgroundColor: theme.palette.blue.main,
    color: theme.palette.blue.main,
    opacity: 0.6
  },
  error: {
    backgroundColor: theme.palette.red.light,
    color: theme.palette.red.main
  }
}));

interface ProgressCellProps {
    value: number;
    status: QueuedItemStatus;
}

function setLabel(status: QueuedItemStatus) {
    enum StateLabel {
        validation = "validating",
        in_progress = "generation in progress",
        processed = "success",
        error = "error"
    }
    return StateLabel[status];
}

export function ProgressCell(props: ProgressCellProps) {
  const { value, status } = props;
  const classes = useStyles();
  const label = setLabel(status);

  return (
    <div className={classes.root}>
      <div className={classes.labels}>
        <AppText text={TRANSLATE.progress}
          themeColor={"neutralColor"}
          capitalize="first"
          props={{ classes: { root: classes.label } }}
        />
        <AppText text={label}
          themeColor={"neutralColor"}
          capitalize="first"
          props={{ classes: { root: classes.label } }}
        />
      </div>
      <div className={classes.meter}>
        <span style={{ width: `${value}%` }}
          className={clsx(classes.progress, classes[status])}/>
      </div>
    </div>
  );
}
