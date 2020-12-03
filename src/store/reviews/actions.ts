import { serverUrl, DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
import axios from "axios";
import {
  SET_REVIEWS_LOADING,
  REVIEWS_FETCHED,
  ReviewsActionTypes,
} from "./types";
import { AppThunk } from "../types";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export function setReviewsLoading(loading: boolean) {
  return {
    type: "SET_REVIEWS_LOADING",
    payload: loading,
  };
}

export function reviewsFetched(items: object[]) {
  return {
    type: "REVIEWS_FETCHED",
    payload: items,
  };
}

export function addReview(listItem: object) {
  return {
    type: "ADD_LIST_ITEM",
    payload: listItem,
  };
}

export async function fetchReviews(dispatch: any, getState: any) {
  const response = await axios.get(`${serverUrl}/reviews/all`);
  console.log("REVIEWS response", response.data);

  dispatch(reviewsFetched(response.data));
  // dispatch(setReviewsLoading(false));
  dispatch(setReviewsLoading(false));
}

export function postReview(
  title: any,
  content: any,
  value: number,
  reviewItemId: any,
  profileIdString: string
) {
  return async (dispatch: any, getState: any) => {
    if (!title || !content || !value) {
      return "Please provide a title, content and rating.";
    }
    const idString = reviewItemId.toString();

    try {
      const response = await axios.post(
        `${serverUrl}/reviews/${idString}/${profileIdString}`,
        {
          name: title,
          content: content,
          rating: value,
        }
      );
      console.log("REVIEW response", response.data);

      dispatch(addReview(response.data));
      dispatch(setReviewsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
}
