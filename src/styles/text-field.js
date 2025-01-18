import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const StyledTextField = styled(TextField)(({
    fullWidth,
    isCalendar,
    valuesLength,
}) => ({
    ...fullWidth && { width: "100%" },
    "&.filter-input": {
        "& .MuiAutocomplete-clearIndicator": {
            display: "none",
        },
        "& .MuiChip-root": {
            borderRadius: "3px",
            fontSize: "10px",
            height: "20px",
            margin: 0,
            width: "80px",
        },
        "& .MuiIconButton-root": {
            fontSize: "5px",
        },
        "& .MuiInputBase-input": {
            opacity: 1,
            padding: 0,
            top: 0,
        },
        "& > div.MuiInputBase-root": {
            height: 30,
            padding: "5px",
            paddingRight: !isCalendar && "30px !important",
            width: 150,

        },
        "& input": {
            "& :placeholder": {
                opacity: valuesLength !== 0 && 1,
            },
            fontSize: 12,
            lineHeight: "10px",
            padding: "2px 2px !important",
            position: "relative",
            top: "-5px",
        },
        "& label": {
            "&.Mui-focused": { top: 0 },
            "&.MuiFormLabel-filled": { top: 0 },
            fontSize: 12,
            top: (valuesLength === 0 || !valuesLength) && "-8px",
        },
        width: 140,
    },
}));

export default StyledTextField;
