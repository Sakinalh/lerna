import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({

  root: { height: 168, boxSizing: "border-box", minWidth: 168, width: "15.1215121512%", backgroundColor: theme.palette.white, position: "relative", borderRadius: 4},
  cardContent: {
    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", padding: 0
  },
  value: {
    fontWeight: 600,
    fontSize: 32,
    lineHeight: 48,
    align: "center"
  },
  chipContent: {
    fontWeight: 700,
    fontFamily: "Open sans",
    fontSize: 12,
    lineHeight: 16.34,
    align: "center",
    color: theme.palette.white,
    height: 24,
    minWidth: 55.05
  },
  slider: {
    padding: "0 3.7px", boxSizing: "border-box", cursor: "pointer", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"
  },
  iconExpand: {
    position: "absolute",
    right: 11,
    top: 14,
    cursor: "pointer"
  }
}));