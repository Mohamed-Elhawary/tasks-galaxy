import { Loader } from "atoms";
import { Meta, PageHead, TaskForm } from "components";
import { constantsData, urlsData } from "data";
import { useCreateTask, useTasksList } from "hooks";
import { useSelector } from "react-redux";

const CreateTaskView = () => {
    const { tasks } = useSelector((state) => state.tasksReducer);

    const {
        createTask,
        loading,
    } = useCreateTask();

    const { loading: tasksListLoading } = useTasksList(Object.values(tasks).length > 0);

    const { url: tasksRouteUrl } = urlsData.routes.tasks;

    const {
        buttons: { create: createBtnConstant },
        titles: { createTask: createTaskTitleConstant },
    } = constantsData;

    if (tasksListLoading) return <Loader />;

    return (
        <>
            <Meta title={createTaskTitleConstant} />
            <PageHead
                backRouteUrl={tasksRouteUrl}
                title={createTaskTitleConstant}
                hasBack
            />
            <TaskForm
                action={createBtnConstant}
                loading={loading}
                onSubmitForm={createTask}
            />
        </>
    );
};

export default CreateTaskView;
