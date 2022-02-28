import { Translate } from "@mui/icons-material";
import makeStyles from "@mui/styles/makeStyles";
import { relative } from "path";
export const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  circle: {
    strokeLinecap: "round",
    strokeWidth: "4px"
  },
  pieSvg: {
    width: "200px !important",
    height: "200px !important",
    overflow: "visible !important"
  },
  pie: {
    position: "relative",
    zIndex: 1,
    width: "200px !important",
    height: "200px !important",
    // transform : "scale(1.25)",
    "&::before": {
      background: theme.palette.grey.light,
      position: "absolute",
      top: "50%", /* defs svg */
      left: "50%",
      transform: "translate(-50%,-50%)",
      content: "''",
      height: 190,
      width: 190,
      borderRadius: "50%",
      zIndex: -1
    }
  },
  pieCenter: {
    position: "absolute",
    top: "50%", /* defs svg */
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: 24,
    padding: 5,
    boxSizing: "border-box",
    color: "white",
    zIndex: 2,
    width: 87,
    textAlign: "center"
  }

}));