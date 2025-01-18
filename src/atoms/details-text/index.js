import { Box, Divider, Typography } from "@mui/material";
import { PropTypes } from "prop-types";

const DetailsText = ({
    info,
    tag,
}) => (
    <>
        <Box
            alignItems="center"
            display="flex"
            gap={1}
        >
            <Typography
                color="primary"
                variant="subtitle2"
            >
                {tag}
                :
                {" "}
            </Typography>
            <Typography
                component="span"
                variant="subtitle1"
            >
                {info}
            </Typography>
        </Box>
        <Divider />
    </>
);

export default DetailsText;

DetailsText.propTypes = {
    info: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.number,
    ]),
    tag: PropTypes.string,
};
