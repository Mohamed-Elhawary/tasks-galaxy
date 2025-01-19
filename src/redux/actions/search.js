import { SET_SEARCH_VALUE } from "redux/types";

export const setSearchValue = (value) => ({
    payload: { value },
    type: SET_SEARCH_VALUE,
});
