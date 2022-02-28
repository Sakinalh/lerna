import makeStyles from "@mui/styles/makeStyles";
export const useStyles = makeStyles(theme => ({
  root: {
    "&.alertMessage, & .alertMessage": {
      "&__icon": {
        fontSize: 60,
        "&--info": {
          color: theme.palette.blue.main
        },
        "&--white": {
          color: theme.palette.white
        }
      },
      "&__message": {
        fontSize: 16,
        lineHeight: "22px",
        fontFamily: "Open Sans",
        fontWeight: "400",
        "&--bold ": {
          fontWeight: "700"
        }
      },
      "&--filled": {
        display: "flex",
        alignItems: "center",
        "&Sucess": {
          backgroundColor: theme.palette.green.main
        },
        "&Error": {
          backgroundColor: theme.palette.red.main
        },
        "&Warning": {
          backgroundColor: theme.palette.yellow.main
        },
        "&Info": {
          backgroundColor: theme.palette.blue.middle,
          color: theme.palette.blue.main
        }
      },
      "&--root": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    }
  }
}));