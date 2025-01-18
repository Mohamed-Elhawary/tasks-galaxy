import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";

const Blank = ({
    buttonText,
    onClickButton,
    title,
}) => (
    <Box>
        <Typography
            component="h1"
            mb={2}
            mt={2}
            textAlign="center"
            variant="h4"
        >
            {title}
        </Typography>
        <Button
            variant="contained"
            onClick={onClickButton}
        >
            {buttonText}
        </Button>
    </Box>
);

export default Blank;

Blank.propTypes = {
    buttonText: PropTypes.string,
    onClickButton: PropTypes.func,
    title: PropTypes.string,
};
