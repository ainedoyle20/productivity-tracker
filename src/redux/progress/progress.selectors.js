import { createSelector } from "reselect";

const selectProgressReducer = state => state.progress;

export const selectProgressNav = createSelector(
    [selectProgressReducer],
    (progressSlice) => progressSlice.progressNav
);

export const selectProgressDateDisplay = createSelector(
    [selectProgressReducer],
    (progressSlice) => progressSlice.progressDateDisplay
);
