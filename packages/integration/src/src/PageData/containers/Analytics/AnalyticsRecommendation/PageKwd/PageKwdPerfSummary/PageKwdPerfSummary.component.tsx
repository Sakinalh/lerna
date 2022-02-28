import { Box, Card, Typography, CardContent, Link, Chip, useTheme, Divider, Skeleton, Button } from "@mui/material";
import usePageKwdPerfSummary from "src/api/react-query/hooks/usePageKwdPerfSummary";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import {KeyboardArrowLeft} from "@mui/icons-material";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import useLpKwdMessageMatchKpis from "../../../../../../api/react-query/hooks/useLpKwdMessageMatchKpis";
import PaginatedBlockKpis from "./PaginatedBlockKpis.tsx/PaginatedBlockKpis.component";

import { useStyles } from "./PageKwdPerf.style";
import { PagePerfSummaryResponse } from "../../../../../../api/react-query/hooks/usePageKwdPerfSummary";

const SummaryCard = ({title, children}) => {
  const classes = useStyles();
  const theme = useTheme();

  return <Card className={classes.customCard}>
    <Typography variant='caption' sx={{marginBottom: "17"}}>{title}</Typography>
    <CardContent className={classes.root}>{children}</CardContent>
  </Card>;
};

const getLegendColor = (value) => {
  switch (value) {
    case "strong":
      return "success";
    case "acceptable":
      return "warning";
    case "bad":
      return "error";
    default:
      return "success";
  }
};

export const MessageMatchCard = ({label, value, legend}) => {
  const classes = useStyles();
  const theme = useTheme();
  return <Card className={classes.mmCard}>
    <CardContent className={classes.mmCard}>
      <Typography variant='caption'>{label}</Typography>
      <Typography variant='h1'>{value}</Typography>
      <Chip className={classes.chipContent} label={legend} color={getLegendColor(legend.toLowerCase())}/>
    </CardContent>
  </Card>;
};

export const PageKwdPerfSummary = () => {
  const theme = useTheme();
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const date_range = useSelector((state: StoreState) => state.filters.date_range);
  const page_details = useSelector((state: StoreState) => state.pageQueue.pageDetails);
  const navigate = useNavigate();

  const searchParams = queryString.parse(location.search);

  const { data: informationsSummary, error, isFetching, refetch: lpKwdRefetch } = usePageKwdPerfSummary(searchParams);
  const { data: lpKwdPerfData, isFetching: isFetchinLpKwdPerf, refetch: lpKwdPerfRefetch } = useLpKwdMessageMatchKpis({...searchParams, date_range});
  if(isFetching || isFetchinLpKwdPerf) {
    return <Skeleton variant="rectangular" width={"auto"} height={168} />;
  }

  const getMessageMatchUnit = () => (lpKwdPerfData?.message_match?.unit === "pourcentage" ? "%" : "");

  return <section className={classes.section}>
    <Box className={classes.box}>
      <SummaryCard title={<Typography variant='caption' color='secondary'>Keyword</Typography>}>
        <Typography component='p' variant="subtitle1">

          {informationsSummary.keyword?.text}
        </Typography>
      </SummaryCard>
      <Divider orientation="vertical" flexItem variant="middle"/>

      <SummaryCard title={<Typography variant='caption' color='secondary'>Page informations</Typography>}>
        <Typography variant="subtitle1">
          { informationsSummary.page?.title}
        </Typography>
        <Link component='p' variant="subtitle1" href={ informationsSummary.page?.url}>
          { informationsSummary.page?.url}
        </Link>
        <Typography component='p' variant="subtitle2">
          { informationsSummary.page?.last_analyzed}
        </Typography>
      </SummaryCard>
      <Divider orientation="vertical" flexItem variant="middle"/>

      <SummaryCard title={<Typography variant='caption' color='secondary'>Campaign</Typography>}>
        <Typography component='p' variant="subtitle2">
          { informationsSummary.campaign.name}
        </Typography>
      </SummaryCard>
      <Divider orientation="vertical" flexItem variant="middle"/>

      <SummaryCard title={<Typography variant='caption' color='secondary'>Adgroup</Typography>}>
        <Typography component='p' variant="subtitle2">
          { informationsSummary.adgroup.name}
        </Typography>
      </SummaryCard>
    </Box>

    <MessageMatchCard className={classes.mmCard} label='Message Match' value={lpKwdPerfData?.message_match?.value + getMessageMatchUnit()} legend={lpKwdPerfData?.message_match?.legend} />
    <PaginatedBlockKpis data={lpKwdPerfData} />
  </section>;
};