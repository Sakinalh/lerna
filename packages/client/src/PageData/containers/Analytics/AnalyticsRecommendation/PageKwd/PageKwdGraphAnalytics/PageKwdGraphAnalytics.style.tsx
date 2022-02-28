import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.white,
    padding: "32px 26px",
    borderRadius: 4
  },
  graph: {
    height: 215,
    width: "100%",
    cursor: "col-resize"
  }
}));