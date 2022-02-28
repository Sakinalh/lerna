import makeStyles from "@mui/styles/makeStyles";
import { AppLink } from "src/components/AppLink/AppLink";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  btnLink: {
    color: theme.palette.blue.main,
    borderRadius: theme.shape.border.radiusMin,
    border: "1px solid",
    textAlign: "center",
    height: 25,
    lineHeight: "25px",
    display: "block",
    padding: "0 10px",
    "&:first-child": {
      textTransform: "capitalize"
    }
  },
  label: {
    opacity: 0.8,
    paddingTop: 10
  }
}));

export interface AppBtnLinkProps {
    uri: string;
    label: string;
    overrideClasses?: Object;
    target?: string;
}

export function AppBtnLink(
  { uri, label = "link", overrideClasses = {}, target = "_blank" }: AppBtnLinkProps
) {
  const classes = useStyles({});

  const isRelative = uri.charAt(0) === "/";

  return (
    isRelative
      ? <AppLink path={uri}
      customclass={clsx(classes.btnLink, overrideClasses)}
        label={label}
        target={target}
        />
      : <a className={clsx(classes.btnLink, overrideClasses)}
        rel="noopener noreferrer"
        href={uri}
        target={target}>
        {label}
      </a>

  );
}
