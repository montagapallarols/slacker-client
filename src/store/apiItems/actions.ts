import { serverUrl, DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
import axios from "axios";
import {
  SET_API_ITEMS_LOADING,
  API_ITEMS_FETCHED,
  ApiItemsActionTypes,
} from "./types";
import { AppThunk } from "../types";
import { RootState } from "../rootReducer";
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

export function fetchApiItems(
  searchText: any
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async function (dispatch, getState: any) {
    const queryParam = encodeURIComponent(searchText);
    console.log("Query Param:", queryParam);
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${queryParam}&apikey=2511cc5f`
    );
    console.log("API items response", response.data);

    dispatch(apiItemsFetched(response.data));
    dispatch(setApiItemsLoading(false));
  };
}
