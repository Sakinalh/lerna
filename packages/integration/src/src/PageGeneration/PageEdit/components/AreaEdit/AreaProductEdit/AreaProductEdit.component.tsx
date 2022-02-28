import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Alert, FormControlLabel, FormGroup, Grid, Snackbar, Tooltip } from "@mui/material";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { ReplaceProductModal } from "src/components/ReplaceProductModal/ReplaceProductModal.component";
import {
  AppCheckbox,
  AppAlert,
  AppBtn,
  ProductModal,
  AppSkeleton,
  AppTooltip
} from "src/components";

import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { getItemFromLocalStorage } from "src/shared/form";
import {
  editProductAction,
  tryGetProductDataToEditAction,
  getProductsListForZoneProductAction,
  trySendReorderProductsAction,
  TryGetDetailsPageAction,
  setSelectedPageAction,
  tryDeleteProductsListForZoneProductAction } from "src/PageGeneration/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { PROCESS_STATUS, StoreState } from "src/model";
import {
  ZONE_TYPE_DESCRIPTION,
  ZONE_TYPE_IMAGES,
  ZONE_TYPE_TITLE
} from "src/PageGeneration/store/const";

import { areaProductEdit_QParamsType } from "src/PageGeneration/shared/page_query_params";

import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { OutlinedCheckboxCheckedIcon } from "src/PageGeneration/shared/style";
import { ProductInterface } from "../../../../store/areaProduct.epic";
import { EditProductModal } from "../../../../../PageGeneration/components/EditProductModal/EditProductModal.component";
import { ReactComponent as Replace } from "../../../../../styles/global/icons/replace.svg";
import { ReactComponent as Edit } from "../../../../../styles/global/icons/edit.svg";
import { ReactComponent as Delete } from "../../../../../styles/global/icons/delete.svg";
import { AppSwitch } from "../../../../../components/AppSwitch/AppSwitch.component";
import { CardImg } from "../../../../components/CardImg/CardImg.component";

export interface AreaProductEditProps {
  products: ProductInterface[];
  onSendAddedProduct: any;
  currentZoneIndex: number;
}

export function AreaProductEdit(props: AreaProductEditProps) {
  const { products, onSendAddedProduct, currentZoneIndex } = props;

  const { getQueryParams } = useUrlSearchParams();

  const [_pageId, _keywordId, _ruleId, _zoneId] = getQueryParams(
    areaProductEdit_QParamsType
  );

  const app_process_status = useSelector((state: StoreState) => state.app.processStatus);

  const [processStatus, setProcessStatus] = useState(app_process_status);
  useEffect(() => {
    setProcessStatus(app_process_status);
  }, [app_process_status]);

  const refSortableContainer = useRef(null);
  const refSortableItem = useRef(null);

  const selectedPage = useSelector((state: StoreState) => state.pageQueue.selectedPage);

  const selectedKeyword = useSelector((state: StoreState) => state.pageQueue.selectedKwd);

  const productDetails = useSelector((state: StoreState) => state.pageQueue.productToEdit);
  const payload = {
    page_id: _pageId,
    keyword_id: _keywordId,
    rule_id: _ruleId,
    zone_id: _zoneId
  };

  const _payload = {
    page_id: _pageId,
    keyword_id: _keywordId,
    rule_id: _ruleId,
    zone_id: _zoneId
  };

  const success = useSelector((state: StoreState) => state.app.success);

  const pageDetails = useSelector((state: StoreState) => state.pageQueue.pageDetails);
  const [cardDrag, setCardDrag] = React.useState<any>(products);
  const [open, setOpen] = React.useState(false);
  const [openProductModal, setOpenProductModal] = React.useState(false);
  const [
    openReplacementProductModal,
    setOpenReplacementProductModal
  ] = React.useState(false);

  const [isReorderActivated, setIsReorderActivated] = React.useState(false);
  const [currentProducts, setCurrentProducts] = React.useState([]);
  const [indexRemoved, setIndexRemoved] = React.useState(-1);

  const [
    currentProduct,
    setCurrentProduct
  ] = React.useState<ProductInterface | null>(null);

  const [productListChecked, setProductListChecked] = React.useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  const [openDeleteMultAlert, setOpenDeleteMultAlert] = React.useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const zone_id_title = productDetails
    ? productDetails.sub_zones.filter(
      zone => ZONE_TYPE_TITLE === zone.zone_label
    )
    : [];
  const zone_id_description = productDetails
    ? productDetails.sub_zones.filter(
      zone => ZONE_TYPE_DESCRIPTION === zone.zone_label
    )
    : [];
  const zone_id_image = productDetails
    ? productDetails.sub_zones.filter(
      zone => ZONE_TYPE_IMAGES === zone.zone_label
    )
    : [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TryGetDetailsPageAction({ rule_id: _ruleId, keyword_id: _keywordId, page_id: _pageId }));
  }, []);

  useEffect(() => {
    setCardDrag(products);
  }, [products]);

  useEffect(() => {
    dispatch(setSelectedPageAction(pageDetails));
  }, [pageDetails]);

  useEffect(() => {
    if(success) {
      setSelectAll(false);
      dispatch(getProductsListForZoneProductAction(_payload));
      dispatch(TryGetDetailsPageAction({ rule_id: _ruleId, keyword_id: _keywordId, page_id: _pageId }));
    }
  }, [success]);
  const handleDeletedProduct = () => {
    const allProductsId: string[] = currentProducts.map(
      (product: ProductInterface) => product.id
    );
    const deletePayload = {
      page_id: payload.page_id,
      zone_id: payload.zone_id,
      keyword_id: selectedKeyword,
      products: allProductsId
    };
    dispatch(tryDeleteProductsListForZoneProductAction(deletePayload));
    setCurrentProducts([]);
    setSelectAll(false);
    productListChecked.splice(indexRemoved, 1);
    setOpenDeleteAlert(!openDeleteAlert);
  };

  const handleEditProduct = (data: {
    title: string;
    description: string;
    image: string;
  }) => {
    const sub_zones = [];
    const { title, description, image } = data;

    if(title) {
      sub_zones.push({
        zone_id: zone_id_title[0].zone_id,
        value: title
      });
    }
    if(image) {
      sub_zones.push({
        zone_id: zone_id_image[0].zone_id,
        value: image
      });
    }
    if(description) {
      sub_zones.push({
        zone_id: zone_id_description[0].zone_id,
        value: description
      });
    }
    const params = {
      rule_id: payload.rule_id,
      keyword_id: payload.keyword_id,
      page_id: payload.page_id,
      edits: [
        {
          product_id: currentProduct.id,
          sub_zones: sub_zones
        }
      ]
    };
    dispatch(editProductAction(params));
    setOpen(false);
  };

  useEffect(() => {
    if(!currentProduct) {
      return;
    }
    const editPayload = {
      page_id: payload.page_id,
      rule_id: payload.rule_id,
      keyword_id: payload.keyword_id,
      product_id: currentProduct.id,
      zone_id: currentProduct.zone_id
    };
    dispatch(tryGetProductDataToEditAction(editPayload));
  }, [currentProduct]);

  useEffect(() => {
    setCardDrag(products);
  }, [products]);

  const reorderProduct = (list, startIndex, endIndex): ProductInterface[] => {
    const result: ProductInterface[] = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onSortOver = () => {
    refSortableContainer.current.classList.add("drop--onSortOver");
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setCardDrag(arrayMove(cardDrag, oldIndex, newIndex));

    const reordoredProduct: ProductInterface[] = reorderProduct(
      cardDrag,
      oldIndex,
      newIndex
    );
    const productsIds: string[] = reordoredProduct.map(
      (product: ProductInterface) => product.id
    );
    setProductListChecked([]);
    dispatch(
      trySendReorderProductsAction({
        page_id: selectedPage.page_id,
        sorted_products: productsIds
      })
    );
  };

  const openEditProductModal = async (product: ProductInterface) => {
    const editPayload = {
      page_id: payload.page_id,
      rule_id: payload.rule_id,
      keyword_id: payload.keyword_id,
      product_id: product.id,
      zone_id: payload.zone_id
    };

    dispatch(tryGetProductDataToEditAction(editPayload));
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const openAddProductModal = () => {
    setOpenProductModal(true);
  };
  const closeAddProductModal = () => {
    setOpenProductModal(false);
  };

  const closeReplacementProductModal = () => {
    setOpenReplacementProductModal(false);
  };

  const handleToggleDeleteAlert = () => {
    setOpenDeleteAlert(!openDeleteAlert);
  };

  const handleDeleteProduct = (index) => {
    setCurrentProducts([...currentProducts, cardDrag[index]]);
    setOpenDeleteAlert(!openDeleteAlert);
    setIndexRemoved(index);
  };

  const onToggleReorder = (value: any) => {
    setIsReorderActivated(value);
  };

  const onCheckProduct = (value: boolean, productId: string) => {
    const productPosition = productListChecked.indexOf(productId);
    // eslint-disable-next-line
    console.log(productListChecked, "productListChecked")
    if(productPosition === -1) {
      setProductListChecked([...productListChecked, productId]);
    } else {
      productListChecked.splice(productPosition, 1);
      setProductListChecked([...productListChecked]);
    }
  };

  const handleToggleMultDeleteAlert = () => {
    setOpenDeleteMultAlert(!openDeleteMultAlert);
  };

  const onMultipleRemove = () => {
    setOpenDeleteMultAlert(!openDeleteMultAlert);
  };

  const handleDeletedMultProduct = () => {
    const deletePayload = {
      page_id: payload.page_id,
      zone_id: payload.zone_id,
      keyword_id: payload.keyword_id,
      products: productListChecked
    };
    dispatch(tryDeleteProductsListForZoneProductAction(deletePayload));
    setOpenDeleteMultAlert(false);
    setProductListChecked([]);
  };

  const onSelectAll = (e) => {
    if(e.target.checked) {
      const productsIds = products.map(product => product.id);
      setSelectAll(true);
      setProductListChecked([...productsIds]);
    } else {
      setProductListChecked([]);
      setSelectAll(false);
    }
  };

  const SortableItem = SortableElement(({ product, idx }) => (
    <Grid ref={refSortableItem} lg={3} xl={2} md={4} item>
      <div className="falseZone">
        <div className={clsx(isReorderActivated && "snap")}>
          <CardImg
            pct={Number(product.score)}
            footer={true}
            src={product.image}
            actions={
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <AppCheckbox
                    isSmall
                    noPadding
                    whiteBg
                    color="primary"
                    disableRipple={true}
                    onChange={value => onCheckProduct(value, product.id)}
                    checked={productListChecked.includes(product.id)}
                  />
                </Grid>
                <Grid className="cardImg__icons" item>
                  <Replace data-cy="replaceIcon" onClick={() => openReplaceProductModal(product)} />
                  <Edit data-cy="editIcon" onClick={() => openEditProductModal(product)} />
                  <Delete data-cy="deleteIcon" onClick={e => handleDeleteProduct(idx)} />
                </Grid>
              </Grid>
            }
          >
            <h4 className="cardImg__title ellipsisMulti">
              {product.link_to && product.link_to !== null ? (
                <AppTooltip arrow title={<div className="tooltip__container">{product.title}</div>}>
                  <a target="blank" href={product.link_to}>
                    {product.title}
                  </a>
                </AppTooltip>
              ) : (
                <AppTooltip arrow title={<div className="tooltip__container">{product.title}</div>}>
                  <span>{product.title}</span>
                </AppTooltip>
              )}
            </h4>
            <AppTooltip arrow
              title={<div className="tooltip__container">{product.description}</div>}
              aria-label={product.description}
            >
              <p className="cardImg__description ellipsisMulti">
                {product.description}
              </p>
            </AppTooltip>
            <p className="cardImg__price"> {product.price}</p>
          </CardImg>
        </div>
      </div>
    </Grid>
  ));

  const SortableList = SortableContainer(({ items }) => (
    <Grid
        lockToContainerEdges={true}
        ref={refSortableContainer}
        spacing={3}
        container
        alignItems="center"
        justifyContent="flex-start"
        className={clsx("cardImgs", "drop")}
      >
      {(items || Array.from(new Array(8))).map((value, index) =>
        value && processStatus === PROCESS_STATUS.DONE ? (
          <SortableItem
              disabled={!isReorderActivated}
              key={index}
              idx={index}
              index={index}
              product={value}
            />
        ) : (
          <Grid lg={3} xl={2} md={4} item>
            <div>
              <div>
                <AppSkeleton type="REPLACE_PRODUCT_MODAL_CARD" />
              </div>
            </div>
          </Grid>
        ))}
    </Grid>
  ));
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   cardDrag &&
  //   cardDrag.filter((product) => product.description !== "").length <= 0
  //     ? setIsLoading(true)
  //     : setIsLoading(false);
  // }, [cardDrag]);

  const openReplaceProductModal = (product: ProductInterface) => {
    setCurrentProduct(product);
    setOpenReplacementProductModal(true);
  };

  const [currentZone, setCurrentZone] = useState(null);

  useEffect(() => {
    selectedPage && setCurrentZone(selectedPage.zones.filter(zone => zone.id === _zoneId)[0]);
  }, [selectedPage]);

  return (
    <>
      <AppAlert
        closeModal={handleToggleDeleteAlert}
        data-cy="removeProductModal"
        openModal={openDeleteAlert}
        title="Remove product"
        txt="Are you sure that you want to remove this product ?"
        action={
          <>
            <AppBtn
              data-cy="removeProductModalNo"
              typeBtn="customSimple"
              onClick={handleToggleDeleteAlert}
              color="primary"
            >
              No, keep it
            </AppBtn>
            <AppBtn
              customclass="isRed"
              typeBtn="customPrimary"
              data-cy="removeProductModalYes"
              onClick={handleDeletedProduct}
              color="inherit"
              autoFocus
            >
              Yes, remove
            </AppBtn>
          </>
        }
      />
      <AppAlert
        closeModal={handleToggleMultDeleteAlert}
        openModal={openDeleteMultAlert}
        title="Remove product"
        txt="Are you sure that you want to remove this product ?"
        action={
          <>
            <AppBtn
              typeBtn="customSimple"
              onClick={handleToggleMultDeleteAlert}
            >
              No, keep it
            </AppBtn>
            <AppBtn
              customclass="isRed"
              typeBtn="customPrimary"
              onClick={handleDeletedMultProduct}
              color="inherit"
              autoFocus
            >
              Yes, remove all
            </AppBtn>
          </>
        }
      />

      <Grid container
        className="pageDetails__header"
        alignItems="center"
        justifyContent="space-between">

        <Grid
          container
          className="pageDetails__header--container"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <h2 className="pageDetails__title pageDetails__title--mb">
              Area {currentZoneIndex}
            </h2>
            <h3 className="pageDetails__productTitle">Product</h3>
          </Grid>

          <Grid item>
            <Grid
              className="pageDetails__actions"
              container
              alignItems="center"
              justifyContent="space-between"
            >
              <AppSwitch
                after="Reorder products"
                onToggle={onToggleReorder}
                isActivated={isReorderActivated}
              />

              <FormGroup>
                <FormControlLabel
                  classes={{ root: "pageDetails__checkAll" }}
                  control={
                    <AppCheckbox
                      whiteBg
                      checked={selectAll}
                      onChange={onSelectAll}
                      name="selectAll"
                      color="primary"
                      inputProps={{ "aria-label": "select_all_label" }}
                    />
                  }
                  labelPlacement="end"
                  label={"Select All"}
                />
              </FormGroup>

              <AppBtn
                customclass="isRed"
                typeBtn="customPrimary"
                color="inherit"
                disabled={productListChecked.length === 0}
                onClick={onMultipleRemove}
              >
                <span> Remove </span>
              </AppBtn>
              <AppBtn typeBtn="customPrimary" onClick={openAddProductModal}>
                <span>+ Add product</span>
              </AppBtn>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {cardDrag &&
        cardDrag.filter(product => product.description !== "").length >= 0 ? (
          <SortableList
            axis="xy"
            helperClass="snap--helper"
            items={cardDrag}
            onSortOver={onSortOver}
            onSortEnd={onSortEnd}
            distance={1}
          />
        ) : (

          <Grid
            container
            alignItems="center"
            justifyContent="center"
            className={clsx("cardImgs", "cardImgs--noProduct")}
          >
            <Grid item className="noProduct">
              <AddPhotoAlternateOutlinedIcon className="noProduct__icon" />
              <p className="noProduct__txt">No product yet, you can add some by clicking add product button</p>
            </Grid>

          </Grid>

        )}

      {currentProduct && productDetails && (
        <EditProductModal
          product={currentProduct}
          openCallback={open}
          onHandleCloseCallback={handleClose}
          productDetails={productDetails}
          onSave={handleEditProduct}
          zone_id_title_length={zone_id_title.length}
          zone_id_description_length={zone_id_description.length}
          zone_id_image_length={zone_id_image.length}
        />
      )}

      {openProductModal && (
        <ProductModal
          products={products}
          footer={<p>footer</p>}
          type="full"
          title={"Add product"}
          children={<p>children</p>}
          closeModal={closeAddProductModal}
        />
      )}

      {openReplacementProductModal && (
        <ReplaceProductModal
          products={products}
          currentProduct={currentProduct}
          closeModal={closeReplacementProductModal}
        />
      )}
    </>
  );
}
