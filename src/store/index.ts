// import { createStore, applyMiddleware, compose } from "redux";
// import ReduxThunk from "redux-thunk";
// import rootReducer from "./rootReducer";

// export const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(ReduxThunk),
//     (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
//       (window as any).__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

import { createStore, applyMiddleware, compose } from "redux";

import ReduxThunk from "redux-thunk";
import reducer from "./rootReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const store = createStore(reducer, enhancer);

export default store;
