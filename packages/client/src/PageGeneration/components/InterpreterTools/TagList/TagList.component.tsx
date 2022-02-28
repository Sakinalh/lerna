import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: "5px 0"
  },
  item: {
    backgroundColor: theme.palette.blue.main,
    color: "white",
    padding: "3px 4px",
    fontSize: ".8em",
    borderRadius: theme.shape.border.radiusMin,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center"

  },
  default: {
    backgroundColor: theme.palette.blue.main,
    marginRight: 5
  },
  positive: {
    backgroundColor: theme.palette.green.main,
    marginRight: 5
  },
  negative: {
    backgroundColor: theme.palette.error.main,
    marginRight: 5
  }
}));

interface TagListProps {
    sources: Array<any>;
    type: "default" | "positive" | "negative";
    getter: Function;
}

export function TagList(props: TagListProps) {
  const { sources, type = "default", getter } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      {
        sources.map((s, _idx) =>
          <div className={clsx(classes.item, classes[type])}
            key={`${type}_${_idx}`}>
            {getter(s)}

          </div>)
      }
    </div>
  );
}
