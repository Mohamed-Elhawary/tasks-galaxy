import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { constantsData } from "data";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "theme";

const ActionsMenu = ({
    editRouteUrl,
    id,
    onClickDeleteButton,
    routeUrl,
    withoutView,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();

    const {
        buttons: {
            delete: deleteBtnConstant,
            edit: editBtnConstant,
            view: viewBtnConstant,
        },
    } = constantsData;

    return (
        <>
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
                {!withoutView && <MenuItem onClick={() => navigate(`${routeUrl}/${id}`)}>{viewBtnConstant}</MenuItem>}
                <MenuItem onClick={() => navigate(`${editRouteUrl}/${id}`)}>{editBtnConstant}</MenuItem>
                <MenuItem
                    sx={{ color: theme.palette.error.main }}
                    onClick={() => onClickDeleteButton(id)}
                >
                    {deleteBtnConstant}
                </MenuItem>
            </Menu>
        </>
    );
};

export default ActionsMenu;

ActionsMenu.propTypes = {
    editRouteUrl: PropTypes.string,
    id: PropTypes.string,
    onClickDeleteButton: PropTypes.func,
    routeUrl: PropTypes.string,
    withoutView: PropTypes.bool,
};
