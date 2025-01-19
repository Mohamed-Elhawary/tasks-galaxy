import { Box, Grid, Typography } from "@mui/material";
import { Dialog, Loader, TaskCard } from "atoms";
import { Filters, Meta, PageHead } from "components";
import { constantsData, statusOptionsData, urlsData } from "data";
import { useDeleteTask, useTasksList } from "hooks";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; // eslint-disable-line
import { useDispatch, useSelector } from "react-redux";
import { clearFiltersAction, closeFiltersAction, setTasksListAction } from "redux/actions";
import { theme } from "theme";

const TasksListView = () => {
    const [open, setOpen] = useState({
        status: false,
        taskId: null,
    });

    const dispatch = useDispatch();

    const { tasks } = useSelector((state) => state.tasksReducer);

    const themeMode = useSelector((state) => state.themeReducer.theme);

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

    const handleDragEnd = (result) => {
        const tasksData = { ...tasks };

        const {
            destination,
            source,
        } = result;

        if (!destination) return;

        const sourceColumn = source.droppableId;

        const destinationColumn = destination.droppableId;

        const sourceTasks = [...tasksData[sourceColumn]];

        const [movedTask] = sourceTasks.splice(
            source.index,
            1,
        );

        const destinationTasks = [...tasksData[destinationColumn]];
        destinationTasks.splice(
            destination.index,
            0,
            movedTask,
        );

        const draggedTasks = {
            ...tasksData,
            [destinationColumn]: destinationTasks,
            [sourceColumn]: sourceTasks,
        };

        dispatch(setTasksListAction(
            draggedTasks,
            true,
        ));

        localStorage.setItem( // eslint-disable-line
            "tasks",
            JSON.stringify(draggedTasks),
        );
    };

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
                <DragDropContext onDragEnd={handleDragEnd}>
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
                                <Droppable droppableId={column}>
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            sx={{
                                                backgroundColor: themeMode === "dark" ? theme.palette.grey[600] : "#f4f4f4",
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
                                                {tasks?.[column]?.map((task, index) => (
                                                    <Draggable
                                                        draggableId={task.id}
                                                        index={index}
                                                        key={task.id}
                                                    >
                                                        {(provided) => ( // eslint-disable-line
                                                            <Box
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <TaskCard
                                                                    description={task.description}
                                                                    dueDate={task.dueDate}
                                                                    id={task.id}
                                                                    link={`${tasksRouteUrl}/${task.id}`}
                                                                    priority={task.priority}
                                                                    setDialogOpen={setOpen}
                                                                    title={task.title}
                                                                />
                                                            </Box>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </Box>
                                        </Box>
                                    )}
                                </Droppable>
                            </Grid>
                        ))}
                    </Grid>
                </DragDropContext>
            )}
        </>
    );
};

export default TasksListView;
