import { ReactNode } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useTheme } from "@mui/material";

/**
 * tables are rendered by cols
 * and one keyword can have x number of row in another col.
 * the ugly hack is multiply nb Page per keyword with shared var
 * @param numRow
 */
function setKeywordRowsHeight(numRow: string, theme) {
  return {
    height: `calc(${numRow} * ${theme.shape.constShape.queueCellHeight})`,
    minHeight: theme.shape.constShape.queueCellHeight
  };
}

const useStyles = makeStyles({
  row: {
    width: "100%",
    display: "flex",
    alignItems: "center",
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

interface QueueRowProps {
    pageCount: number;
    children: ReactNode
}

export function QueueRow({ children, pageCount }: QueueRowProps) {
  const classes = useStyles({});
  const theme = useTheme();
  return (
    <li style={setKeywordRowsHeight(pageCount.toString(), theme)}
      className={classes.row}>
      {children}
    </li>
  );
}
