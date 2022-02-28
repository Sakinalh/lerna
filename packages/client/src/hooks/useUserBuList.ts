import { useQuery } from "react-query";
import { getUserBusinesses } from "src/api/react-query/user.store";

export default function useUserBuList() {
  return useQuery("getUserBusinesses", getUserBusinesses);
}