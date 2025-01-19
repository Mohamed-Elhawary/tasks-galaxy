import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import alertReducer from "./alert";
import filtersReducer from "./filters";
import searchReducer from "./search";
import tasksReducer from "./tasks";
import themeReducer from "./theme";

export const initialState = {
    key: "root",
    storage,
    whitelist: [],
};

export const rootReducer = combineReducers({
    alertReducer,
    filtersReducer,
    searchReducer,
    tasksReducer,
    themeReducer,
});
