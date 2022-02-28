import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ReactComponent as Retry } from "src/styles/global/icons/retry.svg";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { ClickAwayListener, InputAdornment, Link, Popover, TextField, Alert, Button, Snackbar, FormControlLabel, Radio, RadioGroup, Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useQuery } from "react-query";
import { getFiltersAnalytics } from "src/api/react-query/filters.store";
import { setFiltersAction } from "src/PageGeneration/store/filters.actions";
import { useDispatch, useSelector } from "react-redux";
import { PROCESS_STATUS, StoreState } from "src/model";
import makeStyles from "@mui/styles/makeStyles";
import { setAnalyticsTruncateAction } from "src/PageData/store/actions";
import { getItemFromLocalStorage, setItemToLocalStorage } from "src/shared/form";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { AnalyticsEditFiltersModal } from "../AnalyticsEditFiltersModal/AnalyticsEditFiltersModal.component";
import { processStatusAction } from "../../../redux/store/app/app.actions";
import { createAnalyticsFavSearchFilters, getAnalyticsFavSearchFilters } from "../../../api/react-query/analytics/analytics.store";
import { PageProps } from "../../../stories/Page";
import { formatStoredFilers, getHeight, getLeft, getWidth } from "./utils";
import { AnalyticsCreateFilters } from "../AnalyticsCreateFilters/AnalyticsCreateFilters.component";
import { AnalyticsFilterItem } from "../AnalyticsFilterItem/AnalyticsFilterItem.component";
import { useStyles, useStylesModalTruncate, useStylesModalSave } from "./AnalyticsFilters.style";

export interface AnalyticsFiltersProps {

}

export function AnalyticsFilters(_props: AnalyticsFiltersProps) {
  const { isSuccess, data: filters } = useQuery("filters", getFiltersAnalytics);
  const [isModified, setIsModified] = useState(false);
  const [isActifContainer, setIsActifContainer] = useState(false);
  const [filtersCreate, setFiltersCreate] = useState([]);
  const [defaultFilters, setDefaultFilters] = useState([]);
  const [searchActiveKwd, setSearchActiveKwd] = useState("");
  const [isTwoLines, setIsTwoLines] = useState(false);
  const [afterLoading, setAfterLoading] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [size, setSize] = useState({ height: 0, width: 0 });
  const [btnRight, setBtnRight] = useState(0);
  const [openTooltipSaveSearch, setOpenTooltipSaveSearch] = useState(false);
  const [savedSearchName, setSavedSearchName] = useState(null);
  const [currentFilter, setCurrentFilter] = useState([]);
  const [count, setCount] = useState(0);
  const [formatDefaultFilters, setFormatDefaultFilters] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [initHeight, setInitHeight] = useState(0);
  const [anchorElTruncate, setAnchorElTruncate] = useState(null);

  const handleClickTruncate = (event) => {
    setAnchorElTruncate(event.currentTarget);
  };

  const handleCloseTruncate = () => {
    setAnchorElTruncate(null);
  };

  const truncateValue = useSelector((state: StoreState) => state.analytics.truncate);
  const openTruncate = Boolean(anchorElTruncate);
  const idTruncate = openTruncate ? "truncate-popover" : undefined;
  const [valueTruncate, setValueTruncate] = useState(truncateValue === true ? "truncate" : "unTruncate");
  const handleChangeTruncate = (event) => { setValueTruncate(event.target.value); };

  useEffect(() => {
    const changeTruncate = valueTruncate === "truncate";
    dispatch(setAnalyticsTruncateAction(changeTruncate));
  }, [valueTruncate]);

  const refFilters = useRef(null);
  const refKwd = useRef(null);
  const stored_filters = useSelector((state: StoreState) => state.filters.data.filters);

  const filters__ = document.getElementById("myfilters");
  const AddFilterBtn = document.getElementById("AddFilterBtn");

  const classes = useStyles({ width: size.width });
  const classesModalTruncate = useStylesModalTruncate({});
  const classesModalSave = useStylesModalSave({});

  const theme = useTheme();
  const dispatch = useDispatch();
  const searchId = getItemFromLocalStorage("searchId");

  const { data: favSearch, isSuccess: successFav } = useQuery(["getAnalyticsFavSearch", searchId], getAnalyticsFavSearchFilters({ id: searchId }), {
    enabled: !!searchId,
    onSuccess: (data) => {
      data.length > 0 && dispatch(
        setFiltersAction(data[0].filters.map(item => ({ name: item.name, value: item.value, operator: item.operator, type: item.type })))
      );
    }
  });

  useEffect(() => {
    const myList = formatStoredFilers(stored_filters, filters);
    setFiltersCreate(myList);
  }, [stored_filters, favSearch]);

  useEffect(() => {
    // to detect if we have already wrapped filters div
    if(filters__) {
      if(initHeight === 0) {
        setInitHeight(getHeight(filters__));
      }
      setBtnRight(getLeft(AddFilterBtn));// get distance between +add btn and end of filters section
    }
  }, [stored_filters]);

  const setWrapValue = () => (filters__ && (filtersCreate.length > 8) &&
    (filtersCreate !== formatDefaultFilters) &&
    AddFilterBtn &&
    (getHeight(filters__) > initHeight) &&
    ((getLeft(AddFilterBtn) + 200) > getWidth(filters__)));

  useEffect(() => {
    if(setWrapValue()) {
      // condition pour  afficher les ...
      setIsTwoLines(true);
      // pour afficher l'interface en mode plein
      setFullScreen(true);
      setOpenFilter(false);
      count === 0 && setCount(filtersCreate.length);
    }

    if((isFullScreen && filtersCreate.length === count) || filtersCreate.length < 8) {
      setIsTwoLines(false);
      setFullScreen(false);
    }
  }, [stored_filters, initHeight, btnRight, isFullScreen]);

  const onApplyFilter = () => {
    setIsModified(false);
    setOpenFilter(false);
  };

  const handleChange = (e) => {
    setSearchActiveKwd(e.target.value);
  };

  useEffect(() => {
    if(afterLoading) {
      setOpen(true);
      setAfterLoading(false);
    }
  }, [afterLoading]);

  const handleClick = () => {
    // if we have already two full lines show full screen then open popover
    if(isTwoLines) {
      setFullScreen(true);
      setAfterLoading(true);
    } else {
      setOpen(true);
    }

    setIsActifContainer(true);
    setIsModified(false);
  };

  const handleClose = () => {
    setOpen(false);
    setIsModified(false);
  };

  const handleMore = (e) => {
    setIsModified(false);
    setIsTwoLines(true);
    setIsActifContainer(true);
    setFullScreen(true);
    setOpenFilter(false);
  };

  const handleCloseAll = () => {
    // restore all
    setIsModified(false);
    setOpen(false);
    setIsActifContainer(false);
    setSearchActiveKwd("");
    setFullScreen(false);
    setOpenFilter(false);
  };

  const createFilterCallback = (filter) => {
    setOpen(false);
    setOpenFilter(true);
  };

  const buildDefaultFilters = (_filters) => {
    const items = [];
    _filters?.forEach((item, index) => {
      const filter = {
        name: item.name,
        operator: "",
        type: item.type,
        value: ""
      };
      items.push(filter);
    });
    return items;
  };

  useEffect(() => {
    if(isSuccess) {
      // setFiltersCreate([...filters.defaults])
      setDefaultFilters(filters.defaults);
      setFormatDefaultFilters(formatStoredFilers(buildDefaultFilters(filters.defaults), filters));
      setDefaultFilters(filters.defaults);
    }
  }, [filters]);

  const initializeStore = () => {
    dispatch(setFiltersAction(buildDefaultFilters(defaultFilters)));
  };

  useEffect(() => {
    // initiate store filters: if there is data in store set with store else set with defaultFilters
    const IsEmptyStore = (stored_filters.filter(item => item.value !== "")).length === 0;
    if(IsEmptyStore) {
      !searchId && initializeStore();
    } else {
      const list = formatStoredFilers(stored_filters, filters);
      setFiltersCreate(list);
    }
  }, [defaultFilters]);

  const renderExpanded = () => (
    <div
      className={clsx(
        classes.root,
        "analyticsFilters",
        (isFullScreen && isActifContainer) && "isExpanded"
      )}>
      <div ref={refKwd} className="analyticsFilters__search">
        <TextField
          placeholder="Search Keyword"
          id="outlined-basic"
          value={searchActiveKwd}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  disableRipple={true}
                  disableFocusRipple={true}
                  onClick={() => { }}
                  size="large">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
      <div className={classes.wrapper}> {renderAllFilters(filtersCreate)} </div>

      <IconButton
        className="analyticsFilters__reduce"
        disableRipple={true}
        disableFocusRipple={true}
        onClick={() => handleCloseAll()}
      >
        <FileUploadRoundedIcon className={classes.icon} htmlColor="white" />
      </IconButton>
    </div>
  );

  const renderAllFilters = filters => <>
    {filters?.map((filter, key) => (
      <AnalyticsFilterItem
        idx={key}
        searchActiveKwd={searchActiveKwd}
        isActifContainer={isActifContainer}
        onApplyFilter={onApplyFilter}
        setIsModified={e => setIsModified(e)}
        isModified={isModified}
        setIsActifContainer={e => setIsActifContainer(e)}
        currentFilter={filter}
        key={key}
        value={filter?.name}
        openFilter={openFilter}
        isFullScreen={isFullScreen && isActifContainer && searchActiveKwd !== ""}
      />
    ))
    }
    {(isTwoLines && (!isFullScreen)) && <span className={classes.BtnDots} onClick={handleMore}>...</span>}
    <div id='AddFilterBtn' ref={refFilters} style={{ marginTop: 10 }}>
      <Link className={classes.newFilters} color="primary" onClick={() => handleClick()}>
        + Add new filter
      </Link>
    </div>
  </>;

  const renderFilters = () => {
    const customFilters = filtersCreate.slice(0, 4);
    return <div className={classes.filters} id='myfilters'>
      {isFullScreen ? renderExpanded() : renderAllFilters(isTwoLines ? customFilters : filtersCreate)}

    </div>;
  };

  const onRefresh = () => {
    if(isTwoLines) {
      setIsTwoLines(false);
      setFullScreen(false);
    }
    setItemToLocalStorage("searchId", null);
    initializeStore();
  };

  const { data: createResponse, refetch } = useQuery(
    "createFavSearchFilters",
    createAnalyticsFavSearchFilters({
      name: savedSearchName,
      filters: filtersCreate.filter(item => (!!item?.value))
    }),
    {
      onSuccess: (data) => {
        setSnackbar({ ...snackbar, message: data, open: true });
      },
      refetchOnWindowFocus: false,
      enabled: false // turned off by default, manual refetch is needed
    }
  );

  const onSave = () => {
    // add loader
    refetch();
    setOpenTooltipSaveSearch(false);
    // add succes
  };

  const saveSearchTooltipContent = () => (
    <ClickAwayListener onClickAway={() => setOpenTooltipSaveSearch(false)}>
      <div className={classesModalSave.root} >
        <Typography className={classesModalSave.title} variant="subtitle1">Save my search</Typography>
        <Typography className={classesModalSave.label} variant="caption">Name of the filter</Typography>
        <TextField className={classesModalSave.input} value={savedSearchName} onChange={e => setSavedSearchName(e.target.value)} />
        <footer className={classesModalSave.footer}>
          <Button color="secondary" onClick={() => setOpenTooltipSaveSearch(false)}>Cancel</Button>
          <Button color="primary" variant='contained' onClick={() => onSave()} disabled={!savedSearchName}>Save</Button>
        </footer>
      </div></ClickAwayListener>);

  const tooltipClasses = makeStyles(theme => ({
    popper: {
      backgroundColor: "transparent"
      // borderRadius: theme.shape.border.radiusMin,
      // border: '1px solid grey'
    },
    tooltip: {
      width: "240px",
      padding: "0px",
      backgroundColor: theme.palette.white,
      border: theme.shape.border.solidGrey
    },
    arrow: {
      color: theme.palette.white

      // borderRadius: theme.shape.border.radiusMin,
      // border: '1px solid grey'
    }
  }));

  const TruncateModalClasses = makeStyles(theme => ({
    popper: {
      backgroundColor: "transparent"
      // borderRadius: theme.shape.border.radiusMin,
      // border: '1px solid grey'
    },
    tooltip: {
      border: theme.shape.border.solidGrey
    },
    arrow: {
      color: theme.palette.white

      // borderRadius: theme.shape.border.radiusMin,
      // border: '1px solid grey'
    }
  }));

  const onSaveSearch = () => {
    const filtersToSave = stored_filters.filter(filter => filter.value !== "");

    if(filtersToSave.length === 0) {
      setSnackbar({ ...snackbar, severity: "warning", message: "You have to add filters first", open: true });

      return;
    }
    setOpenTooltipSaveSearch(true);
  };

  return <>
    <ClickAwayListener onClickAway={handleCloseAll}>
      <div className={classes.wrapper}>
        <div
          id={"container"}
          className={clsx(
            classes.root,
            "analyticsFilters",
            isActifContainer && "isActif"
          )}>
          {renderFilters()}
          <div className={classes.asideBtns}>
            <Tooltip
              arrow={true}
              classes={tooltipClasses({})}
              open={openTooltipSaveSearch}
              title={saveSearchTooltipContent()}
            >
              <IconButton
                sx={{ cursor: "pointer" }}
                className={classes.svg}
                disableRipple={true}
                disableFocusRipple={true}
                onClick={onSaveSearch}
                disabled={!isActifContainer}
                size="large">
                <StarBorderIcon className={classes.icon} color={!isActifContainer ? "disabled" : "primary"} />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem className={classes.divider} />
            <IconButton
              className={classes.svg}
              disableRipple={true}
              disableFocusRipple={true}
              onClick={() => onRefresh()}
              disabled={!isActifContainer}
              size="large">
              <Retry className={classes.iconReset} fill={!isActifContainer ? theme.palette.grey[400] : theme.palette.primary.main} />
            </IconButton>
            {!isFullScreen && <Divider orientation="vertical" flexItem className={classes.divider} />}
            {!isFullScreen && <IconButton
              className={classes.svg}
              disableRipple={true}
              disableFocusRipple={true}
              onClick={handleClickTruncate}
              disabled={!(window.location.href.indexOf("table") > -1)}
              color='primary'
              size="large">
              <MenuRoundedIcon className={classes.icon} />

            </IconButton>
            }
            <Popover
              id={idTruncate}
              open={openTruncate}
              anchorEl={anchorElTruncate}
              onClose={handleCloseTruncate}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
            >
              <div className={classesModalTruncate.root} >
                <Typography className={classesModalTruncate.title} variant="subtitle1">Text display</Typography>
                <RadioGroup name="truncate-radio-buttons-group" value={valueTruncate} onChange={handleChangeTruncate}>
                  <FormControlLabel classes={{ root: classesModalTruncate.formControlLabel }} value={"unTruncate"} control={<Radio />} label="Show all text" />
                  <FormControlLabel classes={{ root: classesModalTruncate.formControlLabel }} value={"truncate"} control={<Radio />} label="Truncate text" />
                </RadioGroup>
              </div>

            </Popover>
          </div>
        </div>

        <Popover
          open={open}
          anchorEl={refFilters?.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}

        >
          <AnalyticsCreateFilters
            anchorEl={refFilters?.current}
            createFilterCallback={createFilterCallback}
            filterCategories={isSuccess && filters.filter_categories}
            setIsModified={setIsModified}
            setOpen={setOpen}
            onApplyFilter={onApplyFilter}
            setCurrentFilter={setCurrentFilter} />
        </Popover>
        <Popover
          open={openFilter}
          anchorEl={refFilters?.current}
          onClose={() => setOpenFilter(false)}
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
            // setOpen={() => setOpen(false)}
            handleClosePCallback={() => setOpenFilter(false)}
            idx={stored_filters.length}
            // onHandleChanged={(val)=> setIsdot(val)}
            onApplyFilter={onApplyFilter}
            currentFilter={currentFilter}
            typeModal={"edit"}
            handleClose={() => setOpenFilter(false)}
          />
        </Popover>
      </div>
    </ClickAwayListener>
    <Snackbar anchorOrigin={{
      vertical: "top",
      horizontal: "center"
    }} open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
      <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  </>;
}
