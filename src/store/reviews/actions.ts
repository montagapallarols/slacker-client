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
  dispatch(setReviewsLoading(false));
}

// export function addItemToList(
//   apiItemDetails: any,
//   categoryId: any,
//   userLibraryListId: number
// ) {
//   return async (dispatch: any, getState: any) => {
//     try {
//       const response = await axios.post(
//         `${serverUrl}/lists/selectedList/listItems`,
//         {
//           name: apiItemDetails.Title,
//           year: apiItemDetails.Year,
//           genre: apiItemDetails.Genre,
//           director: apiItemDetails.Director,
//           plot: apiItemDetails.Plot,
//           poster: apiItemDetails.Poster,
//           type: apiItemDetails.Type,
//           apiId: apiItemDetails.imdbID,
//           apiName: "omdb",
//           categoryId: categoryId,
//           listId: userLibraryListId,
//         }
//       );
//       // console.log("Add new listItem response", response.data);

//       dispatch(addListItem(response.data));
//       dispatch(setListItemsLoading(false));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
