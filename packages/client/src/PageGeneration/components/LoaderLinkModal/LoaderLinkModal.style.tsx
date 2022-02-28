import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles({
  dialog: {
    width: 534,
    padding: 0
  },
  root: {
    "& .container, &.container": {
      "&__btns": {
        "& > *": {
          marginRight: 16,

          "&:last-child": {
            marginRight: 0
          }
        }
      },
      "&__header": {
        padding: "30px 30px",
        display: "flex"
      },
      "&__body": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 30px 58px 30px",
        flexDirection: "column"
      }
    }
  }
});
