import { LoadingButton } from "@mui/lab";
import { Box, CardContent, Grid } from "@mui/material";
import { constantsData } from "data";
import PropTypes from "prop-types";
import { FormProvider } from "react-hook-form";
import { StyledFormContainer } from "styles";
import { theme } from "theme";

const FormContainer = ({
    action,
    data,
    formMethods,
    loading,
    onSubmitForm,
}) => {
    const {
        formState: { dirtyFields },
        getValues,
        handleSubmit,
    } = formMethods;

    const {
        create: createBtnConstant,
        save: saveBtnConstant,
    } = constantsData.buttons;

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(() => onSubmitForm(getValues()))}>
                <Grid container>
                    <Grid
                        xs={12}
                        item
                    >
                        <StyledFormContainer>
                            <CardContent>
                                <Grid
                                    spacing={2}
                                    container
                                >
                                    {data}
                                </Grid>
                            </CardContent>
                            <Grid
                                marginY={2}
                                item
                            >
                                <Box
                                    alignItems="center"
                                    display="flex"
                                    gap={2}
                                >
                                    <LoadingButton
                                        disabled={(Object.keys(dirtyFields).length === 0 && action === "edit")}
                                        loading={loading}
                                        size="large"
                                        sx={{ color: theme.palette.grey[100] }}
                                        type="submit"
                                        variant="contained"
                                    >
                                        {action === "edit" ? saveBtnConstant : createBtnConstant}
                                    </LoadingButton>
                                </Box>
                            </Grid>
                        </StyledFormContainer>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
};

export default FormContainer;

FormContainer.propTypes = {
    action: PropTypes.string,
    clearAction: PropTypes.func,
    data: PropTypes.node,
    disabled: PropTypes.bool,
    filesData: PropTypes.array,
    formMethods: PropTypes.object,
    hasCancelButton: PropTypes.bool,
    hasClearAfterSubmission: PropTypes.bool,
    hasSecondaryActionButton: PropTypes.bool,
    hasSubmitButton: PropTypes.bool,
    loading: PropTypes.bool,
    onSubmitForm: PropTypes.func,
    otherData: PropTypes.node,
    secondaryActionButtonData: PropTypes.object,
    setFilesData: PropTypes.func,
    setModalData: PropTypes.func,
    withoutShadow: PropTypes.bool,
};
