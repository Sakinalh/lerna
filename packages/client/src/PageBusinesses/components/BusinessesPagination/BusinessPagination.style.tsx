import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    // position: "absolute",
    width: "100%",
    // bottom: "0px",
    // width: "calc(100% - 230px)",
    textAlign: "center"
  },
  nav: {
    width: "376",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    height: "19px",
    width: "44px",
    fontSize: "11px",
    fontWeight: 700,
    color: "black",
    marginLeft: "10px",
    marginRight: "30px"
  }
}));
