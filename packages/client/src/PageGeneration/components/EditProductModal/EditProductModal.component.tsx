import { Modal } from "src/deps";
import {
  Grid,
  TextareaAutosize,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { AppText } from "src/components/AppText/AppText.component";
import { AppTextArea } from "src/components/AppTextArea/AppTextArea.component";
import { AppBtn } from "src/components/AppBtn/AppBtn.component";
import { useForm, SubmitHandler } from "react-hook-form";
import { GetProductDetailsResponseInterface } from "src/api/accessors/Rules/ProductAccessor/interfaces";
import { ProductInterface } from "src/PageGeneration/store/areaProduct.epic";
import { pickBy } from "lodash";
import { AppSkeleton } from "src/components";

import Carousel from "react-multi-carousel";
import { CardImg } from "../../components/CardImg/CardImg.component";
import { ReactComponent as Select } from "../../../styles/global/icons/card_select.svg";
import { useStyles } from "./EditProductModal.style";
import "react-multi-carousel/lib/styles.css";

const responsive = {

  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};

export interface EditProductModalProps {
  onHandleCloseCallback: any;
  openCallback: boolean;
  product: ProductInterface;
  productDetails: GetProductDetailsResponseInterface;
  onSave: any;
  zone_id_title_length: any;
  zone_id_description_length: any;
  zone_id_image_length: any;
}

type Inputs = {
  title: string;
  description: string;
  image: string;
};

export function EditProductModal(_props: EditProductModalProps) {
  const classes = useStyles({});
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors }
  } = useForm<Inputs>({ mode: "onChange" });

  const availableImages: any =
    _props.productDetails &&
    _props.productDetails.sub_zones.filter(
      zone => zone.zone_label === "images"
    )[0].zone_value;

  watch("image", "");
  watch("title", "");
  watch("description", "");
  const values = getValues();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    clearForm();
    _props.onSave(data);
  };

  const setFieldValue = (type, value: any) => {
    setValue(type, value);
  };

  const resetForm = () => {
    reset(); // not sure it works or not , we have to check it
    clearForm();
  };

  const clearForm = () => {
    setFieldValue("title", "");
    setFieldValue("description", "");
    setFieldValue("image", "");
    setIndexImage(0);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [indexImage, setIndexImage] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [_props.openCallback]);

  useEffect(() => {
    const _values = pickBy(
      values,
      value => value !== "" && value !== undefined
    );
    const _length = Object.keys(_values).length;
    setIsDisabled(!(_length !== 0));
  }, [values]);

  const onCloseModal = () => {
    clearForm();
    _props.onHandleCloseCallback();
  };
  const updateCarousel = (image, index) => {
    const images = Array.from(availableImages);
    images.splice(index, 1);
    setFieldValue("image", [image].concat(images));
    setIndexImage(index);
  };
  const body = (
    <form data-cy="editModalProduct" onSubmit={handleSubmit(onSubmit)}>
      <div data-cy="editModalProductCenter" className="popUp popUp--center">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          component="header"
          className="popUp__header"
        >
          <Grid item className="popUp__title">
            Edit product
          </Grid>
          <Grid
            data-cy="editModalClose"
            item
            component={CloseIcon}
            onClick={() => onCloseModal()}
            className="popUp__close"
          />
        </Grid>
        <Grid
          container
          alignItems="flex-start"
          justifyContent="space-between"
          component="div"
          className="popUp__body editProduct"
        >
          <Grid item component="aside" className="editProduct__preview">
            <h2 className="editProduct__title">Preview</h2>
            {_props.product && !isLoading ? (
              <CardImg
                pct={80}
                footer={false}
                src={_props.product && _props.product.image}
              >
                <h4 className="cardImg__title">{_props.product.title}</h4>

                <div className="cardImg__description" >

                  <p className="cardImg__description--wrapper">
                    {_props.product.description}
                  </p>
                </div>
                <p className="cardImg__price">
                  <Typography>price {_props.product.price}</Typography>
                </p>
              </CardImg>
            ) : (
              <AppSkeleton isScale={true} type="REPLACE_PRODUCT_MODAL_CARD" />
            )}
          </Grid>
          <Grid item className="editProduct__edit">
            <h3 className="editProduct__subTitle">title</h3>
            <TextField
              data-cy="editModalInput"
              name="title"
              disabled={_props.zone_id_title_length === 0}
              {...register("title")}
              onChange={e => setFieldValue("title", e.target.value)}
              placeholder="Empty"
              id="outlined-basic"
              InputProps={{
                classes: {
                  root: "input input--full input__outline--root",
                  focused: "input input__outline--focused",
                  disabled: "input input__outline--disabled"
                }
              }}
              className="editProduct__input"
              variant="outlined"
            />
            <h3 className="editProduct__subTitle">description</h3>
            <AppTextArea
              {...register("description")}
              name="description"
              onChange={e => setFieldValue("description", e.target.value)}
              customclass={"editProduct__input"}
              aria-label="empty textarea"
              placeholder="Empty"
              disabled={_props.zone_id_description_length === 0}
            />
            <h3 className="editProduct__subTitle">Image</h3>
            <p className="editProduct__description">
              Choose display image for the product
            </p>
            <Grid className="editProdct__chooseImgs chooseImgs">

              <Carousel
                itemClass="chooseImgs__li"
                data-cy="editModalSlider"
                // centerMode={true}
                responsive={responsive}
              >
                {(availableImages || Array.from(new Array(3))
                ).map((image, index) => (
                  <div
                      {...register("image")}
                      key={index}
                      className="chooseImgs__imgContainer chooseImgs__imgContainer--selected"
                      data-cy="editModalImgSelected"
                      onClick={() => _props.zone_id_image_length !== 0 ? updateCarousel(image, index) : null}
                    >
                    {index === indexImage && (
                    <Select className="chooseImgs__pastille" data-cy="editModalImgPastille" />
                    )}
                    {image && !isLoading ? (
                      <img data-cy="editModalImg" className="chooseImgs__img" src={image} alt="" />
                    ) : (
                      <AppSkeleton
                            isScale={true}
                            type="EDIT_PRODUCT_MODAL_SLIDE"
                          />
                    )}
                  </div>
                ))}
              </Carousel>
            </Grid>

          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="flex-end"
          component="footer"
          className="popUp__footer"
        >
          <AppBtn data-cy="editModalCancel" typeBtn="customSimple" type="reset" onClick={() => onCloseModal()}>
            Cancel
          </AppBtn>
          <AppBtn
            data-cy="editModalSave"
            typeBtn="customPrimary"
            disabled={isDisabled}
            type="submit"
            onClick={e => onSubmit}
          >
            Save
          </AppBtn>
        </Grid>
      </div>
    </form>
  );
  return (
    <Modal
      className={classes.root}
      open={_props.openCallback}
      onClose={() => onCloseModal()}
    >
      {_props.product && _props.productDetails && body}
    </Modal>
  );
}
