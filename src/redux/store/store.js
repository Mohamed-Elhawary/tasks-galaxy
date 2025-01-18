import rootMiddleware from "middlewares";
import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";

import { initialState, rootReducer } from "../reducers";

const persistedReducer = persistReducer(
    initialState,
    rootReducer,
);

export const store = createStore(
    persistedReducer,
    rootMiddleware,
);

export const persistor = persistStore(store);
