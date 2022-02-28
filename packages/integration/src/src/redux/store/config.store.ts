import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
/// redux persist test error
// https://stackoverflow.com/questions/48056631/syntaxerror-unexpected-token-import-with-jest/48056912#48056912
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { rootReducer } from "./reducers.root";
import { rootEpic } from "../../redux-observable/epics.root";

interface ReactWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

const epicMiddleware = createEpicMiddleware();

const composerEnhancer = composeWithDevTools({
  name: "Redux",
  trace: true,
  traceLimit: 25
});

const persistConfig = {
  key: "naister_app",
  storage,
  stateReconciler: autoMergeLevel2, // see state reconciler in official doc
  whitelist: ["app", "pageQueue", "filters", "business"] // reducer name
};
const persistedReducer = persistReducer(persistConfig, rootReducer as any);

/**
 * config store with persist in local storage (persistor)
 *
 * @export
 * @returns
 */
export function configureStore() {
  const store = createStore(
    persistedReducer,
    composerEnhancer(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  const persistor = persistStore(store);

  return { store, persistor };
}
