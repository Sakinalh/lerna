import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { CustomTooltip } from "./CustomTooltip/CustomTooltip.component";

interface StackedLineGraphProps {
  isSucessGraph: boolean;
  isGraphPageKpi?: boolean;
  className: string;
  tabsActif: Array<string>
  data: Array<{
    graph_data: Array<{
      x: string,
      y: number
      display_date: string
    }>,
    kpi_name: string,
    unit: string
  }>;
}

export function StackedLineGraph({ className, data, tabsActif, isSucessGraph, isGraphPageKpi = false }: StackedLineGraphProps) {
  const theme = useTheme();
  /**
   *
   * set color to line / index tabValue
   *
   * @param tabValue
   *
   */
  function getColorsLine(tabValue) {
    const index = tabsActif.indexOf(tabValue);
    switch (index) {
      case 0:
        return theme.palette.primary.main;
      case 1:
        return theme.palette.error.main;
      case 2:
        return theme.palette.info.main;
    }
  }
  return (<article className={className}>
    {!isSucessGraph ?
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100% - 100px)" }}><Skeleton variant="rectangular" width={"100%"} height={"100%"} /></div>
      :
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          margin={{
            top: 5,
            right: 0,
            left: isGraphPageKpi ? -38 : 0,
            bottom: isGraphPageKpi ? 20 : 44
          }}
          data={data}
        >
          <CartesianGrid color={theme.palette.grey.middle2} vertical={false} />
          <XAxis tickLine={{ stroke: theme.palette.white }} axisLine={false} type="category" dataKey="x" allowDuplicatedCategory={false} />
          <YAxis tickLine={{ stroke: theme.palette.white }} axisLine={false} color={theme.palette.grey.middle1} dataKey="y" />
          <Tooltip content={<CustomTooltip tabsActif={tabsActif} />} />
          {
            data?.map((kpi, index) => <Line dot={false}
              activeDot={{ fill: theme.palette.white, stroke: getColorsLine(tabsActif[index]), strokeWidth: 3, r: 10.5, className: "boxShadow" }}
              strokeWidth={4} data={kpi.graph_data} unit={kpi.unit} key={index} type="monotone" dataKey="y" stroke={getColorsLine(tabsActif[index])} />)
          }
        </LineChart>
      </ResponsiveContainer>
    }

  </article>
  );
}
