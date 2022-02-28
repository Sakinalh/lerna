import makeStyles from "@mui/styles/makeStyles";

export const useDialogActionsStyles = makeStyles(theme => ({
  root: {
    //width: "585px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0px 31px  0px 43px",
    // height: "79px",
    backgroundColor: theme.palette.grey.light
  }
}));
