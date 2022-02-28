import { useState, useRef, useEffect } from "react";
import { Button, IconButton, InputAdornment, Paper, Popper, TextField, Fade, Link, ListItemText, MenuItem, MenuList, ListItemIcon, Popover, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import buIcon from "src/assets/img/buIcon.svg";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import AddBoxIcon from "@mui/icons-material/AddBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import clsx from "clsx";
import { AppText } from "src/components/AppText/AppText.component";
import { AppBtn } from "src/components";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import __ from "lodash";
import { StoreState } from "src/model";
import { useSelector } from "react-redux";
import { getUserBusinesses } from "src/api/react-query/user.store";
import { useStyles } from "./MenuBusinesses.style";

export interface MenuBusinessesProps {
  isExpanded: boolean;
}

export function MenuBusinesses(_props: MenuBusinessesProps): JSX.Element {
  const classes = useStyles({});
  const [open, setOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [FilterValue, setFilterValue] = useState("AtoZ");
  const [searchInput, setSearchInput] = useState("");
  const business = useSelector((state: StoreState) => state.business.business);
  const anchorRef = useRef(null);
  const anchorRefP = useRef(null);
  const navigate = useNavigate();

  const customerId = window.localStorage.getItem("naister_user_customer_id");
  const { data: buids } = useQuery("getUserBusinesses", getUserBusinesses);

  useEffect(() => {
    setBusinesses(buids);
  }, [buids]);

  useEffect(() => {
  }, [businesses]);

  useEffect(() => {
    if(!_props.isExpanded) {
      setOpen(false);
      setOpenFilters(false);
    }
  }, [_props.isExpanded]);

  const handleSearch = (e) => {
    const results = buids.filter(bui => bui.business_name.toUpperCase().indexOf((e.target.value).toUpperCase()) !== -1);
    setBusinesses(results);
    setSearchInput(e.target.value);
  };

  function seeAll() {
    setOpen(false);
    navigate("/data/page-businesses-details/", { replace: true });
  }

  function showFilterActions() {
    setOpenFilters(true);
  }

  function getCriteriaSort(value) {
    const criteria = {
      operator: "",
      operand: "asc"
    };
    switch (value) {
      case "AtoZ":
        criteria.operand = "business_name";
        criteria.operator = "asc";
        break;
      case "ZtoA":
        criteria.operand = "business_name";
        criteria.operator = "desc";
        break;
      case "RtoO":
        criteria.operand = "creation_date";
        criteria.operator = "asc";
        break;
      case "OtoR":
        criteria.operand = "creation_date";
        criteria.operator = "asc";
        break;
      default:
        criteria.operand = "business_name";
        criteria.operator = "asc";
    }
    return criteria;
  }
  function handleOrderBy(value) {
    setFilterValue(value);
    const criteria = getCriteriaSort(value);
    setBusinesses(__.orderBy(buids, [criteria.operand], [criteria.operator]));
  }

  return (
    <div
      ref={anchorRef}
      className={clsx(classes.root)}
    >
      <div ref={anchorRef} onClick={() => setOpen(!open)} className={classes.block}>
        <img
          className={classes.logo}
          src={buIcon}
          alt="application has error"
        />
        {_props.isExpanded && <>
          <div style={{ width: "100%", paddingLeft: 12 }}>
            <AppText
              props={{
                classes: { root: classes.customerId },
                variant: "caption"
              }}
              text="Name Account"
              capitalize="all"
              bold="bold"
            />
            <AppText
              props={{ classes: { root: classes.splitBui } }}
              text={business as string}
            />
          </div>
          {open ? <ExpandLessIcon onClick={() => setOpen(!open)} /> : <ExpandMoreIcon onClick={() => setOpen(!open)} />

          }</>}
      </div>

      <Popper className={classes.popper} open={open && _props.isExpanded} anchorEl={anchorRef.current} placement={"bottom"}>
        <Paper>
          <div style={{ padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <TextField
              placeholder="Search"
              sx={{ width: "176px" }}
              id="outlined-basic"
              value={searchInput}
              onChange={e => handleSearch(e)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      disableRipple={true}
                      disableFocusRipple={true}
                      size="large">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <AppBtn
              typeBtn="iconRounded"
              noPadding
              fluid
              customclass="keyAccordion__summary--filters keyAccordion__filtersSummary"
              onClick={showFilterActions}

            >
              <TuneIcon ref={anchorRefP} />
            </AppBtn>
          </div>
          <MenuList>
            {businesses?.map((item, index) => <MenuItem key={index}>
              <ListItemText>
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <span style={{ fontWeight: 600, fontSize: "14px" }}>{item.business_name}</span>
                  <span className={classes.splitBui}>{item.Pk}</span>
                  <Link href="#" underline="none">
                    {item.website}
                  </Link>
                </div>
              </ListItemText>
              <ListItemIcon style={{ justifyContent: "flex-end" }}>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>)}
          </MenuList>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: 20, marginBottom: 10 }}>
            <Button sx={{ margin: 0, textTransform: "normal" }} color="primary" variant="outlined" onClick={() => seeAll()}>See all accounts</Button>
            <IconButton sx={{ margin: 0, padding: 0 }} aria-label="add">
              <AddBoxIcon sx={{ height: 40, margin: 0 }} color="primary" fontSize="large" />
            </IconButton>
          </div>
        </Paper>
      </Popper>
      <Popover
        id="mouse-over-popoverF"
        classes={{
          paper:
            "popover--paper popover--noOverflow popover--triangle popover--triangleLeft filterPop",
          root: "popover"
        }}
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        anchorEl={anchorRefP.current}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        disableRestoreFocus
      >
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Filters</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={FilterValue}
            onChange={e => handleOrderBy(e.target.value)}
          >
            <FormControlLabel sx={{ marginBottom: "2px" }} value="AtoZ" control={<Radio />} label="From A to Z" />
            <FormControlLabel sx={{ marginBottom: "2px" }} value="ZtoA" control={<Radio />} label="From Z to A" />
            <FormControlLabel sx={{ marginBottom: "2px" }} value="RtoO" control={<Radio />} label="From recent to old" />
            <FormControlLabel value="OtoR" control={<Radio />} label="From old to recent" />
          </RadioGroup>
        </FormControl>
      </Popover>
    </div>
  );
}