import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  messageMatch: {
    borderRadius: 12,
    padding: "0 12px",
    height: 24,
    lineHeight: "24px",
    textAlign: "center",
    display: "inline-block"
  },
  cell: {
    verticalAlign: "middle",
    position: "relative"
  },
  page: {
    paddingBottom: 15
  },
  logo: {
    width: 15,
    position: "absolute",
    right: 10,
    bottom: 10
  },
  truncate: {
    overflow: "hidden",
    display: "-webkit-box",
    lineClamp: 3,
    boxOrient: "vertical"
  },
  border: {
    borderRight: `1px solid ${theme.palette.grey.middle2}`
  },
  tableCellRoot: {
    borderBottom: `1px solid ${theme.palette.grey.middle2}`,
    boxSizing: "border-box",
    width: 170
  },
  tableCellHead: {
    padding: "0px 22px",
    height: "69px",
    background: theme.palette.grey.light,
    color: theme.palette.grey.dark,
    textTransform: "capitalize",
    boxSizing: "border-box"
  },
  tableCellBody: {
    padding: "18px 22px",
    height: 125,
    boxSizing: "border-box",
    cursor: "pointer"
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    background: theme.palette.grey.light,
    paddingRight: 35
  },
  tablePaginationActions: {
    display: "none"
  },
  tablesBody: {
    display: "flex",
    flexWrap: "nowrap"
  },
  paperRoot: {
    borderRadius: 0
  }
}));