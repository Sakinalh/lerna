import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    width: 332,
    height: 400,
    border: `1px solid ${theme.palette.grey.middle2}`,
    boxSizing: "border-box",
    boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.05)",
    borderRadius: 4
  },
  main: {
    maxHeight: 245,
    overflowX: "auto",
    paddingBottom: 31
  },
  header: {
    padding: "21px 24px 16px 24px",
    background: theme.palette.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 72,
    _search: {
      padding: "0 24px"
    }
  },
  summary: {
    "&:hover": {
      background: theme.palette.grey.middle2
    }
  },
  summaryRoot: {
    padding: "0 24px",
    minHeight: 37,
    margin: 0,
    "&.Mui-expanded": {
      minHeight: 37
    }
  },
  summaryContent: {
    "&.Mui-expanded": {
      margin: "12px 0"
    }
  },
  detailsRoot: {
    padding: 0
  },
  formControlGroup: {
    boxSizing: "border-box",
    width: "100%",
    minHeight: 37,
    padding: "0 24px"
  },
  formControlLabel: {
    paddingLeft: 10
  },
  tooltip: {

  },
  inputSearch: {
    "& .MuiInputBase-root": {
      height: 35
    }
  }
}));

export const tooltipOverride = makeStyles(theme => ({
  tooltip: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.red.main,
    padding: "12px",
    borderRadius: "3px",
    justifyContent: "space-between",
    width: "158px",
    left: "-20px",

    "& .containerTitle": {
      display: "flex",
      fontWeight: 600,
      flexDirection: "row",
      justifyContent: "space-between"
    }
  },
  arrow: {
    color: theme.palette.red.main,
    width: "21px",
    height: "21px",
    fontWeight: 600
  }
}));