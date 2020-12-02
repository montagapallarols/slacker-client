import { serverUrl, DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import {
  UserActionTypes,
  LOGIN_SUCCESS,
  LOG_OUT,
  TOKEN_STILL_VALID,
  UserWithToken,
  UserWithoutToken,
} from "./types";
import { Action } from "redux";
import { RootState } from "../rootReducer";
import { ThunkAction } from "redux-thunk";

export function setLoading(loading: boolean) {
  return {
    type: "SET_LOADING",
    payload: loading,
  };
}

const loginSuccess = (userWithToken: UserWithToken): UserActionTypes => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (
  userWithoutToken: UserWithoutToken
): UserActionTypes => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${serverUrl}/signup`, {
        firstName,
        lastName,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(
        showMessageWithTimeout(
          "success",
          true,
          "Your account has been created!",
          2000
        )
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch, getState: any) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${serverUrl}/login`, {
        email,
        password,
      });
      // console.log("Login response", response.data);
      dispatch(loginSuccess(response.data));
      const user = selectUser(getState());
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          `Welcome back ${user.firstName}!`,
          2000
        )
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (dispatch, getState: any) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${serverUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("Authorization response:", response.data);

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};
