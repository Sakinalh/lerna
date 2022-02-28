import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.blue.light,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    width: "100%",
    padding: "26.6px 41px 41px 30px"

  },
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    boxSizing: "border-box",
    width: "100%",
    padding: "41px 0px 92px 0px",
    overflow: "hidden"

  },
  tableTitle: {
    color: theme.palette.grey.middle1,
    marginBottom: 48
  },
  table: {
    minWidth: 828,
    Height: 634,
    overflowY: "scroll",
    overflowX: "hidden",
    "& td": {
      padding: "37px 70px 30px",
      width: "25%",
      boxSizing: "border-box",
      borderRight: `solid 1px ${theme.palette.grey.middle2}`,
      borderLeft: "none"
    },
    "& td:last-child": {
      borderRight: "none"
    },
    "& tr:nth-child(odd)": {
      borderColor: "red",
      borderBottom: `solid 1px ${theme.palette.grey.middle2}`
    }
  },
  cardContent: {
    minWidth: 100, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", position: "relative"
  },
  minimizeIcon: {
    position: "absolute",
    top: 14,
    right: 11,
    cursor: "pointer"
  },
  value: {
    fontWeight: 600,
    fontSize: 32,
    lineHeight: 48,
    align: "center"
  },
  chipContent: {
    fontWeight: 700,
    fontFamily: "Open sans",
    fontSize: 12,
    lineHeight: 16.34,
    align: "center",
    color: theme.palette.white,
    height: 24,
    minWidth: 55.05
  }
}));