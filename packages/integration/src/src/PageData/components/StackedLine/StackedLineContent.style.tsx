import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.white,
    padding: "28px 26px",
    borderRadius: 4
  },
  graph: {
    height: 400,
    width: "100%",
    cursor: "col-resize"
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 75,
    "& > *": {
      "&:first-child": {
        marginRight: 26
      }
    }
  }
}));