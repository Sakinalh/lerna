import { useNavigate } from "react-router";
import { MenuList, Paper, useTheme, IconButton, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getUserBusinesses } from "src/api/react-query/user.store";
import BuiItem from "src/PageBusinesses/components/BuiItemRow/BuiItem.component";
import BusinessesPagination from "src/PageBusinesses/components/BusinessesPagination/BusinessesPagination.component";
import CardUser from "src/PageBusinesses/components/CardUser/CardUser.component";
import AsideBar from "src/PageBusinesses/components/AsideBar/AsideBar.component";
import useUserslist from "src/hooks/useUsersList";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/model";
import { setBusiness } from "src/PageBusinesses/store/businesses.actions";
import { useStyles } from "./BuiListWithDetails.style";
export default function BuiListWithDetails() {
  const navigate = useNavigate();
  const classes = useStyles({});
  const theme = useTheme();
  const dispatch = useDispatch();
  const [defaultIndex, setIndex] = useState(-1);
  const [userVal, setUserVal] = useState("");
  const business = useSelector((state: StoreState) => state.business.business);
  const [listUsers, setListUsers] = useState([]);
  const { isSuccess, data: businesses } = useQuery("getUserBusinesses", getUserBusinesses);
  const { data: users, isSuccess: isSucessUsers } = useUserslist({ bid: business });
  const [paginatedData, setPaginatedData] = useState(businesses);

  useEffect(() => {
    users && setListUsers(users);
  }, [users]);

  useEffect(() => {
    setPaginatedData(businesses);
  }, [businesses]);

  const onChangePage = (page: number) => {
    const startIndex = ((page - 1) * 10);
    const endIndex = page === (businesses?.length / 10) ? null : (page - 1) * 10 + 10;
    setPaginatedData([...businesses?.slice(startIndex, endIndex)]);
  };

  const handleShowDetails = (idx) => {
    dispatch(setBusiness(businesses[idx].Pk));
    setIndex(idx);
  };
  const handleSearchUser = (value) => {
    const results = users.filter(user => user.firstname.toUpperCase().indexOf((value).toUpperCase()) !== -1 || user.lastname.toUpperCase().indexOf((value).toUpperCase()) !== -1);
    setListUsers(results);
    setUserVal(value);
  };

  return (
    <div style={{ padding: "38px 7.03986429177% 41px 7.03986429177%", boxSizing: "border-box" }}>
      <div className={classes.page}>
        <IconButton
          onClick={() => navigate("/data/analytic/dashboard", { replace: true })}
          aria-label="delete"
          sx={{ border: "1px solid black", borderRadius: "50%", marginRight: "15px", height: 34, width: 34}}
          size="large">
          <ArrowBackIcon fontSize='small' sx={{ color: theme.palette.black, fontWeight: "700px" }} />
        </IconButton>
        <Typography variant='subtitle1' sx={{ marginBottom: "none", fontSize: "16px" }} >Back</Typography>
      </div>
      <div className={classes.container}>
        <div className={classes.title}> All customer accounts <span className={classes.subtitle}>{`( ${businesses?.length} comptes )`}</span></div>
        <AsideBar />
      </div>
      {businesses && <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <MenuList style={{ width: "100%" }}>
          {businesses?.map((item, index) => <BuiItem key={index} item={item} index={index} defaultIndex={defaultIndex} handleShowDetails={handleShowDetails} />)}
        </MenuList>
        {defaultIndex !== -1 && listUsers && <CardUser className={classes.paper} listUsers={listUsers} userVal={userVal} handleSearchUser={handleSearchUser} business={business} />}
      </div>}
      {businesses && <BusinessesPagination onChangePage={onChangePage} total={businesses.length} />}
    </div>
  );
}
