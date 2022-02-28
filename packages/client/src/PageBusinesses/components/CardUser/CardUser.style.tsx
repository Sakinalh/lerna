import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  user: {
    display: "flex",
    alignItems: "flex-start",
    fontWeight: 600,
    fontSize: "14px",
    padding: "20px 0",
    boxSizing: "border-box"
  },
  logo: {
    height: 42,
    width: 42,
    paddingRight: 15,
    display: "block"
  },
  card: {
    backgroundColor: theme.palette.blue.light,
    padding: "40px 0.7951653944% 30px 0.7951653944%",
    boxSizing: "border-box",
    height: "100%",
    marginLeft: 20,
    width: "38.1679389313%",
    marginRight: 0,
    boxShadow: "8px 8px 28px rgba(0, 0, 0, 0.15)"
  },
  listMui: {
    // height: "calc(100% - 400px)",
    overflowY: "auto",
    marginTop: 31,
    "&::-webkit-scrollbar": {
      width: "5px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey.middle,
      outline: `1px solid ${theme.palette.grey.middle}`,
      borderRadius: 90
    }
  }
}));