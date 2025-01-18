import {
    CLEAR_FILTERS,
    CLOSE_FILTERS,
    OPEN_FILTERS,
    SET_FILTERS,
} from "redux/types";

export const openFiltersAction = () => ({ type: OPEN_FILTERS });

export const closeFiltersAction = () => ({ type: CLOSE_FILTERS });

export const setFiltersAction = (filters) => ({
    payload: { filters },
    type: SET_FILTERS,
});

export const clearFiltersAction = () => ({ type: CLEAR_FILTERS });
