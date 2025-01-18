import { Box, Grid, Typography } from "@mui/material";
import { TaskCard } from "atoms";
import { Filters, Meta, PageHead } from "components";
import { constantsData, statusOptionsData, urlsData } from "data";
import { useTasksList } from "hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, closeFilters } from "redux/actions";

const TasksListView = () => {
    const dispatch = useDispatch();

    const { tasks } = useSelector((state) => state.tasksReducer);

    const filtersOpened = useSelector((state) => state.filtersReducer.open);

    const {
        create: createTaskRouteUrl,
        url: tasksRouteUrl,
    } = urlsData.routes.tasks;

    const {
        titles: { tasksList: tasksListTitleConstant },
    } = constantsData;

    const { loading } = useTasksList();

    useEffect(
        () => {
            dispatch(clearFilters());

            dispatch(closeFilters());
        },
        [], //eslint-disable-line
    );

    if (loading) return <span>Loading...</span>;

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
            <Box className="tasks">
                <Grid
                    spacing={2}
                    container
                >
                    {statusOptionsData.map((column) => (
                        <Grid
                            key={column}
                            lg={3}
                            md={6}
                            xs={12}
                            sx={{
                                marginBottom: {
                                    xl: 0,
                                    xs: 4,
                                },
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
                                            title={title}
                                        />
                                    )) : null}
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default TasksListView;
