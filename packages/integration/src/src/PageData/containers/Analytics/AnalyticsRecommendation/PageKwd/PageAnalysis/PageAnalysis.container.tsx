import { useTheme, Button, Divider, Skeleton } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import usePageKwdPerfSummary from "src/api/react-query/hooks/usePageKwdPerfSummary";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { PageKwdGraphAnalytics } from "../PageKwdGraphAnalytics/PageKwdGraphAnalytics.component";
import { PageKwdPerfSummary } from "../PageKwdPerfSummary/PageKwdPerfSummary.component";
import { PageKwdPageSpeed} from "../PageKwdPageSpeed/PageKwdPageSpeed.component";
import { useStyles } from "./PageAnalysis.style";

export default function PageAnalysis() {
  const classes = useStyles();
  const theme = useTheme();
  const searchParams = queryString.parse(location.search);

  const { data: informationsSummary, error, isFetching, refetch: lpKwdRefetch } = usePageKwdPerfSummary(searchParams);
  const navigate = useNavigate();

  const previewPage = () => {
    navigate({pathname: "/data/analytic/recommendation/page-preview", replace: true, search: `?${createSearchParams({pageUrl: searchParams.page_url})}`});
  };

  return <section className={classes.content}>
    <PageKwdPerfSummary data={informationsSummary}/>
    <PageKwdGraphAnalytics/>
    <PageKwdPageSpeed/>
  </section>;
}