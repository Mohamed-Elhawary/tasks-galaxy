import { Box, Chip, Grid } from "@mui/material";
import { ActionsMenu, DetailsText } from "atoms";
import { PageHead } from "components";
import { constantsData, urlsData } from "data";
import { format } from "date-fns";
import { PropTypes } from "prop-types";
import { useLocation } from "react-router-dom";
import { StyledDetails } from "styles";

const Details = ({
    data,
    module,
    setDialogOpen,
}) => {
    const location = useLocation();

    const {
        labels: {
            createdAt: createdAtLabelConstant,
            description: descriptionLabelConstant,
            dueDate: dueDateLabelConstant,
            priority: priorityLabelConstant,
            status: statusLabelConstant,
            updatedAt: updatedAtLabelConstant,
        },
        priorities: {
            high: highPriorityConstant,
            medium: mediumPriorityConstant,
        },
    } = constantsData;

    const {
        createdAt,
        description,
        dueDate,
        id,
        priority,
        status,
        title,
        updatedAt,
    } = data || {};

    return (
        <StyledDetails>
            <Grid
                md={8}
                xs={12}
                item
            >
                <Grid
                    flexWrap="wrap"
                    justifyContent="space-between"
                    spacing={2}
                    container
                >
                    <Grid
                        paddingLeft="0px!important"
                        sm={6}
                        xs={12}
                        item
                    >
                        <PageHead
                            backRouteUrl={location.state?.from || urlsData.routes?.[module]?.url}
                            title={title}
                            hasBack
                        />
                    </Grid>
                    <Grid
                        sm={3}
                        xs={12}
                        item
                    >
                        <ActionsMenu
                            editRouteUrl={urlsData.routes?.[module]?.edit}
                            id={id}
                            withoutView
                            onClickDeleteButton={() => setDialogOpen({
                                status: true,
                                taskId: id,
                            })}
                        />
                    </Grid>
                    <Grid
                        md={6}
                        xs={12}
                        item
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            mt={{
                                md: 5,
                                xs: 3,

                            }}
                        >
                            {description && (
                                <DetailsText
                                    info={description}
                                    tag={descriptionLabelConstant}
                                />
                            )}
                            {status && (
                                <DetailsText
                                    info={status}
                                    tag={statusLabelConstant}
                                />
                            )}
                            {priority && (
                                <DetailsText
                                    tag={priorityLabelConstant}
                                    info={(
                                        <Chip
                                            color={priority === highPriorityConstant ? "error" : priority === mediumPriorityConstant ? "warning" : "success"} // eslint-disable-line
                                            label={priority}
                                            size="small"
                                        />
                                    )}
                                />
                            )}
                        </Box>
                    </Grid>
                    <Grid
                        md={6}
                        xs={12}
                        item
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            mt={{
                                md: 5,
                                xs: 0,

                            }}
                        >
                            {dueDate && (
                                <DetailsText
                                    tag={dueDateLabelConstant}
                                    info={format(
                                        new Date(dueDate),
                                        "EEEE, MMMM do, yyyy",
                                    )}
                                />
                            )}
                            {createdAt && (
                                <DetailsText
                                    tag={createdAtLabelConstant}
                                    info={format(
                                        new Date(createdAt),
                                        "EEEE, MMMM do, yyyy hh:mm a",
                                    )}
                                />
                            )}
                            {updatedAt && (
                                <DetailsText
                                    tag={updatedAtLabelConstant}
                                    info={format(
                                        new Date(updatedAt),
                                        "EEEE, MMMM do, yyyy hh:mm a",
                                    )}
                                />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </StyledDetails>
    );
};

export default Details;

Details.propTypes = {
    data: PropTypes.object,
    module: PropTypes.string,
    setDialogOpen: PropTypes.func,
};
