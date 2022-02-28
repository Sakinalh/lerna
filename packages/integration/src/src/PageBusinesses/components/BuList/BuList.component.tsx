import {useEffect, useState} from "react";
import { Box, Button, TextField, Typography, List, MenuList} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import BuListItem from "../BuListItem/BuListItem.component";
import {useStyles} from "./BuList.styles";

export default function BuList({data}) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState(null);
  const [businesses, setBusinesses] = useState([...data]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setBusinesses(data.filter(business => (business?.business_name?.toLowerCase().includes(value.toLowerCase()))));
  };

  const getData = () => searchValue ? businesses : data;

  useEffect(() => {
    // console.log(businesses);
  }, [businesses]);
  return (
    <Box className={classes.box}>
      <header className={classes.header}>
        <Typography component="h1" variant="h1">SELECT A CLIENT ACCOUNT ({businesses.length}) </Typography>
        <div>
          <TextField
            className={classes.textField}
            placeholder="Search"
            autoComplete="off"
            id="outlined-basic"
            value={searchValue}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    disableRipple={true}
                    disableFocusRipple={true}
                    onClick={() => { }}
                    size="large">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
        />
          <Button color='primary' className={classes.button} variant="contained" > <AddIcon /></Button>
        </div>
      </header>
      <MenuList className={classes.list}>
        {getData().map(item => <BuListItem key={item.business_name} business={item} />)}
      </MenuList>
    </Box>
  );
}
