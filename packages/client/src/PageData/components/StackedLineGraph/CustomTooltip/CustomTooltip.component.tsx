import { useTheme, Typography } from "@mui/material";
import { getBackgroundTag } from "src/shared/utils/helper";
import { useStylesTooltips } from "./CustomTooltip.style";

interface CustomTooltipProps {
  active: boolean,
  payload: Array<{
    chartType: undefined | string,
    color: string,
    dateKey: string,
    fill: string,
    formatter: undefined | string,
    name: string,
    payload: {
      display_date: string,
      x: string,
      y: number
    },
    points: Array<any>,
    stroke: string,
    strokeWidth: number,
    type: string,
    value: number,
    unit: string
  }>,
  label: string,
  tabsActif: string[],
}

function getColorsBorder(index, theme) {
  if(index >= 0) {
    switch (index) {
      case 0:
        return theme.palette.primary.main;
      case 1:
        return theme.palette.error.main;
      case 2:
        return theme.palette.info.main;
    }
  }
}

export function CustomTooltip({ active, payload, label, tabsActif }: CustomTooltipProps) {
  const theme = useTheme();
  const classes = useStylesTooltips();

  if(active && payload && payload.length) {
    return (
      <div className={classes.root}>
        <Typography className={classes.date} color={theme.palette.black} variant="subtitle1">
          {`${payload !== null && payload[0]?.payload.display_date}`}
        </Typography>
        <ul>
          {
            tabsActif.map((tab, index) => <li key={index} className={classes.li}>
              <span style={{ borderColor: getColorsBorder(index, theme) }} className={classes.round}></span>
              <Typography color={theme.palette.black} variant="subtitle2">
                {tab}
                {tab === "message_match" ? <Typography variant="subtitle1" color={theme.palette.white} style={getBackgroundTag(payload[index].value, theme)} className={classes.match}>{`${payload[index].value}${payload[index].unit}`} </Typography>
                  : `: ${payload[index].value}${payload[index].unit}`}
              </Typography>
            </li>)
          }
        </ul>
      </div>
    );
  }
  return null;
}
