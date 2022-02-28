import React, { useEffect } from "react";
import clsx from "clsx";
import { Grid } from "@mui/material";
import { AppBtn, AppPagination } from "src/components";
import { useDispatch, useSelector } from "react-redux";
import { getItemFromLocalStorage } from "src/shared/form";
import { StoreState } from "src/model";
import useUrlSearchParams from "src/hooks/useUrlSearchParams";
import { areaEdit_QParamsType, areaTextEdit_QParamsType } from "src/PageGeneration/shared/page_query_params";
import { PageInterface } from "src/PageGeneration/model";
import { getProductsListForZoneProductAction } from "../../../store/actions";
import { AreaProductEdit } from "./AreaProductEdit/AreaProductEdit.component";
import { AreaImgEdit } from "./AreaImgEdit/AreaImgEdit.component";
import { AreaTextEdit } from "./AreaTextEdit/AreaTextEdit.component";
import { useStyles } from "./AreaEdit.style";

export const ZONE_TYPES = {
  text: "text",
  image: "image",
  product: "product"
};

interface AreaEditProps {
  type: "text" | "image" | "product";
  page: PageInterface;
}

export function AreaEdit(props: AreaEditProps) {
  const {page} = props;

  const classes = useStyles({});
  let products = [];
  const dispatch = useDispatch();
  const {getQueryParams} = useUrlSearchParams();
  const [_zoneType, _zoneId, _pageId, _keywordId, _ruleId] = getQueryParams(areaEdit_QParamsType);

  const currentZoneIndex = page && page.zones.findIndex(zone => _zoneId === zone.id) + 1;
  const payload = {
    page_id: _pageId,
    keyword_id: _keywordId,
    rule_id: _ruleId,
    zone_id: _zoneId
  };

  useEffect(() => {
    if(_zoneType === "product") {
      dispatch(getProductsListForZoneProductAction(payload));
    }
  }, [_zoneType]);

  products = useSelector(
    (state: StoreState) => state.ruleDetail.areaProduct.product_list.results
  );

  const switchAreaType = (type) => {
    switch (type) {
      case ZONE_TYPES.text:
        return <AreaTextEdit currentZoneIndex={currentZoneIndex} />;
      case ZONE_TYPES.image:
        return <AreaImgEdit />;
      case ZONE_TYPES.product:
        return <AreaProductEdit currentZoneIndex={currentZoneIndex} products={products} />;
    }
  };

  return (
    <Grid item className={clsx("pageDetails", _zoneType === ZONE_TYPES.text && "pageDetails--paddingTop", classes.root)}>
      <div className={clsx("pageDetails__container")}>
        {switchAreaType(_zoneType)}
        {/* {type === "image" && (
            <Grid
              className="pagiantionImgs"
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item> Showing 9 of 45 images </Grid>
              <Grid item>
                <AppPagination pageNumber={5}></AppPagination>
              </Grid>
              <Grid item>
                <AppBtn typeBtn="primary">Save</AppBtn>
              </Grid>
            </Grid>
          )} */}
      </div>
    </Grid>
  );
}
