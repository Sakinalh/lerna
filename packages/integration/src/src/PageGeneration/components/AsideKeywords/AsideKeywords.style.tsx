import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  root: {
    "& .asideKeywords": {
      "&__btnAction": {
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"

      },
      "&__search": {
        marginBottom: 13,
        "& > *": {
          width: "100%"
        }
      },
      "&__filter": {
        marginBottom: 13
      }
    },
    "& .keywordsFilter": {
      "&.isOpen": {
        "& .keywordsFilter__container": {
          background: theme.palette.grey.light
        }
      },
      "&__container": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "transparent",
        marginRight: 5,
        paddingLeft: 5,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 2
      },
      "&__icon": {
        "& > span:first-child": {
          height: 28,
          width: 28
        },
        "& svg": {
          color: theme.palette.grey.dark
        }
      },
      "&__label": {
        textTransform: "uppercase",
        fontFamily: "Poppins",
        color: theme.palette.black,
        fontSize: 14,
        fontWeight: 600
      }
    }
  },
  popover: {
    pointerEvents: "none"
  }
}));
