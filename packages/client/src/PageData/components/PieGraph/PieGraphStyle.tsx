import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    height: "190px",
    width: "190px",
    position: "relative"
  },
  score: {
    width: 88,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  },
  label: {
    fontSize: 12,
    color: theme.palette.black,
    letterSpacing: "-0.25px",
    display: "block",
    textAlign: "center",
    fontFamily: "Open Sans",
    fontWeight: 400,
    marginBottom: 10
  },
  total: {
    fontSize: 24,
    background: theme.palette.green.main,
    color: theme.palette.white,
    letterSpacing: "-0.6px",
    display: "block",
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: 500,
    borderRadius: 24,
    height: 36,
    lineHeight: "36px"
  }
}));
