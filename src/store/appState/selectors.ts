import { AppState } from "./types";

export const selectAppLoading = (state: AppState) => state.appState.loading;
export const selectMessage = (state: AppState) => state.appState.message;
