import React, {useState, useEffect} from "react";
import { Avatar, Button, Divider, Link, ListItemAvatar, ListItemIcon } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { VisibilityOffOutlined } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { setFiltersAction } from "src/PageGeneration/store/filters.actions";
import { useDispatch } from "react-redux";
// import { ListItemFilters } from "./ListItemFilters.component";
import { useDialogStyle, useDialogActionsStyles, useDialoagContentStyle, useListStyles } from "./FavSearchListModal.style";
import { deleteAnalyticsFavSearchFilters, FavFiltersResponse, getAnalyticsFavSearchFilters } from "../../../../api/react-query/analytics/analytics.store";
import { ListItemFilters } from "./SearchList/ListItemFilters.component";
import { ActionsListFavFilters } from "./SearchList/ActionsListFavFilters.component";
import {SearchDetailsTitle} from "./SearchDetails/SearchDetailsTitle.component";
import { ListDetailsItem } from "./SearchDetails/ListDetailsItem.component";
import { ActionsDetailsSearch } from "./SearchDetails/ActionsDetailsSearch.component";

interface FavSearchListModalProps {
    openModal: boolean;
    onClose: Function;
    _activeStep?: number;
    _selectedSearch?: string;
    _onReturn?: () => void;
}

export const FavSearchListModal: React.FC<FavSearchListModalProps> = ({openModal, onClose, _activeStep, _selectedSearch, _onReturn}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const listClasses = useListStyles();
  const dialogClasses = useDialogStyle();
  const dialogContent = useDialoagContentStyle();
  const dialogActionsClasses = useDialogActionsStyles();
  const location = useLocation();

  const [selectedFavSearch, setSelectedFavSearch] = useState(_selectedSearch || null);

  const [activeStep, setActiveStep] = useState(_activeStep | 0);
  const navigate = useNavigate();

  const {data: favData, refetch} = useQuery(["getAnalyticsFavSearch"], getAnalyticsFavSearchFilters({page: 1, limit: 5}));

  const mutation = useMutation((params: any) => deleteAnalyticsFavSearchFilters(params), {
    onSuccess: () => {
      refetch();
    }
  });

  const deleteFavSeach = async (idSearch: string) => {
    if(idSearch) {
      await mutation.mutate({ids: [idSearch]});
      if(mutation.isSuccess) {
        await refetch();
      }
    }
  };

  const onSeeMore =() => {
    navigate("/data/favorite/searches", { replace: true });
  };

  const onSelectFavSearch = (search: FavFiltersResponse) => {
    setSelectedFavSearch(search);
    setActiveStep(1);
  };

  const applyCurrentSearch = (search?) => {
    const pathName = location.pathname;
    if(!pathName.includes("dashboard")) {
      navigate("/data/analytic/dashboard", { replace: true });
    }
    dispatch(setFiltersAction(search?.filters || selectedFavSearch?.filters));
    onClose();
  };

  const steps = [
    {
      title: favData?.length === 0 ? <Typography variant='h3'>My searches</Typography> : null,
      content: <ListItemFilters _apply={search => applyCurrentSearch(search)} data={favData?.results} onSelectSearch={onSelectFavSearch} onDelete={deleteFavSeach}/>,
      actions: <ActionsListFavFilters totalSearch={favData?.results?.length | 0} onClose={() => onClose()} onSeeMore={() => onSeeMore()} />
    },
    {
      title: <SearchDetailsTitle onClose={() => onClose()} search={ selectedFavSearch}/>,
      content: <ListDetailsItem currentSearch={ selectedFavSearch} />,
      actions: <ActionsDetailsSearch
                        prev={() => {
                          if(_onReturn) {
                            _onReturn();
                          } else {
                            setActiveStep(0);
                          }
                        }}
                        onDelete={() => deleteFavSeach(selectedFavSearch?.id)}
                        onApply={() => applyCurrentSearch()}
                        />
    }
  ];

  return (
    <Dialog open={openModal} classes={{root: dialogClasses.root, paper: dialogClasses.paper}}>
      { steps[activeStep].title && <DialogTitle sx={{padding: "30px 40px  18px 39px"}}>
        <Typography variant='div'>{steps[activeStep].title}</Typography>
        </DialogTitle>}

      <DialogContent classes={dialogContent}>
        <List classes={listClasses} >
          { favData?.length !== 0 ? steps[activeStep].content : <Typography color='secondary' variant='subtitle1'>You don't have any saved search yet</Typography>}
        </List>
      </DialogContent>

      <DialogActions classes={dialogActionsClasses}>
        { favData?.length !== 0 ? steps[activeStep].actions : <Button color='secondary' onClick={() => onClose() }>Cancel</Button>}
      </DialogActions>
    </Dialog>
  );
};