import { useTheme, Button, Divider, Skeleton } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import usePageKwdPerfSummary from "src/api/react-query/hooks/usePageKwdPerfSummary";
import { createSearchParams, useLocation, useNavigate, Outlet } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { useEffect, useState } from "react";
import { TabsActions } from "src/components";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import { Switch } from "@material-ui/core";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { PageKwdPageSpeed } from "./PageKwdPageSpeed/PageKwdPageSpeed.component";
import { PageKwdPerfSummary } from "./PageKwdPerfSummary/PageKwdPerfSummary.component";
import { useStyles } from "./PageKwd.style";

export interface PageKwdProps {
}
function PageKwd() {
  const classes = useStyles();
  const theme = useTheme();
  const searchParams = queryString.parse(location.search);

  const { data: informationsSummary, error, isFetching, refetch: lpKwdRefetch } = usePageKwdPerfSummary(searchParams);
  const navigate = useNavigate();
  const uri = window.location.pathname;

  const { updateUrl } = useUrlSearchParams();

  const page_name = uri.includes("data/analytic/recommendation/page-kwd/page-analysis") ? "analysis" : "recommendation";
  const [value, setValue] = useState(page_name);

  const previewPage = () => {
    navigate({ pathname: "/data/analytic/recommendation/page-preview", replace: true, search: `?${createSearchParams({ pageUrl: searchParams.page_url })}` });
  };
  const LIST = [
    {
      value: "analysis",
      viewValue: "analysis",
      icon: <PieChartIcon fontSize="small" sx={{ marginRight: 0.5 }} />
    },
    {
      value: "recommendation",
      viewValue: "recommendation",
      icon: <AssessmentIcon fontSize="small" sx={{ marginRight: 0.5 }} />
    }
  ];
  const handleChange = (_event: ReactSyntheticEvent, newValue: string) => {
    let path = "";
    switch (newValue) {
      case "analysis":
        path = "page-analysis";
        break;
      case "recommendation":
        path = "page-recommendation";
        break;
      default:
        path = "page-analysis";
    }
    navigate({ pathname: path, replace: true, search: `?${createSearchParams(searchParams)}` });
    setValue(newValue);
  };
  return <section className={classes.section}>
    <div className={classes.container}>
      <div>
        <TabsActions
                    type="menuRecommandation"
                    defaultValue="analysis"
                    values={LIST}
                    onValueChange={handleChange}
                    value={value}
                />
      </div>
      {page_name === "analysis" ?
        <div className={classes.aside}>
          <Button variant='contained' onClick={previewPage} startIcon={<RemoveRedEyeIcon />}>
            View current page
          </Button></div> : <div className={classes.switchMode}>
            <PhoneAndroidIcon color={searchParams.mode === "mobile" ? "primary" : undefined}
             sx={{
               borderBottom: searchParams.mode === "mobile" && `2px solid ${theme.palette.blue.main}`,
               marginRight: 3, cursor: "pointer"
             }} onClick={() => updateUrl("mode", "mobile")} />
            <DesktopWindowsIcon color={(!searchParams.mode || searchParams.mode === "desktop") ? "primary" : undefined}
              sx={{
                borderBottom: (!searchParams.mode || searchParams.mode === "desktop") && `2px solid ${theme.palette.blue.main}`,
                cursor: "pointer"
              }} onClick={() => updateUrl("mode", "desktop")} />
          </div>
      }
    </div>
    <Outlet />
  </section>;
}

export default PageKwd;