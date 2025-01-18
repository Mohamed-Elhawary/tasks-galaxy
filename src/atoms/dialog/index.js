import {
    Button,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { PropTypes } from "prop-types";

const Dialog = ({
    confirmButtonText,
    onClickConfirmButton,
    open,
    setDialogOpen,
    title,
}) => (
    <MuiDialog
        aria-labelledby="confirm-dialog"
        open={open}
        onClose={() => setDialogOpen({
            status: false,
            taskId: null,
        })}
    >
        <DialogTitle id="confirm-delete-dialog">Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>{title}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                color="primary"
                onClick={() => setDialogOpen({
                    status: false,
                    taskId: null,
                })}
            >
                Cancel
            </Button>
            <Button
                color="error"
                variant="contained"
                onClick={onClickConfirmButton}
            >
                {confirmButtonText}
            </Button>
        </DialogActions>
    </MuiDialog>
);

export default Dialog;

Dialog.propTypes = {
    confirmButtonText: PropTypes.string,
    onClickConfirmButton: PropTypes.func,
    open: PropTypes.bool,
    setDialogOpen: PropTypes.func,
    title: PropTypes.string,
};
