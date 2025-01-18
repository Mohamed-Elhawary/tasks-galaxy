import { urlsData } from "data";
import { useApisClient } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAlertAction, setTasksListAction } from "redux/actions";

const useTasksList = (isSuspended) => {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const { tasks } = useSelector((state) => state.tasksReducer);

    const filters = useSelector((state) => state.filtersReducer.filters);

    const { get } = useApisClient();

    const queryParams = new URLSearchParams();

    const filterTasksHandler = () => {
        const filteredTasks = {};

        const {
            from,
            to,
        } = filters.taskDueDate;

        const priorityFilter = filters.priority.value;

        const filterStart = new Date(from);

        const filterEnd = new Date(to);

        for (const [status, taskList] of Object.entries(tasks)) { // eslint-disable-line
            const filteredList = taskList.filter((task) => {
                const taskDueDate = new Date(task.dueDate);

                return (
                    taskDueDate >= filterStart
                    && taskDueDate <= filterEnd
                    && task.priority === priorityFilter
                );
            });

            if (filteredList.length > 0) filteredTasks[status] = filteredList;
        }

        return filteredTasks;
    };

    useEffect(
        () => {
            if (isSuspended) {
                setLoading(false);

                return;
            }

            setLoading(true);

            if (!localStorage.getItem("tasks") || Object.values(filters).length > 0) { //eslint-disable-line
                if (Object.keys(filters).length > 0) {
                    if (filters?.priority && filters.priority.value) {
                        queryParams.append(
                            "priority",
                            filters.priority.value,
                        );
                    }

                    if (filters?.taskDueDate) {
                        const {
                            from,
                            to,
                        } = filters.taskDueDate;

                        if (from) {
                            queryParams.append(
                                "from",
                                new Date(from).toISOString(),
                            );

                            queryParams.append(
                                "to",
                                new Date(to).toISOString(),
                            );
                        }
                    }
                }

                get(
                    `${urlsData.apis.tasks.url}?${filters?.priority || filters?.taskDueDate ? queryParams.toString() : ""}`,
                    null,
                ).
                    then(({ data: responseData }) => {
                        if (localStorage.getItem("tasks")) dispatch(setTasksListAction(filterTasksHandler(), true)); // eslint-disable-line
                        else dispatch(setTasksListAction(responseData));
                    })["catch"]((err) => {
                        dispatch(openAlertAction(
                            err.response.data.message,
                            "error",
                        ));
                    })["finally"](() => {
                        setLoading(false);
                    });
            } else {
                dispatch(setTasksListAction(JSON.parse(localStorage.getItem("tasks")), true)); // eslint-disable-line

                setTimeout(
                    () => {
                        setLoading(false);
                    },
                    2000,
                );
            }
        },
        [Object.values(filters).length], // eslint-disable-line
    );

    return { loading };
};

export default useTasksList;
