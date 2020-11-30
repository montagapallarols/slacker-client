import { RootState } from "../types";

export function selectApiItemsLoading(state: RootState) {
  return state.apiItems.loading;
}

export function selectAllApiItems(state: RootState) {
  return state.apiItems.all;
}
