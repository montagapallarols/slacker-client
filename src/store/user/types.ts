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
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "LOGIN_SUCCESS";
// ...

export type SetLoadingUser = {
  type: typeof LOADING_USER;
};
export type LoginSuccess = {
  type: typeof LOGIN_SUCCESS;
  token: any;
  payload: any;
};
export type TokenStillValid = {
  type: typeof TOKEN_STILL_VALID;
  payload: any;
};
// ...

export type UserActionTypes = SetLoadingUser | LoginSuccess | TokenStillValid;
// ...
