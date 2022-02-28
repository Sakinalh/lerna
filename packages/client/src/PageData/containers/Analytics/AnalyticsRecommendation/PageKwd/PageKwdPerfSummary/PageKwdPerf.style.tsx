import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    padding: "0px",
    paddingTop: "15px"
  },
  section: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  box: {
    height: "168px", width: "66.3366336634%", display: "flex", flexDirection: "row", borderRadius: 3
  },
  mmCard: {
    height: 168,
    minWidth: 168,
    width: "15.1215121512%",
    marginLeft: "1.7101710171%",
    marginRight: "1.7101710171%",
    display: "flex",
    boxSizing: "border-box",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  customCard: { height: 168, minWidth: 168, width: "25%", boxSizing: "border-box", padding: "20px 17px 0px 17px", backgroundColor: theme.palette.white, borderRadius: "3px", display: "flex", flexDirection: "column"},
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
  }
}));