import { ReviewsState, ReviewsActionTypes } from "./types";

const initialState: ReviewsState = {
  loading: true,
  all: [],
};

export default function reducer(
  state = initialState,
  action: ReviewsActionTypes
) {
  switch (action.type) {
    case "SET_REVIEWS_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case "REVIEWS_FETCHED": {
      return {
        ...state,
        all: [...action.payload],
      };
    }
    case "ADD_REVIEW": {
      return {
        ...state,
        all: [...state.all, action.payload],
      };
    }

    default: {
      return state;
    }
  }
}
