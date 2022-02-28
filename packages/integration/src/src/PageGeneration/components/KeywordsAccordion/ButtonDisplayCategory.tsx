import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import IconButton from "@mui/material/IconButton";
import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { VisibilityOffOutlined } from "@mui/icons-material";
import { ReactComponent as ArrowLeft } from "src/assets/img/arrowLeft.svg";
import Tooltip from "@mui/material/Tooltip";
import { popperOverride, tooltipOverride } from "./ButtonDisplayCategory.style";

interface ButtonDisplayCategoryProps {
    handleClickOnCategory: Function;
    categories: string[];
}

export const ButtonDisplayCategory: React.FC<ButtonDisplayCategoryProps> = ({handleClickOnCategory, categories}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const popper = popperOverride();
  const tooltip = tooltipOverride();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const changeCategoriesToShow = (e, category) => {
    if(e.target.checked && !categories.includes(category)) {
      categories.push(category);
    } else {
      if(categories.length === 1) {
        return;
      }
      categories.splice(categories.indexOf(category), 1);
    }

    handleClickOnCategory(categories);
  };

  return (
    <>
      <IconButton aria-label="show" onClick={handleClick} size="large">
        <Visibility />
      </IconButton>

      <Popover
                classes={{paper: popper.paper}}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
        <ArrowLeft className={popper.arrow}/>
        <Paper elevation={3} className={popper.blocCategory}>
          <Typography variant="subtitle1">Show</Typography>
          {["pending", "published", "linked"].map((category: string) => (
            <FormControlLabel label={category.capitalizeFirstLetter()}
                            control={
                              <Tooltip
                                    classes={tooltip}
                                    title={ <div className={tooltip.containerTitle}>
                                      <ErrorOutlineIcon />
                                      <div> You must have at least one active category</div>
                                    </div>}
                                    placement="right"
                                    arrow
                                    disableHoverListener={(categories.length > 1) || !categories.includes(category) }
                                    >
                                <Checkbox
                                            checked={categories.includes(category)}
                                            inputProps={ {"aria-label": "Checkbox demo" }}
                                            icon={<VisibilityOffOutlined color="disabled"/>}
                                            onChange={e => changeCategoriesToShow(e, category)}
                                            checkedIcon={<Visibility />}
                                        />
                              </Tooltip>}
                             />
          ))}
        </Paper>
      </Popover>
    </>
  );
};