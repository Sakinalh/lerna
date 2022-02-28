import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    height: "100%",
    padding: "70px 0 70px 0",
    boxSizing: "border-box"
  },
  title: {
    paddingBottom: 37,
    display: "flex",
    flexDirection: "row",
    "& h2": {
      position: "relative",
      top: 8
    }
  },
  label: {
    position: "relative",
    bottom: "-50px",
    display: "flex",
    flexDirection: "column",
    fontSize: 14
  },
  input: {
    marginLeft: 24,
    "& input": {
      width: 160,
      height: 35
    }
  },
  name: {
    fontWeight: 600,
    fontSize: 18,
    fontFamily: "Poppins"
  },
  dot: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    justifyContent: "center",
    boxSizing: "border-box",
    margin: 0,
    minWidth: 52,
    padding: "0 10px",
    alignItems: "center",
    height: 24,
    borderRadius: 20,
    cursor: "pointer",
    fontWeight: 700,
    flex: "0 0 auto"
  },
  nbChanges: {
    fontWeight: 600,
    fontSize: 18,
    marginRight: 20
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 40
  },
  details: {
    fontWeight: 400,
    marginTop: 10,
    color: theme.palette.grey.middle1,
    fontSize: 14,
    fontFamily: "Open Sans",
    maxWidth: "500px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  timeline: {
    boxSizing: "border-box",
    height: 292,
    width: "100%",
    overflowY: "auto",
    alignItems: "flex-start"
  },
  timelineRoot: {
    "&::before": {
      flex: "0 0 auto"
    }
  },

  timelineContent: {
    display: "inline-block",
    width: "100%",

    marginLeft: 30
  }
}
));