import { useTheme } from "@mui/material";
import { AnalyticsMessagePieItem } from "src/model";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useStyles } from "./PieGraphStyle";

interface PieGraphProps {
  data: AnalyticsMessagePieItem[];
  score: number;
}

export function PieGraph({ data, score }: PieGraphProps) {
  const classes = useStyles({});
  const theme = useTheme();
  const COLORS = [theme.palette.green.main, theme.palette.yellow.main, theme.palette.red.main];

  return (
    <div className={classes.root}>
      <ResponsiveContainer>
        <PieChart width={180} height={180}>
          <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="transparent"
          paddingAngle={0}
          dataKey="value"
        >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className={classes.score}>
        <span className={classes.label}>Average message match</span>
        <span className={classes.total}>{Math.round(score)}%</span>
      </div>
    </div>
  );
}
