import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
    Badge,
    Box,
    IconButton,
    Tooltip,
} from "@mui/material";
import { constantsData } from "data";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeFilters, openFilters } from "redux/actions";
import { StyledPageHead, StyledPageHeadTitle } from "styles";
import { theme } from "theme";

const PageHead = ({
    addRouteUrl,
    backAction,
    backRouteUrl,
    filtersCount,
    filtersModule,
    hasAdd,
    hasBack,
    hasFilters,
}) => {
    const filtersOpened = useSelector((state) => state.filtersReducer.open);

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
                                        color: theme.palette.grey[700],
                                        fontSize: 25,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Link>
                )}
            </StyledPageHeadTitle>
            <Box
                display="flex"
                gap={(hasAdd && hasFilters) && 2}
            >
                {hasAdd && (
                    <Box>
                        <Link to={addRouteUrl}>
                            <Tooltip title={createBtnConstant}>
                                <IconButton>
                                    <AddCircleIcon
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: 30,
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </Box>
                )}
                {hasFilters && (
                    <Tooltip title={filtersOpened ? closeFiltersBtnConstant : openFiltersBtnConstant}>
                        <IconButton onClick={() => (filtersOpened ? dispatch(closeFilters()) : dispatch(openFilters(filtersModule)))}>
                            <Badge
                                badgeContent={filtersCount}
                                color="error"
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
    filtersCount: PropTypes.number,
    filtersModule: PropTypes.string,
    hasAdd: PropTypes.bool,
    hasBack: PropTypes.bool,
    hasFilters: PropTypes.bool,
};
