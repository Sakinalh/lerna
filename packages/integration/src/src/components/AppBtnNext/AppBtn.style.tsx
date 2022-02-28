import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    height: "35px",
    boxSizing: "border-box",
    borderRadius: "3px",
    textTransform: "none"
  },
  label: {
    fontSize: "14px",
    fontWeight: "700 !important"
  },
  containedPrimary: {
    color: theme.palette.white,
    backgroundColor: theme.palette.blue.main,
    "&:hover": {
      backgroundColor: theme.palette.blue.main
    }
  },
  outlinedPrimary: {
    backgroundColor: theme.palette.white,
    color: theme.palette.blue.main,
    border: `1px solid ${theme.palette.blue.main}`,
    "&:hover": {
      border: `1px solid ${theme.palette.blue.main}`
    }
  },
  containedSecondary: {
    color: theme.palette.white,
    backgroundColor: theme.palette.red.main,
    "&:hover": {
      backgroundColor: theme.palette.red.main
    }

  },
  outlinedSecondary: {
    color: theme.palette.red.main,
    backgroundColor: theme.palette.white,
    "&:hover": {
      border: `1px solid ${theme.palette.red.main}`
    },
    border: `1px solid ${theme.palette.red.main}`
  },
  disabled: {
    color: theme.palette.grey.dark,
    border: `1px solid ${theme.palette.grey.dark}`,
    fontWeight: 700
  }
}));
