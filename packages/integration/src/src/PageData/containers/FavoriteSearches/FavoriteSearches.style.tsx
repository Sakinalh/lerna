import makeStyles from "@mui/styles/makeStyles";

export const optimSearchPage = makeStyles(theme => ({
  root: {
    "& li > button": {
      cursor: "pointer",
      "&[aria-current=true]": {
        border: "1px solid " + theme.palette.blue.main,
        backgroundColor: "transparent",
        borderRadius: "3px",
        color: theme.palette.blue.main,
        "&:hover": {
          backgroundColor: theme.palette.blue.light
        }
      }
    }
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
    height: "90px"
  },
  listItemFavSearch: {
    padding: "20px",
    overflowY: "scroll",
    flex: 1
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: theme.palette.grey.light,
    height: "123px",
    position: "relative",
    bottom: "0px",
    width: "100%"
  },
  paginator: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  inputSearch: {
    "& .MuiInputBase-root": {
      height: 35
    }
  }
}));
