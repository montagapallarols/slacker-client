// state type
export type ProfileState = {
  loading: boolean;
  all: any;
};

// action types
export const SET_LOADING = "SET_LOADING";
export const PROFILES_FETCHED = "PROFILES_FETCHED";
export const PROFILE_UPDATED = "PROFILE_UPDATED";
// ...

export type SetLoadingProfile = {
  type: typeof SET_LOADING;
  payload: boolean;
};

// export interface Object {
//   id: number;
//   firstName: string;
//   lastName: string;
//   imageUrl: string;
//   type: string;
// };

export type ProfilesFetched = {
  type: typeof PROFILES_FETCHED;
  payload: object[];
};

export type ProfileUpdated = {
  type: typeof PROFILE_UPDATED;
  payload: any;
};
// ...

export type ProfileActionTypes =
  | SetLoadingProfile
  | ProfilesFetched
  | ProfileUpdated;
// ...
