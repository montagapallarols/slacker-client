import { RootState } from "../types";

export function selectProfilesLoading(state: RootState) {
  return state.profiles.loading;
}

export function selectAllProfiles(state: RootState) {
  return state.profiles.all;
}

// export const selectProfileById = (profileId: number) => (state: RootState) =>
//   state.profile.all.find((p) => p.id === profileId);
