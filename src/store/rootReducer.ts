import { combineReducers } from "redux";
// import appState from "./appState/reducer";
import user from "./user/reducer";
import profile from "./profile/reducer";

export default combineReducers({
  user,
  profile,
});
