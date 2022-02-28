import { IconButton, Menu, MenuItem } from "src/deps";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { FilterList } from "@mui/icons-material";
import { TemplateSort, TemplateSortCriteriaValue, TemplateSortModel } from "src/PageGeneration/model";
import { DataQueryValue, ListSort, SortItemOrder } from "src/model";

const useStyles = makeStyles(theme => ({
  root: {},
  icon: {
    color: theme.palette.grey.middle1
  }
}));

export function appendOrder(
  select: TemplateSort[],
  sortState: DataQueryValue
): SortItemOrder[] {
  if(!sortState.sort_order) {
    return [];
  }
  return select.reduce((acc: any[], curr) => [
    ...acc,
    ...[
      {
        ...curr,
        value: `${curr.value}__asc`,
        viewValue: curr.viewValue.concat(" (ascending)")
      },
      {
        ...curr,
        value: `${curr.value}__desc`,
        viewValue: curr.viewValue.concat(" (descending)")
      }
    ]
  ], []);
}

export function setSortValue(sortState: ListSort) {
  if(!sortState.sort_order || !sortState.sort_order) {
    return "";
  }
  return `${sortState.sort_criteria}__${sortState.sort_order}`;
}

interface TemplateSortBtnProps {
    sortList: TemplateSortModel;
    onSort: Function;
    reqState: DataQueryValue;

}

const fallback: TemplateSortModel = {
  list: [],
  defaultValue: ""
};

export function TemplateSortBtn(props: TemplateSortBtnProps): JSX.Element {
  const { sortList = fallback, onSort, reqState } = props;

  const classes = useStyles({});

  const handleChange = (event: React.MouseEvent<HTMLLIElement>, selection: string) => {
    const [criteria, order] = (selection).split("__");
    const payload = {
      ...reqState,
      sort_criteria: criteria as TemplateSortCriteriaValue,
      sort_order: order as "asc" | "desc",
      offset: "0"
    };

    onSort(payload);
    setAnchorEl(null);
  };
  const sortListWithOrder = appendOrder(sortList.list, reqState);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div className={classes.root}>

      <IconButton
        color="secondary"
        aria-label="sort list"
        classes={{ root: classes.icon }}
        onClick={handleClick}
        size="large">
        <FilterList/>
      </IconButton>

      <Menu
        id="template_sort"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}

      >
        {sortListWithOrder.map(item => (
          <MenuItem key={item.value}
            value={item.value}
            onClick={e => handleChange(e, item.value)}>
            {item.viewValue}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
