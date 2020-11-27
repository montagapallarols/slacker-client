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
