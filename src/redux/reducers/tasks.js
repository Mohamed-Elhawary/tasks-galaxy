import { randomDescriptionsData } from "data";
import { priorityOptionsData, statusOptionsData } from "data/tasks";
import {
    CREATE_TASK, DELETE_TASK, EDIT_TASK, SET_TASKS_LIST,
} from "redux/types";
import {
    generateFutureDateHandler,
    generateRandomIDHandler,
    generateRandomItemHandler,
    updateStateHandler,
} from "utils";

const initialState = {
    tasks: [],
};

const restructureTasksHandler = (tasks) => {
    const structuredTasks = tasks.map((task) => ({
        createdAt: new Date(),
        description: generateRandomItemHandler(randomDescriptionsData),
        dueDate: generateFutureDateHandler(),
        id: task.id.toString(),
        priority: generateRandomItemHandler(priorityOptionsData),
        status: generateRandomItemHandler(statusOptionsData),
        title: task.title,
        updatedAt: new Date(),
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

const createTask = (state, task) => {
    const tasks = {
        ...state.tasks,
        [task.status]: [
            {
                ...task,
                createdAt: new Date(),
                id: generateRandomIDHandler(),
                isCreatedLocally: true,
                updatedAt: new Date(),
            },
            ...state.tasks[task.status],
        ],
    };

    localStorage.setItem( // eslint-disable-line
        "tasks",
        JSON.stringify(tasks),
    );

    return updateStateHandler(
        state,
        { tasks },
    );
};

const editTask = (state, task) => {
    const { tasks } = state;

    for (const [status, taskList] of Object.entries(tasks)) { // eslint-disable-line
        const taskIndex = taskList.findIndex((oneTask) => oneTask.id === task.id);

        if (taskIndex !== -1) {
            const editedTask = {
                ...taskList[taskIndex],
                ...task,
            };

            if (editedTask.status !== status) {
                // Remove the task from the current group
                taskList.splice(
                    taskIndex,
                    1,
                );

                // Add the task to the correct status group
                tasks[editedTask.status] = tasks[editedTask.status] || [];

                tasks[editedTask.status].unshift(editedTask);
            } else {
                // Update the task in the current group
                taskList[taskIndex] = editedTask;
            }

            localStorage.setItem( // eslint-disable-line
                "tasks",
                JSON.stringify(tasks),
            );

            return updateStateHandler(
                state,
                { tasks },
            );
        }
    }
};

const deleteTask = (state, id) => {
    const { tasks } = state;

    for (const [status, taskList] of Object.entries(tasks)) { // eslint-disable-line
        const taskIndex = taskList.findIndex((task) => task.id === id);

        if (taskIndex !== -1) {
            taskList.splice(
                taskIndex,
                1,
            );

            localStorage.setItem( // eslint-disable-line
                "tasks",
                JSON.stringify(tasks),
            );

            return updateStateHandler(
                state,
                { tasks },
            );
        }
    }
};
const tasksReducer = (state = initialState, action) => {
    const {
        payload,
        type,
    } = action;

    const {
        fromStorage,
        id,
        task,
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
    case CREATE_TASK: {
        return createTask(
            state,
            task,
        );
    }
    case EDIT_TASK: {
        return editTask(
            state,
            task,
        );
    }
    case DELETE_TASK: {
        return deleteTask(
            state,
            id,
        );
    }
    default: return state;
    }
};

export default tasksReducer;
