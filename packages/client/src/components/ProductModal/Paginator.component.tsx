import React from "react";
import { Grid } from "@mui/material";
import { AppPagination } from "../AppPagination/AppPagination.component";

export interface PaginatorInterface {
  totalItems: number;
  nbItemsPerPage: number;
  paginate: (page: number) => void;
  resetPaginationPage?:boolean;
}

export const Paginator: React.FC<PaginatorInterface> = ({ resetPaginationPage = false, paginate, totalItems = 0, nbItemsPerPage = 10 }) => (
  <>
    <Grid className="container__footer--txt" item>
      Showing {Math.min(nbItemsPerPage, totalItems)} of {totalItems} products
    </Grid>
    <Grid item>
      <AppPagination resetPaginationPage={resetPaginationPage} pageNumber={totalItems / nbItemsPerPage} paginate={paginate} totalItems={Math.ceil(totalItems / nbItemsPerPage)} />
    </Grid>
  </>
);