import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1,
    position: "relative",
    borderRadius: "3px",
    border: `1px solid ${theme.palette.grey.middle1}`,
    "&.isSelected": {
      border: `1px solid ${theme.palette.blue.main}`,
      boxShadow: `0 3px 2px 0 ${theme.palette.grey.light}`
    },
    background: theme.palette.white,
    "&.onlyImg": {
      "& .cardImg__body": {
        padding: 0
      }
    },
    "&.isCursor": {
      cursor: "pointer"
    },
    "& .cardImg": {
      "&__header": {
        position: "relative",
        objectFit: "center center"
      },
      "&__img": {
        width: "100%",
        display: "block",
        background: "grey",
        height: 142,
        objectFit: "cover"
      },
      "&__tag": {
        top: 11,
        right: 11,
        position: "absolute"
      },
      "&__body": {
        padding: "16px 12px"
      },
      "&__title": {
        fontFamily: "Poppins",
        fontSize: 14,
        fontWeight: 600,
        lineHeight: "18px",
        color: theme.palette.black,
        minHeight: 36,
        "& a": {
          textDecoration: "none",
          color: theme.palette.black,
          "&:hover": {
            textDecoration: "underline"
          }
        }
      },
      "&__description": {
        marginTop: 5,
        fontFamily: "Open Sans",
        fontSize: 12,
        color: theme.palette.grey.middle1,
        lineHeight: "16px",
        minHeight: 32,
        "&--wrapper": {
          overflowY: "scroll",
          scrollbarColor: "lightblue",
          scrollbarWidth: "thin",
          scrollBehavior: "smooth",
          maxHeight: "176px"
        }
      },
      "&__linkTo": {
        marginTop: 5,
        fontFamily: "Open Sans",
        fontSize: 12,
        color: theme.palette.grey.middle1,
        lineHeight: "16px",
        minHeight: 32,
        display: "inline-block"
      },
      "&__price": {
        marginTop: 8,
        fontFamily: "Poppins",
        fontSize: 20,
        color: theme.palette.black
      },
      "&__footer": {
        padding: "0 12px",
        boxSizing: "border-box",
        height: 35,
        display: "flex",
        borderTop: `1px solid ${theme.palette.grey.middle2}`
      },
      "&__icons": {
        "& > *": {
          cursor: "pointer",
          fontSize: 14,
          fill: theme.palette.grey.dark,
          marginRight: 8,

          "&:hover, &:hover g": {
            fill: theme.palette.blue.main
          }
        }
      }
    }
  }
}));
