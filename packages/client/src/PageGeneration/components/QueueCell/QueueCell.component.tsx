import { ReactNode } from "react";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  cell: {
    display: "flex",
    width: "100%",
    height: theme.shape.constShape.queueCellHeight,
    position: "relative",
    "&::before": {
      content: "''",
      borderTop: "1px solid #F2F2F2",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0
    }
  }
}));

interface QueueCellProps {
    customStyle?: Object;
    children: ReactNode;
    node?: "div" | "li"
}

export function QueueCell({ children, customStyle = {}, node = "li" }: QueueCellProps) {
  const classes = useStyles({});
  const Node = node;
  return (
    <Node
      className={clsx(classes.cell, customStyle)}>
      {children}
    </Node>
  );
}
