import makeStyles from "@mui/styles/makeStyles";

export const useListDetails = makeStyles(theme => ({
  root: {
    width: "585px",
    alignItems: "flex-start",
    bgcolor: "none",
    borderBottom: theme.shape.border.solidGrey
  }
}));
