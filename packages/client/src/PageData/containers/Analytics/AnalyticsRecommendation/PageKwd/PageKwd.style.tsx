import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  section: {
    flex: 1,
    backgroundColor: theme.palette.blue.light,
    padding: "32px",
    fontSize: 12
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
  },

  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: 20
  },
  switchMode: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  root: {
    fontSize: 12,
    "& .header": {
      padding: "30px 16px 0px 16px",
      display: "flex",
      justifyContent: "space-between",
      "&__title": {
        marginBottom: 20
      }
    }
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 27
  },
  aside: {
    whiteSpace: "nowrap",
    display: "flex",
    marginBottom: "auto"
  }
}));
