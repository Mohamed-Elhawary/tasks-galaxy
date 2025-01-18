import styled from "@emotion/styled";
import { Paper } from "@mui/material";

const StyledDetails = styled(Paper)(({ theme }) => ({
    background: theme?.palette?.grey[100],
    borderRadius: 5,
    marginBottom: 10,
    padding: 16,
    position: "relative",
}));

export default StyledDetails;
