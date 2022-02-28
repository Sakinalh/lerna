import { Outlet } from "react-router-dom";
import { AppSearch } from "src/components/AppSearch/AppSearch.component";
import { AppLink } from "src/components/AppLink/AppLink";
import makeStyles from "@mui/styles/makeStyles";
import { useTheme } from "@mui/material";
import { AnalyticsNavLinks } from "../../components/AnalyticsNavLinks/AnalyticsNavLinks.component";
import { AppBtnLink } from "../../../components/AppBtnLink/AppBtnLink.component";

const useStyles = makeStyles(theme => ({
  root: {},
  nav: {
    boxShadow: theme.shape.objectShadow.boxShadowAll,
    padding: "10px 50px",
    display: "grid",
    gridTemplateColumns: "40% 33%",
    justifyContent: "space-between"
  },
  links: {
    display: "flex",
    textTransform: "capitalize"
  },
  link_wrap: {
    paddingRight: 40
  },
  head: {
    display: "grid",
    gridTemplateColumns: "40% 20%",
    justifyContent: "space-between",
    boxShadow: theme.shape.objectShadow.boxShadowAll
  }
}));

interface QueryCreatePageProps {

}

export default function QueryPage(_props: QueryCreatePageProps) {
  const classes = useStyles({});
  const theme = useTheme();

  return <section className={classes.root}>
    <div className={classes.head}>
      <AppSearch/>
      <AppBtnLink uri={"/data/query/create/"}
        label="create query"/>
    </div>
    <nav className={classes.nav}>
      <div className={classes.links}>
        <AppLink rootClass={classes.link_wrap} path="/data/analytics/table/" label="table"/>
        <AppLink rootClass={classes.link_wrap} path="/data/query/list/" label="saved"
          style={{ color: theme.palette.blue.main }}/>
        <AppLink path="/data/optimization/page/" label="optimizations"/>
      </div>
      <AnalyticsNavLinks/>
    </nav>
    <Outlet/>
  </section>;
}
