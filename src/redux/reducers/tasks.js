import { randomDescriptionsData } from "data";
import { priorityOptionsData, statusOptionsData } from "data/tasks";
import { SET_TASKS_LIST } from "redux/types";
import { generateFutureDateHandler, generateRandomItemHandler, updateStateHandler } from "utils";

const initialState = {
    tasks: [],
};

const restructureTasksHandler = (tasks) => {
    const structuredTasks = tasks.map((task) => ({
        description: generateRandomItemHandler(randomDescriptionsData),
        dueDate: generateFutureDateHandler(),
        id: task.id.toString(),
        priority: generateRandomItemHandler(priorityOptionsData),
        status: generateRandomItemHandler(statusOptionsData),
        title: task.title,
    }));

    const groupedTasks = structuredTasks.reduce(
        (acc, task) => {
            if (!acc[task.status]) acc[task.status] = [];

            acc[task.status].push(task);
            return acc;
        },
        {},
    );

    localStorage.setItem( // eslint-disable-line
        "tasks",
        JSON.stringify(groupedTasks),
    );

    return groupedTasks;
};

const setTasksList = (state, tasks) => updateStateHandler(
    state,
    { tasks },
);

const tasksReducer = (state = initialState, action) => {
    const {
        payload,
        type,
    } = action;

    const {
        fromStorage,
        tasks,
    } = payload || {};

    switch (type) {
    case SET_TASKS_LIST: {
        if (fromStorage) {
            return setTasksList(
                state,
                tasks,
            );
        }

        const restructuredTasks = restructureTasksHandler(tasks);

        return setTasksList(
            state,
            restructuredTasks,
        );
    }
    default: return state;
    }
};

export default tasksReducer;