import { Box } from "@mui/material";
import { PropTypes } from "prop-types";

import FiltersForm from "../../forms/filters";

const Filters = ({ module }) => (
    <Box>
        <FiltersForm module={module} />
    </Box>

);

export default Filters;

Filters.propTypes = { module: PropTypes.string };
