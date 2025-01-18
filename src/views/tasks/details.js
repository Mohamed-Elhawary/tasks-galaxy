import { Loader } from "atoms";
import { Details, Meta } from "components";
import { urlsData } from "data";
import { useGetTask, useTasksList } from "hooks";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const TaskDetailsView = () => {
    const { tasks } = useSelector((state) => state.tasksReducer);

    const { id } = useParams();

    const {
        data,
        loading,
    } = useGetTask(id);

    const { loading: tasksListLoading } = useTasksList(Object.values(tasks).length > 0);

    if (loading || tasksListLoading) return <Loader />;

    if (data.status === 404) return <Navigate to={urlsData.routes.notFound} />;

    return (
        <>
            <Meta title={data?.task?.title} />
            <Details
                data={data?.task}
                module="tasks"
                onClickDeleteButton={(taskId) => console.log(
                    "delete task",
                    taskId,
                )}
            />
        </>
    );
};

export default TaskDetailsView;
