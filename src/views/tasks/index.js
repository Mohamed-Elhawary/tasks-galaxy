import { Box, Grid, Typography } from "@mui/material";
import { Dialog, Loader, TaskCard } from "atoms";
import { Filters, Meta, PageHead } from "components";
import { constantsData, statusOptionsData, urlsData } from "data";
import { useDeleteTask, useTasksList } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFiltersAction, closeFiltersAction } from "redux/actions";

const TasksListView = () => {
    const [open, setOpen] = useState({
        status: false,
        taskId: null,
    });

    const dispatch = useDispatch();

    const { tasks } = useSelector((state) => state.tasksReducer);

    const filtersOpened = useSelector((state) => state.filtersReducer.open);

    const {
        create: createTaskRouteUrl,
        url: tasksRouteUrl,
    } = urlsData.routes.tasks;

    const {
        buttons: { delete: deleteBtnConstant },
        msgs: {
            tasks: {
                deleteTaskConfirmation: deleteTaskConfirmationMsgConstant,
            },
        },
        titles: { tasksList: tasksListTitleConstant },
    } = constantsData;

    const { loading } = useTasksList();

    const {
        deleteTask,
        loading: deleteLoading,
    } = useDeleteTask();

    useEffect(
        () => {
            dispatch(clearFiltersAction());

            dispatch(closeFiltersAction());
        },
        [], //eslint-disable-line
    );

    useEffect(
        () => () => {
            if (JSON.parse(localStorage.getItem("tasks"))) dispatch(setTasksListAction(JSON.parse(localStorage.getItem("tasks")), true)); // eslint-disable-line
        },
        [], //eslint-disable-line
    );

    return (
        <>
            <Meta title={tasksListTitleConstant} />
            <PageHead
                addRouteUrl={createTaskRouteUrl}
                title={tasksListTitleConstant}
                hasAdd
                hasFilters
            />
            {filtersOpened && <Filters module="tasks" />}
            <Dialog
                confirmButtonText={deleteBtnConstant}
                open={open.status}
                setDialogOpen={setOpen}
                title={deleteTaskConfirmationMsgConstant}
                onClickConfirmButton={() => {
                    deleteTask(open.taskId);

                    setOpen({
                        status: false,
                        taskId: null,
                    });
                }}
            />
            {loading || deleteLoading ? <Loader /> : (
                <Box>
                    <Grid
                        spacing={2}
                        container
                    >
                        {statusOptionsData.map((column) => (
                            <Grid
                                className="tasks"
                                key={column}
                                lg={3}
                                md={6}
                                xs={12}
                                sx={{
                                    maxHeight: "1200px",
                                    overflowY: "auto",
                                }}
                                item
                            >
                                <Box
                                    sx={{
                                        backgroundColor: "#f4f4f4",
                                        borderRadius: 5,
                                        boxShadow: 1,
                                        marginBottom: {
                                            xl: 1,
                                            xs: 4,
                                        },
                                        minHeight: 400,
                                        padding: 2,
                                    }}
                                >
                                    <Typography
                                        sx={{ marginBottom: 2 }}
                                        variant="h5"
                                    >
                                        {column}
                                    </Typography>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        gap={2}
                                    >
                                        {tasks?.[column]?.length > 0 ? tasks?.[column]?.map(({
                                            description,
                                            dueDate,
                                            id,
                                            priority,
                                            title,
                                        }) => (
                                            <TaskCard
                                                description={description}
                                                dueDate={dueDate}
                                                id={id}
                                                key={id}
                                                link={`${tasksRouteUrl}/${id}`}
                                                priority={priority}
                                                setDialogOpen={setOpen}
                                                title={title}
                                            />
                                        )) : null}
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </>
    );
};

export default TasksListView;
