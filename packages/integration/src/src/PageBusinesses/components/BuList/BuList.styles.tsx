import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme: any) => ({
  box: {
    width: "67.7083333333%" /*975px*/,
    minWidth: 975,
    height: 556,
    boxShadow: "8px 8px 28px rgba(0, 0, 0, 0.15)",
    borderRadius: theme.shape.border.radiusMin,
    padding: "66px 39px 34px 76px",
    backgroundColor: theme.palette.white,
    marginBottom: "55px",
    boxSizing: "border-box"
  },
  header: {
    display: "flex",
    marginBottom: "55px",
    justifyContent: "space-between"
  },
  textField: {
    width: "209px",
    marginRight: "14px",
    backgroundColor: theme.palette.grey.extraExtraGrey,
    "& > div": {
      height: "35px"
    },
    "& > div > input": {
      padding: 0
    }
  },
  button: {
    width: "47px",
    height: "35px",
    minWidth: 0,
    "&:focus": {
      border: "none"
    }
  },
  list: {
    height: "calc(100% - 91px)",
    padding: 0,
    paddingInline: 0,
    marginInline: 0,
    display: "block",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      borderRadius: "5px"
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)"

    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
      border: "none"

    }
  }
}));
