import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    backgroundColor: props =>
      (props.isModified || props.isSearch) ? theme.palette.blue.middle :
        (props.isActifContainer) ? theme.palette.primary.main : theme.palette.grey.light,
    color: props => (!props.isActifContainer && !props.isModified) ? theme.palette.black : theme.palette.white,
    maxWidth: 348,
    borderRadius: 3,
    height: 38,
    padding: "8px 15px 8px 15px",
    display: "inline-flex",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  dot: {
    display: "block",
    background: props => props.isActifContainer ? theme.palette.white : theme.palette.blue.main,
    width: 11,
    height: 11,
    borderRadius: "50%",
    marginRight: 5
  },
  close: {
    paddingLeft: 9,
    cursor: "pointer",
    fontSize: 12,
    color: props => props.isActifContainer ? theme.palette.white : theme.palette.grey.middle1

  }
}));
