import * as React from "react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { TabsActions } from "src/components/TabsActions/TabsActions.component";
import makeStyles from "@mui/styles/makeStyles";
import { AppText } from "src/components/AppText/AppText.component";
import { Typography } from "@mui/material";

const useStyles = makeStyles({

  queue: {
    "& .header": {
      padding: "30px 16px 0px 16px",
      "&__title": {
        marginBottom: 20
      }
    }
  }

});

interface ListPageWrapperProps {

}

export function TabsListWrapper(_props: ListPageWrapperProps) {
  const classes = useStyles({});

  const NAVS = [
    {
      value: "list",
      viewValue: "templates"
    },
    {
      value: "queue",
      viewValue: "queue"

    }
  ];

  const navigate = useNavigate();
  const [navValue, setNavValue] = useState(NAVS[0].value);
  const path = window.location.pathname;
  useEffect(() => {
    function setTabValue(nav: string) {
      if(nav.includes("queue")) {
        return "queue";
      }

      if(nav.includes("list") || path.includes("recap")) {
        return "list";
      }

      return "list";
    }

    setNavValue(setTabValue(path));
  }, [path]);

  function handleNav(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, link: string) {
    navigate(link);
  }

  return (
    <div className={classes.queue}>

      <header className="header header--queue">
        <Typography className="header__title" component="h2" variant="h1">
          Page Generation
        </Typography>

        <TabsActions
        type="menuTab"
        values={NAVS}
        onValueChange={handleNav}
        value={navValue}
        defaultValue={navValue}
        overrideStyle={classes}/>

      </header>

      <Outlet/>

    </div>
  );
}
