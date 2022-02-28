import Popover, { PopoverOrigin } from "@mui/material/Popover";
import { makeStyles } from "@mui/styles";
import * as React from "react";

const useStyles = makeStyles({
  root: { width: "80%" }
});

export interface IconPopOverProps {
    children?: React.ReactNode;
    origin: PopoverOrigin;
    transform: PopoverOrigin;
    eventTarget: HTMLButtonElement | null;
    resetAnchor: Function;
    isFullWith: boolean;
    idName: string;
}

export function IconPopOver(props: IconPopOverProps): JSX.Element {
  const {
    children,
    origin = {
      vertical: "bottom",
      horizontal: "center"
    },
    transform = {
      vertical: "top",
      horizontal: "left"
    },
    eventTarget,
    resetAnchor,
    isFullWith = false,
    idName
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  React.useEffect(() => {
    setAnchorEl(eventTarget);
  }, [eventTarget]);
  const classes = useStyles(props);
  const open = Boolean(anchorEl);
  const id = open ? idName : undefined;

  const handleClose = () => {
    resetAnchor(null);
  };
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={origin}
      transformOrigin={transform}
      classes={{
        paper: isFullWith ? classes.root : ""
      }}
    >
      {children}
    </Popover>
  );
}
