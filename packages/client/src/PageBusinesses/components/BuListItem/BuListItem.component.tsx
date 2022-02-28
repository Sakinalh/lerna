import {Link, ListItem, ListItemText, Divider, Typography, MenuItem} from "@mui/material";
import { setBusiness } from "src/PageBusinesses/store/businesses.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(theme => ({

  menuItem: {
    boxSizing: "border-box",
    paddingTop: 32,
    paddingRight: 32

  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    boxSizing: "border-box"
  }
}));

export default function BuListItem({business}) {
  const {business_name, num_assos, Pk, creation_date, website, lastActivity} = business;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const setGlobalBuId = () => {
    dispatch(setBusiness(Pk));
    navigate("/data/analytic/dashboard", { replace: true });
  };
  return (
    <MenuItem className={classes.menuItem} divider onClick={setGlobalBuId}>
      <ListItem component={"div"} className={classes.listItem}>
        <ListItemText
           primaryTypographyProps={{sx: {fontWeight: "normal"}}}
           primary={<>
             <Typography variant="h2">{business_name}</Typography>
             <Typography variant="h2" sx={{fontWeight: "normal", marginBottom: "10px"}}>{num_assos}</Typography>
           </>}
          secondary={<Link href="#">{website}</Link>} />
        <Typography variant="subtitle2">Last activity : <span style={{fontWeight: "bold"}}>{lastActivity}</span></Typography>
      </ListItem>
    </MenuItem>
  );
}
