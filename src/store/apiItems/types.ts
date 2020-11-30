// state type
export interface ApiItemsState {
  loading: boolean;
  all: object[] | null;
}

// action types
export const SET_API_ITEMS_LOADING = "SET_API_ITEMS_LOADING";
export const API_ITEMS_FETCHED = "API_ITEMS_FETCHED";
// ...

export type SetLoadingApiItems = {
  type: typeof SET_API_ITEMS_LOADING;
  payload: boolean;
};

export type ApiItemsFetched = {
  type: typeof API_ITEMS_FETCHED;
  payload: object[];
};
// ...

export type ApiItemsActionTypes = SetLoadingApiItems | ApiItemsFetched;
// ...
