import {
  ListItemsState,
  ListItemsActionTypes,
  SET_LOADING,
  LIST_ITEMS_FETCHED,
} from "./types";

const initialState: ListItemsState = {
  loading: true,
  all: [],
};

export default function reducer(
  state = initialState,
  action: ListItemsActionTypes
) {
  switch (action.type) {
    case "SET_LOADING": {
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
    default: {
      return state;
    }
  }
}
