import { PROCESS_STATUS } from "src/model";
import { PAGE_EDIT_ZONE_GET_PRODUCT_DATA_TO_EDIT, PAGE_EDIT_ADD_PRODUCTS_PAGE, REMOVE_PRODUCT_ZONE, PAGE_EDIT_GET_PRODUCTS_FILTERS, PAGE_EDIT_REORDER_PRODUCTS, PAGE_EDIT_GET_ZONE_PRODUCTS, PAGE_EDIT_ZONE_GET_PROPOSED_PRODUCTS, PAGE_EDIT_ZONE_EDIT_PRODUCT, PAGE_EDIT_ZONE_REPLACE_PRODUCT } from "../../../routes/api_routes";
import { GenericClassAccessor } from "../../GenericClassAccessor";
import { bodyParamsFormater, queryParamFormater } from "../../queryGenerator";
import { trySetProductDataToEditAction, setProductsFiltersAction, setProductsListForZoneProductAction, setSuccessAddProductPageAction, setSuccessRemoveProductPageAction, tryDeleteProductsListForZoneProductAction, tryGetProductsFiltersAction, reorderProductsSuccessAction, setProposedProductsForZoneAction, editProductSuccessAction, replaceProductSuccessAction, processStatusAction } from "../../../../PageGeneration/store/actions";
import { SendReorderedProductParams, RemoveProductInterface, GetProductFiltersParamsInterface, GetZoneProductsParamsInterface, GetProposedProductsParamsInterface, AddProductParams, GetProductDetailsParamsInterface, EditProductParamsInterface, ReplaceProductParamsInterface} from "./interfaces";

class Product extends GenericClassAccessor {
    getProductsFilters = (queryParams: GetProductFiltersParamsInterface, state$, client) => {
      const endpoint = PAGE_EDIT_GET_PRODUCTS_FILTERS + "?" + queryParamFormater(queryParams);
      return super.get(state$, endpoint, setProductsFiltersAction, client);
    }

    /**
     * Get  products for a zone page (queue section)
     */
    getZoneProducts = (queryParams: GetZoneProductsParamsInterface, state$, client) => {
      const endpoint = PAGE_EDIT_GET_ZONE_PRODUCTS + "?" + queryParamFormater(queryParams);

      return super.get(state$, endpoint, setProductsListForZoneProductAction, client);
    }

    /**
     * Get  proposed products for a zone page (queue section)
       */
    getPoposedProductsForZonePage = (params: GetProposedProductsParamsInterface, state$, client) => {
      const {offset, limit, filters, rule_id, keyword_id, page_id, zone_id} = params;
      const endpoint = PAGE_EDIT_ZONE_GET_PROPOSED_PRODUCTS + "?" + queryParamFormater({offset, limit});
      const jsonFormattedParams = bodyParamsFormater(params);

      return super.post(state$, endpoint, setProposedProductsForZoneAction, client, params);
    }

      addProductsToPage = (bodyParams: AddProductParams, state$, client) => {
        const { page_id, keyword_id, products } = bodyParams;
        const params = bodyParamsFormater({ page_id: page_id, keyword_id: keyword_id, products: JSON.stringify(products) });
        return super.post(state$, PAGE_EDIT_ADD_PRODUCTS_PAGE, setSuccessAddProductPageAction, client, bodyParams);
      }

    removeProductsToPage = (payload: RemoveProductInterface, state$, client) => {
      const endpoint = REMOVE_PRODUCT_ZONE;

      return super.del(
        state$,
        endpoint,
        setSuccessRemoveProductPageAction,
        client,
        payload,
        "json"
      );
    }

      sendReorderedProduct = (bodyParams: SendReorderedProductParams, state$, client) => {
        const { page_id, sorted_products } = bodyParams;
        const endpoint = PAGE_EDIT_REORDER_PRODUCTS;

        return super.post(state$, endpoint, reorderProductsSuccessAction, client, bodyParams);
      }

    getProductDataToEdit = (queryParams: GetProductDetailsParamsInterface, state$, client) => {
      const endpoint = PAGE_EDIT_ZONE_GET_PRODUCT_DATA_TO_EDIT + "?" + queryParamFormater(queryParams);
      return super.get(state$, endpoint, trySetProductDataToEditAction, client);
    }

    editProduct = (params: EditProductParamsInterface, state$, client) => super.post(
      state$,
      PAGE_EDIT_ZONE_EDIT_PRODUCT,
      editProductSuccessAction,
      client,
      params
    )

    replaceProduct = (params: ReplaceProductParamsInterface, state$, client) => super.post(
      state$,
      PAGE_EDIT_ZONE_REPLACE_PRODUCT,
      replaceProductSuccessAction,
      client,
      params
    )
}
export default new Product();
