import {useEffect, useState } from "react";
import { AppBar, IconButton, TextField, Toolbar, Typography, InputAdornment, FormControlLabel, Checkbox, Button, Container, Pagination} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppText } from "src/components";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { FavFiltersResponse, getAnalyticsFavSearchFilters } from "src/api/react-query/analytics/analytics.store";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { setItemToLocalStorage } from "src/shared/form";
import { FavSearchListModal } from "../Analytics/SearchListModals/FavSearchListModal.component";
import { deleteAnalyticsFavSearchFilters } from "../../../api/react-query/analytics/analytics.store";
import { ListItemFilters } from "../Analytics/SearchListModals/SearchList/ListItemFilters.component";
import { ConfirmDialog } from "../../../components/ConfirmDialog/ConfirmDialog.component";
import { optimSearchPage } from "./FavoriteSearches.style";

export default function FavoritesSearches() {
  const theme = useTheme();
  const LIMIT_PER_PAGE = 10;
  const [selectedFavSearch, setSelectedFavSearch] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [openFavFilterModal, setOpenFavFilterModal] = useState(false);
  const navigate = useNavigate();
  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState(false);
  const classes = optimSearchPage();
  const [pagination, setPagination] = useState({page: 1, limit: LIMIT_PER_PAGE});

  const {data: favoriteSearches, refetch} = useQuery(
    ["getAnalyticsFavSearch", pagination.page],
    getAnalyticsFavSearchFilters(pagination),
    {
      staleTime: 1,
      refetchOnWindowFocus: false
    }
  );
  const mutation = useMutation((params: any) => deleteAnalyticsFavSearchFilters(params), {
    onSuccess: () => {
      refetch();
      setIsConfirmDialogOpened(false);
    }
  });
  const [savedSearches, setSavedSearches] = useState(favoriteSearches?.results);
  const [value, setValue] = useState("");

  useEffect(() => {
    setSavedSearches(favoriteSearches?.results);
  }, [favoriteSearches]);

  const onSelectFavSearch = (search: FavFiltersResponse) => {
    setSelectedFavSearch(search);
    setOpenFavFilterModal(true);
  };

  const deleteFavSeach = async (idSearch: string) => {
    if(idSearch) {
      await mutation.mutate({ids: [idSearch]});
      if(mutation.isSuccess) {
        await refetch();
      }
    }
  };
  const handleChange = (e) => {
    setCheckedItems([]);
    setValue(e.target.value);
    const items = favoriteSearches?.results.filter(item => item.name?.toUpperCase().indexOf((e.target.value).toUpperCase()) !== -1);
    setSavedSearches(items);
  };

  const onClose = () => {
    setSelectedFavSearch(null);
    setOpenFavFilterModal(false);
  };

  const onCheckItem = (id: string) => {
    if(checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(_id => _id !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };
  const removeAll = async () => {
    await mutation.mutate({ids: checkedItems});
    if(mutation.isSuccess) {
      await refetch();
    }
  };

  const selectAll = (e) => {
    if(e.target.checked) {
      const searchIds = savedSearches.map(search => search.id);
      setCheckedItems(searchIds);
    } else {
      setCheckedItems([]);
    }
  };

  const getNbElemShown = () => savedSearches?.length > 10 ? 10 : savedSearches?.length;

  const onChangePage = (e, value) => {
    setPagination({...pagination, page: value});
  };

  return (
    <>
      <ConfirmDialog
                title='Remove Saved Searches'
                textContent='Are you sure you want to remove your saved searches?'
                open={isConfirmDialogOpened}
                handleClose={() => setIsConfirmDialogOpened(false)}
                handleConfirm={removeAll}
                confirmLabel={"Delete"}
                />

      <Toolbar className={classes.toolbar}>
        <div>
          <Typography variant="h2">My Searchs</Typography>
          <Typography variant="subtitle2">{savedSearches?.length} results</Typography>
        </div>
        <TextField
                    className={classes.inputSearch}
                    type='search'
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" >
                          <SearchIcon sx={{marginLeft: "8px"}}/>
                        </InputAdornment>
                      )
                    }}/>
        <div>
          <FormControlLabel sx={{marginRight: "25px"}} control={<Checkbox checked={checkedItems.length === savedSearches?.length && savedSearches.length !== 0} onClick={e => selectAll(e)}/>} label="Select all" />
          <Button
                        onClick={() => setIsConfirmDialogOpened(true)}
                        color={ checkedItems.length > 0 ? "error" : "primary"}
                        disabled={checkedItems.length === 0}
                        variant="contained"
                        sx={{textTransform: "none"}}
                        startIcon={<DeleteIcon />}>
            Remove
          </Button>
        </div>
      </Toolbar>
      <ul className={classes.listItemFavSearch}>
        <ListItemFilters
                    _apply={(search) => {
                      setItemToLocalStorage("searchId", search.id);
                      navigate("/data/analytic/all/dashboard/");
                    }}
                    data={savedSearches}
                    onSelectSearch={search => onSelectFavSearch(search)}
                    onDelete={deleteFavSeach}
                    displayCheckbox={true}
                    onCheckItem={onCheckItem}
                    itemsSelected={checkedItems}
                />
      </ul>

      <div className={classes.footer}>
        <Typography sx={{alignSelf: "center", marginRight: "57px"}} variant='subtitle1'>Showing {getNbElemShown()} of {savedSearches?.length} results</Typography>
        { Math.trunc(savedSearches?.length / 10) > 0 && <Pagination
                onChange={onChangePage}
                className={classes.paginator}
                count={Math.ceil(savedSearches?.length / 10)}
                color='secondary'
                page={pagination.page}
            />}
      </div>

      { openFavFilterModal && <FavSearchListModal _onReturn={() => onClose()} _selectedSearch={selectedFavSearch} _activeStep={1} openModal={openFavFilterModal} onClose={() => onClose()} />}

    </>
  );
}