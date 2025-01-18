import { CLOSE_ALERT, OPEN_ALERT } from "redux/types";

export const openAlertAction = (message, status) => ({
    payload: {
        message,
        status,
    },
    type: OPEN_ALERT,
});

export const closeAlertAction = () => ({ type: CLOSE_ALERT });
