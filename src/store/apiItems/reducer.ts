import {
  ApiItemsState,
  ApiItemsActionTypes,
  SET_API_ITEMS_LOADING,
  API_ITEMS_FETCHED,
} from "./types";

const initialState: ApiItemsState = {
  loading: true,
  all: [],
  details: {},
};

export default function reducer(
  state = initialState,
  action: ApiItemsActionTypes
) {
  switch (action.type) {
    case "SET_API_ITEMS_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case "API_ITEMS_FETCHED": {
      return {
        ...state,
        all: [...action.payload],
      };
    }
    case "API_ITEM_BY_ID_FETCHED": {
      return {
        ...state,
        details: { ...action.payload },
      };
    }
    case "CLEAR_API_ITEMS": {
      return {
        ...state,
        all: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
