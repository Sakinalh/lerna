import makeStyles from "@mui/styles/makeStyles";
import {
  OutlinedCheckboxCheckedIcon,
  OutlinedCheckboxIcon
} from "src/PageGeneration/shared/style";
import { AppText } from "src/components/AppText/AppText.component";
import { StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import React, { ChangeEvent as ReactChangeEvent } from "react";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { Box, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, useTheme } from "@mui/material";
import { useQuery } from "react-query";
import { postTabs } from "src/api/react-query/analyticsTab.store ";
import { getBackgroundTag } from "src/shared/utils/helper";

import { ReactComponent as Logo } from "src/assets/img/logoLittle.svg";
import { AppTooltip } from "src/components";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import clsx from "clsx";

const useStyles = makeStyles({
  messageMatch: {
    borderRadius: 12,
    padding: "0 12px",
    height: 24,
    lineHeight: "24px",
    textAlign: "center",
    display: "inline-block"
  },
  cell: {
    verticalAlign: "middle",
    position: "relative"
  },
  page: {
    paddingBottom: 15
  },
  logo: {
    width: 15,
    position: "absolute",
    right: 10,
    bottom: 10
  },
  truncate: {
    overflow: "hidden",
    display: "-webkit-box",
    lineClamp: 3,
    boxOrient: "vertical"
  }
});

interface AnalyticsHeaderTableProps { }

export function AnalyticsHeaderTable(_props: AnalyticsHeaderTableProps) {
  const theme = useTheme();
  const classes = useStyles({});
  const bodyTab = {
    "date_range": "string",
    "filters": [
      {
        "name": "string",
        "operator": "string",
        "value": "string",
        "type": "text"
      }
    ]
  };

  const { data: tabData, isSuccess } = useQuery("postData", postTabs(bodyTab));

  const columns = tabData && tabData[0]?.map(key => ({ id: key.name, label: key.display_name !== "" ? key.display_name : key.name, minWidth: 170 }));

  const rows = tabData;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("keyword");

  function descendingComparator(a, b, orderBy) {
    if(b.find(elem => elem.name === orderBy).value < a.find(elem => elem.name === orderBy).value) {
      return -1;
    }
    if(b.find(elem => elem.name === orderBy).value > a.find(elem => elem.name === orderBy).value) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if(order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = property => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getLengthString = value => value ? value?.length : 0;

  const displayValue = (value, column) => {
    const WIDTH_TRUNCATE = 200;

    const setValue = value => column.format && typeof value === "number" ? column.format(value) : value;

    const setTooltip = (dom, value) => (
      getLengthString(value) > WIDTH_TRUNCATE ? (<AppTooltip
          placement="right"
          title={<div className="tooltip__container ">{setValue(value)}</div>}
          aria-label="add"
          arrow
        >
        {dom}
      </AppTooltip>) :
        (
          dom
        )
    );

    switch (column.id) {
      case "keyword":
        return (
          setTooltip(<Typography variant="subtitle1" >{setValue(value)}</Typography>, value)
        );
      case "message_match":
        return <Typography variant="subtitle1" color={theme.palette.white} className={classes.messageMatch} style={getBackgroundTag(value, theme)}>{setValue(value)}%</Typography>;
      case "page":
        return (
          <div className={classes.page}>
            {value.map((data) => {
              if(data.name === "page_title") {
                return (
                  <Typography variant="subtitle2" >{data.value}</Typography>
                );
              }
              if(data.name === "page_url") {
                return (
                  <Link target="_blank" href={data.value} variant="subtitle1" >{data.value}</Link>
                );
              }
              if(data.name === "Is Naister Page") {
                return (
                  data.value && <Logo className={classes.logo} />
                );
              }
            })
            }
          </div>
        );
      default:
        return (
          setTooltip(<span className={clsx(classes.cell, classes.truncate)}>{setValue(value)}</span>, value)
        );
    }
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {isSuccess && columns.map(column => (
                column.id === "keyword" ? (
                  <TableCell
                    align="center"
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    {column.label}
                    <TableSortLabel
                      IconComponent={KeyboardArrowUpIcon}
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={createSortHandler(column.id)}
                    >
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc" ? "sorted descending" : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell
                      align="center"
                      key={column.id}
                      style={{ minWidth: column.minWidth }}>
                    { column.label}
                  </TableCell>
                )
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isSuccess && stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {isSuccess && columns.map((column, index) => {
                    const value = row.find(elem => elem.name === column.id).value;
                    return (
                      <TableCell className={classes.cell} key={column.id} align={column.id === "message_match" || typeof (value) === "number" ? "center" : "left"}>
                        {displayValue(value, column)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={isSuccess && rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
