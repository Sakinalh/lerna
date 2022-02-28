import clsx from "clsx";
import { Add, ChevronLeftRounded, Close } from "@mui/icons-material";
import { AppBtn } from "src/components";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { ReplaceFilterAction, setFiltersAction } from "src/PageGeneration/store/filters.actions";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { Typography } from "@mui/material";
import { AnalyticsInputGroup } from "../AnalyticsInputGroup/AnalyticsInputGroup.component";
import { useStyles } from "./AnalyticsEditFiltersModal.style";

export interface AnalyticsEditFiltersModalProps {
  handleClose: any
  typeModal: "edit" | "create",
  currentFilter: any,
  onApplyFilter,
  handleClosePCallback,
  idx,
}

export function AnalyticsEditFiltersModal(_props: AnalyticsEditFiltersModalProps) {
  const {
    handleClose,
    currentFilter,
    typeModal,
    onApplyFilter,
    idx,
    handleClosePCallback
  } = _props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const filters = useSelector((state: StoreState) => state.filters.data.filters);
  const [filterToSave, setFilterToSave] = useState(null);

  const onHandleSave = (filter) => {
    setFilterToSave(filter);
  };

  const onSubmit = () => {
    // if filter is already modified then just replace it
    if(filters[idx]) {
      dispatch(ReplaceFilterAction({ index: idx, filter: filterToSave }));
    } else {
      dispatch(setFiltersAction(filterToSave));
    }

    onApplyFilter();
  };

  return (
    <div className={clsx(classes.root, "analyticsEditFiltersModal", currentFilter.type)}>
      <header className="analyticsEditFiltersModal__header analyticsEditFiltersModal__header--edit">
        {typeModal === "edit" && <IconButton size="small" className={classes.backIcon} onClick={handleClose}>
          <ChevronLeftRounded fontSize="small" />
        </IconButton>}
        <Typography sx={{ textTransform: "capitalize" }} variant="subtitle2" component="p" className="analyticsEditFiltersModal__title isBold">
          {currentFilter.name}
        </Typography>
        {typeModal === "create" && <IconButton size="small" className={classes.backIcon} onClick={handleClose}>
          <Close fontSize="small" />
        </IconButton>}
      </header>

      <div className={clsx("analyticsEditFiltersModal__body")}>
        <div className={clsx("analyticsEditFiltersModal__body--wrapper")}>
          {
            Array.from(new Array(1)).fill("")
              .map((item, key) => (<AnalyticsInputGroup
                onHandleSave={onHandleSave}
                idx={idx}
                currentFilter={currentFilter}
                key={key} />
              ))
          }
          {
            currentFilter.type === "text" && (
              <div className="analyticsEditFiltersModal__add">
                <IconButton classes={{ root: classes.moreBtn }} aria-label="close" size="small">
                  <Add />
                </IconButton>
              </div>
            )
          }
        </div>
      </div>
      <footer className="analyticsEditFiltersModal__footer">
        <AppBtn onClick={handleClosePCallback} typeBtn="customSimple">
          cancel
        </AppBtn>

        <AppBtn onClick={onSubmit} disabled={!filterToSave} type={"submit"} typeBtn="customPrimary">
          Apply
        </AppBtn>
      </footer>
    </div>
  );
}
