import React from "react";
import clsx from "clsx";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import SearchIcon from "@mui/icons-material/Search";

import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { List } from "../List/List.component";
import { useStyles } from "./ModalFilterProd.style";

export interface ModalFilterProdProps {
  type: string;
}

export function ModalFilterProd(props: ModalFilterProdProps) {
  const HIGHT_SLIDE_ONE = 270;
  const HIGHT_SLIDE_TWO = 190;

  const [heightPopup, setHeightPopup] = React.useState(HIGHT_SLIDE_ONE);

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

  const { type = "click" } = props;

  const [stepForm, setStepForm] = React.useState(0);

  const handleClickFormNext = (event) => {
    event.preventDefault();
    setHeightPopup(HIGHT_SLIDE_TWO);
    setStepForm(1);
  };
  const handleClickFormPrev = () => {
    setHeightPopup(HIGHT_SLIDE_ONE);
    setStepForm(0);
  };

  const style = {
    transform: `translateX(calc( -50% * ${stepForm}))`
  };

  const heightStyle = {
    height: heightPopup
  };

  const classes = useStyles({});

  const popOver = type => (
    <div className={clsx(classes.root)}>
      <form style={heightStyle} className="filterProd__form">
        {type === "click" ? (
          <div style={style} className="filterProd__form--container">
            <div className="filterProd__form--first">
              <TextField
                  className="filterProd__search"
                  placeholder="Search filter"
                  id="outlined-basic"
                  variant="outlined"
                  InputProps={{
                    classes: {
                      adornedStart: "input__outline--icon",
                      root: "input input__outline--root",
                      focused: "input input__outline--focused",
                      disabled: "input input__outline--disabled"
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton disableRipple={true} disableFocusRipple={true} size="large">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

              <List
                  customclass="list--filter"
                  container={true}
                  elems={[
                    {
                      title: "Default",
                      links: [
                        {
                          title: "title"
                        }
                      ]
                    },

                    {
                      title: "Pricing",
                      links: [
                        {
                          title: "title"
                        }
                      ]
                    },
                    {
                      title: "Default",
                      links: [
                        {
                          title: "title"
                        }
                      ]
                    },

                    {
                      title: "Pricing",
                      links: [
                        {
                          title: "title"
                        }
                      ]
                    }
                  ]}
                  action={handleClickFormNext}
                />
            </div>

            <div className="filterProd__form--second">
              <header className="filterProd__header">
                <KeyboardArrowLeftRoundedIcon onClick={handleClickFormPrev} />
                <h4>filter</h4>
              </header>
              <Typography component="p" variant="subtitle1" className="filterProd__subTitle">title</Typography>

              <FormControl
                  className="filterProd__input"
                  fullWidth={true}
                  variant="outlined"
                >
                <TextField
                    InputProps={{
                      classes: {
                        root: " input__outline--root",
                        focused: " input__outline--focused",
                        disabled: " input__outline--disabled"
                      }
                    }}
                    id="outlined-select-gender"
                    select
                    label={gender === "" ? "Gender" : ""}
                    value={gender}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: false,
                      classes: {
                        root: "label--select"
                      }
                    }}
                    SelectProps={{
                      MenuProps: {
                        className: "menutest"
                      }
                    }}
                    margin="normal"
                    variant="outlined"
                  >
                  {genders.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

              <FormControl
                  className="filterProd__input"
                  fullWidth={true}
                  variant="outlined"
                >
                <TextField
                    placeholder="disney"
                    id="outlined-basic"
                    variant="outlined"
                    InputProps={{
                      classes: {
                        root: "input input__outline--root",
                        focused: "input input__outline--focused",
                        disabled: "input input__outline--disabled"
                      }
                    }}
                  />
              </FormControl>

              <Grid
                  container
                  alignItems="center"
                  justifyContent="flex-end"
                  component="footer"
                  className="filterProd__footer"
                >
                <AppBtn typeBtn="secondary">Cancel</AppBtn>
                <AppBtn typeBtn="primary">apply</AppBtn>
              </Grid>
            </div>
          </div>
        ) : (
          <div className="filterProd__form--second">
            <Typography component="p" variant="subtitle1" className="filterProd__subTitle">title</Typography>

            <FormControl
                  className="filterProd__input"
                  fullWidth={true}
                  variant="outlined"
                >
              <TextField
                    InputProps={{
                      classes: {
                        root: " input__outline--root input__outline--filter",
                        focused: " input__outline--focused",
                        disabled: " input__outline--disabled"
                      }
                    }}
                    id="outlined-select-gender"
                    select
                    label={gender === "" ? "Gender" : ""}
                    // className={classes.textField}
                    value={gender}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: false,
                      classes: {
                        root: "label--select"
                      }
                    }}
                    SelectProps={{
                      MenuProps: {
                        className: "menutest"
                      }
                    }}
                    margin="normal"
                    variant="outlined"
                  >
                {genders.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <FormControl
                  className="filterProd__input"
                  fullWidth={true}
                  variant="outlined"
                >
              <TextField
                    placeholder="disney"
                    id="outlined-basic"
                    variant="outlined"
                    InputProps={{
                      classes: {
                        root: "input input__outline--root",
                        focused: "input input__outline--focused",
                        disabled: "input input__outline--disabled"
                      }
                    }}
                  />
            </FormControl>

            <Grid
                  container
                  alignItems="center"
                  justifyContent="flex-end"
                  component="footer"
                  className="filterProd__footer"
                >
              <AppBtn typeBtn="secondary">Cancel</AppBtn>
              <AppBtn typeBtn="primary">apply</AppBtn>
            </Grid>
          </div>
        )}
      </form>
    </div>
  );

  return popOver(type);
}
