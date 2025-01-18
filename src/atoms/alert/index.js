import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Alert as MuiAlert, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "theme";

const Alert = React.forwardRef((props, ref) => {
    const message = useSelector((state) => state.alertReducer.message);

    const severity = props?.severity || "success"; // eslint-disable-line

    const alertIcon = {
        error: <ErrorIcon />,
        info: <ReportProblemIcon />,
        success: <CheckCircleIcon />,
    };

    return (
        <MuiAlert
            {...props}
            elevation={6}
            icon={alertIcon[severity]}
            ref={ref}
            variant="filled"
            style={{
                background: theme.palette.snackbar.background[severity], // eslint-disable-line
                color: theme.palette.snackbar.color[severity], // eslint-disable-line
                minWidth: "300px",
            }}
        >
            <Typography>{message}</Typography>
        </MuiAlert>
    );
});

export default Alert;
