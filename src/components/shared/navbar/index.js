import { Search } from "@mui/icons-material";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import {
    Box,
    IconButton,
    InputBase,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { constantsData, urlsData } from "data";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { setSearchValue, switchTheme } from "redux/actions";
import { StyledSearchInput } from "styles";
import { debounce } from "utils";

const Navbar = () => {
    const dispatch = useDispatch();

    const { value } = useSelector((state) => state.searchReducer);

    const themeMode = useSelector((state) => state.themeReducer.theme);

    const navigate = useNavigate();

    const location = useLocation();

    const [searchParams] = useSearchParams();

    const {
        home: homeRouteUrl,
        tasks: { url: tasksRouteUrl },
    } = urlsData.routes;

    const toggleDarkModeHandler = () => {
        dispatch(switchTheme());

        localStorage.setItem("theme", themeMode === "dark" ? "light" : "dark"); // eslint-disable-line
    };

    const changeSearchFieldValueHandler = useCallback(
        debounce(
            (e) => {
                if (e.target.value === "") navigate(`${tasksRouteUrl}`);
                else navigate(`${tasksRouteUrl}?search=${e.target.value}`);
            },
            1200,
        ),
        [location.pathname],
    ); /* eslint react-hooks/exhaustive-deps: "off" */

    const {
        labels: {
            darkMode: darkModeLabelConstant,
            lightMode: lightModeLabelConstant,
            searchTasks: searchTasksLabelConstant,
        },
        titles: { tasksGalaxy: tasksGalaxyTitleConstant },
    } = constantsData;

    useEffect(
        () => {
            if (searchParams.get("search")) dispatch(setSearchValue(searchParams.get("search")));
        },
        [],
    );

    return (
        <Box
            color="primary"
            mt={4}
            position="static"
        >
            <Toolbar sx={{
                flexDirection: {
                    lg: "row",
                    xs: "column",
                },
                gap: 2,
            }}
            >
                <Box
                    sx={{
                        alignItems: "center",
                        cursor: "pointer",
                        display: "flex",
                        flexGrow: 1,
                        gap: 2,
                    }}
                    onClick={() => navigate(homeRouteUrl)}
                >
                    <img
                        alt="logo"
                        src="/logo.png"
                        style={{
                            borderRadius: 5,
                            height: 100,
                            width: 100,
                        }}
                    />
                    <Typography
                        color="secondary"
                        variant="h3"
                    >
                        {tasksGalaxyTitleConstant}
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    width={{
                        lg: "50%",
                        xs: "100%",
                    }}
                >
                    <StyledSearchInput>
                        <InputBase
                            defaultValue={value}
                            placeholder={searchTasksLabelConstant}
                            value={value}
                            fullWidth
                            onChange={(e) => {
                                dispatch(setSearchValue(e.target.value));

                                changeSearchFieldValueHandler(e);
                            }}
                        />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </StyledSearchInput>
                    <Tooltip title={themeMode === "dark" ? lightModeLabelConstant : darkModeLabelConstant}>
                        <IconButton onClick={toggleDarkModeHandler}>
                            {themeMode === "dark" ? <WbSunnyIcon /> : <NightlightIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </Box>
    );
};

export default Navbar;
