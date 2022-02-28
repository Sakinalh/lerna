import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { ReactNode } from "react";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "75% 25%",
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
});

interface QueueKwdAreasPairColWrapperProps {
    children: ReactNode;
    customStyle?: Object
}

// simple style wrapper to glue area/score width
// in the column header and cells
export function QueueKwdAreasPairColWrapper({ children, customStyle }: QueueKwdAreasPairColWrapperProps) {
  const classes = useStyles({});

  return (

    <div className={clsx(classes.root, customStyle)}>
      {children}
    </div>

  );
}
