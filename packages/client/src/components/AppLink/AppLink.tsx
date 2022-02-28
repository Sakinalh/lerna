import { Link as RouterLink } from "react-router-dom";
import { Link } from "src/deps";
import { CSSObject } from "styled-components";
import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import { Variant } from "@mui/material/styles";
import { ReactElement } from "react";

const useStyles = makeStyles({

  link_wrap: {
    display: "flex",
    alignItems: "center",
    textDecoration: (props: AppNavLink) => props.isUnderline ? "underline" : "none"
  },
  ellipses: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "100%"
  },
  toggleBtn: {
    fontFamily: "Poppins",
    fontWeight: 400,
    background: "#FFFFFF",
    position: "relative",
    borderRadius: "5px",
    color: "#334D6E",
    border: "1px solid transparent",

    "& a": {
      display: "inline-flex",
      fontSize: 12,
      padding: "9px 13px",

      "&:hover": {
        textDecoration: "none"
      }
    },

    "& svg path": {
      stroke: "334D6E"
    },

    "&.active": {

      background: "#E7EFFE",
      border: "1px solid #397EF5",
      color: "#397EF5",

      "& svg path": {

        stroke: "397EF5"

      }

    }

  }

});

export interface AppNavLink {
    path: string;
    variant?: Variant | undefined;
    style?: CSSObject;
    rootClass?: string;
    customclass?: string;
    label: ReactElement | string | null;
    truncate?: boolean;
    iconBefore?: null | ReactElement;
    isUnderline?: boolean,
    type?: "toggleBtn" | "";
    target?: string;
}

export function AppLink(props: AppNavLink): JSX.Element {
  const {
    path = "",
    variant = "body1",
    style,
    customclass = "",
    rootClass = "",
    label = "",
    truncate = false,
    iconBefore = null,
    isUnderline = true,
    type = "",
    target = "blank"
  } = props;

  const classes = useStyles(props);

  return (
    <div className={clsx(classes.link_wrap, rootClass, { [classes.ellipses]: truncate }, classes[type])}>
      {iconBefore}
      <Link
        component={RouterLink}
        to={path}
        variant={variant}
        style={style}
        color="inherit"
        className={customclass}
        target={target}
      >
        {label}
      </Link>
    </div>
  );
}
