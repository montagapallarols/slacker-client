import { serverUrl, DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
import axios from "axios";
import {
  SET_API_ITEMS_LOADING,
  API_ITEMS_FETCHED,
  ApiItemsActionTypes,
} from "./types";
import { AppThunk } from "../types";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export function setApiItemsLoading(loading: boolean) {
  return {
    type: "SET_API_ITEMS_LOADING",
    payload: loading,
  };
}

export function apiItemsFetched(items: object[]) {
  return {
    type: "API_ITEMS_FETCHED",
    payload: items,
  };
}

export async function fetchApiItems(dispatch: any, getState: any) {
  //   dispatch(setLoading(true));

  const response = await axios.get(`${serverUrl}`);
  console.log("API items response", response.data);

  dispatch(apiItemsFetched(response.data));
  dispatch(setApiItemsLoading(false));
}
