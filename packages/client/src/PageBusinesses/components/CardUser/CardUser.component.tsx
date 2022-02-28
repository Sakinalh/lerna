import { AppText } from "src/components";
import SearchIcon from "@mui/icons-material/Search";
import UserPhoto from "src/assets/img/photo.svg";
import { Card, CardContent, CardHeader, IconButton, InputAdornment, Link, Menu, MenuItem, MenuList, Paper, TablePagination, TextField, Typography } from "@mui/material";
import { useStyles } from "./CardUser.style";

export default function CardUser(props) {
  const classes = useStyles({});
  const { listUsers, userVal, handleSearchUser, business } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        title={<Typography sx={{ display: "inline-block" }} component="h2" variant="h1">Account Name</Typography>}
        subheader={<span style={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: 300, display: "inline-block" }} className="ellipsis" component="h3" variant="h1">{business}</Typography>
          <Link style={{ fontWeight: 700, fontSize: "14px", marginTop: 16, display: "inline-block" }} href="#">http://jesuisuneadressefictive.com</Link>
        </span>}
      />
      <CardContent style={{ display: "flex", flexDirection: "column", height: "calc(100% - 140px)" }}>
        <span>
          <span>creation date: <span style={{ fontWeight: 600 }}>{"24/11/2021"}</span></span>
          <span style={{ marginLeft: 10, marginTop: "8px" }}>Last activity: <span style={{ fontWeight: 600 }}>{"15/12/2021"}</span></span>
        </span>
        <Typography component="p" variant="h2" sx={{ marginTop: "30px", fontWeight: 600 }}>Persons with access to this customer account ({listUsers.length}) </Typography>
        <TextField
          placeholder="Search"
          id="outlined-basic"
          value={userVal}
          onChange={e => handleSearchUser(e.target.value)}
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
              marginTop: "24px",
              height: "35px",
              width: "349px",
              backgroundColor: "white"
            }
          }}
        />
        <MenuList className={classes.listMui}>
          {listUsers?.map((item, index) => <MenuItem className={classes.user} divider key={index}>
            <img
              className={classes.logo}
              src={UserPhoto}
              alt="application has error"
            />
            <div >
              <Typography component="p" variant="subtitle1" >{item.firstname + " " + item.lastname}</Typography>
              <Typography component="p" variant="subtitle2" >Employee's function</Typography>
            </div>
          </MenuItem>)}
        </MenuList>
      </CardContent>
    </Card>
  );
}
