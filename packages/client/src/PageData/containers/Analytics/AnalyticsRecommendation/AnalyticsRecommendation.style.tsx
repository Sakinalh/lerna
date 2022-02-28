import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    fontSize: 12,
    "& .header": {
      padding: "30px 16px 0px 16px",
      display: "flex",
      alignItems: "center",
      "&__title": {
        lineHeight: "1",
        marginRight: 20
      },
      "&__baseline": {
        lineHeight: "1",
        marginLeft: 20,
        maxWidth: 300
      }
    }
  },
  container: {
    boxSizing: "border-box",
    padding: "0 0 10px 10px",
    marginTop: 20,
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
  },
  backButton: {
    display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"
  }
}));
