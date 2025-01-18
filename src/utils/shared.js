import { Grid } from "@mui/material";
import { Fragment } from "react";
import { Controller } from "react-hook-form";

export const updateStateHandler = (oldState, newState) => ({
    ...oldState,
    ...newState,
});

export const generateFutureDateHandler = () => {
    const today = new Date();

    const futureDate = new Date(today);

    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);

    return futureDate.toISOString().split("T")[0];
};

export const generateRandomItemHandler = (array) => array[Math.floor(Math.random() * array.length)];

export const renderFormControllerHandler = (
    control,
    data,
    renderFormControllerChildrenHandler,
) => data.map(({
    col,
    data: options,
    label,
    name,
    type,
}) => (
    <Fragment key={name}>
        <Grid
            {...col}
            key={name}
            item
        >
            <Controller
                control={control}
                key={name}
                name={name}
                render={({ field }) => renderFormControllerChildrenHandler(
                    field,
                    label,
                    name,
                    type,
                    options,
                )}
            />
        </Grid>
    </Fragment>
));
