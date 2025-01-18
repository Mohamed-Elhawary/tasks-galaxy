import { CREATE_TASK, DELETE_TASK, SET_TASKS_LIST } from "redux/types";

export const setTasksListAction = (tasks, fromStorage) => ({
    payload: {
        fromStorage,
        tasks,
    },
    type: SET_TASKS_LIST,
});

export const createTaskAction = (task) => ({
    payload: { task },
    type: CREATE_TASK,
});

export const deleteTaskAction = (id) => ({
    payload: { id },
    type: DELETE_TASK,
});
