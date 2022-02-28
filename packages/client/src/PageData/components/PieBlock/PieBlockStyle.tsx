import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    paddingBottom: 25
  },
  sum: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 18,
    lineHeight: "27px",
    marginBottom: 13,
    display: "block"
  },
  main: {
    height: "calc(100% - 45px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  status: {
    paddingLeft: 20
  },
  labelIcon: {
    marginBottom: 11,
    "&:last-child": {
      marginBottom: 0
    },
    whiteSpace: "nowrap"
  }
}));
