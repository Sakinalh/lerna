import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  paper: {
    width: "calc(100% - 1.69635284139%)",
    paddingLeft: "1.69635284139% !important",
    boxSizing: "border-box",
    flex: "1 0 auto"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  title: {
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "34px",
    width: "100%"
  },
  subtitle: {
    fontSize: "24px",
    fontWeight: 300,
    lineHeight: "34px"
  },
  page: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30
  },
  buList: {
    flex: "1 0 auto",
    overflow: "auto",
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