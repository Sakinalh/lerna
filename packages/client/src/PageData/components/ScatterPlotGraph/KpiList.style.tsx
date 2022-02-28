import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  listItemButton: {
    fontFamily: "Open Sans",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "19.07px",
    paddingLeft: 8,
    "&:hover": { backgroundColor: theme.palette.blue.main, color: theme.palette.white }
  },
  kpiList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bottom: "45px",
    position: "relative"
  },
  collapse: {
    position: "absolute",
    zIndex: 2000,
    backgroundColor: theme.palette.white,
    border: theme.shape.border.solidGrey,
    borderRadius: theme.shape.border.radiusMin,
    width: "250px",
    right: "38%",
    top: "34px",
    left: "50%",
    transform: "translate(-50%, 0%)"
  }
}));
