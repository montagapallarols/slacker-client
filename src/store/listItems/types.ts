// state type
export type ListItemsState = {
  loading: boolean;
  all: object[] | null | any;
  categories: object[] | null;
  favouritesByCategory: object[] | null;
  allFavourites: object[] | null;
};

// action types
export const SET_LIST_ITEMS_LOADING = "SET_LIST_ITEMS_LOADING";
export const LIST_ITEMS_FETCHED = "LIST_ITEMS_FETCHED";
export const CATEGORIES_FETCHED = "CATEGORIES_FETCHED";
export const FAVOURITES_BY_CATEGORY_FETCHED = "FAVOURITES_BY_CATEGORY_FETCHED";
export const ALL_FAVOURITES_FETCHED = "ALL_FAVOURITES_FETCHED";
export const ADD_LIST_ITEM = "ADD_LIST_ITEM";
export const DELETE_LIBRARY_LIST_ITEM = "DELETE_LIBRARY_LIST_ITEM";
export const DELETE_WISHLIST_LIST_ITEM = "DELETE_WISHLIST_LIST_ITEM";
export const DELETE_FAVOURITES_LIST_ITEM = "DELETE_FAVOURITES_LIST_ITEM";
// ...

export type SetLoadingListItems = {
  type: typeof SET_LIST_ITEMS_LOADING;
  payload: boolean;
};

export type ListItemsFetched = {
  type: typeof LIST_ITEMS_FETCHED;
  payload: object[];
};

export type CategoriesFetched = {
  type: typeof CATEGORIES_FETCHED;
  payload: object[];
};

export type FavouritesByCategory = {
  type: typeof FAVOURITES_BY_CATEGORY_FETCHED;
  payload: object[];
};

export type AllFavouritesFetched = {
  type: typeof ALL_FAVOURITES_FETCHED;
  payload: object[];
};

export type AddListItem = {
  type: typeof ADD_LIST_ITEM;
  payload: object[];
};
export type DeleteLibraryListItem = {
  type: typeof DELETE_LIBRARY_LIST_ITEM;
  payload: any;
};
export type DeleteWishlistListItem = {
  type: typeof DELETE_WISHLIST_LIST_ITEM;
  payload: any;
};
export type DeleteFavouritesListItem = {
  type: typeof DELETE_FAVOURITES_LIST_ITEM;
  payload: any;
};
// ...

export type ListItemsActionTypes =
  | SetLoadingListItems
  | ListItemsFetched
  | FavouritesByCategory
  | CategoriesFetched
  | AllFavouritesFetched
  | AddListItem
  | DeleteLibraryListItem
  | DeleteWishlistListItem
  | DeleteFavouritesListItem;
// ...
