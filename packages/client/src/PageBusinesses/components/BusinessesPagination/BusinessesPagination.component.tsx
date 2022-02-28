import React, { useEffect, useRef } from "react";
import { FormControl, FormControlLabel, IconButton, InputAdornment, Popover, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BuListPaginator from "../BuListPaginator/BuListPaginator.component";
import { useStyles } from "./BusinessPagination.style";

export default function BusinessesPagination({ total, nbItemsPerPage = 10, onChangePage }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const anchorRef = useRef(null);
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    onChangePage(value);
  };

  useEffect(() => {
  }, [open]);
  return (
    <div className={classes.container}>
      <div className={classes.nav}>
        <Popover
          id="mouse-over-popoverF"
          style={{ width: "86px" }}
          classes={{
            paper:
              "popover--paper popover--noOverflow popover--triangle popover--triangleBottom",
            root: "popover"
          }}
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorRef.current}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          disableRestoreFocus
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={e => setValue(e.target.value)}
            >
              <FormControlLabel sx={{ marginBottom: "2px" }} value="10" control={<Radio />} label="10" />
              <FormControlLabel sx={{ marginBottom: "2px" }} value="30" control={<Radio />} label="30" />
              <FormControlLabel sx={{ marginBottom: "2px" }} value="50" control={<Radio />} label="50" />
              <FormControlLabel sx={{ marginBottom: "2px" }} value="100" control={<Radio />} label="100" />
              <FormControlLabel sx={{ marginBottom: "2px" }} value="200" control={<Radio />} label="200" />
              <FormControlLabel sx={{ marginBottom: "2px" }} value="500" control={<Radio />} label="500" />
            </RadioGroup>
          </FormControl>
        </Popover>
        <Typography sx={{ lineHeight: "25.34px" }}>{"Number of lines"}</Typography>
        <TextField ref={anchorRef}
          value={value}
          disabled
          id="standard-basic"
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="show list"
                  disableRipple
                  style={{ height: "6px", width: "12px" }}
                  onClick={() => setOpen(true)}
                  edge="end">
                  <KeyboardArrowDownIcon />
                </IconButton>
              </InputAdornment>
            ),
            className: classes.input
          }} />
        <BuListPaginator onChangePage={handleChange} total={total} />
      </div>
    </div>
  );
}
