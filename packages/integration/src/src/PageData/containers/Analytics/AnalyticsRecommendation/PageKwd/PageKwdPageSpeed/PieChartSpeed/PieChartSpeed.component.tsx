import { Typography } from "@material-ui/core";
import { CircularProgress, useTheme } from "@mui/material";
import { getBackgroundTag } from "src/shared/utils";
import { useStyles } from "./PieChartSpeed.style";

export interface PieChartSpeedProps { value : number }
export const PieChartSpeed: React.FC<PieChartSpeedProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { value } = props;

  function getColorCircle(pct: number) {
    let color = null;
    // eslint-disable-next-line no-constant-condition
    if(pct => 0 && pct <= 30) {
      color = "error";
    }
    if(pct > 30 && pct <= 60) {
      color = "yellow";
    }
    if(pct > 60 && pct <= 100) {
      color = "success";
    }

    return color;
  }

  return (
    <div className={classes.root}>
      <CircularProgress color={getColorCircle(Math.round(value * 100))} classes={{ root: classes.pie, circle: classes.circle, svg: classes.pieSvg }} variant="determinate" value={Math.round(value * 100)} />
      <Typography sx={getBackgroundTag(Math.round(value * 100), theme)} className={classes.pieCenter} color={theme.palette.white} component="span" variant="h1">{Math.round(value * 100)} %</Typography>
    </div>
  );
};