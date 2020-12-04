// state type
export type ReviewsState = {
  loading: boolean;
  all: any;
};

// action types
export const SET_REVIEWS_LOADING = "SET_REVIEWS_LOADING";
export const ADD_REVIEW = "ADD_REVIEW";
export const REVIEWS_FETCHED = "REVIEWS_FETCHED";
// ...

export type SetReviewsLoading = {
  type: typeof SET_REVIEWS_LOADING;
  payload: boolean;
};

// export interface Object {
//   id: number;
//   firstName: string;
//   lastName: string;
//   imageUrl: string;
//   type: string;
// };

export type AddReview = {
  type: typeof ADD_REVIEW;
  payload: any;
};
export type ReviewsFetched = {
  type: typeof REVIEWS_FETCHED;
  payload: any;
};
// ...

export type ReviewsActionTypes = SetReviewsLoading | AddReview | ReviewsFetched;
// ...
