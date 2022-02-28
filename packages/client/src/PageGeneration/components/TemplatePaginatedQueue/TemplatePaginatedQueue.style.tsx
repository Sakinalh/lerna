import makeStyles from "@mui/styles/makeStyles";
import { SKELETON } from "src/shared/style";

export const usePageQueueStyles = makeStyles(theme => ({
  root: {
    paddingTop: 10,
    "& .accordion": {
      border: 0,
      boxShadow: "none",
      "&__summary": {
        padding: "0 16px",
        border: 0,
        boxShadow: "none",
        minHeight: "52px",
        // margin: "0 -16px",
        "&:hover": {
          backgroundColor: theme.palette.blue.light
        },
        "& > div": {
          margin: 0
        }
      },
      "&__details": {
        background: `${theme.palette.grey.extraExtraLight}`
        // paddingLeft: 0
      }
    },
    "& .table": {
      background: theme.palette.white,
      // border: `1px solid ${theme.palette.grey.light}`,
      "&__head": {
        padding: "0 16px",
        boxSizing: "border-box",
        lineHeight: 1,
        background: theme.palette.grey.light
      },
      "&__fieldset": {
        width: "100%"
      },
      "&__cell": {
        padding: "0px 0px",
        "&--search": {
          height: "58px"
        },
        "&--th": {
          height: "49px"
        }
      }
    },
    "& .arrowLine": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "calc(200px - 24px)",
      "&--large": {
        width: "calc(300px - 24px)",
        paddingRight: 20,
        boxSizing: "border-box"
      },
      "&.isOpen": {
        "& .arrowLine__svg": {
          transform: "rotate(-90deg)"
        }
      },
      "&__icon": {
        paddingRight: 16,
        display: "flex"
      }
    },
    "& .gridTab": {
      justifyContent: "flex-start",
      "&--main": {
        padding: "0 16px"
      },
      "&--border": {
        borderLeft: `1px solid ${theme.palette.grey.middle1}`,
        borderRight: `1px solid ${theme.palette.grey.middle1}`,
        borderRadius: "0px 0px 3px 3px"

      },
      "&--space": {
        justifyContent: "space-between"
      },
      "&__cell": {
        lineHeight: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        "&--right": {
          display: "flex",
          justifyContent: "flex-end"
        },
        "&--fix": {
          minWidth: 204
        },
        "&--large": {
          minWidth: 300,
          paddingRight: 20,
          boxSizing: "border-box"
        },
        "&--arrow": {
          paddingLeft: "calc(24px + 16px)"
        }
      }
    },
    "& .queueTab": {
      "&__input": {
        "& .MuiOutlinedInput-root": {
          height: 35
        },

        fontFamily: "Open Sans",
        display: "flex",
        alignItems: "center",
        fontSize: 14,
        color: theme.palette.black,
        "&--progress": {
          "& > *:first-child ": {
            marginRight: 8
          }
        },
        "&--search": {
          "& button:hover": {
            backgroundColor: "transparent"
          }
        },
        "&--checkbox": {
          fontSize: "14px",
          color: theme.palette.black
        },
        "&--th": {
          textTransform: "uppercase",
          fontFamily: "Open Sans",
          color: theme.palette.dark,
          fontWeight: 600,
          fontSize: "12px"
        },
        "&--sorting": {
          "& > *": {
            marginLeft: 8,
            height: "auto",
            fill: "rgba(57, 64, 75, 0.5)"
          }
        }
      }
    }
  },
  checkbox: {
    width: "5%"
  },
  accordion: {
    marginBottom: 30,
    padding: "12px 0",
    boxShadow: theme.shape.objectShadow.boxShadowLight,
    border: theme.palette.grey.light,
    "&::before": {
      backgroundColor: "inherit"
    }
  },
  header: {
    display: "grid",
    gridTemplateColumns: "20% 60% 20%",
    padding: "30px 10px",
    fontSize: "1.2em"
  },
  icon_wrap: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.blue.main
  },
  icon_label: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  accordion_detail: {
    display: "block"
  },
  content: {
    display: "grid",
    gridTemplateColumns: "10% 65% 15% 10%"
  },
  areas_col: {
    display: "grid",
    gridTemplateColumns: "50px 25% auto",
    position: "relative"
  },
  loading: {
    pointerEvents: "none",
    "& div": {
      position: "relative",
      height: 50,
      marginBottom: 5,
      width: "100%",
      borderRadius: 6,
      "& *": {
        opacity: 0
      },
      ...SKELETON.applyAnimation
    }
  },
  ...SKELETON.animation,
  err: {
    color: theme.palette.red.main
  },
  expanded: {
    flexDirection: "row-reverse"
  },
  expandIcon: {
    transform: "rotate(-90deg)"
  }
}));
