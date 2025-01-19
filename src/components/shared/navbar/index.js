import { Brightness4, Search } from "@mui/icons-material";
import {
    Box,
    IconButton,
    InputBase,
    Toolbar,
    Typography,
} from "@mui/material";
import { constantsData, urlsData } from "data";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { setSearchValue } from "redux/actions";
import { StyledSearchInput } from "styles";
import { debounce } from "utils";

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);

    const dispatch = useDispatch();

    const { value } = useSelector((state) => state.searchReducer);

    const navigate = useNavigate();

    const location = useLocation();

    const [searchParams] = useSearchParams();

    const {
        home: homeRouteUrl,
        tasks: { url: tasksRouteUrl },
    } = urlsData.routes;

    const toggleDarkModeHandler = () => {
        setDarkMode(!darkMode);
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
        labels: { searchTasks: searchTasksLabelConstant },
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
            color={darkMode ? "default" : "primary"}
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
                    <IconButton onClick={toggleDarkModeHandler}>
                        <Brightness4 />
                    </IconButton>
                </Box>
            </Toolbar>
        </Box>
    );
};

export default Navbar;
