import { yupResolver } from "@hookform/resolvers/yup";
import { Calendar, Select } from "atoms";
import { FormContainer } from "components";
import { taskFormData } from "data";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import { useTaskSchema } from "schemas";
import { StyledTextField } from "styles";
import { renderFormControllerHandler } from "utils";

const TaskForm = ({
    action,
    loading,
    onSubmitForm,
    values,
}) => {
    const schema = useTaskSchema();

    const formMethods = useForm({
        defaultValues: values,
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const {
        control,
        formState: { errors },
    } = formMethods;

    const renderFormControllerChildrenHandler = (
        field,
        label,
        name,
        type,
        data,
    ) => {
        switch (type) {
        case "text":
            return (
                <StyledTextField
                    {...field}
                    error={errors[name]}
                    helperText={errors[name] && errors[name]?.message}
                    label={label}
                    variant="outlined"
                    fullWidth
                />
            );
        case "date":
            return (
                <Calendar
                    errors={errors}
                    field={field}
                    label={label}
                    name={name}
                    value={field.value || null}
                />
            );
        default:
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
                    onChange={(_, option) => field.onChange(option?.value)}
                />
            );
        }
    };

    return (
        <FormContainer
            action={action}
            formMethods={formMethods}
            loading={loading}
            data={renderFormControllerHandler(
                control,
                taskFormData,
                renderFormControllerChildrenHandler,
            )}
            onSubmitForm={onSubmitForm}
        />
    );
};

export default TaskForm;

TaskForm.propTypes = {
    action: PropTypes.string,
    loading: PropTypes.bool,
    onSubmitForm: PropTypes.func,
    values: PropTypes.object,

};
