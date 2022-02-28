import clsx from "clsx";
import { useStyles } from "./AppTag.style";

export interface AppTagProps {
  customclass?: string;
  stateColor: "more" | "less" | "neutral";
  children?: any;
}

export function AppTag(props: AppTagProps) {
  const classes = useStyles();

  const { customclass = null, stateColor = "more", children = null } = props;

  return <div className={clsx("tag", `tag--${stateColor}`, classes.root, customclass)}>{children}</div>;
}
