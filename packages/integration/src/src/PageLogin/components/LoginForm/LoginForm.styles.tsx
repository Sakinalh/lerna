import makeStyles from "@mui/styles/makeStyles";

export const loginFormStyle = makeStyles(theme => ({
  root: {
    width: "29.9305555556%",
    maxWidth: "431",
    maxHeight: "550px",
    fontFamily: "Open Sans",
    padding: "79px 91px",
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
    boxShadow: "0 0 10px 0 rgba(218, 220, 224, 0.5)",
    backgroundColor: "#fff",
    boxSizing: "border-box"
  },
  heading: {
    marginBottom: 40
  },
  footer: {
    marginTop: 35,
    textAlign: "center"
  },
  hint: {
    textAlign: "right",
    paddingTop: 5
  },
  reset: {
    color: theme.palette.blue.main,
    textDecoration: "underline",
    display: "inline-block",
    marginTop: 15,
    marginBottom: 40
  },
  signUp: {
    marginTop: 35,
    color: theme.palette.blue.main,
    textDecoration: "underline"
  },
  textFields: {
    width: "100%",
    // margin: "10px 0px",

    "& .MuiOutlinedInput-root": {
      height: 35
    },
    "& + &": {
      marginTop: 30

    }
  },
  error: {
    color: theme.palette.red.main
  },
  button: {
    "&:hover": {
      backgroundColor: theme.palette.blue.main
    }
  }
}));