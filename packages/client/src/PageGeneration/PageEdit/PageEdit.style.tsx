import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  root: {
    "& .container": {
      padding: "16px 15px",
      border: `1px solid ${theme.palette.grey.middle1}`,
      borderTop: "none",
      width: 257,
      "&--screen": {
        height: "calc(100vh - 96px)"
      },
      "&--sticky": {
        position: "sticky",
        top: 47
      },
      "&--center": {
        display: "flex",
        justifyItems: "center",
        alignItems: "center"
      },
      "&--little": {
        background: theme.palette.grey.light,
        width: 290,
        padding: "9px 9px"
      }
    }
  },

  popover: {
    pointerEvents: "none"
  }
}));
