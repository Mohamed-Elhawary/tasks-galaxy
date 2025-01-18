import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Box,
    Card as MuiCard,
    CardContent,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { constantsData, urlsData } from "data";
import { format } from "date-fns";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { theme } from "theme";

const TaskCard = ({
    description,
    dueDate,
    id,
    link,
    onClickDeleteButton,
    priority,
    title,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();

    const location = useLocation();

    const {
        buttons: {
            delete: deleteBtnConstant,
            edit: editBtnConstant,
            view: viewBtnConstant,
        },
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
            <IconButton
                aria-label="actions"
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                }}
                onClick={(event) => {
                    event.stopPropagation();

                    setAnchorEl(event.currentTarget);
                }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => navigate(`${editTaskRouteUrl}/${id}`)}>{editBtnConstant}</MenuItem>
                <MenuItem onClick={() => onClickDeleteButton(id)}>{deleteBtnConstant}</MenuItem>
                <MenuItem onClick={() => navigate(`${tasksRouteUrl}/${id}`)}>{viewBtnConstant}</MenuItem>
            </Menu>
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
                            >
                                {title.length > 15 ? `${description.substring(
                                    0,
                                    15,
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
