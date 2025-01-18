import { urlsData } from "data";
import { useApisClient } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAlertAction } from "redux/actions";

const useGetTask = (id) => {
    const [data, setData] = useState({
        status: null,
        task: {},
    });

    const [loading, setLoading] = useState(true);

    const { tasks } = useSelector((state) => state.tasksReducer);

    const dispatch = useDispatch();

    const { get } = useApisClient();

    const findTaskByIdHandler = () => {
        for (const [status, taskList] of Object.entries(tasks)) { // eslint-disable-line
            const task = taskList.find(({ id: taskId }) => taskId === id);

            if (task) {
                return {
                    status,
                    ...task,
                };
            }
        }

        return null;
    };

    useEffect(() => {
        if (id && Object.values(tasks).length > 0) {
            setLoading(true);

            const task = findTaskByIdHandler();

            get(
                `${urlsData.apis.tasks.url}`,
                id,
                null,
            ).then(() => {
                if (task) {
                    setData({
                        status: 200,
                        task,
                    });
                } else {
                    setData({
                        status: 404,
                        task: {},
                    });
                }
            })["catch"]((err) => {
                if (task) {
                    setData({
                        status: 200,
                        task,
                    });
                } else {
                    setData({
                        status: 404,
                        task: {},
                    });

                    dispatch(openAlertAction(
                        err?.response?.data?.message,
                        "error",
                    ));
                }
            })["finally"](() => {
                setLoading(false);
            });
        }
    }, [id, tasks]); //eslint-disable-line

    return {
        data,
        loading,

    };
};

export default useGetTask;
