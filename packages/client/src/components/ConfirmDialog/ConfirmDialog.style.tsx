import makeStyles from "@mui/styles/makeStyles";

export const confirmDialogStyle = makeStyles(theme => ({
  paper: {
    padding: "26px 28px 22px 32px"
  },
  root: {
    "& > button": {
      textTransform: "none",
      fontFamily: "Open Sans",
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "19.07px"
    }
  },
  icon: {
    cursor: "pointer",
    position: "absolute",
    right: "10px",
    color: theme.palette.grey.middle1
  }
}));
