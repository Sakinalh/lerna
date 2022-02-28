import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "& .dialogTitle": {
      "&--icon": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    },
    "& .appAlert": {
      "&__txt": {
        "& > * ": {
          display: "block",
          marginBottom: 24,
          "& : last-child": {
            marginBottom: 0
          }
        },
        "&--bold": {
          fontFamily: "Open Sans",
          fontSize: 16,
          fontWeight: 600,
          lineHeight: "20px",
          textAlign: "left"
        }
      },
      "&__title": {
        display: "inline-flex",
        alignItems: "center",
        padding: "0 24px",
        width: "100%",
        position: "relative",
        left: -24,
        borderBottom: `1px solid ${theme.palette.grey.middle2}`,
        height: 56,
        "& > *:first-child": {
          width: "100%"
        }
      },
      "&__titleWrapper": {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center"
      },
      "&__header": {
        display: "flex",
        justifyContent: "space-between"
      },
      "&__icon": {
        color: theme.palette.blue.main,
        fontSize: 33,
        marginRight: 11
      },
      "&__closeWrapper": {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center"
      },
      "&__close": {
        cursor: "pointer",
        translate: ".25s all",
        transform: "scale(1.1)",
        opacity: "1",
        strokeWidth: 2,
        fill: theme.palette.red.main,
        "&:hover": {
          transform: "scale(1)",
          opacity: ".9"
        }
      }
    }
  }
}));
