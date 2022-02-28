import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "&.textArea": {
      paddingLeft: 12,
      paddingTop: 12,
      minHeight: 126,
      boxSizing: "border-box",
      resize: "none",
      borderRadius: 3,
      "&:disabled": {
        background: theme.palette.grey.middle1,
        cursor: "not-allowed"
      },
      "&__outline": {
        "&--root": {
          background: theme.palette.white,
          border: `2px solid ${theme.palette.grey.middle1}`,
          color: theme.palette.black,
          fontFamily: "Open Sans",
          fontSize: 16,
          lineHeight: "18px",
          "&:focus": {
            background: theme.palette.white,
            border: `2px solid ${theme.palette.blue.main}`,
            color: theme.palette.black
          }
        }
      }
    }
  }
}));
