import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { Link, ListItem } from "src/deps";
import { Link as RouterLink } from "react-router-dom";
import { AppText } from "src/components/AppText/AppText.component";

const useStyles = makeStyles(theme => ({
  root: {
    "&.appNavItem, & .appNavItem": {
      backgroundColor: "inherit",
      cursor: "pointer",
      padding: 0,
      fontSize: 12,
      marginBottom: 16,
      "&:last-child": {
        marginBottom: 0
      },
      "&.isActive": {
        backgroundColor: theme.palette.blue.light,
        borderRadius: 3
      },
      "&__link": {
        backgroundColor: "transparent",
        display: "flex",
        fontFamily: "Poppins",
        fontSize: 12,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,

        "&:hover": {
          color: theme.palette.blue.main,
          "& svg, & span,  & g": {
            fill: theme.palette.blue.main
          }
        },
        "&.isActive": {
          color: theme.palette.blue.main,
          "& span svg, & span, & g": {
            color: theme.palette.blue.main,
            fill: theme.palette.blue.main
          }
        }
      },

      "&__icon": {
        color: theme.palette.grey.middle2,
        paddingRight: 15,
        paddingLeft: 4,
        display: "inline-block",

        "& svg": {
          height: 24,
          width: 24
        },
        "& g": {
          fill: theme.palette.grey.middle2
        }
      },
      "&__txt": {
        display: "inline-block"
      }
    }
  }
}));

export interface AppNavItemProps {
  fullPath: string;
  pathName: string;
  pathId: string;
  icon: JSX.Element;
  label: string;
}

export function AppNavItem(props: AppNavItemProps): JSX.Element {
  const { fullPath, icon, label, pathName, pathId } = props;
  const classes = useStyles(props);
  return (
    <ListItem
      classes={{
        root: clsx(classes.root, "appNavItem", {
          "isActive": pathName.includes(pathId)
        })
      }}
      dense={true}
    >
      <Link
        component={RouterLink}
        to={fullPath}
        variant="body1"
        color="inherit"
        className={clsx("appNavItem__link", {
          "isActive": pathName.includes(pathId)
        })}
      >
        <span className={"appNavItem__icon"}>{icon}</span>
        <AppText
          capitalize="all"
          props={{
            variant: "caption"
          }}
          customclass={"appNavItem__txt"}
          type="text"
          text={label}
        />
      </Link>
    </ListItem>
  );
}
