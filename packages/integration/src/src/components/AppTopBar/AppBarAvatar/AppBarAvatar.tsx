import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 20,
    height: 50,
    width: 50
  },
  btn: {
    color: theme.palette.blue.main,
    padding: "20px 0"
  }
}));

export interface AppBarAvatarProps {
    logout: Function;
}

export function AppBarAvatar(props: AppBarAvatarProps): JSX.Element {
  const { logout } = props;
  const classes = useStyles({});

  return (
    <AppBtn
      className={classes.btn}
      data-testid="avatar-btn"
      type="button"
      aria-controls="user-menu"
      aria-haspopup="true"
      onClick={_ => logout()}
    >
      logout
    </AppBtn>
  );
}
