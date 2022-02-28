import makeStyles from "@mui/styles/makeStyles";

export const SignUpStyle = makeStyles(theme => ({
  root: {
    position: "relative",
    boxSizing: "border-box",
    fontFamily: "Open Sans",
    width: "67.7083333333%",
    maxWidth: "975px",
    padding: "35px 0",
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
    boxShadow: "0 0 10px 0 rgba(218, 220, 224, 0.5)",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"

  },
  container: {
    width: "36.6666666667%",
    minWidth: "528px",
    "&.isSucess": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"

    }

  },
  back: {
    display: "flex",
    position: "absolute",
    left: 0,
    top: -14.63,
    transform: "translate(0%,-100%)",
    alignItems: "center"
  },
  header: {
    marginBottom: 40
  },
  fieldset: {
    position: "relative",
    marginBottom: 30,
    "&.noMargin": {
      marginBottom: 0,
      marginLeft: -10

    },
    "& .MuiOutlinedInput-root": {
      height: 35
    },
    "& .MuiFormHelperText-root": {
      position: "relative",
      display: "block",
      color: "red"
    }
  }

}));