import React, { useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label, Legend } from "recharts";
import { Typography, useTheme, Skeleton } from "@mui/material";
import { getPerformanceKpis, getPerformancePages } from "src/api/react-query/analytics/analytics.store";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { StoreState } from "src/model";
import { getAnalyticsPerformanceKpiGraph } from "src/api/react-query/analyticsPerformanceKpiGraph.store";
import { useStyles } from "./ScatterPlotGraph.style";
import { KpiList } from "./KpiList";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
//

interface ScatterPlotGraphProps {
  className: string
}

export function ScatterPlotGraph({ className }: ScatterPlotGraphProps) {
  const classes = useStyles();
  const theme = useTheme();
  const applied_filters = useSelector((state: StoreState) => state.filters.data.filters.filter(item => item.value !== ""));
  const date_range = useSelector((state: StoreState) => state.filters.date_range);

  const { data: kpisList, isSuccess: isSuccessKpi } = useQuery(["getPerformanceKpis"], getPerformanceKpis());
  const [kpi, setKpi] = useState({ display_name: kpisList && kpisList[0].display_name, name: kpisList && kpisList[0].name });

  const data = {
    date_range: date_range,
    kpi: kpi.name,
    filters: applied_filters
  };

  const { data: perfdata, isSuccess: isSuccessPerf } = useQuery(["getPerformancePage", applied_filters, date_range, kpi, data], getPerformancePages(data), {
    enabled: !!data.kpi
  });

  const legendColors = [
    theme.palette.blue.middle,
    theme.palette.blue.main,
    theme.palette.blue.dark,
    theme.palette.grey.middle1,
    theme.palette.grey.middle2,
    theme.palette.blue.light
  ];

  const onSelectKpi = (newKpi, name) => {
    setKpi({ display_name: newKpi, name: name });
  };

  const renderColorfulLegendText = (value: string, entry: any) => (
    <Typography
      variant="subtitle2"
      component='span'
      sx={{ marginRight: "15px", color: theme.palette.black, position: "relative", top: "3px" }}>
      {value}
    </Typography>
  );

  useEffect(() => {
    kpisList && setKpi({ display_name: kpisList[0].display_name, name: kpisList[0].name });
  }, [kpisList]);

  const getXMinAndMax = () => {
    let xMin = 0;
    let xMax = 100;

    if(perfdata && perfdata.graph_data.length !== 0) {
      xMax = Math.max(...(perfdata?.graph_data?.map(point => parseFloat(point.x))));

      xMin = Math.min(...(perfdata?.graph_data?.map(point => parseFloat(point.x))));
    }

    /** if x = 0 axis 0 point will be placed at the middle of the xAxis */
    if(xMax === 0) {
      xMax = 100;
    }
    xMax = Math.ceil(xMax);

    return { xMin, xMax };
  };

  const getYMinAndMax = () => {
    let yMin = 0;
    let yMax = 100;

    if(perfdata && perfdata.graph_data.length !== 0) {
      yMax = Math.max(...(perfdata?.graph_data?.map(point => parseFloat(point.y))));

      yMin = Math.min(...(perfdata?.graph_data?.map(point => parseFloat(point.y))));
    }

    /** if x = 0 axis 0 point will be placed at the middle of the xAxis */
    if(yMax === 0) {
      yMax = 100;
    }

    yMax = Math.ceil(yMax);

    return { yMin, yMax };
  };

  const dataAsNumber = perfdata?.graph_data?.map(point => ({ ...point, x: parseFloat(point.x) }));

  return (
    <article className={className}>
      <div className={classes.title}>
        <Typography variant='h2' color={theme.palette.grey.middle1}>PERFORMANCE PAGES</Typography>
      </div>

      {isSuccessKpi && isSuccessPerf ? (<>
        <ResponsiveContainer height={317} width='100%'>

          <ScatterChart height={317} data={dataAsNumber} >
            <CartesianGrid stroke={theme.palette.grey.middle2} />

            <XAxis type='number' domain={[0, getXMinAndMax().xMax]} tick={{ fill: theme.palette.black }} tickLine={false} dataKey='x' stroke={theme.palette.grey.middle1} />

            <YAxis yAxisId="left" domain={[0, getYMinAndMax().yMax]} tick={{ fill: theme.palette.black }} dataKey="y" tickLine={false} stroke={theme.palette.grey.middle1}>
              <Label angle={-90}
                style={{ fill: theme.palette.black, fontWeight: 700, font: "bold 14px Open Sans", textAnchor: "middle" }}
                value='Message Match' position='insideLeft' />
            </YAxis>

            <YAxis yAxisId="right" dataKey="z" name="weight" orientation="right" stroke={theme.palette.grey.middle1} />

            {perfdata?.legend?.map((legend, index) => {
              const data = perfdata?.graph_data?.filter(item => (legend.label === item.label));

              return <React.Fragment key={index}>
                <Scatter yAxisId="left" name={legend.label} data={data} fill={legendColors[index]} />
                <Legend verticalAlign="bottom" align="left" wrapperStyle={{ bottom: -25 }} height={36}
                  formatter={renderColorfulLegendText} />
              </React.Fragment>;
            })
            }
          </ScatterChart>

        </ResponsiveContainer>

        <KpiList kpisList={kpisList} selectedKpi={kpi.display_name} onSelectKpi={onSelectKpi} />
      </>) : <><Skeleton variant="rectangular" width={"calc(100% - 25px)"} height={"calc(100% - 150px)"} />
        <Skeleton sx={{ marginTop: 10 }} width={100} height={20} variant="text" />
      </>}

    </article>
  );
}
