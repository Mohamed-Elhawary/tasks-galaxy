import { SET_SEARCH_VALUE } from "redux/types";
import { updateStateHandler } from "utils";

const initialState = { value: "" };

const setSearchValue = (
    state,
    value,
) => updateStateHandler(
    state,
    { value },
);

const searchReducer = (state = initialState, action) => {
    const {
        payload,
        type,
    } = action;

    const { value } = payload || {};

    switch (type) {
    case SET_SEARCH_VALUE: return setSearchValue(
        state,
        value,
    );
    default: return state;
    }
};

export default searchReducer;
