import { serverUrl, DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
import axios from "axios";
import { LOADING_USER, LOGIN_SUCCESS, UserActionTypes } from "./types";
import { AppThunk } from "../types";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export function setLoading(loading: boolean) {
  return {
    type: "SET_LOADING",
    payload: loading,
  };
}

export function loginSuccess(profiles: object[]) {
  return {
    type: "LOGIN_SUCCESS",
    payload: profiles,
  };
}

export async function login(dispatch: any, getState: any) {
  const response = await axios.get("http://localhost:4000/login");
  console.log("Profiles response", response.data);

  dispatch(loginSuccess(response.data));
  dispatch(setLoading(false));
}
