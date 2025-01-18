import { constantsData, urlsData } from "data";
import { useApisClient } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editTaskAction, openAlertAction } from "redux/actions";

const useEditTask = () => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { update } = useApisClient();

    const {
        editingTask: editingTaskMsgConstant,
        taskEdited: taskCreatedMsgConstant,
    } = constantsData.msgs.tasks;

    const editTask = ({
        createdAt,
        description,
        dueDate,
        id,
        isCreatedLocally,
        priority,
        status,
        title,
    }) => {
        setLoading(true);

        update(
            urlsData.apis.tasks.url,
            id,
            {
                createdAt,
                description,
                dueDate: new Date(dueDate).toISOString(),
                id,
                priority: priority?.value || priority,
                status: status?.value || status,
                title,
                updatedAt: new Date().toISOString(),
                ...isCreatedLocally && { isCreatedLocally },
            },
        ).then(() => {
            dispatch(openAlertAction(
                taskCreatedMsgConstant,
                "success",
            ));

            dispatch(editTaskAction({
                createdAt,
                description,
                dueDate,
                id,
                priority: priority?.value || priority,
                status: status?.value || status,
                title,
                updatedAt: new Date().toISOString(),
                ...isCreatedLocally && { isCreatedLocally },
            }));
        })["catch"]((err) => {
            dispatch(openAlertAction(
                err?.response?.data?.message,
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
            if (loading) toast.info(editingTaskMsgConstant);
        },
        [loading], //eslint-disable-line
    );

    return {
        editTask,
        loading,
    };
};

export default useEditTask;
