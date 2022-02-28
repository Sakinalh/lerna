import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { getUserBusinesses } from "src/api/react-query/user.store";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import BuList from "../../components/BuList/BuList.component";
import { useStyles } from "./BuListContainer.styles";
import BuListPaginator from "../../components/BuListPaginator/BuListPaginator.component";

export default function BuListContainer() {
  const classes = useStyles();

  const {data: businesses} = useQuery("getUserBuList", getUserBusinesses, {retry: true});

  const [paginatedData, setPaginatedData] = useState(businesses);

  useEffect(() => {
    setPaginatedData(businesses);
  }, [businesses]);

  const onChangePage = (page: number) => {
    const startIndex = ((page - 1) * 10);
    const endIndex = page === (businesses?.length / 10) ? null : (page - 1) * 10 + 10;
    setPaginatedData([...businesses?.slice(startIndex, endIndex)]);
  };

  return (
    <div className={classes.root}>
      {!paginatedData ? <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box> : <BuList data={[...paginatedData]}/>}
      {businesses && <BuListPaginator onChangePage={onChangePage} total={businesses.length} />}
    </div>
  );
}
