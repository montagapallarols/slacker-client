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

export function apiItemByIdFetched(item: object) {
  return {
    type: "API_ITEM_BY_ID_FETCHED",
    payload: item,
  };
}

export function favouriteApiItemByIdFetched(item: object) {
  return {
    type: "FAVOURITE_API_ITEM_BY_ID_FETCHED",
    payload: item,
  };
}

export function clearApiItems([]) {
  return {
    type: "CLEAR_API_ITEMS",
    payload: [],
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
    // console.log("API items response", response.data.Search);

    dispatch(apiItemsFetched(response.data.Search));
    dispatch(setApiItemsLoading(false));
  };
}

export function fetchApiItemById(
  movieId: string
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async function (dispatch, getState: any) {
    if (!movieId) return;
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${movieId}&apikey=2511cc5f&plot=full`
      );
      console.log("API item DETAILS response", response.data);

      dispatch(apiItemByIdFetched(response.data));
      dispatch(setApiItemsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchFavouriteApiItemById(
  movieId: string
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async function (dispatch, getState: any) {
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${movieId}&apikey=2511cc5f&plot=full`
    );
    // console.log("Favourite API item DETAILS response", response.data);

    dispatch(favouriteApiItemByIdFetched(response.data));
    dispatch(setApiItemsLoading(false));
  };
}

export function removeSearchItems(dispatch: any, getState: any) {
  dispatch(clearApiItems([]));
}
