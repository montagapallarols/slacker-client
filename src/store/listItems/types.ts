// state type
export type ListItemsState = {
  loading: boolean;
  all: object[] | null;
};

// action types
export const SET_LIST_ITEMS_LOADING = "SET_LIST_ITEMS_LOADING";
export const LIST_ITEMS_FETCHED = "LIST_ITEMS_FETCHED";
// ...

export type SetLoadingListItems = {
  type: typeof SET_LIST_ITEMS_LOADING;
  payload: boolean;
};

export type ListItemsFetched = {
  type: typeof LIST_ITEMS_FETCHED;
  payload: object[];
};
// ...

export type ListItemsActionTypes = SetLoadingListItems | ListItemsFetched;
// ...
