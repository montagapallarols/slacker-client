import { allowedNodeEnvironmentFlags } from "process";
import {
  ListItemsState,
  ListItemsActionTypes,
  SET_LIST_ITEMS_LOADING,
  LIST_ITEMS_FETCHED,
} from "./types";

const initialState: ListItemsState = {
  loading: true,
  all: [],
  categories: [],
  favouritesByCategory: [],
  allFavourites: [],
};

export default function reducer(
  state = initialState,
  action: ListItemsActionTypes
) {
  switch (action.type) {
    case "SET_LIST_ITEMS_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case "LIST_ITEMS_FETCHED": {
      return {
        ...state,
        all: [...action.payload],
      };
    }
    case "CATEGORIES_FETCHED": {
      return {
        ...state,
        categories: [...action.payload],
      };
    }
    case "FAVOURITES_BY_CATEGORY_FETCHED": {
      return {
        ...state,
        favouritesByCategory: [...action.payload],
      };
    }
    case "ALL_FAVOURITES_FETCHED": {
      return {
        ...state,
        allFavourites: [...action.payload],
      };
    }
    case "ADD_LIST_ITEM": {
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
