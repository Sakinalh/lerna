import { Outlet, useNavigate } from "react-router-dom";
import { AnalyticsFilters } from "src/PageData/components/AnalyticsFilters/AnalyticsFilters.component";
import { useDispatch } from "react-redux";
import React, { useEffect, SyntheticEvent as ReactSyntheticEvent, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from "@mui/material/Button";
import { AppText, TabsActions } from "src/components";
import { AppSelectRadio } from "src/components/AppSelectRadio/AppSelectRadio.component";
import { useQuery } from "react-query";
import { getDateRanges } from "src/api/react-query/filters.store";
import { Typography } from "@mui/material";
import { FavSearchListModal } from "./SearchListModals/FavSearchListModal.component";
import { useStyles } from "./Analytics.style";

interface AnalyticsProps { }

export default function Analytics(_props: AnalyticsProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const uri = window.location.pathname;
  const [openFavFilterModal, setOpenFavFilterModal] = useState(false);

  const navigate = useNavigate();
  const { isSuccess, data: ranges } = useQuery("dateRanges", getDateRanges);

  const [value, setValue] = useState(uri === "/data/analytic/table"? "table": "dashboard");
  const LIST = [
    {
      value: "dashboard",
      viewValue: "Dashboard"
    },
    {
      value: "table",
      viewValue: "Table"

    }
  ];

  const handleChange = (_event: ReactSyntheticEvent, newValue: string) => {
    let path = "";
    switch (newValue) {
      case "table":
        path = "table";
        break;
      case "dashboard":
        path = "dashboard";
        break;
      default:
        path = "analytics";
    }

    navigate(path, { replace: false });
    setValue(newValue);
  };

  return <section className={classes.root}>
    <header className="header header--analytics">
      <Typography className="header__title" component="h2" variant="h1">Analytics & Optimizations</Typography>
    </header>

    <div className={classes.container}>
      <div style={{ width: "100%" }}>
        <TabsActions
                    type="menuDashboard"
                    defaultValue="content"
                    values={LIST}
                    onValueChange={handleChange}
                    value={value}
                />
      </div>
      <div className={classes.aside}>
        <AppSelectRadio items={ranges} />
        <Button disableElevation={true} onClick={() => setOpenFavFilterModal(true)} variant="outlined" startIcon={<StarBorderIcon fontSize="small" />}>
          MySearchs
        </Button>
      </div>
    </div>

    { openFavFilterModal && <FavSearchListModal openModal={openFavFilterModal} onClose={() => setOpenFavFilterModal(false)} />}

    <AnalyticsFilters />
    <Outlet />

  </section>;
}