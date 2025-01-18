import "react-toastify/dist/ReactToastify.css";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes } from "routes";
import { prefixer } from "stylis";
import { theme } from "theme";
import { NetworkErrorBoundary } from "utils";

const cacheLtR = createCache({
    key: "tasks-galaxy",
    stylisPlugins: [prefixer],
});

const App = () => {
    const routes = useRoutes(Routes);

    return (
        <CacheProvider value={cacheLtR}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
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
