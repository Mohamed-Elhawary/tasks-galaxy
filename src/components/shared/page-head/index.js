import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
    Badge,
    Box,
    Button,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import { constantsData } from "data";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeFiltersAction, openFiltersAction } from "redux/actions";
import { StyledPageHead, StyledPageHeadTitle } from "styles";
import { theme } from "theme";

const PageHead = ({
    addRouteUrl,
    backAction,
    backRouteUrl,
    hasAdd,
    hasBack,
    hasFilters,
    title,
}) => {
    const filtersOpened = useSelector((state) => state.filtersReducer.open);

    const filters = useSelector((state) => state.filtersReducer?.filters);

    const themeMode = useSelector((state) => state.themeReducer.theme);

    const dispatch = useDispatch();

    const {
        back: backBtnConstant,
        closeFilters: closeFiltersBtnConstant,
        create: createBtnConstant,
        openFilters: openFiltersBtnConstant,
    } = constantsData.buttons;

    return (
        <StyledPageHead>
            <StyledPageHeadTitle>
                {hasBack && (
                    <Link
                        to={backRouteUrl}
                        onClick={backAction}
                    >
                        <Tooltip title={backBtnConstant}>
                            <IconButton>
                                <ArrowBackOutlinedIcon
                                    sx={{
                                        color: themeMode === "dark" ? theme.palette.grey[100] : theme.palette.grey[700],
                                        fontSize: 25,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Link>
                )}
                <Typography
                    component="h1"
                    mb={2}
                    variant="h4"
                >
                    {title}
                </Typography>
            </StyledPageHeadTitle>
            <Box
                display="flex"
                gap={(hasAdd && hasFilters) && 2}
            >
                {hasAdd && (
                    <Box>
                        <Link to={addRouteUrl}>
                            <Button
                                sx={{ color: theme.palette.grey[100] }}
                                variant="contained"
                            >
                                {createBtnConstant}
                            </Button>
                        </Link>
                    </Box>
                )}
                {hasFilters && (
                    <Tooltip title={filtersOpened ? closeFiltersBtnConstant : openFiltersBtnConstant}>
                        <IconButton onClick={() => (filtersOpened ? dispatch(closeFiltersAction()) : dispatch(openFiltersAction()))}>
                            <Badge
                                badgeContent={Object.values(filters)?.length}
                                color={Object.keys(filters)?.length > 0 ? "error" : "default"}
                                variant="solid"
                            >
                                <FilterListIcon
                                    sx={{
                                        background: filtersOpened ? theme.palette.primary.main : theme.palette.grey[100],
                                        borderRadius: "50%",
                                        color: filtersOpened ? theme.palette.grey[100] : theme.palette.primary.main,
                                        fontSize: 25,
                                        padding: filtersOpened && 0.5,
                                    }}
                                />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
        </StyledPageHead>
    );
};

export default PageHead;

PageHead.propTypes = {
    addRouteUrl: PropTypes.string,
    backAction: PropTypes.func,
    backRouteUrl: PropTypes.string,
    hasAdd: PropTypes.bool,
    hasBack: PropTypes.bool,
    hasFilters: PropTypes.bool,
    title: PropTypes.string,
};
