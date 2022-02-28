import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "&.checkbox, & .checkbox": {
      "& .PrivateSwitchBase-input": {
        zIndex: 2
      },
      "&--white": {
        position: "relative",
        zIndex: 1,
        height: 24,
        width: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&::before": {
          content: '""',
          display: "block",
          width: 10,
          height: 10,
          background: theme.palette.white,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1
        },
        "& svg": {
          display: "block"
        }
      },
      "&--root": {
        color: theme.palette.grey.middle2,
        fill: theme.palette.white
      },
      "&--focused": {
        color: `${theme.palette.blue.main} !important`
      },
      "&--noPadding": {
        padding: "0 !important"
      },
      "&--hide": {
        display: "none"
      },
      "&--fluid": {
        minWidth: "auto"
      },
      "&--small": {
        height: 15,
        width: 15,
        "& span": {
          height: 15,
          width: 15
        },
        "& svg": {
          display: "block",
          height: 15,
          width: 15
        },
        "&.is--white": {
          "&::before": {
            height: 14,
            width: 14
          }
        }
      }
    }
  }
}));
