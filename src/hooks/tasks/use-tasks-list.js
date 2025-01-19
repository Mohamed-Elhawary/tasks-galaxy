import { urlsData } from "data";
import { useApisClient } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { openAlertAction, setTasksListAction } from "redux/actions";

const useTasksList = (isSuspended) => {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const filters = useSelector((state) => state.filtersReducer.filters);

    const { get } = useApisClient();

    const [searchParams] = useSearchParams();

    const queryParams = new URLSearchParams();

    const searchParamValue = searchParams.get("search");

    const filterTasksHandler = (searchResults) => {
        const {
            dateRange,
            priority,
        } = filters;

        const {
            from,
            to,
        } = dateRange || {};

        const filterByCriteria = (task) => {
            const matchesPriority = priority?.value ? task.priority === priority?.value : true;

            const matchesDateRange = dateRange
                ? new Date(task.dueDate) >= new Date(from) && new Date(task.dueDate) <= new Date(to)
                : true;
            return matchesPriority && matchesDateRange;
        };

        const filteredTasks = {};

        for (const [status, taskList] of Object.entries(searchResults ? searchResults : JSON.parse(localStorage.getItem("tasks")))) filteredTasks[status] = taskList.filter(filterByCriteria); // eslint-disable-line

        return filteredTasks;
    };

    const searchTasksByKeywordHandler = (keyword) => {
        const filteredTasks = [];

        for (const [status, taskList] of Object.entries(JSON.parse(localStorage.getItem("tasks")))) { // eslint-disable-line
            const filteredList = taskList.filter((task) => task.title.toLowerCase().includes(keyword.toLowerCase())
                || task.description.toLowerCase().includes(keyword.toLowerCase()));

            if (filteredList.length > 0) filteredTasks[status] = filteredList;
        }

        return filteredTasks;
    };

    const searchAndFilterTasksHandler = (keyword) => filterTasksHandler(searchTasksByKeywordHandler(keyword));

    useEffect(
        () => {
            if (isSuspended) {
                setLoading(false);

                return;
            }

            setLoading(true);

            if (!localStorage.getItem("tasks") || Object.values(filters).length > 0 || searchParamValue) { //eslint-disable-line
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

                if (searchParamValue) {
                    queryParams.append(
                        "search",
                        searchParamValue,
                    );
                }

                get(
                    `${urlsData.apis.tasks.url}${filters?.priority || filters?.taskDueDate || searchParamValue ? `?${queryParams.toString()}` : ""}`,
                    null,
                ).
                    then(({ data: responseData }) => {
                        if (localStorage.getItem("tasks") && Object.values(filters).length > 0 && searchParamValue) dispatch(setTasksListAction(searchAndFilterTasksHandler(searchParamValue), true)); // eslint-disable-line
                        else if (localStorage.getItem("tasks") && Object.values(filters).length > 0) dispatch(setTasksListAction(filterTasksHandler(), true)); // eslint-disable-line
                        else if (localStorage.getItem("tasks") && searchParamValue) dispatch(setTasksListAction(searchTasksByKeywordHandler(searchParamValue), true)); // eslint-disable-line
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
        [filters, searchParamValue], // eslint-disable-line
    );

    return { loading };
};

export default useTasksList;
