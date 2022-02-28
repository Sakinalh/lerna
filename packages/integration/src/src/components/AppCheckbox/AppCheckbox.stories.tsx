import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  root: {
    "& .checkbox": {
      "&--white": {
        position: "relative",
        zIndex: 1,
        height: 24,
        "&:before": {
          content: '""',
          display: "block",
          height: 18,
          width: 18,
          background: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
          borderRadius: "50%"
        }
      },
      "&--root": {
        color: theme.palette.grey.light,
        fill: theme.palette.white
      },
      "&--focused": {
        color: `${theme.palette.blue.main} !important`
      },
      "&--noPadding": {
        padding: "0 !important"
      },
      "&--fluid": {
        minWidth: "auto"
      },
      "&--small": {
        height: 15,
        width: 15,
        "&.is--white": {
          "&:before": {
            height: 14,
            width: 14
          }
        }
      }
    }
  }
}));
