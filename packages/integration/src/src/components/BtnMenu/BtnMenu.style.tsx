import makeStyles from "@mui/styles/makeStyles";

export const btnMenuStyle = makeStyles(theme => ({
  root: {
    "& > button": {
      minWidth: "auto",
      padding: "0 0 0 5px",
      color: "inherit",
      "& .btnContainer ": {
        color: theme.palette.blue.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > span ": {
          "& > svg": {
            fill: theme.palette.blue.main
          }
        }
      }
    }
  }
}));
