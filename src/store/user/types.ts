// state type
export type UserState = {
  loading: boolean;
  message: string | null;
  token: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  profile: any | null;
};

// action types
export const LOADING_USER = "LOADING_USER";
// ...

export type SetLoadingUser = {
  type: typeof LOADING_USER;
};
// ...

export type UserActionTypes = SetLoadingUser;
// ...
