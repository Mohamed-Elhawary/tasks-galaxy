import "./styles/index.css";

import { StyledEngineProvider } from "@mui/styled-engine-sc";
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root")); // eslint-disable-line

root.render(
    <BrowserRouter history={history}>
        <StyledEngineProvider injectFirst>
            <Provider store={store}>
                <PersistGate
                    loading={null}
                    persistor={persistor}
                >
                    <App />
                </PersistGate>
            </Provider>
        </StyledEngineProvider>
    </BrowserRouter>,
);
