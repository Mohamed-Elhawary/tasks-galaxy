import { Meta, PageHead, TaskForm } from "components";
import { constantsData, urlsData } from "data";
import { useCreateTask } from "hooks";

const CreateTaskView = () => {
    const {
        createTask,
        loading,
    } = useCreateTask();

    const { url: tasksRouteUrl } = urlsData.routes.tasks;

    const {
        buttons: { create: createBtnConstant },
        titles: { createTask: createTaskTitleConstant },
    } = constantsData;

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
