import { Snackbar as MuiSnackbar, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeAlertAction } from "redux/actions";

import Alert from "../alert";

const Snackbar = () => {
    const dispatch = useDispatch();

    const open = useSelector((state) => state.alertReducer.open);

    const status = useSelector((state) => state.alertReducer.status);

    const closeSnackbarHandler = () => dispatch(closeAlertAction());

    return (
        <Stack spacing={2}>
            <MuiSnackbar
                open={open}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "top",
                }}
                onDurationChange={closeSnackbarHandler}
            >
                <Alert
                    severity={status}
                    onClose={closeSnackbarHandler}
                />
            </MuiSnackbar>
        </Stack>
    );
};

export default Snackbar;
