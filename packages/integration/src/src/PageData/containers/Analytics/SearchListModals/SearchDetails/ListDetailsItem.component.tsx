import React, {useState} from "react";
import { Avatar, Button, Divider, Link, ListItemAvatar, ListItemIcon } from "@mui/material";
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
import { FavFiltersResponse } from "src/api/react-query/analytics/hooks/analytics.store";
import Box from "@mui/material/Box";
import { ReactComponent as Delete } from "../../../../../styles/global/icons/delete.svg";
import { useListDetails } from "./ListDetailsItem.styles";

interface ListItemFiltersProps {
    currentSearch: FavFiltersResponse;
}
export const ListDetailsItem:React.FC<ListItemFiltersProps> = ({ currentSearch }) => {
  const classes = useListDetails();
  const theme = useTheme();

  return (
    <div style={{height: "290px", overflowY: "scroll", overflowX: "hidden"}}>
      <ListItem alignItems="flex-start">
        <ListItemText primary={<Typography variant='subtitle1' >
          Filters:
        </Typography>} />
      </ListItem>
      { currentSearch?.filters?.map((filter, index) => (
        <ListItem key={index} alignItems="flex-start" className={classes.root} >
          <ListItemText
                        sx={{marginBottom: "18px"}}
                        primary={<Typography component='span' variant='body1'>{filter.name?.capitalizeFirstLetter()} </Typography>}
                        secondary={<Typography component='span' variant='subtitle1'>
                          {filter.operator +" " + filter.value}
                        </Typography>}
                        />
        </ListItem>
      ))
            }
    </div>
  );
};