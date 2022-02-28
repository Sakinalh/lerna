import clsx from "clsx";
import { LabeledIconBtn } from "src/components/LabeledIconBtn/LabeledIconBtn.component";
import * as TRANSLATE from "src/shared/translation/en.json";
import { Grid, Typography, useTheme } from "@mui/material";
import { useQuery } from "react-query";
import { getAnalyticsMessageMatchView } from "src/api/react-query/analyticsMessageMatchView.store";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "src/model";
import Skeleton from "@mui/material/Skeleton";
import { useStyles } from "./PieBlockStyle";
import { PieGraph } from "../PieGraph/PieGraph.component";
import { setFiltersAction } from "../../../PageGeneration/store/filters.actions";

interface PieBlocsProps {
  className: string
}

export function PieBlock({ className }: PieBlocsProps) {
  const applied_filters = useSelector((state: StoreState) => state.filters.data.filters.filter(item => item.value !== ""));
  const date_range = useSelector((state: StoreState) => state.filters.date_range);

  const classes = useStyles({});
  const theme = useTheme();
  const dispatch = useDispatch();

  const body = {
    "date_range": date_range,
    "filters": applied_filters
  };
  const {data: results, isSuccess} = useQuery(["getAnalyticsMessageMatchView", applied_filters, date_range], getAnalyticsMessageMatchView(body));

  const dataGraph = results?.categories?.map(item => ({id: item.legend, value: item.pages, label: item.legend}));

  const onCategoryClick = (cat) => {
    cat && dispatch(setFiltersAction(
      [{name: "message_match", operator: ">=", value: cat.range_score.min, type: "numeric"},
        {name: "message_match", operator: "<=", value: cat.range_score.max, type: "numeric"}]
    ));
  };

  return (<article className={clsx(className, classes.root)}>
    <div className={classes.title}>
      <Typography color={theme.palette.grey.middle1} variant="h2">
        {TRANSLATE.shared.messageMatch.toUpperCase()}
      </Typography>
    </div>
    <div className={classes.main}>
      {isSuccess ?
        (
          <Grid container width="auto" >
            <Grid container justifyContent="center" item xs={6} >
              <PieGraph data={dataGraph} score={results?.avg_message_match} />
            </Grid>
            <Grid item container xs={6} >
              <Grid container item direction="column" alignItems="start" justifyContent="center" >
                <div className={classes.status}>
                  <span className={classes.sum}>{results?.total_pages} pages</span>
                  <ul>
                    {
                  results?.categories.map((cat, idx) => <li onClick={() => onCategoryClick(cat)} className={classes.labelIcon} key={`mm_${idx}_${cat.legend}`}>
                    <LabeledIconBtn sx={{ cursor: "pointer"}} idx={idx} pages={cat.pages} label={cat.legend} />
                  </li>)
                }
                  </ul>
                </div>
              </Grid>
            </Grid>
          </Grid>
        )
        :
          <Skeleton variant="circular" width={100} height={100} />
      }
    </div>
  </article>);
}
