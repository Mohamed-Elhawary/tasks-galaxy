import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PropTypes } from "prop-types";
import { StyledTextField } from "styles";

const Calendar = ({
    errors,
    field,
    isFilterInput,
    label,
    name,
    onChange,
    value,
}) => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
            PopperProps={{ placement: "auto" }}
            inputFormat="dd/MM/yyyy"
            label={label}
            renderInput={(params) => (
                <StyledTextField
                    {...params}
                    className={isFilterInput && "filter-input"}
                    error={!!errors?.[name]}
                    helperText={(errors?.[name] && !isFilterInput) && errors?.[name]?.message}
                    isCalendar={+true}
                    name={name}
                    fullWidth
                />
            )}
            {...field}
            {...onChange && { onChange }}
            value={value}
        />
    </LocalizationProvider>
);

export default Calendar;

Calendar.propTypes = {
    errors: PropTypes.object,
    field: PropTypes.object,
    isFilterInput: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
};
