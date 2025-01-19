import { SWITCH_THEME } from "redux/types";

const initialState = { theme: "light" };

const themeReducer = (state = initialState, action) => {
    const { type } = action;

    if (type === SWITCH_THEME) {
        return {
            ...state,
            theme: state.theme === "light" ? "dark" : "light",
        };
    } return state;
};

export default themeReducer;
