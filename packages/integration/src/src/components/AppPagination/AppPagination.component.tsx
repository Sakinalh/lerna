import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";

export interface AppPaginationProps {
  pageNumber: number;
  paginate: (page: number) => void;
  totalItems: number;
  resetPaginationPage?: boolean;
}

export function AppPagination(props: AppPaginationProps) {
  const { resetPaginationPage = false, totalItems, paginate, pageNumber = 1, ...PaginationProps } = props;
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    paginate(value);
  };
  useEffect(() => {
    if(resetPaginationPage && page !== 1) {
      setPage(1);
    }
  });

  return (
    <Pagination
      page={page}
      defaultPage={1}
      showFirstButton
      showLastButton
      onChange={handleChange}
      {...PaginationProps}
      renderItem={item => (
        <PaginationItem
          {...item}
        />
      )}
      count={totalItems}

    />
  );
}
