import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "&.tag": {
      fontFamily: "Open Sans",
      fontSize: 14,
      background: theme.palette.white,
      padding: "6px",
      fontWeight: 600,
      display: "inline-block",
      borderRadius: "11.5px",
      whiteSpace: "nowrap",

      "&--more": {
        color: theme.palette.green.main
      },

      "&--less": {
        color: theme.palette.red.main
      },

      "&--neutral": {
        color: theme.palette.yellow.main
      }
    }
  }
}));
