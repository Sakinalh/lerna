import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
const DRAWER_CLOSED = 55;
const DRAWER_OPENED = 259;

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "white",
    boxShadow: "10px -2px 5px -6px rgba(0, 0, 0, 0.05)",
    zIndex: 9,
    height: "100%",
    position: "relative",
    padding: "16px 8px 16px 8px",
    boxSizing: "border-box",

    "&.appSideNav, & .appSideNav": {
      "&__container": {

        overflow: "hidden",
        height: "100%",
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.easeIn,
          duration: theme.transitions.duration.enteringScreen
        }),
        width: DRAWER_CLOSED,

        "&:not(.isExpanded):hover, &.isExpanded": {
          width: DRAWER_OPENED
        }
      },
      "&__navContent": {
        display: "flex",
        height: "calc( 100% - 70px)",
        flexDirection: "column",
        justifyContent: "space-between"
      },
      "&__linkBottom": {
        justifyContent: "start",
        padding: "6px 0 6px 4px",
        width: "100%",
        "&.isExpanded": {
          "& svg, & span,  & g": {
            fill: theme.palette.blue.main
          },
          "& .appSideNav__linkBottom--label": {
            color: theme.palette.blue.main
          }
        },
        "&:disabled": {
          "& svg, & span,  & g": {
            fill: "rgba(0, 0, 0, 0.26)"
          },
          "& .appSideNav__linkBottom--label": {
            color: "rgba(0, 0, 0, 0.26)"
          }
        },
        "&:hover": {
          "& svg, & span,  & g": {
            fill: theme.palette.blue.main
          }
        },

        "&--iconWrapper": {},
        "&--icon": {
          color: theme.palette.grey.dark,
          width: 24,
          height: 24,
          paddingLeft: 11,
          "& .iconCorrection": {
            position: "relative",
            left: "-1px"
          }
        },
        "&--label": {
          paddingLeft: "16px"
        }
      },
      "&__bottomAction": {
        display: "flex",
        position: "relative",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        width: "100%",
        padding: "25px 0",
        background: theme.palette.grey.light,
        "&:before": {
          content: "''",
          height: "100%",
          width: "250%",
          position: "absolute",
          left: -13,
          bottom: 0,
          right: 0
        }
      }
    }
  },
  nav_wrap: {
    display: "flex",
    height: "100%"
  },

  logout: {
    fontSize: 10,
    color: theme.palette.blue.main,
    display: "flex",
    textAlign: "left",
    position: "fixed",
    bottom: 0,
    zIndex: 99,
    minWidth: 70
  },
  btn: {},
  icon_content: {
    display: "flex",
    alignItems: "center",
    "& g": {
      fill: theme.palette.grey.middle2
    }
  }
}));
