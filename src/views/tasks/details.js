import { Dialog, Loader } from "atoms";
import { Details, Meta } from "components";
import { constantsData, urlsData } from "data";
import { useDeleteTask, useGetTask, useTasksList } from "hooks";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const TaskDetailsView = () => {
    const [open, setOpen] = useState({
        status: false,
        taskId: null,
    });

    const { tasks } = useSelector((state) => state.tasksReducer);

    const { id } = useParams();

    const {
        data,
        loading,
    } = useGetTask(id);

    const { loading: tasksListLoading } = useTasksList(Object.values(tasks).length > 0);

    const {
        deleteTask,
        deleted,
        loading: deleteLoading,
    } = useDeleteTask();

    const {
        buttons: { delete: deleteBtnConstant },
        msgs: {
            tasks: {
                deleteTaskConfirmation: deleteTaskConfirmationMsgConstant,
            },
        },
    } = constantsData;

    const {
        notFound: notFoundRouteUrl,
        tasks: { url: tasksRouteUrl },
    } = urlsData.routes;

    if (loading || tasksListLoading || deleteLoading) return <Loader />;

    if (deleted) return <Navigate to={tasksRouteUrl} />;

    if (data.status === 404) return <Navigate to={notFoundRouteUrl} />;

    return (
        <>
            <Meta title={data?.task?.title} />
            <Details
                data={data?.task}
                module="tasks"
                setDialogOpen={setOpen}
            />
            <Dialog
                confirmButtonText={deleteBtnConstant}
                open={open.status}
                setDialogOpen={setOpen}
                title={deleteTaskConfirmationMsgConstant}
                onClickConfirmButton={() => {
                    deleteTask(id);

                    setOpen({
                        data: null,
                        status: false,
                    });
                }}
            />
        </>
    );
};

export default TaskDetailsView;
