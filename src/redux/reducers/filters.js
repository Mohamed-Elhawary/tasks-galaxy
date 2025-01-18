import {
    CLEAR_FILTERS,
    CLOSE_FILTERS,
    OPEN_FILTERS,
    SET_FILTERS,
} from "redux/types";
import { updateStateHandler } from "utils";

const initialState = {
    filters: {},
    open: false,
};

const openFilters = (state) => updateStateHandler(
    state,
    { open: true },
);

const closeFilters = (state) => updateStateHandler(
    state,
    { open: false },
);

const setFilters = (state, filters) => updateStateHandler(
    state,
    { filters },
);

const clearFilters = (state) => updateStateHandler(
    state,
    { filters: {} },
);

const filtersReducer = (state = initialState, action) => {
    const {
        payload,
        type,
    } = action;

    const { filters } = payload || {};

    switch (type) {
    case OPEN_FILTERS: return openFilters(state);
    case CLOSE_FILTERS: return closeFilters(state);
    case SET_FILTERS: return setFilters(
        state,
        filters,
    );
    case CLEAR_FILTERS: return clearFilters(state);
    default: return state;
    }
};

export default filtersReducer;
