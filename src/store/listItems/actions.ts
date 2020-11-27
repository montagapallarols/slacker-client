import { serverUrl, DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
import axios from "axios";
import {
  SET_LIST_ITEMS_LOADING,
  LIST_ITEMS_FETCHED,
  ListItemsActionTypes,
} from "./types";
import { AppThunk } from "../types";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export function setListItemsLoading(loading: boolean) {
  return {
    type: "SET_LIST_ITEMS_LOADING",
    payload: loading,
  };
}

export function listItemsFetched(profiles: object[]) {
  return {
    type: "LIST_ITEMS_FETCHED",
    payload: profiles,
  };
}

export function categoriesFetched(profiles: object[]) {
  return {
    type: "CATEGORIES_FETCHED",
    payload: profiles,
  };
}

export function favouritesByCategoryFetched(profiles: object[]) {
  return {
    type: "FAVOURITES_BY_CATEGORY_FETCHED",
    payload: profiles,
  };
}

export async function fetchListItems(dispatch: any, getState: any) {
  //   dispatch(setLoading(true));

  const response = await axios.get("http://localhost:4000/lists/listItems");
  console.log("List items response", response.data);

  dispatch(listItemsFetched(response.data));
  dispatch(setListItemsLoading(false));
}

export async function fetchCategories(dispatch: any, getState: any) {
  //   dispatch(setLoading(true));

  const response = await axios.get("http://localhost:4000/categories");
  console.log("List items response", response.data);

  dispatch(categoriesFetched(response.data));
  dispatch(setListItemsLoading(false));
}

export async function fetchFavouritesByCategory(dispatch: any, getState: any) {
  //   dispatch(setLoading(true));

  const response = await axios.get(
    "http://localhost:4000/lists/listItems/favourites/:categoryId"
  );
  console.log("List items response", response.data);

  dispatch(favouritesByCategoryFetched(response.data));
  dispatch(setListItemsLoading(false));
}
