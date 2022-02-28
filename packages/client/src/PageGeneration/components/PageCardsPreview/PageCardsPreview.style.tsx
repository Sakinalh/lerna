import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "& .PageCardPreviews": {
      "&__title": {
        padding: "16px 0 16px 0",

        fontSize: 17,
        color: theme.palette.black,
        fontFamily: "Open Sans",
        fontWeight: 300
      },

      "&__bold": {
        fontSize: 17,
        color: theme.palette.black,
        fontFamily: "Open Sans",
        fontWeight: 600
      }
    }
  }
}));
