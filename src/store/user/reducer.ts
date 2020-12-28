import {
  UserState,
  UserActionTypes,
  LOADING_USER,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  LOG_OUT,
  // SET_MESSAGE,
  // CLEAR_MESSAGE,
} from "./types";

const initialState: UserState = {
  loading: false,
  token: localStorage.getItem("token"),
  firstName: null,
  lastName: null,
  email: null,
  profile: null,
};

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case LOADING_USER:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, loading: false, ...action.payload };

    case TOKEN_STILL_VALID:
      return { ...state, loading: false, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState };

    default:
      return state;
  }
};

export default userReducer;
