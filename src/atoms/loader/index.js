import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import { PropTypes } from "prop-types";
import { theme } from "theme";

const Loader = ({
    size = 40,
    withoutFullHeight,
}) => (
    <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        position="relative"
        sx={{ height: !withoutFullHeight ? "100vh" : "initial" }}
    >
        <CircularProgress
            size={size}
            sx={{ color: theme.palette.grey[400] }}
            thickness={4}
            value={100}
            variant="determinate"
        />
        <CircularProgress
            size={size}
            thickness={4}
            sx={{
                animationDuration: "550ms",
                color: theme.palette.primary,
                position: "absolute",
                [`& .${circularProgressClasses.circle}`]: { strokeLinecap: "round" },
            }}
            disableShrink
        />
    </Box>
);

export default Loader;

Loader.propTypes = {
    size: PropTypes.number,
    withoutFullHeight: PropTypes.bool,
};
