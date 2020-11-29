import { RootState } from "../types";
import { listItemsFetched } from "./actions";

export function selectListItemsLoading(state: RootState) {
  return state.listItems.loading;
}

export function selectAllListItems(state: RootState) {
  return state.listItems.all;
}

export function selectAllCategories(state: RootState) {
  return state.listItems.categories;
}

export function selectFavouriteItemsByCategory(state: RootState) {
  return state.listItems.favouritesByCategory?.map((f: any) => {
    return f.item;
  });
}

export function selectAllFavourites(state: RootState) {
  return state.listItems.allFavourites;
}
