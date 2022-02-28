import React, {useState} from "react";
import clsx from "clsx";
import { FilterProductInterface } from "src/PageGeneration/model";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useStyles} from "./List.style";

export interface ListProps {
    elems : any[];
    action: (e: any, action: FilterProductInterface) => void;
    container?: boolean;
    customclass ?: string;
  }

export const List:React.FC<ListProps> = ({elems, container = false, customclass= "list--filter", action }) => {
  const classes = useStyles({});
  const [searchString, setSearchString] = useState("");

  const getFiltersByCategory = () => {
    const indexedFilters: any[] = [];

    elems && elems.forEach((elem: FilterProductInterface) => {
      !indexedFilters[elem.category] && (indexedFilters[elem.category] = []);
      indexedFilters[elem.category].push(elem);
    });

    return indexedFilters;
  };

  const filtersReIndexed = getFiltersByCategory();

  const getCategories = () => {
    const categories: string[] = [];

    for(const key in filtersReIndexed) {
      categories.push(key);
    }

    return categories;
  };

  const onSearchInfilters = (e: any) => {
    const value = e.target.value;
    setSearchString(value);
  };

  return (
    <div className={clsx(classes.root, "filterProd__form--first")}>
      <TextField
      value={searchString}
      onChange={onSearchInfilters}
      placeholder="Search filter"
      id="outlined-basic"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton disableRipple={true} disableFocusRipple={true} size="large">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />

      <div className={clsx("list", customclass)}>
        <ul className={ clsx({"list__container": container})} >
          {
               getCategories().map((category: string, i:number) => (
                 <li key={i} className="list__item">
                   <span className="list__item--title" >{category}</span>
                   <ul className="list">
                     { searchString ?
                       filtersReIndexed[category].filter(elem => elem.display_name.startsWith(searchString)).map(filter => (
                         <li key={i} className="list__item">
                           <a onClick={e => action(e, filter)} className="list__item--a" href="">
                             {filter.display_name}</a>
                         </li>
                       ))

                       :
                     // eslint-disable-next-line
                                     filtersReIndexed[category].map( function (filter, i) {
                         return (
                           <li key={i} className="list__item">
                             <a onClick={e => action(e, filter)} className="list__item--a" href="">
                               {filter.display_name}</a>
                           </li>
                         );
                       })
                                 }
                   </ul>
                 </li>))
            }
        </ul>
      </div>

    </div>
  );
};