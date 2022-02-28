import React, { useState } from "react";
import PickerToolbar from "@material-ui/pickers/_shared/PickerToolbar";
import ToolbarButton from "@material-ui/pickers/_shared/ToolbarButton";
import makeStyles from "@mui/styles/makeStyles";
import dayjs from "dayjs";

export const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#397EF5",
    color: "#FFF"
  },
  toolbarButton: {
    "&  *": {
      color: "#FFF"
    }
  }
}));

const CustomToolbar = function (props) {
  const { date,
    isLandscape,
    openView,
    setOpenView,
    title} = props;

  const formatedDate = dayjs(date);

  const handleChangeViewClick = view => (e) => {
    setOpenView(view);
  };

  const classes = useStyles();

  return (
    <PickerToolbar className={classes.toolbar} title={title} isLandscape={isLandscape}>
      <ToolbarButton
        className={classes.toolbarButton}
        onClick={handleChangeViewClick("year")}
        variant="h6"
        label={formatedDate.format("YYYY")}
        selected={openView === "year"}
      />
      <ToolbarButton
        className={classes.toolbarButton}
        onClick={handleChangeViewClick("date")}
        variant="h5"
        selected={openView === "date"}
        label={formatedDate.format("MMMM")}
      />
    </PickerToolbar>
  );
};

export default CustomToolbar;
