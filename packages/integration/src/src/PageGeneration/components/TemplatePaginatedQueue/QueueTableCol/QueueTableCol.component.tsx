import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";

export const CELL_HEAD = {
  padding: "10px 0",
  minHeight: 20,
  justifyContent: "center",
  color: "#95969B",
  "&::before": {
    content: "''",

    borderTop: "1px solid #F2F2F2",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  "&::after": {
    content: "''",
    borderBottom: "1px solid #F2F2F2",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  header: {
    display: "flex",
    position: "relative",
    textTransform: "capitalize",
    ...CELL_HEAD,
    "&:nth-child(2)": {
      borderRight: theme.shape.border.solidGrey
    }
  }
}));

interface QueueTableColProps {
    colName: string;
    children: React.ReactElement;
}

export function QueueTableCol(props: QueueTableColProps) {
  const classes = useStyles({});
  const { colName, children } = props;

  return (
    <div className={classes.root}>
      <div className={classes.header}>{colName}</div>
      {children}
    </div>
  );
}
