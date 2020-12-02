import { RootState } from "../types";

export function selectReviewsLoading(state: RootState) {
  return state.reviews.loading;
}

export function selectAllReviews(state: RootState) {
  return state.reviews.all;
}
