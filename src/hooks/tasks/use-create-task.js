import { constantsData, urlsData } from "data";
import { useApisClient } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTaskAction, openAlertAction } from "redux/actions";

const useCreateTask = () => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { post } = useApisClient();

    const {
        creatingTask: creatingTaskMsgConstant,
        taskCreated: taskCreatedMsgConstant,
    } = constantsData.msgs.tasks;

    const createTask = ({
        description,
        dueDate,
        priority,
        status,
        title,
    }) => {
        setLoading(true);

        post(
            urlsData.apis.tasks.url,
            null,
            {
                description,
                dueDate,
                priority,
                status,
                title,
            },
        ).then(() => {
            dispatch(openAlertAction(
                taskCreatedMsgConstant,
                "success",
            ));

            dispatch(createTaskAction({
                description,
                dueDate,
                priority,
                status,
                title,
            }));
        })["catch"]((err) => {
            dispatch(openAlertAction(
                err.response.data.message,
                "error",
            ));
        })["finally"](() => {
            toast.dismiss();

            setLoading(false);

            navigate(urlsData.routes.tasks.url);
        });
    };

    useEffect(
        () => {
            if (loading) toast.info(creatingTaskMsgConstant);
        },
        [loading], //eslint-disable-line
    );

    return {
        createTask,
        loading,
    };
};

export default useCreateTask;
