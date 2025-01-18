import ClearIcon from "@mui/icons-material/Clear";
import { Autocomplete, Box } from "@mui/material";
import { constantsData } from "data";
import { PropTypes } from "prop-types";
import { StyledTextField } from "styles";

const Select = ({
    defaultValue,
    errors,
    getRenderedOption,
    isFilterInput,
    label,
    name,
    onChange,
    optionLabel,
    options,
}) => (
    <Autocomplete
        autoComplete={false}
        clearIcon={<ClearIcon fontSize="small" />}
        getOptionLabel={optionLabel || ""}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        noOptionsText={constantsData.noOptions}
        options={options || []}
        sx={{ "&.MuiAutocomplete-root": { zIndex: "99999 !important" } }}
        defaultValue={defaultValue || {
            label: "",
            value: "",
        }}
        renderInput={(params) => (
            <StyledTextField
                {...params}
                autoComplete="off"
                className={isFilterInput && "filter-input"}
                error={errors?.[name]}
                helperText={errors?.[name] && errors?.[name]?.message}
                label={label}
                name={name}
                placeholder={label}
                variant="outlined"
            />
        )}
        renderOption={(props, option) => (
            <Box
                display="block"
                gap={1}
                key={option?.value}
                {...props}
            >
                {getRenderedOption(option)}
            </Box>
        )}
        onChange={(e, option) => onChange(
            e,
            option,
        )}
    />
);
export default Select;

Select.propTypes = {
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
    ]),
    errors: PropTypes.object,
    getRenderedOption: PropTypes.func,
    isFilterInput: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    optionLabel: PropTypes.func,
    options: PropTypes.array,
};
