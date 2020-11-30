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

export function listItemsFetched(items: object[]) {
  return {
    type: "LIST_ITEMS_FETCHED",
    payload: items,
  };
}

export function categoriesFetched(categories: object[]) {
  return {
    type: "CATEGORIES_FETCHED",
    payload: categories,
  };
}

export function favouritesByCategoryFetched(favourites: object[]) {
  return {
    type: "FAVOURITES_BY_CATEGORY_FETCHED",
    payload: favourites,
  };
}

export function allFavouritesFetched(favourites: object[]) {
  return {
    type: "ALL_FAVOURITES_FETCHED",
    payload: favourites,
  };
}

export function addListItem(listItem: object) {
  return {
    type: "ADD_LIST_ITEM",
    payload: listItem,
  };
}

export async function fetchListItems(dispatch: any, getState: any) {
  //   dispatch(setLoading(true));

  const response = await axios.get(`${serverUrl}/lists/listItems`);
  console.log("List items response", response.data);

  dispatch(listItemsFetched(response.data));
  dispatch(setListItemsLoading(false));
}

export async function fetchCategories(dispatch: any, getState: any) {
  //   dispatch(setLoading(true));

  const response = await axios.get(`${serverUrl}/categories`);
  console.log("List items response", response.data);

  dispatch(categoriesFetched(response.data));
  dispatch(setListItemsLoading(false));
}

export function fetchFavouritesByCategory(categoryFilterId: string) {
  return async (dispatch: any, getState: any) => {
    const categoryIdString = categoryFilterId.toString();
    console.log(categoryIdString);

    const response = await axios.get(
      `${serverUrl}/lists/listItems/favourites/${categoryIdString}`
    );
    console.log("Favourites by category response", response.data);

    dispatch(favouritesByCategoryFetched(response.data));
    dispatch(setListItemsLoading(false));
  };
}

export async function fetchAllFavourites(dispatch: any, getState: any) {
  //   dispatch(setLoading(true));

  const response = await axios.get(`${serverUrl}/lists/listItems/favourites`);
  console.log("All favourites response", response.data);

  dispatch(allFavouritesFetched(response.data));
  dispatch(setListItemsLoading(false));
}

export function addItemToList(
  apiItemDetails: any,
  categoryId: any,
  userLibraryListId: number
) {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await axios.post(
        `${serverUrl}/lists/library/listItems`,
        {
          name: apiItemDetails.Title,
          year: apiItemDetails.Year,
          genre: apiItemDetails.Genre,
          director: apiItemDetails.Director,
          plot: apiItemDetails.Plot,
          poster: apiItemDetails.Poster,
          type: apiItemDetails.Type,
          apiId: apiItemDetails.imdbId,
          apiName: "omdb",
          categoryId: categoryId,
          listId: userLibraryListId,
        }
      );
      console.log("Add new listItem response", response);

      // dispatch(addListItem(response.data));
      dispatch(setListItemsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
}
