import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey.light,
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: 51,
    padding: "0 15px",
    "& > *": {
      marginRight: 8
    },
    "& .filterProductBtn": {
      padding: "4px 12px 3px 8px",
      color: `${theme.palette.black} !important`,
      height: 32,
      fontFamily: "Open Sans",
      fontSize: 14
    },
    "& .filtersProductNav": {
      boxSizing: "border-box",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 3,
      boxShadow: `0 0 2px 0 ${theme.palette.blue.main}`,
      border: "solid 1px transparent",
      backgroundColor: theme.palette.white,
      "&.active": {
        border: `solid 1px ${theme.palette.blue.main}`
      },
      "& > *": {
        marginRight: 4,
        "&:last-child": {
          marginRight: 0
        }
      },
      "&:last-child": {
        marginBottom: 0
      },
      "&__item": {
        height: 19,
        fontFamily: "Open Sans",
        fontSize: 14,
        color: theme.palette.black,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&--strong": {
          color: theme.palette.blue.dark
        },
        "&--close": {
          fontSize: 17,
          padding: 0,
          "& svg": {
            cursor: "pointer"
          },
          "& > span > span": {
            display: "inline-block"
          }
        },
        "&--title": {
          textTransform: "capitalize"
        }
      },
      "&__popover": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2px 4px",
        borderRadius: 3,
        "& > *": {
          marginRight: 4,
          "&:last-child": {
            marginRight: 0
          }
        },
        "&.isOpen": {
          backgroundColor: theme.palette.grey.middle1
        }
      }
    }
  }
}));
