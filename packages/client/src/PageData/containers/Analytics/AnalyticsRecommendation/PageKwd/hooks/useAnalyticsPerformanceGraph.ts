import { useQuery } from "react-query";
import { PerformancePageKwdParams, getPerformancePageKwdParams } from "src/api/react-query/analytics/analytics.store";

export const useGetGraphPageKwdData = (params: PerformancePageKwdParams, dependecies?: any) => {
  const {data: graphPageKwdData, isSuccess} = useQuery(["getPerformanceGraphDataByKpi", ...dependecies], getPerformancePageKwdParams(params));

  return [graphPageKwdData, isSuccess];
};