import { createStore, applyMiddleware, compose } from "redux";

import ReduxThunk from "redux-thunk";
import reducer from "./rootReducer";

export const store = createStore(reducer);
