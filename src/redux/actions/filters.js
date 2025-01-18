import {
    CLEAR_FILTERS,
    CLOSE_FILTERS,
    OPEN_FILTERS,
    SET_FILTERS,
} from "redux/types";

export const openFilters = () => ({ type: OPEN_FILTERS });

export const closeFilters = () => ({ type: CLOSE_FILTERS });

export const setFilters = (filters) => ({
    payload: { filters },
    type: SET_FILTERS,
});

export const clearFilters = () => ({ type: CLEAR_FILTERS });
