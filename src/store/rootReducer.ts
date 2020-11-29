import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import profile from "./profile/reducer";
import listItems from "./listItems/reducer";

export default combineReducers({
  appState,
  user,
  profile,
  listItems,
});

export type RootState = ReturnType<typeof combineReducers>;
