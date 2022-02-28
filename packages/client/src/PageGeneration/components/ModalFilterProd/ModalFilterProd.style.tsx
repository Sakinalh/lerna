import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  root: {
    "& .filterProd": {
      padding: "6px 12px",
      width: 272,
      "&__search": {
        marginBottom: 8,
        width: "100%",
        "& .MuiInputBase-root": {
          height: 35
        }
      },
      "&__form": {
        width: "100%",
        overflowY: "hidden",
        overflowX: "hidden",
        position: "relative",
        height: "auto",
        "&--container": {
          position: "absolute",
          width: "200%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexWrap: "nowrap",
          transition: "0.25s transform"
        },
        "&--first": {
          width: "100%",
          boxSizing: "border-box",
          padding: "0 5px"
        },
        "&--second": {
          width: "100%",
          boxSizing: "border-box",
          padding: "0 5px"
        }
      },
      "&__header": {
        position: "relative",
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 22,
        "& > *": {
          "&:first-child": {
            position: "absolute",
            left: 0,
            top: -3,
            width: 28,
            height: 28,
            color: theme.palette.black,
            cursor: "pointer"
          },
          "&:last-child": {
            fontSize: 14,
            fontWeight: 600,
            color: theme.palette.black,
            fontFamily: "Open Sans",
            textTransform: "capitalize"
          }
        }
      },
      "&__subTitle": {
        marginBottom: 8,
        color: theme.palette.black,
        textTransform: "capitalize"
      },
      "&__input": {
        marginBottom: 8,
        "& .MuiOutlinedInput-root": {
          height: 35
        }
      },
      "&__footer": {
        "& > .button": {
          marginRight: 16,
          "&:last-child": {
            marginRight: 0
          }
        }
      }
    }
  }
}));
