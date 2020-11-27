// state type
export type ListItemsState = {
  loading: boolean;
  all: object[] | null;
};

// action types
export const SET_LOADING = "SET_LOADING";
export const LIST_ITEMS_FETCHED = "LIST_ITEMS_FETCHED";
// ...

export type SetLoadingListItems = {
  type: typeof SET_LOADING;
  payload: boolean;
};

export type ListItemsFetched = {
  type: typeof LIST_ITEMS_FETCHED;
  payload: object[];
};
// ...

export type ListItemsActionTypes = SetLoadingListItems | ListItemsFetched;
// ...
