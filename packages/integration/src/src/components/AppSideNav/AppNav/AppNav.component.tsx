import makeStyles from "@mui/styles/makeStyles";
import { List } from "src/deps";
import { FlashOn, PieChart } from "@mui/icons-material";
import { AppNavItem } from "../AppNavItem/AppNavItem.component";

const useStyles = makeStyles({
  root: {
    marginTop: 24
  }

});

const NAV_LINKS = [
  {
    fullPath: "/data/analytic/dashboard/",
    label: "Analytics & Optimizations",
    pathId: "data",
    icon: <PieChart/>
  },
  {
    fullPath: "/generation/template/list/",
    label: "new generation",
    pathId: "generation",
    icon: <FlashOn/>
  }
];

export interface AppNavProps {
    isExpanded: boolean;

}

export function AppNav(_props: AppNavProps): JSX.Element {
  const classes = useStyles({});
  const pathname = window.location.pathname;

  return (
    <List
      classes={{
        root: classes.root
      }}
      dense={true}
      disablePadding
    >
      {NAV_LINKS.map(nav => (
        <AppNavItem
          key={nav.fullPath}
          pathName={pathname}
          pathId={nav.pathId}
          fullPath={nav.fullPath}
          label={nav.label}
          icon={nav.icon}
        />
      ))}
    </List>
  );
}
