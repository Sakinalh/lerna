import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "& .noPageCards": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      "&__icon": {
        color: theme.palette.grey.middle1,
        fontSize: 146,
        marginBottom: 10
      },
      "&__txt": {
        color: theme.palette.grey.middle1
      }
    },
    "& .container__products": {
      marginTop: 12,
      marginRight: 5,
      padding: "0  12px 0 12px",
      overflowX: "hidden",
      overflowY: "scroll",
      scrollbarWidth: "thin",
      height: "calc(100vh - 175px - 75px)",
      "&--error": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        "& svg": {
          color: theme.palette.grey.middle1,
          fontSize: "146px",
          fontFamily: "Open Sans",
          fontWeight: 600
        },
        "& p": {
          color: theme.palette.grey.middle1,
          fontSize: 18,
          fontFamily: "Open Sans",
          fontWeight: 600,
          lineHeight: "26px"
        }
      }
    }
  }
}));
