import * as React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppReducer } from "src/redux/store/app";
import { AppState } from "src/model/store";
import { createStore } from "redux";
import { MOCK_STORE_STATE } from "src/fixtures";
import { BrowserRouter } from "react-router-dom";

// https://gist.github.com/darekzak/0c56bd9f1ad6e876fd21837feee79c50
/**
 * mock connect app to redux && abality of rerender props by passing next store state
 * usage
 *  const { getByTestId, store, rerenderWithRedux, getByLabelText } = renderWithRedux(
 *    <ThemeToggle app={MOCK_APP_STATE} setAppThemeAction={dispatch} />
 *     );
 *     fireEvent.click(switchTheme);
 *
 *    // pass store next state
 * rerenderWithRedux(<ThemeToggle />, MOCK_APP_LIGHT_STATE);
 *
 * @param ui
 * @param ar
 * @param renderFn
 * @param action
 */
export function renderWithRedux(
  ui: JSX.Element,
  ar: {} = { initialState: MOCK_STORE_STATE },
  renderFn = render,
  action = { type: "MOCK", payload: null }
) {
  const state: any = ar;
  const store = createStore(AppReducer, state.initialState);

  const obj: any = {
    ...renderFn(<Provider store={store}>{ui}</Provider>, { wrapper: BrowserRouter }),
    store
  };
  obj.rerenderWithRedux = (el: JSX.Element, nextState: AppState) => {
    if(nextState) {
      store.replaceReducer(() => nextState);
      store.dispatch(action);
      store.replaceReducer(AppReducer);
    }
    return renderWithRedux(el, { store }, obj.rerender);
  };
  return obj;
}

export function renderWithReduxRouter(
  ui: JSX.Element,
  ar: {} = { initialState: MOCK_STORE_STATE },
  renderFn = render,
  action = { type: "MOCK", payload: null }
) {
  const state: any = ar;
  const store = createStore(AppReducer, state.initialState);

  const obj: any = {
    ...renderFn(<Provider store={store}>{ui}</Provider>, { wrapper: BrowserRouter }),
    store
  };
  obj.renderWithReduxRouter = (el: JSX.Element, nextState: AppState) => {
    if(nextState) {
      store.replaceReducer(() => nextState);
      store.dispatch(action);
      store.replaceReducer(AppReducer);
    }
    return renderWithReduxRouter(el, { store }, obj.rerender);
  };
  return obj;
}
