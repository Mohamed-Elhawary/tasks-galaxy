import { Loader } from "atoms";
import { Meta, PageHead, TaskForm } from "components";
import { constantsData, urlsData } from "data";
import { useEditTask, useGetTask, useTasksList } from "hooks";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const EditTaskView = () => {
    const { tasks } = useSelector((state) => state.tasksReducer);

    const { id } = useParams();

    const {
        editTask,
        loading: editTaskLoading,
    } = useEditTask();

    const {
        data,
        loading: getTaskLoading,
    } = useGetTask(id);

    const { loading: tasksListLoading } = useTasksList(Object.values(tasks).length > 0);

    const { url: tasksRouteUrl } = urlsData.routes.tasks;

    const {
        buttons: { edit: editBtnConstant },
        titles: { editTask: editTaskTitleConstant },
    } = constantsData;

    if (tasksListLoading || getTaskLoading) return <Loader />;

    if (data.status === 404) return <Navigate to={urlsData.routes.notFound} />;

    return (
        <>
            <Meta title={editTaskTitleConstant} />
            <PageHead
                backRouteUrl={tasksRouteUrl}
                title={editTaskTitleConstant}
                hasBack
            />
            <TaskForm
                action={editBtnConstant}
                loading={editTaskLoading}
                values={{
                    ...data?.task,
                    priority: {
                        label: data?.task?.priority,
                        value: data?.task?.priority,
                    },
                    status: {
                        label: data?.task?.status,
                        value: data?.task?.status,
                    },
                }}
                onSubmitForm={(values) => editTask({
                    ...values,
                    createdAt: data?.task?.createdAt,
                    id: data?.task?.id,
                    ...data?.task?.isCreatedLocally && { isCreatedLocally: true },
                })}
            />
        </>
    );
};

export default EditTaskView;
