import { RootState } from "../types";

export function selectApiItemsLoading(state: RootState) {
  return state.apiItems.loading;
}

export function selectAllApiItems(state: RootState) {
  return state.apiItems.all;
}

export function selectApiItemDetails(state: RootState) {
  return state.apiItems.details;
}

export function selectFavouriteApiItemDetails(state: RootState) {
  return state.apiItems.favouriteDetails;
}

// @ts-ignore
