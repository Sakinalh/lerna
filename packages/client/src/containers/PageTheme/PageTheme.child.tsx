import makeStyles from "@mui/styles/makeStyles";
import { globalStyle } from "../../styles/global/all";

export const useStyles = makeStyles(theme => ({
  ...globalStyle(theme),
  root: {
    padding: 0,
    width: "100%",
    height: "100%"
  }
}));

export function PageThemeChild(props: any): JSX.Element {
  const classes = useStyles(props);
  return (
    <section className={classes.root}>{props.children}</section>
  );
}
