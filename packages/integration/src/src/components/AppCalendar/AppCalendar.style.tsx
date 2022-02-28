import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({

  root: {
    "& input": {
      height: "35px",
      padding: "0 12px",
      border: `1px solid ${theme.palette.grey.light}`
    }
  },
  "MuiPickersToolbar": {
    display: "none"
  }
}));
