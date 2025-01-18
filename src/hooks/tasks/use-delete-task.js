import { constantsData, urlsData } from "data";
import { useApisClient } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteTaskAction, openAlertAction } from "redux/actions";

const useDeleteTask = () => {
    const [loading, setLoading] = useState(false);

    const [deleted, setDeleted] = useState(false);

    const dispatch = useDispatch();

    const { delete: deleteApi } = useApisClient();

    const {
        deletingTask: deletingTaskMsgConstant,
        taskDeleted: taskDeletedMsgConstant,
    } = constantsData.msgs.tasks;

    const deleteTask = (id) => {
        setDeleted(false);

        setLoading(true);

        deleteApi(
            urlsData.apis.tasks.url,
            id,
        ).then(() => {
            setDeleted(true);

            dispatch(openAlertAction(
                taskDeletedMsgConstant,
                "success",
            ));

            dispatch(deleteTaskAction(id));
        })["catch"]((err) => {
            dispatch(openAlertAction(
                err?.response?.data?.message,
                "error",
            ));
        })["finally"](() => {
            toast.dismiss();

            setLoading(false);
        });
    };

    useEffect(
        () => {
            if (loading) toast.info(deletingTaskMsgConstant);
        },
        [loading], //eslint-disable-line
    );

    return {
        deleteTask,
        deleted,
        loading,
    };
};

export default useDeleteTask;
