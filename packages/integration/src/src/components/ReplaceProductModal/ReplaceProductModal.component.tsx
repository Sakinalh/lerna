import React, { Children, useCallback, useEffect, useState } from "react";
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
  Radio,
  RadioGroup,
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
import { useForm, SubmitHandler } from "react-hook-form";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { ReplaceProduct_QParamsType } from "src/PageGeneration/shared/page_query_params";
import { DEFAULT_LIMIT } from "src/shared/constants/constants";
import { OperatorFormFilter } from "../ProductModal/OperatorFormFilter.component";
import { AppSkeleton } from "..";
import { Footer } from "./Footer";
import { deleteOneFilter } from "../../PageGeneration/shared/helper";
import { ActiveFilters } from "./ActiveFilters.component";
import { AppBtn } from "../AppBtn/AppBtn.component";
import { AppText } from "../AppText/AppText.component";
import { FilterProductInterface } from "../../PageGeneration/model/index";
import {
  tryGetProductsFiltersAction,
  tryAddProductPageAction,
  tryGetProposedZoneProductsAction,
  replaceProductRequestAction
} from "../../PageGeneration/store/actions";
import { useStyles } from "./ReplaceProductModal.style";
import { AppTooltip } from "../AppTooltip/AppTooltip.component";
import { AppError } from "../AppError/AppError.component";

export interface ReplaceProductModalProps {
  products: ProductInterface | null[];
  closeModal: (value: boolean) => void;
  currentProduct: ProductInterface | null;
}

type Inputs = {
  newProduct: string;
};

export const ReplaceProductModal: React.FC<ReplaceProductModalProps> = ({
  closeModal,
  currentProduct,
  products
}) => {
  const classes = useStyles();
  const { getQueryParams } = useUrlSearchParams();
  const [_pageId, _keywordId, _ruleId, _zoneId] = getQueryParams(ReplaceProduct_QParamsType);

  const app_process_status = useSelector((state: StoreState) => state.app.processStatus);

  const filteredProducts: PaginatedListApi<ProductInterface | null> = useSelector(
    (state: StoreState) => state.pageQueue.proposedProducts
  );

  const selectedKeyword = useSelector((state: StoreState) => state.pageQueue.selectedKwd);

  const filters: FilterProductInterface[] = useSelector(
    (state: StoreState) => state.pageQueue.productFilters
  );

  const successMessage = useSelector(
    (state: StoreState) => state.pageQueue.successMessage
  );
  const [processStatus, setProcessStatus] = useState(app_process_status);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: DEFAULT_LIMIT
  });
  const [resetPaginationPage, setResetPaginationPage] = useState(false);
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCurrent, setIsLoadingCurrent] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<string | null>(null);
  const [duplicateFilterError, setDuplicateFilterError] = useState<boolean>(false);
  const [moreFilters, setMoreFilters] = useState(false);
  const [elementWrapped, setElementWrapped] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState
  } = useForm<Inputs>();

  const payload = {
    keyword_id: _keywordId,
    rule_id: _ruleId,
    page_id: _pageId,
    zone_id: _zoneId,
    filters: [],
    ...pagination
  };
  const { isDirty, isValid } = formState;

  const dispatch = useDispatch();

  useEffect(() => {
    setProcessStatus(app_process_status);
  }, [app_process_status]);

  useEffect(() => {
    if(filteredProducts) {
      setValue("newProduct", filteredProducts.results[0]?.id);
      setNewProduct(filteredProducts.results[0]?.id);
    }
  }, [filteredProducts]);

  useEffect(() => {
    dispatch(
      tryGetProductsFiltersAction({
        keyword_id: selectedKeyword,
        page_id: _pageId
      })
    );
  }, []);

  useEffect(() => {
    dispatch(tryGetProposedZoneProductsAction(payload));
  }, []);

  useEffect(() => {
    filteredProducts &&
      filteredProducts.results &&
      filteredProducts.results.length <= 0
      ? setIsLoading(true)
      : setIsLoading(false);
  }, [filteredProducts]);

  useEffect(() => {
    setIsLoadingCurrent(true);
    window.setTimeout(() => {
      setIsLoadingCurrent(false);
    }, 500);

    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", handleDetect);
    window.addEventListener("resize", handleDetect);
    return () => {
      window.removeEventListener("DOMContentLoaded", handleDetect);
      window.removeEventListener("resize", handleDetect);
    };
  }, []);

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

  useEffect(() => { }, [newProduct]);

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

  const changeProduct = (event: any) => {
    const newProductId = event.target.value;
    setValue("newProduct", newProductId);
    setNewProduct(newProductId);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    replaceProduct(data);
  };

  const replaceProduct = (data: any) => {
    dispatch(
      replaceProductRequestAction({
        rule_id: _ruleId,
        keyword_id: _keywordId,
        zone_id: _zoneId,
        page_id: _pageId,
        current_product_id: currentProduct.id,
        new_product_id: data.newProduct
      })
    );

    closeModal(true);
  };

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

  const resetProductSelection = (e: any) => {
    e.preventDefault();
    setNewProduct(null);
    resetForm();
  };
  const handleClickAwayFilterList = () => {
    setDisplayListFilter(false);
    setFilterSelected(false);
    setFilterToEdit(null);
  };

  const handleClickAwayFormFilter = () => {
    setFilterSelected(false);
  };

  const detectWrap = () => {
    const container = document.querySelectorAll(".container__filters--actif");
    if(container[0] !== undefined) {
      for(let i = 0; i < container.length; i++) {
        const item = container[i].children;
        for(let j = 0; j < item.length; j++) {
          const itemLoc = item[j].getBoundingClientRect().top;
          const containerLoc = container[i].getBoundingClientRect().top;
          if(itemLoc > containerLoc) {
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

  const handleMoreFilters = () => {
    moreFilters && setFilterSelected(null);
    setMoreFilters(!moreFilters);
    moreFilters && setFilterToEdit(null);
    moreFilters && setFilterSelected(null);
    setDisplayListFilter(false);
  };

  const resetForm = () => {
    reset();
  };

  return (
    <div className={classes.root}>
      <Dialog
        data-cy="modalReplaceProduct"
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
                <Typography className="container__header--title" component="h2" variant="h1">Replace Product</Typography>
              </Grid>
              <Grid item className="container__header--close">
                <Close
                  data-cy="modalReplaceProductClose"
                  onClick={() => closeModal(false)}
                />
              </Grid>
            </Grid>
          </header>
          <div className="container__body container__body--aside">
            <aside className="container__aside">
              <Typography component="p" variant="h3" className="replaceProductModal--title">
                From
              </Typography>

              {currentProduct && !isLoadingCurrent ? (
                <CardImg
                  isSelected={false}
                  header={true}
                  content={true}
                  footer={false}
                  tag={true}
                  pct={currentProduct.score}
                  src={currentProduct.image}
                  children={
                    <>
                      <AppTooltip
                        classes={{
                          tooltip: "tooltip"
                        }}
                        arrow
                        placement="bottom"
                        title={<div className="tooltip__container">{currentProduct.title}</div>}
                      >
                        <h4 className="cardImg__title ellipsis">
                          {currentProduct.title}
                        </h4>
                      </AppTooltip>

                      <AppTooltip
                        classes={{
                          tooltip: "tooltip"
                        }}
                        arrow
                        placement="bottom"
                        title={<div className="tooltip__container">{currentProduct.description} </div>}
                      >
                        <p className="cardImg__description ellipsisMulti">
                          {currentProduct.description}
                        </p>
                      </AppTooltip>
                      <p className="cardImg__price">€ {currentProduct.price}</p>
                    </>
                  }
                />
              ) : (
                <AppSkeleton type="REPLACE_PRODUCT_MODAL_PREVIEW" />
              )}
            </aside>

            <div className="container__data">
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
                    <ClickAwayListener onClickAway={handleClickAwayFormFilter}>
                      <OperatorFormFilter
                        onCloseFilter={handleClickAwayFilterList}
                        filterToEdit={filterToEdit}
                        onAddFilter={onAddFilter}
                        filterSelected={filterSelected}
                        handleClickPrev={handleClickPrev}
                      />
                    </ClickAwayListener>
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
                        (displayListFilter &&
                          !filterSelected &&
                          !filterToEdit) ||
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

                    <div className="container__filters--actif">
                      <ActiveFilters
                        activeFilters={activeFilters}
                        onDeleteFilter={onDeleteFilter}
                        onEditFilter={onEditFilter}
                      />
                    </div>

                    {!moreFilters &&
                      elementWrapped &&
                      activeFilters.length > 0 && (
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={clsx("container__products")}>

                  <Typography component="p" variant="h3" className="replaceProductModal--title">Replace to</Typography>

                  {filteredProducts && filteredProducts.results.length > 0 ? (

                    <RadioGroup
                      {...register("newProduct")}
                      aria-label="newProduct"
                      name="newProduct"
                      value={newProduct}
                      onChange={changeProduct}
                    >
                      <Grid container item xs={12}>
                        <Grid container item xs={12} container={true} spacing={2} component="div">
                          {(filteredProducts && filteredProducts.results
                            ? filteredProducts.results
                            : Array.from(new Array(8))
                          ).map(
                            (product: ProductInterface | null, index: number) => (
                              <Grid item key={index} lg={3} md={4} xl={2}>
                                {product && processStatus === PROCESS_STATUS.DONE ? (
                                  <CardImg
                                      isSelected={true}
                                      header={true}
                                      content={true}
                                      footer={true}
                                      tag={true}
                                      pct={
                                        Number(product.score)
                                          ? Number(product.score)
                                          : 0
                                      }
                                      src={product.image}
                                      actions={
                                        <Grid
                                          container
                                          alignItems="center"
                                          justifyContent="space-between"
                                        >
                                          <Grid item>
                                            <Radio
                                              checked={
                                                (newProduct &&
                                                  product.id === newProduct) ||
                                                (newProduct === null &&
                                                  index === 0)
                                              }
                                              name={"newProduct"}
                                              value={product.id}
                                              disableRipple={true}
                                              focusRipple={true}
                                              classes={{
                                                root:
                                                  "radio radio--root radio--little"
                                              }}
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
                                              {product.title}
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
                                  <AppSkeleton type="REPLACE_PRODUCT_MODAL_CARD" />
                                )}
                              </Grid>
                            )
                          )}

                        </Grid>
                      </Grid>
                    </RadioGroup>
                  )
                    : <AppError
                      message={"Sorry! There are no products matching your search"}
                      className={"container__products--error"}
                    />}
                </div>
                <Footer
                  // eslint-disable-next-line
                  onApply={() => console.log("apply")}
                  onCancel={closeModal}
                  totalItems={filteredProducts && filteredProducts.count}
                  paginate={paginate}
                  disableApply={!isDirty}
                  resetPaginationPage={resetPaginationPage}
                />
              </form>
            </div>
          </div>
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
