import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useStyles } from "./AsideBar.style";

export default function AsideBar(props) {
  const classes = useStyles({});
  return (
    <div className={classes.aside}>
      <TextField
                placeholder="Search "
                id="outlined-basic"
                value={""}
                onChange={(e) => {}}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        disableRipple={true}
                        disableFocusRipple={true}
                        size="large">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    height: "35px",
                    width: "209px"
                  }
                }}
            />
      <IconButton aria-label="tune">
        <TuneIcon fontSize="large"/>
      </IconButton>
      <IconButton aria-label="add">
        <AddBoxIcon color="primary" fontSize="large"/>
      </IconButton>
    </div>
  );
}
