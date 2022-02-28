import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { Typography, useTheme } from "@mui/material";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "nowrap"
  },
  label: {
    marginRight: 5
  },
  icon: {
    width: 15,
    height: 15,
    display: "inline-block",
    borderRadius: "50%",
    marginRight: 14
  },
  container: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 124
  },
  ok: {
    background: theme.palette.green.main
  },
  warning: {
    background: theme.palette.yellow.main
  },
  error: {
    background: theme.palette.red.main
  }
}));

export interface LabeledIconBtnProps {
    label: string;
    pages:number;
    idx: number;
    cursor?: string;
}

export function LabeledIconBtn(props: LabeledIconBtnProps): JSX.Element {
  const theme = useTheme();
  const classes = useStyles(props);
  const ICONS = [
    classes.ok,
    classes.warning,
    classes.error
  ];
  const { label, pages, idx, ...rest } = props;
  return (
    <span aria-label={label} className={classes.root} >
      <span className={clsx(ICONS[idx], classes.icon)}></span>
      <span className={classes.container}>
        <Typography {...rest} color={theme.palette.black} variant="subtitle1" component="strong">{pages}</Typography>
        {" "}
        <Typography {...rest} color={theme.palette.black} className={classes.label} variant="subtitle2" component="span">{label}</Typography>
      </span>
    </span>
  );
}
