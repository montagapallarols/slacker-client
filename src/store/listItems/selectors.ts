import { RootState } from "../types";

export function selectListItemsLoading(state: RootState) {
  return state.listItems.loading;
}

export function selectAllListItems(state: RootState) {
  return state.listItems.all;
}
