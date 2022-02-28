import produce from "immer";
import { DispatchAction, FiltersAppState } from "src/model";
import { DELETE_FILTER, REPLACE_FILTER, SET_DATE_RANGE, SET_FILTERS } from "./const";

export const INIT_FILTERS = {
  filters: [],
  indexes: []
};

export const initialFiltersState: FiltersAppState = {
  data: INIT_FILTERS,
  date_range: "last_month"
};

export function filtersReducer(
  state = initialFiltersState,
  action: DispatchAction<any>
): FiltersAppState {
  const { payload, type } = action;
  switch (type) {
    case SET_FILTERS: {
      return produce(state, (draftState: FiltersAppState) => {
        if(Array.isArray(payload)) {
          draftState.data.filters = payload;
        } else {
          draftState.data.filters = [...state.data.filters, payload];
        }
      });
    }

    case REPLACE_FILTER: {
      return produce(state, (draftState: FiltersAppState) => {
        draftState.data.filters[payload.index] = payload.filter;
      });
    }

    case DELETE_FILTER: {
      return produce(state, (draftState: FiltersAppState) => {
        draftState.data.filters = state.data.filters.filter((item, index) => payload !== index);
      });
    }

    case SET_DATE_RANGE: {
      return produce(state, (draftState: FiltersAppState) => {
        draftState.date_range = payload;
      });
    }
    default: {
      return state;
    }
  }
}
