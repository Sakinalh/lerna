import React from "react";
import { Stack, Typography, Pagination } from "@mui/material/";

export default function BuListPaginator({total, nbItemsPerPage = 10, onChangePage}) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    onChangePage(value);
  };
  const isLastPage = () => {
    if(total < nbItemsPerPage) {
      return true;
    }
    return page === total / nbItemsPerPage;
  };

  const getNbPage = () => total < nbItemsPerPage ? 1 : Math.ceil(total / nbItemsPerPage);

  const getNbItemShown = () => {
    if(isLastPage() || total < nbItemsPerPage) {
      return total - ((getNbPage() - 1) * nbItemsPerPage);
    }
    return nbItemsPerPage;
  };

  return (
    <Stack spacing={2} sx={{flexDirection: "row"}}>
      <Typography sx={{lineHeight: "25.34px"}}> <strong style={{fontWeight: "bold"}}>1 to {getNbItemShown()}</strong> of {total} results</Typography>
      <Pagination sx={{marginTop: "0px !important"}} count={getNbPage()} page={page} onChange={handleChange} />
    </Stack>
  );
}
