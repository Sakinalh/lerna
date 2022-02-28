import { PieBlock } from "src/PageData/components/PieBlock/PieBlock.component";
import { ScatterPlotGraph } from "src/PageData/components/ScatterPlotGraph/ScatterPlotGraph.component";
import makeStyles from "@mui/styles/makeStyles";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material";
import { StackedLineContent } from "../../components/StackedLine/StackedLineContent.component";

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 32,
    paddingBottom: 35,
    background: theme.palette.blue.light
  },
  pie_block: {
    boxSizing: "border-box",
    height: 446,
    borderRadius: 4,
    background: theme.palette.white,
    padding: "25px 26px"
  },
  scatter_plot: {
    backgroundColor: theme.palette.white,
    padding: "25px 0 25px 25px",
    borderRadius: 4,
    height: 396,
    minHeight: 396,
    overflow: "hidden"

  },

  stacked_line: {
    height: 450,
    border: theme.shape.border.solidGrey,
    borderRadius: 4
  },
  title: {
    padding: "15px 10px",
    borderBottom: theme.shape.border.solidGrey
  }
}));

interface AnalyticsDashboardProps {}

export default function AnalyticsDashboard(_props: AnalyticsDashboardProps) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return <div className={classes.root}>
    <Grid container spacing={3}>
      <Grid item lg={4} xs={12}>
        <PieBlock className={classes.pie_block}/>
      </Grid>
      <Grid item lg={8} xs={12}>
        <ScatterPlotGraph className={classes.scatter_plot}/>
      </Grid>
      <Grid item xs={12}>
        <StackedLineContent />
      </Grid>
    </Grid>
  </div>;
}
