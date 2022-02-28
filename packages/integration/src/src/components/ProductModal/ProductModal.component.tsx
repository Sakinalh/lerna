import React, { Children, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { AppCheckbox } from "src/components/AppCheckbox/AppCheckbox.component";
import { CardImg } from "src/PageGeneration/components/CardImg/CardImg.component";
import { useSelector, useDispatch, dispatch } from "react-redux";
import {
  ProductInterface,
  tryGetProductsMetaFilters
} from "src/PageGeneration/store/areaProduct.epic";
import { PaginatedListApi, PROCESS_STATUS, StoreState } from "src/model";
import { List } from "src/PageGeneration/components/List/List.component";
import { getItemFromLocalStorage } from "src/shared/form";
import {
  FormControl,
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  Tooltip,
  Typography,
  Alert,
  Grid,
  ClickAwayListener } from "@mui/material";
import { Close, Add } from "@mui/icons-material";
import clsx from "clsx";
import {
  editOneFilter
} from "src/PageGeneration/shared/helper";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { areaProductEdit_QParamsType } from "src/PageGeneration/shared/page_query_params";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { DEFAULT_LIMIT } from "src/shared/constants/constants";
import { AppSkeleton, AppTooltip } from "..";
import { deleteOneFilter } from "../../PageGeneration/shared/helper";
import { ActiveFilters } from "./ActiveFilters.component";
import { AppBtn } from "../AppBtn/AppBtn.component";
import { AppText } from "../AppText/AppText.component";
import { Footer } from "./Footer";
import { OperatorFormFilter } from "./OperatorFormFilter.component";
import { FilterProductInterface } from "../../PageGeneration/model/index";
import {
  tryGetProductsFiltersAction,
  tryAddProductPageAction,
  tryGetProposedZoneProductsAction,
  TryGetDetailsPageAction
} from "../../PageGeneration/store/actions";
import { useStyles } from "./ProductModal.style";
import { AppError } from "../AppError/AppError.component";

export interface ProductModalProps {
  header?: any;
  children: any;
  footer: any;
  type: "withSidebar" | "full";
  aside?: any;
  title?: string;
  products: ProductInterface[];
  closeModal: (value: boolean) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  closeModal
}) => {
  const classes = useStyles();
  const { getQueryParams } = useUrlSearchParams();
  const [_pageId, _keywordId, _ruleId, _zoneId] = getQueryParams(
    areaProductEdit_QParamsType
  );
  const dispatch = useDispatch();
  const selectedRule = getItemFromLocalStorage("selectedRule");
  const selectedZone = getItemFromLocalStorage("selectedZone");
  const selectedKwd = getItemFromLocalStorage("selectedKeyword");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: DEFAULT_LIMIT
  });
  const [resetPaginationPage, setResetPaginationPage] = useState(false);

  const app_process_status = useSelector((state: StoreState) => state.app.processStatus);

  const [processStatus, setProcessStatus] = useState(app_process_status);
  useEffect(() => {
    setProcessStatus(app_process_status);
  }, [app_process_status]);

  const selectedPage = useSelector((state: StoreState) => state.pageQueue.selectedPage);

  const selectedKeyword = useSelector((state: StoreState) => state.pageQueue.selectedKwd);

  useEffect(() => {
    dispatch(
      tryGetProductsFiltersAction({
        keyword_id: selectedKeyword,
        page_id: selectedPage && selectedPage.page_id
      })
    );
  }, []);

  const payload = {
    keyword_id: selectedKeyword,
    rule_id: selectedRule.id,
    page_id: selectedPage && selectedPage.page_id,
    zone_id: selectedZone.id,
    filters: [],
    ...pagination
  };

  const filters: FilterProductInterface[] = useSelector(
    (state: StoreState) => state.pageQueue.productFilters
  );

  /**
   * appliedFilters use to call api
   */
  const [appliedFilters, setAppliedFilters] = useState<any>([]);
  const [displayListFilter, setDisplayListFilter] = useState<boolean>(false);
  /**
   * activeFilters use to display list filter
   */
  const [activeFilters, setActiveFilters] = useState<any>([]);
  const [filterToEdit, setFilterToEdit] = useState<any>();
  const [filterSelected, setFilterSelected] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const seletedZone = getItemFromLocalStorage("selectedZone");

  const [productsToAdd, setProductsToAdd] = useState<ProductInterface[]>([]);
  const [duplicateFilterError, setDuplicateFilterError] = useState<boolean>(
    false
  );

  const selectedCampain = useSelector(
    (state: StoreState) => state.pageQueue.selectedCampain
  );

  const displayFilters = () => {
    const display = !displayListFilter;
    setFilterToEdit(null);
    setFilterSelected(null);
    setDisplayListFilter(display);

    displayListFilter && !filterSelected && !filterToEdit
      ? setElementWrapped(true)
      : detectWrap();
    displayListFilter && !filterSelected && !filterToEdit
      ? setMoreFilters(false)
      : setMoreFilters(true);
  };

  const handleClickPrev = () => {
    setFilterSelected(null);
  };

  const chooseFilter = (e: any, filter: FilterProductInterface) => {
    e.preventDefault();
    setFilterSelected(filter);
  };

  useEffect(() => {
    dispatch(tryGetProposedZoneProductsAction(payload));
  }, []);

  const paginate = (page: number) => {
    setResetPaginationPage(false);

    const newPagination = {
      offset: (page - 1) * DEFAULT_LIMIT,
      limit: DEFAULT_LIMIT
    };

    setPagination(newPagination);

    const params = {
      ...payload,
      ...newPagination,
      filters: [...appliedFilters]
    };

    dispatch(tryGetProposedZoneProductsAction(params));
  };

  const addToProductList = (productToAdd: ProductInterface) => {
    let position = null;

    productsToAdd.forEach((product: ProductInterface, index: number) => {
      if(productToAdd.id === product.id) {
        position = index;
        return false;
      }
    });

    if(position !== null) {
      const buffer = productsToAdd;
      buffer.splice(position, 1);
      setProductsToAdd([...buffer]);
    } else {
      setProductsToAdd([...productsToAdd, productToAdd]);
    }
  };

  const addProductToPage = () => {
    const formatedFilter: {
      zone_id: string;
      content_id: string;
    }[] = productsToAdd.map((product: ProductInterface) => ({
      content_id: product.id,
      zone_id: selectedZone.id
    }));
    dispatch(
      tryAddProductPageAction({
        keyword_id: selectedKeyword,
        page_id: selectedPage.page_id,
        products: formatedFilter
      })
    );
    dispatch(TryGetDetailsPageAction({ rule_id: _ruleId, keyword_id: _keywordId, page_id: _pageId }));

    closeModal(true);
  };

  const filteredProducts: PaginatedListApi<ProductInterface> = useSelector(
    (state: StoreState) => state.pageQueue.proposedProducts
  );

  useEffect(() => {
    filteredProducts &&
      filteredProducts.results &&
      filteredProducts.results.length <= 0
      ? setIsLoading(true)
      : setIsLoading(false);
  }, [filteredProducts]);

  const onAddFilter = (
    operator: string,
    value: string,
    filterToEdit: any = null
  ) => {
    const formatedFilter = {
      id: activeFilters[appliedFilters.length - 1] ? appliedFilters[appliedFilters.length - 1].id + 1 : 1,
      name: filterSelected.name,
      operator: operator,
      value: value
    };

    const newActiveFilter = {
      filter: filterSelected,
      id: activeFilters[activeFilters.length - 1] ? activeFilters[activeFilters.length - 1].id + 1 : 1,
      name: filterSelected.name,
      operator: operator,
      value: value
    };

    if(filterToEdit) {
      editOneFilter(activeFilters, filterToEdit, newActiveFilter.name, operator, value);
      editOneFilter(appliedFilters, filterToEdit, formatedFilter.name, operator, value);
    } else {
      setAppliedFilters([...appliedFilters, formatedFilter]);
      setActiveFilters([...activeFilters, newActiveFilter]);
    }

    setFilterToEdit(null);
    setDisplayListFilter(false);
    setFilterSelected(false);
    setResetPaginationPage(true);

    const filters = filterToEdit
      ? [...appliedFilters]
      : [...appliedFilters, formatedFilter];

    dispatch(
      tryGetProposedZoneProductsAction({
        ...payload,
        offset: 0,
        limit: 10,
        filters: filters.map(filter => ({ name: filter.name, operator: filter.operator, value: filter.value }))
      })
    );

    setMoreFilters(false);
  };

  const onDeleteFilter = (filterToDelete) => {
    deleteOneFilter(
      activeFilters,
      filterToDelete.name,
      filterToDelete.operator,
      filterToDelete.value
    );
    deleteOneFilter(
      appliedFilters,
      filterToDelete.name,
      filterToDelete.operator,
      filterToDelete.value
    );
    setAppliedFilters([...appliedFilters]);
    setActiveFilters([...activeFilters]);

    setFilterSelected(false);
    setFilterToEdit(null);
    setResetPaginationPage(true);

    dispatch(
      tryGetProposedZoneProductsAction({
        ...payload,
        offset: 0,
        limit: 10,
        filters: [...appliedFilters]
      })
    );
  };

  const onEditFilter = (filter: any) => {
    setFilterSelected(filter.filter);
    setFilterToEdit(filter);
    setDisplayListFilter(true);
  };

  const resetProductSelection = () => {
    setProductsToAdd([]);
  };
  const handleClickAwayFilterList = () => {
    setDisplayListFilter(false);
    setFilterSelected(false);
    setFilterToEdit(null);
  };

  const handleClickAwayFormFilter = () => {
    setFilterSelected(false);
  };

  const [moreFilters, setMoreFilters] = useState(false);

  const [elementWrapped, setElementWrapped] = useState(false);

  const detectWrap = () => {
    const container = document.querySelectorAll(".container__filters--actif");
    if(container[0] !== undefined) {
      for(let i = 0; i < container.length; i++) {
        const item = container[i].children;
        for(let j = 0; j < item.length; j++) {
          const itemLoc = item[j].getBoundingClientRect().top;
          const containerLoc = container[i].getBoundingClientRect().top;
          if(itemLoc > containerLoc + .5) {
            // eslint-disable-next-line
            console.log(itemLoc, containerLoc, "tets")
            item[j].classList.add("wrapped");
          } else {
            item[j].classList.remove("wrapped");
          }
        }
      }
      let isWrapped = false;
      Array.from(container[0].children).forEach((children, index) => {
        if(children.classList.contains("wrapped")) {
          isWrapped = true;
        }
      });

      if(container[0].children.length > 0 && isWrapped) {
        setElementWrapped(true);
      } else {
        setElementWrapped(false);
      }
    }
  };

  const handleDetect = (e) => {
    detectWrap();
  };

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", handleDetect);
    window.addEventListener("resize", handleDetect);
    return () => {
      window.removeEventListener("DOMContentLoaded", handleDetect);
      window.removeEventListener("resize", handleDetect);
    };
  }, []);

  const handleMoreFilters = () => {
    moreFilters && setFilterSelected(null);
    setMoreFilters(!moreFilters);
    moreFilters && setFilterToEdit(null);
    moreFilters && setFilterSelected(null);
    setDisplayListFilter(false);
  };

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", handleDetect);
    window.addEventListener("resize", handleDetect);
    return () => {
      window.removeEventListener("DOMContentLoaded", handleDetect);
      window.removeEventListener("resize", handleDetect);
    };
  }, []);

  useEffect(() => {
    detectWrap();
  }, [appliedFilters]);

  return (
    <div className={classes.root}>
      {// eslint-disable-next-line
      console.log('Active Filters', activeFilters)}
      <Dialog
        data-cy="modalProduct"
        open={true}
        fullScreen={true}
        classes={{
          paperFullScreen: "dialog--fullscreen"
        }}
      >

        <div className={clsx(classes.root, "container  container--action")}>
          <header className="container__header">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className="gridHeader">
                <Typography className="container__header--title" component="h2" variant="h1">
                  Add product
                </Typography>
              </Grid>
              <Grid item className="container__header--close">
                <Close
                  data-cy="modalProductClose"
                  onClick={() => closeModal(false)}
                />
              </Grid>
            </Grid>
          </header>
          <div className="container__body">
            <div className={clsx("container__filters--global")}>
              {displayListFilter && !filterSelected && !filterToEdit && (
                <ClickAwayListener onClickAway={handleClickAwayFilterList}>
                  <div className="filterNav__form ">
                    <List
                      customclass="list--filter"
                      container={true}
                      elems={filters}
                      action={chooseFilter}
                    />
                  </div>
                </ClickAwayListener>
              )}
              {displayListFilter && filterSelected && (
                <div className="filterNav__form">
                  <OperatorFormFilter
                    onCloseFilter={handleClickAwayFilterList}
                    filterToEdit={filterToEdit}
                    onAddFilter={onAddFilter}
                    filterSelected={filterSelected}
                    handleClickPrev={handleClickPrev}
                  />
                </div>
              )}

              <div
                className={clsx("container__filters--wrapper", {
                  isToggleMoreFilter: moreFilters
                })}
              >
                <Grid
                  container
                  className={clsx("container__filters", {
                    isDisplay:
                      (displayListFilter && !filterSelected && !filterToEdit) ||
                      (displayListFilter && filterSelected)
                  })}
                >
                  <Grid item className="filterNav">
                    <AppBtn
                      data-cy="addFilter"
                      customclass="filterNav__btn"
                      typeBtn="filterNav"
                      arrow
                      fluid
                      disableRipple={true}
                      endIcon={<Add />}
                      onClick={displayFilters}
                    >
                      Add Filter
                    </AppBtn>
                  </Grid>
                  {/* {elementWrapped && <Grid item className="filterNav">
                    <AppBtn
                      endIcon={<FilterListOutlinedIcon />}
                      onClick={handleMoreFilters}
                      typeBtn="primary"
                    >
                      Show More
                    </AppBtn>
                  </Grid>} */}
                  <div className="container__filters--actif">
                    <ActiveFilters
                      activeFilters={activeFilters}
                      onDeleteFilter={onDeleteFilter}
                      onEditFilter={onEditFilter}
                    />
                  </div>

                  {!moreFilters && elementWrapped && activeFilters.length > 0 && (
                    <Grid item className="filterNav">
                      <FormControl
                          className="filterSelect"
                          fullWidth={true}
                          variant="outlined"
                        >
                        <Select
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "left"
                              },
                              getContentAnchorEl: null,
                              classes: {
                                paper: "menu menu--paper"
                              }
                            }}
                            className="filterNav filterNav--fakeBtn filterNav__item"
                            value=""
                            displayEmpty
                            name="more"
                          >
                          <MenuItem value="">...</MenuItem>
                          {activeFilters.map((filter, index) => (
                            <MenuItem key={index} value="...">
                              <span className="filterSelect--operator">
                                {filter.operator}
                              </span>
                              <span
                                    title={filter.value}
                                    className="filterSelect--value ellipsis"
                                  >
                                {filter.value}
                              </span>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      </Grid>
                  )}
                </Grid>
              </div>
            </div>
            <Grid className={clsx("container__products", filteredProducts && filteredProducts.results.length <= 0 && "container__products--error")} container item xs={12}>
              {filteredProducts && filteredProducts.results.length > 0 ? (<Grid container={true} spacing={2} component="div">
                {(filteredProducts && filteredProducts.results
                  ? filteredProducts.results
                  : Array.from(new Array(8))
                ).map((product: ProductInterface, index: number) => (
                  <Grid item key={index} lg={3} md={4} xl={2}>
                    {product && processStatus === PROCESS_STATUS.DONE ? (
                      <CardImg
                          isSelected={true}
                          header={true}
                          content={true}
                          footer={true}
                          tag={true}
                          pct={
                            Number(product.score) ? Number(product.score) : 0
                          }
                          src={product.image}
                          actions={
                            <Grid
                              container
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Grid item>
                                <AppCheckbox
                                  onChange={() => { }}
                                  isSmall
                                  onClick={() => addToProductList(product)}
                                  whiteBg
                                  color="primary"
                                  disableRipple={true}
                                  checked={productsToAdd.includes(product)}
                                />
                              </Grid>
                            </Grid>
                          }
                          children={
                            <>
                              <AppTooltip
                                classes={{
                                  tooltip: "tooltip"
                                }}
                                arrow
                                placement="bottom"
                                title={<div className="tooltip__container">{product.title}</div>}
                              >
                                <h4 className="cardImg__title ellipsis">
                                  {product.link_to !== null ? (
                                    <a target="blank" href={product.link_to}>
                                      {product.title}
                                    </a>
                                  ) : (
                                    product.title
                                  )}
                                </h4>
                              </AppTooltip>

                              <AppTooltip
                                classes={{
                                  tooltip: "tooltip"
                                }}
                                arrow
                                placement="bottom"
                                title={<div className="tooltip__container">{product.description}</div>}
                              >
                                <p className="cardImg__description ellipsisMulti">
                                  {product.description}
                                </p>
                              </AppTooltip>
                              <p className="cardImg__price">
                                € {product.price}
                              </p>
                            </>
                          }
                        />
                    ) : (
                      <AppSkeleton type="PRODUCT_MODAL_CARD" />
                    )}
                  </Grid>
                ))}
              </Grid>
              ) :
              <AppError
                  message={"Sorry! There are no products matching your search"}
                  className={"container__products--error"}
                />
              }
            </Grid>
          </div>
          <Footer
            onApply={addProductToPage}
            onCancel={() => closeModal(false)}
            totalItems={filteredProducts && filteredProducts.count}
            nbProductSelected={productsToAdd.length}
            paginate={paginate}
            resetPaginationPage={resetPaginationPage}
          />
        </div>

        <Snackbar
              open={duplicateFilterError}
              onClose={() => setDuplicateFilterError(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={1000}
            >
          <Alert severity="error">{"Filter alreeady exists"}</Alert>
        </Snackbar>
      </Dialog>
    </div>
  );
};
