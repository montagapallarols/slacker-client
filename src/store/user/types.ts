// state type
export interface UserState {
  loading: boolean;
  // message: string | null;
  token: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  profile: any | null;
}

// action types
export const LOADING_USER = "LOADING_USER";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
// ...

export interface UserWithToken {
  id: number;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: any;
}

export interface UserWithoutToken {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profile: any;
}

export type SetLoadingUser = {
  type: typeof LOADING_USER;
};
export type LoginSuccess = {
  type: typeof LOGIN_SUCCESS;
  payload: any;
};
export type TokenStillValid = {
  type: typeof TOKEN_STILL_VALID;
  payload: any;
};

export type logOutAction = {
  type: typeof LOG_OUT;
};
// export type SetMessage = {
//   type: typeof SET_MESSAGE;
//   payload: string | null;
// };
// export type ClearMessage = {
//   type: typeof CLEAR_MESSAGE;
//   payload: null;
// };
// ...

export type UserActionTypes =
  | SetLoadingUser
  | LoginSuccess
  | TokenStillValid
  | logOutAction;
// | SetMessage
// | ClearMessage;
// ...
