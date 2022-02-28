import makeStyles from "@mui/styles/makeStyles";

export const useStylesTooltips = makeStyles(theme => ({
  root: {
    background: theme.palette.white,
    padding: "16px",
    borderRadius: 3,
    border: `1px solid ${theme.palette.grey.middle2}`,
    boxSizing: "border-box",
    position: "relative",
    filter: "drop-shadow(3px 0px 2px #F1F3F9)"
  },
  match: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    height: 24,
    padding: "0 12px",
    marginLeft: 6
  },
  date: {
    marginBottom: 14
  },
  li: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 8,
    textTransform: "capitalize"
  },
  round: {
    marginRight: 8,
    display: "inline-block",
    height: 15,
    width: 15,
    borderRadius: "50%",
    borderWidth: 4,
    borderStyle: "solid"
  }
}));