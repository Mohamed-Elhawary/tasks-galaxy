import {
    Box,
    Card as MuiCard,
    CardContent,
    Chip,
    Tooltip,
    Typography,
} from "@mui/material";
import { constantsData, urlsData } from "data";
import { format } from "date-fns";
import { PropTypes } from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { theme } from "theme";

import ActionsMenu from "../actions-menu";

const TaskCard = ({
    description,
    dueDate,
    id,
    link,
    onClickDeleteButton,
    priority,
    title,
}) => {
    const location = useLocation();

    const {
        priorities: {
            high: highPriorityConstant,
            medium: mediumPriorityConstant,
        },
    } = constantsData;

    const {
        edit: editTaskRouteUrl,
        url: tasksRouteUrl,
    } = urlsData.routes.tasks;

    return (
        <Box
            sx={{
                "&:hover": { boxShadow: `${theme.palette.grey[901]} 0px 0px 10px` },
                position: "relative",
                transition: ".5s all",
                width: "100%",
            }}
        >
            <ActionsMenu
                editRouteUrl={editTaskRouteUrl}
                id={id}
                routeUrl={tasksRouteUrl}
                onClickDeleteButton={onClickDeleteButton}
            />
            <Link
                state={{ from: location.pathname + location.search }}
                style={{ textDecoration: "none" }}
                to={link}
            >
                <MuiCard>
                    <CardContent className="relative">
                        <Tooltip title={title}>
                            <Typography
                                mb={2}
                                variant="h6"
                                width="90%"
                            >
                                {title.length > 25 ? `${description.substring(
                                    0,
                                    25,
                                )}...` : title}
                            </Typography>
                        </Tooltip>
                        <Typography
                            color="secondary"
                            mb={2}
                            variant="body2"
                        >
                            {description.length > 30 ? `${description.substring(
                                0,
                                30,
                            )}...` : description}
                        </Typography>
                        <Typography
                            component="span"
                            display="block"
                            mb={2}
                        >
                            <strong>Due Date:</strong>
                            {" "}
                            <time style={{ color: theme.palette.grey[400] }}>
                                {format(
                                    new Date(dueDate),
                                    "EEEE, MMMM do, yyyy",
                                )}
                            </time>
                        </Typography>
                        <Chip
                            label={priority}
                            size="small"
                            color={priority === highPriorityConstant ? "error" : priority === mediumPriorityConstant ? "warning" : "success"} // eslint-disable-line
                        />
                    </CardContent>
                </MuiCard>
            </Link>
        </Box>
    );
};

export default TaskCard;

TaskCard.propTypes = {
    description: PropTypes.string,
    dueDate: PropTypes.string,
    id: PropTypes.string,
    link: PropTypes.string,
    onClickDeleteButton: PropTypes.func,
    priority: PropTypes.string,
    title: PropTypes.string,
};
