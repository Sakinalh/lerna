import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "& .paper--root": {
      inset: "initial",
      bottom: 0,
      borderRadius: "0 0 3px 3px",
      boxShadow: "none",
      borderWidth: "0px 1px 1px 1px",
      borderStyle: "none solid solid solid",
      borderColor: theme.palette.grey.middle1,
      boxSizing: "border-box",
      minWidth: "100%"
    },
    padding: "10px 7px",
    justifyContent: "flex-start",
    alignItems: "center",
    minWidth: "100%",
    borderRadius: 3,
    cursor: "pointer",
    position: "relative",
    boxSizing: "border-box",
    marginBottom: 16,
    "&.isOpen": {
      "&::before": {
        content: "''",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: "0%",
        borderWidth: "1px 1px 0 1px",
        borderStyle: "solid solid none solid",
        borderColor: theme.palette.grey.middle1,
        boxSizing: "border-box",
        borderRadius: 3
      },
      "&::after": {
        content: "''",
        height: 1,
        width: "90%",
        background: theme.palette.grey.middle1,
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)"
      }
    }
  },
  block: {
    display: "flex",
    justifyContent: "flex-start",
    border: "1px solid #E6E8ED",
    padding: "8px 9px",
    alignItems: "center",
    borderRadius: 3,
    zIndex: 10,
    boxSizing: "border-box",
    minHeight: 48
  },
  popper: {
    zIndex: 10,
    width: 245,
    borderRadius: 3,
    border: "1px solid #E6E8ED",
    left: -8
  },
  customerId: {
    fontFamily: "Open Sans",
    fontSize: 14,
    fontWeight: 600,
    color: "#434343"
  },
  splitBui: {
    display: "block",
    width: "100px",
    fontSize: "11px",
    overflow: "hidden",
    wordWrap: "break-word",
    textOverflow: "ellipsis",
    maxHeight: "16px",
    lineHeight: "16px",
    fontWeight: 400,
    color: "#434343"
  },
  caption: {
    fontFamily: "Open Sans",
    fontSize: 11,
    color: "#434343"
  },
  logo: {
    width: 20,
    height: 20
  }
}));
