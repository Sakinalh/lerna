import { Switch } from "@mui/material";
import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";

export const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 30,
      height: 15,
      padding: 0,
      display: "inline-flex",
      overflow: "visible",
      cursor: "pointer"
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(12px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.blue.main,
          borderColor: theme.palette.blue.main
        }
      }
    },
    thumb: {
      width: 11,
      height: 11,
      boxShadow: "none"
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.white
    },
    checked: {
      color: theme.palette.blue.main
    }
  }))(Switch);

export const useStyles = makeStyles(theme => ({
  root: {
    "& .appSwitch": {
      "&__legend": {
        cursor: "pointer",
        fontSize: 14
      },
      "&__label": {
        cursor: "pointer",
        "&--checked": {
          "& .appSwitch__legend": {
            color: theme.palette.blue.main
          }
        }
      }
    }
  }

}));
