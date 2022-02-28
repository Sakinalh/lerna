import makeStyles from "@mui/styles/makeStyles";

export const popperOverride = makeStyles({
  root: {
    overflowY: "visible",
    overflowX: "visible"
  },
  paper: {
    overflowY: "visible",
    overflowX: "visible"
  },
  blocCategory: {
    padding: "16px",
    borderRadius: "3px",
    border: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    width: "208px",
    "& MuiTypography-body1": {
      color: "black"
    },
    "& span": {
      fontSize: "14px"
    }
  },
  arrow: {
    position: "absolute",
    left: -10, top: 12,
    backgroundColor: "transparent",
    fill: "white"
  },
  "& *": {
    fontSize: "14px"
  }
});

export const tooltipOverride = makeStyles(theme => ({
  tooltip: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.red.main,
    padding: "12px",
    borderRadius: "3px",
    justifyContent: "space-between",
    width: "158px",
    left: "-20px"
  },
  arrow: {
    color: theme.palette.red.main,
    width: "21px",
    height: "21px",
    fontWeight: 600
  },
  containerTitle: {
    display: "flex",
    fontWeight: 600,
    flexDirection: "row",
    justifyContent: "space-between"
  }
}));