import { RootState } from "../types";

export function selectApiItemsLoading(state: RootState) {
  // @ts-ignore
  return state.apiItems.loading;
}

export function selectAllApiItems(state: RootState) {
  // @ts-ignore
  return state.apiItems.all;
}

export function selectApiItemDetails(state: RootState) {
  // @ts-ignore
  return state.apiItems.details;
}
