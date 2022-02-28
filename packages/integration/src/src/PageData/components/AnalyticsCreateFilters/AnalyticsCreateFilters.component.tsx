import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { InputAdornment, TextField, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useStyles } from "./AnalyticsCreateFilters.style";

export interface AnalyticsCreateFiltersProps {
  filterCategories: any
  createFilterCallback,
  setCurrentFilter
}

export function AnalyticsCreateFilters(_props: AnalyticsCreateFiltersProps) {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const [allFilters, setAllFilters] = useState([]);

  const {
    filterCategories,
    createFilterCallback,
    setCurrentFilter
  } = _props;

  useEffect(() => {
    // get all filters items in one object
    const filterArray = [];
    filterCategories.forEach((filterCategorie) => {
      filterCategorie.filters.forEach((filter) => {
        filterArray.push(filter);
      });
    });

    setAllFilters(filterArray);
  }, []);

  const handleCreateFilter = (e, filter) => {
    e.preventDefault();
    setCurrentFilter(filter);
    createFilterCallback(filter);
  };

  const handleSearch = (e) => {
    const results = allFilters.filter(filter => filter.name.toUpperCase().indexOf((e.target.value).toUpperCase()) !== -1);

    setResultSearch(results);
    setSearchInput(e.target.value);
  };

  return (
    <div className={clsx(classes.root, "analyticsCreateFilters")}>
      <div className="analyticsCreateFilters__header">
        <TextField
          fullWidth
          placeholder="Search Keyword"
          id="outlined-basic"
          value={searchInput}
          onChange={handleSearch}
          variant="outlined"
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
      <div className="analyticsCreateFilters__body">

        {
            (searchInput === "" ? filterCategories : Array.from(new Array(1))).map((category, idx) => (
              <Accordion key={idx} classes={{ root: "accordion" }}>
                {searchInput === "" ? <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className="isBold" component="p" >{category.category_name}</Typography>
                </AccordionSummary> : null}
                <AccordionDetails>
                  <ul className="accordionList">
                    {
                        (searchInput !== "" ? resultSearch : category.filters).map((filter, idx) => (
                          <li onClick={e => handleCreateFilter(e, filter)} key={idx} className="accordionList__li">
                            <Typography className="accordionList__a" component="a" >{filter.name}</Typography>
                          </li>
                        ))
                      }
                  </ul>
                </AccordionDetails>
              </Accordion>
            ))
          }

      </div>
    </div>
  );
}
