import makeStyles from "@mui/styles/makeStyles";
import { ReactComponent as Logo } from "src/assets/img/logo.svg";
import clsx from "clsx";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0px 0 0 0px",
    marginBottom: 32,
    marginTop: 18,
    "&.isExpanded": {
      justifyContent: "flex-start",
      padding: "0px 0 0 8px"
    }
  },

  link: {
    "&:hover svg": {
      filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.1))"
    }
  },

  img: {
    width: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translateX(16.5px)",
    height: 30,

    filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.05))",

    "& #naister": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      "& .hide": {
        opacity: 0,
        display: "none",
        width: 0
      }
    },

    "&.isExpanded": {
      transform: "translateX(0px)",

      "& #naister": {
        "& .hide": {
          opacity: 1,
          display: "block",
          width: "auto"
        }
      }
    }
  }
});

export interface NavHeadProps {
  isExpanded: boolean;
}

export function NavHead(props: NavHeadProps): JSX.Element {
  const { isExpanded } = props;
  const classes = useStyles(props);
  return (
    <div className={clsx(classes.root)}>
      <Link className={classes.link} to="/">
        <Logo className={clsx(classes.img, { isExpanded: isExpanded })} />
      </Link>
    </div>
  );
}
