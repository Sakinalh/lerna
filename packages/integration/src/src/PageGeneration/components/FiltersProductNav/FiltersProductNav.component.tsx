import React from "react";
import clsx from "clsx";
import { Close, Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import Popover from "@mui/material/Popover";

import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { ModalFilterProd } from "../ModalFilterProd/ModalFilterProd.component";
import { useStyles } from "./FiltersProductNav.style";

export interface FiltersProductNavProps {
  filters: [
    {
      type: string;
      query: string;
      keyword: string;
    }
  ];
}

export function FiltersProductNav(props: FiltersProductNavProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [
    anchorElFilter,
    setAnchorElFilter
  ] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorElFilter(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElFilter(null);
  };

  const openFilter = Boolean(anchorElFilter);

  const [gender, setGender] = React.useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  const genders = [
    {
      value: "M",
      label: "Male"
    },
    {
      value: "F",
      label: "Female"
    },
    {
      value: "O",
      label: "Other"
    }
  ];

  const {
    filters = [
      {
        type: "title",
        query: "contains",
        keyword: "disney"
      }
    ]
  } = props;

  const popOver = type => (
    <Popover
      id="mouse-over-popovers"
      classes={{
        paper: `popover--paper popover--noOverflow popover--triangle ${
          type === "click"
            ? "popover--trianglePopFilter"
            : "popover--triangleNavFilter"
        } popover--filterProd`,
        root: "popover "
      }}
      open={type === "click" ? openFilter : open}
      anchorEl={type === "click" ? anchorElFilter : anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      onClose={type === "click" ? handleClose : handlePopoverClose}
      disableRestoreFocus
    >
      <ModalFilterProd type={type} />
    </Popover>
  );

  const classes = useStyles({});

  return (
    <div className={clsx(classes.root)}>
      {filters.length > 0 && (
        <>
          {// eslint-disable-next-line
          filters.map(function (filter, i) {
            return (
              <div
                className={clsx("filtersProductNav filterProductBtn", {
                  active: open
                })}
                aria-owns={open ? "mouse-over-popovers" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                key={i}
              >
                <span className="filtersProductNav__item filtersProductNav__item--title ellipsis">
                  {filter.type}
                </span>
                <span
                  className={clsx("filtersProductNav__popover ", {
                    isOpen: open
                  })}
                >
                  <span className="filtersProductNav__item  filtersProductNav__item--strong ellipsis">
                    {filter.query}
                  </span>

                  {popOver("hover")}

                  <span className="filtersProductNav__item  ellipsis">
                    {filter.keyword}
                  </span>
                </span>
                <AppBtn
                  color="inherit"
                  fluid
                  noPadding
                  disableTouchRipple={true}
                  focusRipple={false}
                  disableRipple={true}
                >
                  <Close className="filtersProductNav__item  filtersProductNav__item--close" />
                </AppBtn>
              </div>
            );
          })}
        </>
      )}

      <AppBtn
        // noPadding
        typeBtn="filterNav"
        arrow
        fluid
        disableRipple={true}
        aria-owns={openFilter ? "mouse-over-popoverF" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<Add />}
        customclass={clsx("filterProductBtn", {
          "active": openFilter
        })}

      >
        Add filter
      </AppBtn>

      {popOver("click")}
    </div>
  );
}
