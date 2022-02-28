import { AppLink } from "src/components/AppLink/AppLink";
import makeStyles from "@mui/styles/makeStyles";
import { AppText } from "src/components/AppText/AppText.component";
import React, { Fragment } from "react";
import { DashboardOutlined, Favorite, FavoriteBorder, TableChartOutlined } from "@mui/icons-material";
import clsx from "clsx";
import { setActiveClass } from "src/shared/utils/helper";

const useStyles = makeStyles(theme => ({
  links: {
    padding: "24px 0 0px 0",
    display: "flex",
    justifyContent: "center"
  },
  links__container: {
    display: "flex",
    justifyContent: "center",
    border: `1px solid ${theme.palette.grey.light}`,
    borderRadius: "5px"
  },
  link_wrap: {
  },
  link: {
    display: "inline-flex",
    flexWrap: "nowrap",
    justifyContent: "center",
    width: "121px"
  },
  icon: {
    paddingRight: 5
  },
  sep: {
    position: "relative"
  },
  text: {
    lineHeight: 2,
    textDecoration: "none"
  }
}));

interface AnalyticsNavLinksProps { }

export function AnalyticsNavLinks(_props: AnalyticsNavLinksProps) {
  const uri = window.location.pathname;
  const classes = useStyles({});

  return (
    <div className={classes.links}>

      <div className={classes.links__container}>

        <AppLink rootClass={clsx(classes.link_wrap, classes.sep, { active: setActiveClass("dashboard", uri) })}
          customclass={classes.link}
          path="/data/analytic/dashboard/"
          isUnderline={false}
          type="toggleBtn"
          label={
            <Fragment>
              <DashboardOutlined classes={{ root: classes.icon }} />
              <AppText text="dashboard"
                capitalize="first"
                props={{
                  classes: { root: classes.text }
                }}
              />
            </Fragment>
          } />

        <AppLink rootClass={clsx(classes.link_wrap, classes.sep, { active: setActiveClass("table", uri) })}
          customclass={classes.link}
          path="/data/analytic/table/"
          isUnderline={false}
          type="toggleBtn"
          label={
            <Fragment>
              <TableChartOutlined classes={{ root: classes.icon }} />
              <AppText text="table"
                capitalize="first"
                props={{
                  classes: { root: classes.text }
                }}

              />
            </Fragment>
          } />

      </div>
    </div>
  );
}
