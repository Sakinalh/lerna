import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  block: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    height: 110
  },
  caption: {
    fontFamily: "Open Sans",
    fontSize: "11px",
    color: theme.palette.black
  },
  column: {
    fontFamily: "Open Sans",
    fontSize: "14px",
    fontWeight: 700,
    color: theme.palette.black
  },
  logo: {
    height: 20,
    width: 20,
    paddingRight: 15
  }
}));
