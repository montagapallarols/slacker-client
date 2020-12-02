// state type
export interface ApiItemsState {
  loading: boolean;
  all: object[] | null;
  details: object;
  favouriteDetails: object;
}

// action types
export const SET_API_ITEMS_LOADING = "SET_API_ITEMS_LOADING";
export const API_ITEMS_FETCHED = "API_ITEMS_FETCHED";
export const API_ITEM_BY_ID_FETCHED = "API_ITEM_BY_ID_FETCHED";
export const FAVOURITE_API_ITEM_BY_ID_FETCHED =
  "FAVOURITE_API_ITEM_BY_ID_FETCHED";
export const CLEAR_API_ITEMS = "CLEAR_API_ITEMS";
// ...

export type SetLoadingApiItems = {
  type: typeof SET_API_ITEMS_LOADING;
  payload: boolean;
};

export type ApiItemsFetched = {
  type: typeof API_ITEMS_FETCHED;
  payload: object[];
};
export type ApiItemByIdFetched = {
  type: typeof API_ITEM_BY_ID_FETCHED;
  payload: object;
};
export type FavouriteApiItemByIdFetched = {
  type: typeof FAVOURITE_API_ITEM_BY_ID_FETCHED;
  payload: object;
};
export type ClearApiItems = {
  type: typeof CLEAR_API_ITEMS;
  payload: any;
};
// ...

export type ApiItemsActionTypes =
  | SetLoadingApiItems
  | ApiItemsFetched
  | ApiItemByIdFetched
  | ClearApiItems
  | FavouriteApiItemByIdFetched;
// ...
