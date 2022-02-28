import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  section: {
    flex: 1,
    backgroundColor: theme.palette.blue.light,
    padding: "32px"
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
  tabsAction: {

  },
  content: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: 'space-between',
    // height: '100%',
    rowGap: 20
  }

}));
