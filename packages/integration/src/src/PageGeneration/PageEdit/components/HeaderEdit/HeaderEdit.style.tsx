import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  root: {
    "& .breadcrumb": {
      paddingLeft: 12,
      top: 2,
      position: "relative",
      display: "inline-block",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: 16,
      minWidth: "50%",
      "&__current": {}
    },
    "&.header": {
      borderBottom: `1px solid ${theme.palette.grey.middle1}`,
      background: theme.palette.white,
      padding: "10px 16px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 55
    },
    "& .gridHeader": {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center"
    },
    "& .header": {
      "&__btns": {
        "& > *:first-child": {
          marginRight: 16
        }
      },
      "&__recommendations": {
        display: "inline-flex",
        marginRight: 14,
        color: "rgba(35, 31, 32, 0.87)",
        fontFamily: "Open Sans",
        fontSize: 14
      },

      "&__title": {
        position: "relative",
        paddingLeft: 12,
        color: theme.palette.black
      },
      "&__back": {
        height: 34,
        width: 34,
        "& > span:first-child": {
          height: 34,
          width: 34
        }
      }
    }
  }
}));
