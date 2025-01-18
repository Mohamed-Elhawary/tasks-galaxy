import loadable from "@loadable/component";
import { urlsData } from "data";

const {
    home: homeRouteUrl,
    notFound: notFoundRouteUrl,
    tasks: {
        create: createTaskRouteUrl,
        edit: editTaskRouteUrl,
        url: tasksRouteUrl,
    },
} = urlsData.routes;

/* ****Layouts***** */
const MainLayout = loadable(() => import("layouts/main"));
const BlankLayout = loadable(() => import("layouts/blank"));

/* ****Views***** */
const TasksListView = loadable(() => import("views/tasks"));
const TaskDetailsView = loadable(() => import("views/tasks/details"));
const CreateTaskView = loadable(() => import("views/tasks/create"));
const EditTaskView = loadable(() => import("views/tasks/edit"));
const NotFoundView = loadable(() => import("views/not-found"));

/* ****Routes***** */
const Routes = [
    {
        children: [
            {
                element: <TasksListView />,
                path: homeRouteUrl,
            },
            {
                element: <TasksListView />,
                path: tasksRouteUrl,
            },
            {
                element: <TaskDetailsView />,
                path: `${tasksRouteUrl}/:id`,
            },
            {
                element: <CreateTaskView />,
                path: createTaskRouteUrl,
            },
            {
                element: <EditTaskView />,
                path: `${editTaskRouteUrl}/:id`,
            },
        ],
        element: <MainLayout />,
        path: homeRouteUrl,
    },
    {
        children: [
            {
                element: <NotFoundView />,
                path: notFoundRouteUrl,
            },
        ],
        element: <BlankLayout />,
        path: notFoundRouteUrl,
    },
];

export default Routes;
