import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.blue.main,
    textDecoration: "none",
    display: "block",
    paddingBottom: 7,
    position: "relative",
    "&:first-letter": {
      textTransform: "capitalize"
    }
  }
}));

export function ellipse(str: string, limit: number = 0): string {
  return str ? str.substring(0, limit) + "..." : "";
}

export interface LinkExtProps {
    link: string;
    label: string;
    custom?: any;
}

export function LinkExt(props: LinkExtProps): JSX.Element {
  const { label = "", link, custom = Object } = props;
  const classes = useStyles(props);

  return (
    <a
      className={clsx(classes.link, custom)}
      href={link}
      rel="noopener noreferrer"
      target="_blank"
    >
      {label}
    </a>
  );
}
