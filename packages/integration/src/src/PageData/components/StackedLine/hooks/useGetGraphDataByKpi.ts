import { useQuery } from "react-query";
import { BodyPerformanceGraph, getPerformanceGraphDataByKpi } from "src/api/react-query/analyticsPerformanceGraph.store";

export const useGetGraphDataByKpi = (params: BodyPerformanceGraph, dependecies?: any) => {
  const {data: graphDataByKpi, isSuccess} = useQuery(["getPerformanceGraphDataByKpi", ...dependecies], getPerformanceGraphDataByKpi(params));

  return [graphDataByKpi, isSuccess];
};
