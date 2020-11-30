import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import profiles from "./profiles/reducer";
import listItems from "./listItems/reducer";
import apiItems from "./apiItems/reducer";

export default combineReducers({
  appState,
  user,
  profiles,
  listItems,
  apiItems,
});

export type RootState = ReturnType<typeof combineReducers>;
