// state type
export type ProfileState = {
  loading: boolean;
  all: object[] | null;
};

// action types
export const SET_LOADING = "SET_LOADING";
export const PROFILES_FETCHED = "PROFILES_FETCHED";
// ...

export type SetLoadingProfile = {
  type: typeof SET_LOADING;
  payload: boolean;
};
export type ProfilesFetched = {
  type: typeof PROFILES_FETCHED;
  payload: any;
};
// ...

export type UserActionTypes = SetLoadingProfile | ProfilesFetched;
// ...
