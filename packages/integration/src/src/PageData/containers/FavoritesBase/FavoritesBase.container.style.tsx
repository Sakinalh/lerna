import makeStyles from "@mui/styles/makeStyles";

export const useContainerStyle = makeStyles(theme => ({
  colorPrimary: {
    backgroundColor: theme.palette.white,
    color: theme.palette.black
  },
  baseContainer: {
    paddingTop: "32px", display: "flex", flexDirection: "column", flex: 1
  },
  toolbar: {
    display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "15px"
  },
  backButton: {
    display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"
  }
}));

export const useGlobalPageStyle = makeStyles(theme => ({
  button: {
    textTransform: "none",
    border: "none",
    ":hover": {
      border: "none"
    }
  }
}));
