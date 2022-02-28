import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "& .editProduct": {
      "&__title": {
        display: "block",
        marginBottom: 12,
        fontFamily: "Open Sans",
        fontSize: 16,
        fontWeight: 600
      },
      "&__description": {
        fontFamily: "Open Sans",
        fontSize: 12,
        color: theme.palette.grey.dark
      },
      "&__input": {
        marginBottom: 16,
        width: "100%"
      },
      "&__subTitle": {
        textTransform: "capitalize",
        marginBottom: 8,
        display: "block",
        fontFamily: "Open Sans",
        fontSize: 14,
        fontWeight: 600,
        "& + .editProduct__description": {
          marginBottom: 0,
          paddingBottom: 8
        }
      },
      "&__preview": {
        padding: "11px 24px",
        width: 300
      },
      "&__edit": {
        borderLeft: `1px solid ${theme.palette.grey.middle1}`,
        padding: "12px 24px 38px 24px",
        width: "calc(100% - 300px)",
        background: theme.palette.grey.light
      }
    },
    "& .chooseImgs": {
      "&__pastille": {
        position: "absolute",
        bottom: 24,
        right: 24,
        color: theme.palette.blue.main,
        display: "none"
      },
      "&__li:first-child": {
        "& .chooseImgs__imgContainer": {
          marginLeft: 0
        }
      },
      "&__img": {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      },
      "&__imgContainer": {
        position: "relative",
        boxSizing: "border-box",
        height: 140,
        marginRight: 5,
        marginLeft: 0.5,
        borderRadius: 3,
        border: "solid 2px transparent",
        cursor: "pointer",
        "&--selected": {
          "& .chooseImgs__pastille": {
            display: "block"
          },
          border: `solid 2px ${theme.palette.blue.main}`
        }
      }
    }
  }
}));
