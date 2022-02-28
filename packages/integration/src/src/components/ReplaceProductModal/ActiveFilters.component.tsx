import { FilterProductInterface } from "src/PageGeneration/model";
import { Grid } from "@mui/material";
import { Close } from "@mui/icons-material";

interface ActiveFiltersProps {
    activeFilters: FilterProductInterface[];
    onEditFilter: (filter: FilterProductInterface) => void;
    onDeleteFilter: (filter: FilterProductInterface) => void;
}

export const ActiveFilters: any = ({activeFilters, onEditFilter, onDeleteFilter}) => (activeFilters.map((filter, index) => (
  <Grid item className="filterNav" key={index}>
    <div className="filterNav filterNav--fakeBtn filterNav__item">
      <span className="filterNav__item--title">
        {filter.name}
      </span>
      <span
              className="filterNav__item--inside"
              onClick={() => onEditFilter(filter)}
            >
        <span className="filterNav__item--strong">
          {filter.operator}
        </span>
        <span className="ellipsis">{filter.value}</span>
      </span>
      <Close
              onClick={() => onDeleteFilter(filter)}
              className="filterNav__item--close"
            ></Close>
    </div>
  </Grid>
)));