import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 12,
    "& .header": {
      padding: "30px 16px 0px 16px",
      display: "flex",
      justifyContent: "space-between",

      "&__title": {
        marginBottom: 20
      }
    }
  },
  tabsAction: {

  },
  container: {
    display: "flex",
    borderBottom: `1px solid ${theme.palette.grey.middle2}`
  },
  aside: {
    marginRight: 27,
    display: "flex",
    marginBottom: "auto",

    "& > *:first-child": {

      marginRight: 8

    }
  }
}));
