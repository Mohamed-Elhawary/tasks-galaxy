import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Chip, Grid } from "@mui/material";
import { Calendar, Select } from "atoms";
import { constantsData, filtersFormData } from "data";
import { format } from "date-fns";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, setFilters } from "redux/actions";
import { useFiltersSchema } from "schemas";

const FiltersForm = ({ module }) => {
    const dispatch = useDispatch();

    const filters = useSelector((state) => state.filtersReducer.filters);

    const [disableResetAllButton, setDisableResetAllButton] = useState(false);

    const [resetForm, setResetForm] = useState(false);

    const schema = useFiltersSchema();

    const formMethods = useForm({
        defaultValues: { ...filters },
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const {
        control,
        formState: {
            dirtyFields,
            errors,
        },
        getValues,
        handleSubmit,
        reset,
    } = formMethods;

    const {
        buttons: {
            apply: applyBtnConstant,
            reset: resetBtnConstant,
        },

    } = constantsData;

    const renderFiltersHandler = (
        field,
        label,
        name,
        type,
        data,
    ) => {
        switch (type) {
        case "date":
            return (
                <Calendar
                    errors={errors}
                    field={field}
                    label={label}
                    name={name}
                    value={field.value || ""}
                    hasSmallField
                    isFilterInput
                />
            );
        case "select":
            return (
                <Select
                    defaultValue={field?.value || ""}
                    errors={errors}
                    getRenderedOption={(option) => option?.label}
                    label={label}
                    name={name}
                    optionLabel={(option) => option?.label}
                    options={data.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                    isFilterInput
                    onChange={(_, option) => field.onChange(option)}
                />
            );
        }
    };
    console.log(
        filters,
        getValues(),
        errors,
    );
    const submitFormHandler = (values) => { // eslint-disable-line
        const {
            dueDateFrom,
            dueDateTo,
            priority,
        } = values;

        let tasksFilter;

        if (module === "tasks") {
            tasksFilter = {
                ...priority && { priority },
                ...(dueDateFrom && dueDateTo) && {
                    taskDueDate: {
                        from: new Date(dueDateFrom).toISOString(),
                        to: new Date(dueDateTo).toISOString(),
                    },
                },
            };
        }

        dispatch(setFilters({ ...tasksFilter && { ...tasksFilter } }));
    };

    const resetFiltersHandler = () => {
        dispatch(clearFilters());

        reset();

        submitFormHandler({});

        setResetForm(true);

        setTimeout(
            () => { setResetForm(false); },
            50,
        );
    };

    useEffect(
        () => {
            if (Object.values(filters).length > 0) setDisableResetAllButton(false);
            else setDisableResetAllButton(true);

            if (Object.values(dirtyFields).length > 0) setDisableResetAllButton(false);
        },
        [dirtyFields, filters], // eslint-disable-line
    );

    return (
        <FormProvider {...formMethods}>
            <form
                style={{
                    marginBottom: 20,
                    minHeight: 80,
                }}
                onSubmit={handleSubmit(() => submitFormHandler(getValues()))}
            >
                {!resetForm ? (
                    <Box
                        alignItems="center"
                        display="flex"
                        flexWrap="wrap"
                        gap={2}
                    >
                        {filtersFormData[module]?.map(({
                            data,
                            label,
                            name,
                            type,
                        }) => (
                            <Box key={name}>
                                <Controller
                                    control={control}
                                    key={name}
                                    name={name}
                                    render={({ field }) => renderFiltersHandler(
                                        field,
                                        label,
                                        name,
                                        type,
                                        data,
                                    )}
                                />
                            </Box>
                        ))}
                    </Box>
                ) : <Box minHeight={70} />}
                {Object.values(filters).length > 0 && (
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        gap={2}
                        mt={2}
                    >
                        {Object.values(filters).map((filter) => (
                            <Chip
                                key={filter}
                                variant="contained"
                                label={filter?.label || `${`${format(
                                    new Date(filter?.from),
                                    "EEEE, MMMM do, yyyy",
                                )} ->> ${format(
                                    new Date(filter?.to),
                                    "EEEE, MMMM do, yyyy",
                                )}`}`}
                            />
                        ))}
                    </Box>
                )}
                <Grid
                    gap={2}
                    mb={2}
                    mt={2}
                    container
                >
                    <Grid item>
                        <LoadingButton
                            color="primary"
                            disabled={Object.keys(dirtyFields).length === 0}
                            size="small"
                            type="submit"
                            variant="outlined"
                        >
                            {applyBtnConstant}
                        </LoadingButton>
                    </Grid>
                    <Grid item>
                        <LoadingButton
                            color="primary"
                            disabled={(Object.keys(filters)?.length === 0 && Object.keys(dirtyFields).length === 0) || disableResetAllButton}
                            size="small"
                            variant="text"
                            onClick={resetFiltersHandler}
                        >
                            {resetBtnConstant}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
};
export default FiltersForm;

FiltersForm.propTypes = { module: PropTypes.string };
