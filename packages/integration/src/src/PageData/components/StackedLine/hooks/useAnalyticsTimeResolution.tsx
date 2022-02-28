import { useQuery } from "react-query";
import { getAnalyticsTimeResolutionGraph } from "src/api/react-query/analyticsTimeResolution.store";

export const useAnalyticsTimeResolution = () => {
  const { data: resolution_time, isSuccess} = useQuery(["getAnalyticsTimeResolutionGraph"], getAnalyticsTimeResolutionGraph());

  return [resolution_time, isSuccess];
};