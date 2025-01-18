import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import filtersReducer from "./filters";

export const initialState = {
    key: "root",
    storage,
    whitelist: [],
};

export const rootReducer = combineReducers({ filtersReducer });
