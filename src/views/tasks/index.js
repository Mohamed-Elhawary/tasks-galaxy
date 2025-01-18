import { Box, Grid, Typography } from "@mui/material";
import { TaskCard } from "atoms";
import { Meta, PageHead } from "components";
import { constantsData, statusOptionsData, urlsData } from "data";
import { useTasksList } from "hooks";
import { useSelector } from "react-redux";

const TasksListView = () => {
    const { tasks } = useSelector((state) => state.tasksReducer);

    const {
        create: createTaskRouteUrl,
        url: tasksRouteUrl,
    } = urlsData.routes.tasks;

    const {
        titles: { tasksList: tasksListTitleConstant },
    } = constantsData;

    const { loading } = useTasksList();

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
