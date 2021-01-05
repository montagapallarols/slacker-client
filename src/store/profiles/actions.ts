import { serverUrl, DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
import axios from "axios";
import { SET_LOADING, PROFILES_FETCHED, ProfileActionTypes } from "./types";
import { AppThunk } from "../types";
import { Action } from "redux";
import { RootState } from "../rootReducer";
import { ThunkAction } from "redux-thunk";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import { selectToken, selectUser } from "../user/selectors";

export function setLoading(loading: boolean) {
  return {
    type: "SET_LOADING",
    payload: loading,
  };
}

export function profilesFetched(profiles: object[]) {
  return {
    type: "PROFILES_FETCHED",
    payload: profiles,
  };
}

export function profileUpdated(profile: any) {
  return {
    type: "PROFILE_UPDATED",
    payload: profile,
  };
}

export async function fetchProfiles(dispatch: any, getState: any) {
  //   dispatch(setLoading(true));

  const response = await axios.get(`${serverUrl}/profiles`);
  // console.log("Profiles response", response.data);

  dispatch(profilesFetched(response.data));
  dispatch(setLoading(false));
}

export const updateProfile = (
  userProfileId?: number,
  imageUrl?: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch, getState: any) => {
    const token = selectToken(getState());

    try {
      const response = await axios.patch(
        `${serverUrl}/profiles/${userProfileId}`,
        {
          profileId: userProfileId,
          imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("UPDATE PROFILE RESPONSE", response.data);
      dispatch(profileUpdated(response.data));
      dispatch(
        showMessageWithTimeout(
          "success",
          true,
          "Your profile has been updated.",
          2000
        )
      );
      dispatch(setLoading(false));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
