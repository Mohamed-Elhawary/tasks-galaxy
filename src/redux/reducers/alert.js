import { CLOSE_ALERT, OPEN_ALERT } from "redux/types";
import { updateStateHandler } from "utils";

const initialState = {
    message: null,
    open: false,
    status: "",
};

const openAlert = (
    state,
    message,
    status,
) => updateStateHandler(
    state,
    {
        message,
        open: true,
        status,
    },
);

const closeAlert = (state) => updateStateHandler(
    state,
    {
        message: null,
        open: false,
    },
);

const alertReducer = (state = initialState, action) => {
    const {
        payload,
        type,
    } = action;

    const {
        message,
        status,
    } = payload || {};

    switch (type) {
    case OPEN_ALERT: return openAlert(
        state,
        message,
        status,
    );
    case CLOSE_ALERT: return closeAlert(state);
    default: return state;
    }
};

export default alertReducer;
