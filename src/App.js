import "react-toastify/dist/ReactToastify.css";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Snackbar } from "atoms";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { switchTheme } from "redux/actions";
import { Routes } from "routes";
import { prefixer } from "stylis";
import { darkTheme, theme as lightTheme } from "theme";
import { NetworkErrorBoundary } from "utils";

const cacheLtR = createCache({
    key: "tasks-galaxy",
    stylisPlugins: [prefixer],
});

const App = () => {
    const routes = useRoutes(Routes);

    const dispatch = useDispatch();

    const theme = useSelector((state) => state.themeReducer.theme);

    useEffect(() => {
        if (localStorage.getItem("theme") && localStorage.getItem("theme") === "dark") { // eslint-disable-line
            dispatch(switchTheme());

            localStorage.setItem("theme", localStorage.getItem("theme")); // eslint-disable-line
        } else localStorage.setItem("theme", theme); // eslint-disable-line
    }, []); // eslint-disable-line

    return (
        <CacheProvider value={cacheLtR}>
            <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
                <CssBaseline />
                <Snackbar />
                <NetworkErrorBoundary>{routes}</NetworkErrorBoundary>
                <ToastContainer
                    autoClose={false}
                    closeButton={false}
                    closeOnClick={false}
                    position="bottom-right"
                    hideProgressBar
                />
            </ThemeProvider>
        </CacheProvider>
    );
};

export default App;
