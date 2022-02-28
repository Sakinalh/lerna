import React, { ChangeEvent as ReactChangeEvent, useState, useEffect } from "react";
import { Box, CircularProgress, LinearProgress, Link, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
  OutlinedCheckboxCheckedIcon,
  OutlinedCheckboxIcon
} from "src/PageGeneration/shared/style";
import { AppText } from "src/components/AppText/AppText.component";
import { StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { useQuery } from "react-query";
import { AnalyticsTabs } from "src/api/react-query/analyticsTab.store ";
import { getBackgroundTag } from "src/shared/utils/helper";
import { ReactComponent as Logo } from "src/assets/img/logoLittle.svg";
import { AppTooltip } from "src/components";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import clsx from "clsx";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import Skeleton from "@mui/material/Skeleton";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { queryParamFormater } from "src/api/accessors/queryGenerator";
import { useStyles } from "./AnalyticsTable.style";

interface AnalyticsTableProps { }

const templateAnalyticsPagination_QParamsTypes = [
  { page: "number" },
  { limit: "number" }
];

export default function AnalyticsTable(_props: AnalyticsTableProps) {
  const theme = useTheme();
  const classes = useStyles({});
  const { getQueryParams, updateUrl } = useUrlSearchParams();
  const [_page, _limit] = getQueryParams(templateAnalyticsPagination_QParamsTypes);
  const applied_filters = useSelector((state: StoreState) => state.filters.data.filters.filter(item => item.value !== ""));
  const date_range = useSelector((state: StoreState) => state.filters.date_range);
  const truncate = useSelector((state: StoreState) => state.analytics.truncate);

  const [page, setPage] = useState(_page || 1);
  const [rowsPerPage, setRowsPerPage] = useState(_limit || 10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("keyword");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentHover, setCurrentHover] = useState(null);
  const navigate = useNavigate();

  const bodyTab = {
    "date_range": date_range,
    "filters": applied_filters,
    "order-by": orderBy,
    "order-direction": order
  };
  const queryTab = { page: page, limit: rowsPerPage };

  const { data: tabData, isSuccess } = useQuery(["postData", page, rowsPerPage, order, applied_filters, date_range], AnalyticsTabs(bodyTab, queryTab), {
    // staleTime: 1,
    refetchOnWindowFocus: false
  });
  const columns = tabData?.results[0]?.map(col => ({ id: col.name, label: col.display_name}));

  const rows = tabData?.results;

  const handleHoverEnter = (e, indexRow) => {
    setCurrentHover(indexRow);
  };

  const handleHoverLeave = (e) => {
    setCurrentHover(null);
  };

  function setHeightCell(isTruncate) {
    const allTr1 = document.querySelector("#tableBody1").querySelectorAll("tr");
    const allTr2 = document.querySelector("#tableBody2").querySelectorAll("tr");

    if(isTruncate) {
      allTr1.forEach((tr) => {
        tr.style.height = "auto";
      });
      allTr2.forEach((tr2) => {
        tr2.style.height = "auto";
      });
    } else {
      allTr1.forEach((tr, index) => {
        allTr2[index].offsetHeight >= tr.offsetHeight ? tr.style.height = allTr2[index].offsetHeight + "px" : allTr2[index].style.height = tr.offsetHeight + "px";
      });
    }
  }

  const onChangeDirection = () => {
    const newDirection = order === "asc" ? "desc" : "asc";
    setOrder(newDirection);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const getLengthString = value => value ? value?.length : 0;

  useEffect(() => {
    setHeightCell(truncate);
  }, [truncate]);

  useEffect(() => {
    updateUrl("page", page);
  }, [page]);

  useEffect(() => {
    updateUrl("limit", rowsPerPage);
  }, [rowsPerPage]);

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
          truncate ? setTooltip(<Typography variant="subtitle1" >{setValue(value)}</Typography>, value) : <Typography variant="subtitle1" >{setValue(value)}</Typography>
        );
      case "message_match":
        return <Typography variant="subtitle1" color={theme.palette.white} className={classes.messageMatch} style={getBackgroundTag(value, theme)}>{setValue(Math.round(value))}%</Typography>;
      case "page":
        return (
          <div className={classes.page}>
            {value.map((data) => {
              if(data.name === "page_title") {
                return (
                  <Typography variant="subtitle2" >{data.value}</Typography>
                );
              }
              if(data.name === "destinationurl") {
                return (
                  <Link target="_blank" href={data.value} variant="subtitle1" >{data.value}</Link>
                );
              }
              if(data.name === "is_naister_page" && data.value === true) {
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
          truncate ? setTooltip(<span className={clsx(classes.cell, classes.truncate)}>{setValue(value)}</span>, value) : <span className={clsx(classes.cell)}>{setValue(value)}</span>
        );
    }
  };

  const goToRecommendationPageKwd = (index) => {
    const kwd_id = (rows[index].filter(item => item.name === "keyword"))[0].keyword_id;
    const page_id = (rows[index].filter(item => item.name === "page"))[0].page_id;
    const page_url = (((rows[index].filter(item => item.name === "page"))[0].value).filter(it => it.name === "destinationurl"))[0].value;
    const adgroup_id = (rows[index].filter(item => item.name === "adgroup"))[0].adgroup_id;

    const _search = {
      date_range,
      kwd_id,
      page_url,
      page_id,
      adgroup_id
    };
    navigate({pathname: "/data/analytic/recommendation/page-kwd/page-analysis", search: `?${createSearchParams(_search)}`});
  };

  return (
    <div className={classes.root}>
      <div style={{ position: "sticky", top: 0, zIndex: 999, display: "flex", flexWrap: "nowrap" }}>
        <Paper sx={{ width: 476, overflow: "hidden", borderRadius: "none" }}>
          <TableContainer >
            <Table stickyHeader aria-label="sticky table" >
              <TableHead>
                <TableRow >
                  {isSuccess && columns?.filter(column => column.id === "keyword" || column.id === "page").map((column, index) => (
                    column.id === "keyword" ? (
                      <TableCell
                        classes={{
                          root: classes.tableCellRoot,
                          head: classes.tableCellHead
                        }}
                        align="left"
                        key={column.id}
                        sortDirection={orderBy === column.id ? order : false}
                      >
                        {column.label}
                        <TableSortLabel
                          IconComponent={KeyboardArrowUpIcon}
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={onChangeDirection}
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
                          classes={{
                            root: clsx(index === 1 && classes.border, classes.tableCellRoot),
                            head: classes.tableCellHead
                          }}
                          align="left"
                          key={column.id}
                        >
                        { column.label}
                      </TableCell>
                    )
                  ))}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Paper>
        <Paper classes={{ root: classes.paperRoot }} sx={{ width: "calc(100% - 476px)", overflow: "hidden" }}>
          <TableContainer sx={{ overflow: "visible", willChange: "transform", position: "relative", transform: `translateX(${-scrollPosition}px)` }} id="containerHeader">
            <Table sx={{ minWidth: 1020 }} stickyHeader aria-label="sticky table" >
              <TableHead>
                <TableRow>
                  {isSuccess && columns?.filter(column => column.id !== "keyword" && column.id !== "page").map((column, index) => (
                    <TableCell
                      classes={{
                        root: clsx(classes.tableCellRoot),
                        head: classes.tableCellHead
                      }}
                      align={column.id === "adgroup" || column.id === "campaign" ? "left" : "center"}
                      key={column.id}
                    >
                      { column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <div>
        <div className={classes.tablesBody}>
          <Paper classes={{ root: classes.paperRoot }} sx={{ width: 476, overflow: "hidden", borderRadius: "none" }}>
            <TableContainer >
              <Table stickyHeader aria-label="sticky table">
                <TableBody id="tableBody1" >
                  {isSuccess &&
                    rows.map((row, indexRow) =>
                      (
                        <TableRow
                          onClick={() => goToRecommendationPageKwd(indexRow)}
                          onMouseLeave={e => handleHoverLeave(e)}
                          onMouseEnter={e => handleHoverEnter(e, indexRow)}
                          selected={indexRow === currentHover}
                          role="checkbox" tabIndex={-1} key={row.code}>

                          {isSuccess && columns.map((column, index) => {
                            const value = row.find(elem => elem.name === column.id).value;
                            if(column.id === "keyword" || column.id === "page") {
                              return (
                                <TableCell classes={{ root: clsx(index === 1 && classes.border, classes.tableCellRoot), body: classes.tableCellBody }} className={classes.cell} key={column.id} align={column.id === "message_match" || typeof (value) === "number" ? "center" : "left"}>
                                  {displayValue(value, column)}
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper sx={{ width: "calc(100% - 476px)", overflow: "hidden" }}>
            <TableContainer onScroll={e => setScrollPosition(e.target.scrollLeft)} >
              <Table sx={{ minWidth: 1020 }} stickyHeader aria-label="sticky table">
                <TableBody id="tableBody2" >
                  {isSuccess && rows.map((row, indexRow) => (
                    <TableRow
                          onClick={() => goToRecommendationPageKwd(indexRow)}
                          onMouseLeave={e => handleHoverLeave(e)} onMouseEnter={e => handleHoverEnter(e, indexRow)} selected={indexRow === currentHover} role="checkbox" tabIndex={-1} key={row.code}>
                      {isSuccess && columns.map((column, index) => {
                        const value = row.find(elem => elem.name === column.id).value;
                        if(column.id !== "keyword" && column.id !== "page") {
                          return (
                            <TableCell classes={{ root: classes.tableCellRoot, body: classes.tableCellBody }} className={classes.cell} key={column.id} align={column.id === "message_match" || typeof (Number(value)) === "number" ? "center" : "left"}>
                              {displayValue(value, column)}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
        {isSuccess ?
          <div className={classes.pagination}>
            <TablePagination
                classes={{
                  actions: classes.tablePaginationActions
                }}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tabData?.count}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            <Pagination count={Math.ceil(tabData?.count / rowsPerPage)} page={page} onChange={handleChangePage} />
          </div>
          :
          <LinearProgress />
            }
      </div>
    </div>
  );
}
