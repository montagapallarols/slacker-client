import {
  ProfileState,
  ProfileActionTypes,
  SET_LOADING,
  PROFILES_FETCHED,
  PROFILE_UPDATED,
} from "./types";

const initialState: ProfileState = {
  loading: true,
  all: [],
};

export default function reducer(
  state = initialState,
  action: ProfileActionTypes
) {
  switch (action.type) {
    case "SET_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case "PROFILES_FETCHED": {
      return {
        ...state,
        all: [...action.payload],
      };
    }
    case "PROFILE_UPDATED": {
      return {
        ...state,
        all: state.all?.map((p: any) => {
          return p.id === action.payload.id ? { ...action.payload } : { ...p };
        }),
      };
    }
    default: {
      return state;
    }
  }
}
