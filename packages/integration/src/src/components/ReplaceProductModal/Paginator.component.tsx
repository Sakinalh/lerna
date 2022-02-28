import React from "react";
import { Grid } from "@mui/material";
import { AppPagination } from "../AppPagination/AppPagination.component";

export interface PaginatorInterface {
  totalItems: number;
  nbItemsPerPage: number;
  paginate: (event: object, page: number) => void;
}

export const Paginator: React.FC<PaginatorInterface> = ({ paginate, totalItems = 0, nbItemsPerPage = 10 }) => (
  <>
    <Grid className="container__footer--txt" item>
      Showing {nbItemsPerPage} of {totalItems} products
    </Grid>
    <Grid item>
      <AppPagination pageNumber={totalItems / nbItemsPerPage} paginate={paginate} totalItems={Math.ceil(totalItems / nbItemsPerPage)} />
    </Grid>
  </>
);