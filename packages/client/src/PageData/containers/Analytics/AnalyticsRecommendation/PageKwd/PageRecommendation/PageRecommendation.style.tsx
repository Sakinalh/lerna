import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  section: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    marginTop: "32px"
  },
  aside: {
    width: "100%",
    height: "100%",
    marginRight: 5,
    marginLeft: 5
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "40px",
    "& button": {
      textTransform: "none"
    }
  }
}));