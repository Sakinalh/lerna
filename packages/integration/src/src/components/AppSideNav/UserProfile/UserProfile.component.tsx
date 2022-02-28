import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { AppText } from "src/components/AppText/AppText.component";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { logout } from "src";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    "& .paper--root": {
      inset: "initial",
      bottom: 0,
      borderRadius: "0 0 3px 3px",
      boxShadow: "none",
      borderWidth: "0px 1px 1px 1px",
      borderStyle: "none solid solid solid",
      borderColor: theme.palette.grey.middle1,
      boxSizing: "border-box",
      minWidth: "100%"
    },
    padding: "10px 7px",
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "center",
    minWidth: "100%",
    borderRadius: 3,
    cursor: "pointer",
    position: "relative",
    boxSizing: "border-box",
    marginBottom: 16,
    "&:hover": {
      backgroundColor: "#f1f2f4"
    },
    "&.isOpen": {
      backgroundColor: "transparent",
      "& li": {
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)"
        }
      },
      // border not calculate with poper js for menu logout
      "&::before": {
        content: "''",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: "0%",
        borderWidth: "1px 1px 0 1px",
        borderStyle: "solid solid none solid",
        borderColor: theme.palette.grey.middle1,
        boxSizing: "border-box",
        borderRadius: 3
      },
      "&::after": {
        content: "''",
        height: 1,
        width: "90%",
        background: theme.palette.grey.middle1,
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)"
      }
    }
  },
  logo: {
    width: 39.5,
    height: 39.5,
    borderRadius: "50%",
    backgroundColor: theme.palette.grey.light,
    color: theme.palette.blue.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  user_detail: {
    paddingLeft: 12,
    "& .userDetail__name": {
      fontFamily: "Poppins",
      fontSize: 14,
      fontWeight: 600,
      // letterSpacing: '-0.09px',
      color: theme.palette.black
    },
    "& .userDetail__email": {
      fontFamily: "Open Sans",
      fontSize: 11,
      color: theme.palette.grey.middle2
    }
  },
  sub: {
    fontSize: ".9em",
    opacity: "50%"
  },
  link: {
    backgroundColor: "transparent",
    display: "flex",
    fontSize: ".9em",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export interface UserProfileProps {
  isExpanded: boolean;
}

export function UserProfile(_props: UserProfileProps): JSX.Element {
  const classes = useStyles({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();
  const user = useSelector((state: StoreState) => state.app.user);

  useEffect(() => {
    !_props.isExpanded && setOpenModal(false);
  }, [_props.isExpanded]);

  const handleClose = (event) => {
    if(anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenModal(false);
  };
  function handleListKeyDown(event) {
    if(event.key === "Tab" || event.key === "Escape") {
      event.preventDefault();
      setOpenModal(false);
    }
  }
  function onLogout() {
    logout();
    navigate("/login");
  }
  const currentEmail = useSelector(
    (store: StoreState) => store.app.userDetail?.email
  );

  return (
    <div
      ref={anchorRef}
      onClick={() => setOpenModal(!openModal)}
      className={clsx(classes.root, { isOpen: openModal })}
    >
      <div className={classes.logo}>
        <AppText capitalize="first" text={user?.username?.charAt(0)} />
      </div>

      <div className={classes.user_detail}>
        <AppText
          capitalize="first"
          text={user.username}
          customclass={"userDetail__name"}
        />

        <AppText
          themeColor="neutralColor"
          props={{
            classes: { root: classes.sub },
            variant: "caption"
          }}
          text={currentEmail}
        />
      </div>

      <Popper
        open={openModal && _props.isExpanded}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        style={{ zIndex: 9999, width: "100%", background: "white" }}
        disablePortal
        placement="bottom"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper classes={{ root: "paper--root paper--poper" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={openModal}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={() => onLogout()}>
                    <AppText
                      capitalize="all"
                      props={{
                        variant: "caption"
                      }}
                      type="text"
                      text={"logout"}
                    />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
