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
        onClose={() => setDialogOpen(false)}
    >
        <DialogTitle id="confirm-delete-dialog">Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {`Are you sure you want to delete ${title} ?`}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                color="primary"
                onClick={() => setDialogOpen(false)}
            >
                Cancel
            </Button>
            <Button
                color="error"
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
