import { CLOSE_ALERT, OPEN_ALERT } from "redux/types";

export const openAlert = (message, status) => ({
    payload: {
        message,
        status,
    },
    type: OPEN_ALERT,
});

export const closeAlert = () => ({ type: CLOSE_ALERT });
