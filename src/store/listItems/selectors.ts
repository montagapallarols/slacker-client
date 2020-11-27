import { RootState } from "../types";
import { listItemsFetched } from "./actions";

export function selectListItemsLoading(state: RootState) {
  return state.listItems.loading;
}

export function selectAllListItems(state: RootState) {
  return state.listItems.all;
}

export function selectAllFavourites(state: RootState) {
  return state.listItems.all?.map((i: any) => {
    if (i.list.type === "Favourites") {
      return i.item;
    } else {
      return null;
    }
  });
}
