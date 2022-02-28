import React, { useEffect, useRef } from "react";
import { Close } from "@mui/icons-material";
import { Popover } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteFilterAction, setFiltersAction } from "src/PageGeneration/store/filters.actions";
import { StoreState } from "src/model";
import { Typography } from "@material-ui/core";
import { AnalyticsEditFiltersModal } from "../AnalyticsEditFiltersModal/AnalyticsEditFiltersModal.component";
import { useStyles } from "./AnalyticsFilter.style";

export interface AnalyticsFilterProps {
  value: string
  isModified?: boolean
  currentFilter: any,
  idx,
  setIsModified,
  setIsActifContainer,
  isActifContainer,
  openFilter,
  onApplyFilter,
  searchActiveKwd,
  isFullScreen
}

export function AnalyticsFilterItem(_props: AnalyticsFilterProps) {
  const {
    isModified,
    currentFilter,
    idx,
    setIsModified,
    setIsActifContainer,
    isActifContainer,
    openFilter,
    onApplyFilter,
    searchActiveKwd,
    isFullScreen
  } = _props;

  const [open, setOpen] = React.useState(false);
  const filters = useSelector((state: StoreState) => state.filters.data.filters);
  const [filter, setFilter] = React.useState({ operator: "", value: "" });

  const inputRef = useRef(null);
  const classes = useStyles({
    isActifContainer: isActifContainer,
    isModified: isModified,
    isSearch: isFullScreen && currentFilter.name.toUpperCase().indexOf((searchActiveKwd).toUpperCase()) === -1
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(openFilter);
    filters.length !== 0 && setFilter(filters[idx]);
  }, [filters]);

  useEffect(() => {
  }, [searchActiveKwd]);

  const handleRemoveFilter = (e) => {
    e.stopPropagation();
    dispatch(deleteFilterAction(idx));
  };

  const handleClick = (event) => {
    setOpen(true);
    setIsModified(true);
    setIsActifContainer(true);
  };

  const handleCloseP = () => {
    setIsModified(false);
    setOpen(false);
  };

  return (
    <>
      <div id="filter_" data-id={currentFilter?.name} ref={inputRef}
        onClick={handleClick}
        className={classes.root}>
        {filter?.operator !== "" && <span className={classes.dot}></span>}
        {/* @tim ugly but i dont find other way the component overwrite the font */}
        <Typography variant="subtitle1" component="span" sx={{ fontFamily: "Open Sans !important", fontSize: "14px" }} > {currentFilter?.name}{" " + filter?.operator + " " + filter?.value} </Typography>
        <Close onClick={e => handleRemoveFilter(e)} className={classes.close} />
      </div>
      <Popover
        open={open}
        anchorEl={inputRef?.current}
        onClose={handleCloseP}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <AnalyticsEditFiltersModal
          setOpen={() => setOpen(false)}
          handleClosePCallback={handleCloseP}
          idx={idx}
          // onHandleChanged={(val)=> setIsdot(val)}
          onApplyFilter={onApplyFilter}
          currentFilter={currentFilter}
          typeModal={"edit"}
          handleClose={handleCloseP}

        />
      </Popover>
    </>
  );
}
