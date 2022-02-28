import React, {useState} from "react";
import { Avatar, Button, Divider, Link, ListItemAvatar, ListItemIcon, Checkbox, FormControlLabel } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs from "dayjs";
import { FavFiltersResponse } from "src/api/react-query/analytics/analytics.store";
import Skeleton from "@mui/material/Skeleton";
import { useListItemStyles } from "../FavSearchListModal.style";
import { ReactComponent as Delete } from "../../../../../styles/global/icons/delete.svg";

interface ListItemFiltersProps {
    data: FavFiltersResponse[];
    onSelectSearch: (search: FavFiltersResponse) => void;
    onDelete: (searchId: string) => void;
    displayCheckbox?: boolean;
    onCheckItem?: (id: string) => void;
    itemsSelected?: any[];
    _apply?: (searchId: any) => void;
}

export const ListItemFilters: React.FC<ListItemFiltersProps> = ({_apply, data, onSelectSearch, onDelete, displayCheckbox, onCheckItem, itemsSelected}) => {
  const listItemClasses = useListItemStyles();
  const theme = useTheme();
  const applySearch = (search) => {
    _apply && _apply(search);
  };

  while(!data) {
    return [1, 2, 3].map((item, index) => <Skeleton key={index} className={listItemClasses.rootContainer} height={95} variant="rectangular" />);
  }

  return (
    data?.map((item, index) => (
      <ListItem key={index} alignItems="flex-start" className={listItemClasses.rootContainer}>
        {displayCheckbox && <Checkbox sx={{marginRight: "25px"}} onClick={() => onCheckItem(item.id)} checked={itemsSelected.includes(item.id)} />}

        <ListItemText
                primary={<Typography variant='subtitle1' >{item.name?.capitalizeFirstLetter()}</Typography>}
                secondary={
                  <>
                    <Typography
                        sx={{mb: "9px"}}
                            variant="caption"
                        >
                      Create {` ${dayjs(item.creation_date).format("MMMM DD, YYYY")}`}
                    </Typography>

                    <Typography
                            variant="caption"
                        >
                      {item.filters.map((filter, index) => (`${filter.name}  ${filter.operator}  ${filter.value}, `))}
                    </Typography>
                  </>
                }
                />
        <ListItemIcon sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          width: "135px",
          color: theme.palette.black,
          "& svg": {
            m: 1.5
          },
          "& hr": {
            mx: 0.5
          }
        }}>
          <VisibilityOutlined onClick={() => onSelectSearch(item)}/>
          <Divider orientation="vertical" variant="middle" flexItem />
          <DeleteIcon sx={{marginRight: "19px"}} onClick={() => onDelete(item.id)} />
          <ArrowForwardIosIcon onClick={() => applySearch(item)} sx={{ color: theme.palette.grey.middle1, position: "relative",
            left: "14px", width: "13px", height: "13px"}}/>
        </ListItemIcon>
      </ListItem>
    ))
  );
};