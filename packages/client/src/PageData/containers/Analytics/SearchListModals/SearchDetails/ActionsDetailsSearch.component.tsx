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
import { VisibilityOffOutlined } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";

// import { ListItemFilters } from "./ListItemFilters.component";
import { useQuery } from "react-query";
import { FavFiltersResponse } from "src/api/react-query/analytics/hooks/analytics.store";

interface ActionsDetailsSearchProps {
    prev: () => void;
    onApply: () => void;
    onDelete: () => void;
}

export const ActionsDetailsSearch: React.FC<ActionsDetailsSearchProps> = ({prev, onApply, onDelete}) => {
  const theme = useTheme();

  const deleteItem = () => {
    onDelete();
    prev();
  };

  return (

    <div style={{display: "flex", flexDirection: "row", justifyContent: "right", width: "100%"}}>
      <Button color="secondary" sx={{marginRight: "20px" }}
 autoFocus onClick={() => prev()}>
        Return
      </Button>
      <Button
                size="large"
                sx={{width: "34px", height: "36.5px", padding: "0px", marginRight: "5px" }}
                color='error'
                variant="contained"
                onClick={() => deleteItem()} ><DeleteIcon /></Button>

      <Button color="primary" variant='contained' autoFocus onClick={() => onApply()}>
        Apply
      </Button>
    </div>

  );
};