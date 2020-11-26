import { apiUrl, DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
import axios from "axios";
import { SET_LOADING, PROFILES_FETCHED, UserActionTypes } from "./types";
import { AppThunk } from "../types";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export function setLoading(loading: boolean) {
  return {
    type: "SET_LOADING",
    payload: loading,
  };
}

export function profilesFetched(profiles: object[]) {
  return {
    type: "PROFILES_FETCHED",
    payload: profiles,
  };
}

export async function fetchProfiles(dispatch: any, getState: any) {
  //   dispatch(setLoading(true));

  const response = await axios.get("http://localhost:4000/profiles");
  console.log("Response", response.data);

  dispatch(profilesFetched(response.data));
  dispatch(setLoading(false));
}
