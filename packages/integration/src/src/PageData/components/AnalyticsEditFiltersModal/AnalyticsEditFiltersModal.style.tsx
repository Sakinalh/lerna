import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "&.analyticsEditFiltersModal, & .analyticsEditFiltersModal": {
      "&.numeric": {
        width: 293
      },
      "&.text": {
        width: 433
      },
      "&__lineClose": {
        "&--actif": {
          background: theme.palette.blue.main
        }
      },

      "&__add": {
        padding: "0 20px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 25
      },

      "&__back": {
        marginRight: 10,
        "&::before": {
          height: 26,
          width: 26
        }
      },
      "&__header": {
        color: theme.palette.white,
        padding: "0 24px",
        height: 51,
        display: "flex",
        alignItems: "center",
        background: theme.palette.blue.main,
        "&--edit": {
          justifyContent: "flex-start"
        },
        "&--create": {
          justifyContent: "space-between"
        }
      },
      "&__body": {
        paddingTop: "36px",
        paddingBottom: "42px",
        width: "100%",
        boxSizing: "border-box",
        "&--wrapper": {
          minHeight: 81,
          maxHeight: 200,
          overflow: "auto"
        }
      },
      "&__footer": {
        height: 51,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 24px",
        background: theme.palette.grey.light,
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.05)",
        borderRadius: "0px 0px 4px 4px",
        "& > *:first-child": {
          marginRight: 20
        }
      }
    }
  },
  backIcon: {
    color: theme.palette.white,
    marginRight: 10,
    height: 24,
    width: 24,
    border: `1px solid ${theme.palette.white}`
  },
  moreBtn: {
    height: 26,
    width: 26,
    background: theme.palette.blue.main,
    color: theme.palette.white,
    transform: "scale(1)",
    transition: "transform .25s",
    "&:hover": {
      background: theme.palette.blue.main,
      color: theme.palette.white,
      transform: "scale(1.025)"

    }
  }

}));
