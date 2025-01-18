import { SET_TASKS_LIST } from "redux/types";

export const setTasksList = (tasks, fromStorage) => ({
    payload: {
        fromStorage,
        tasks,
    },
    type: SET_TASKS_LIST,
});
