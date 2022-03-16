import ShowButtonActionTypes from "./scrollButton.types";

export const toggleScrollButton = (conditional) => ({
    type: ShowButtonActionTypes.TOGGLE_SCROLL_BUTTON,
    payload: conditional,
});
