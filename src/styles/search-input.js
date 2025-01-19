import styled from "@emotion/styled";
import { Box } from "@mui/material";

const StyledSearchInput = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme?.palette?.grey[600] : theme?.palette?.grey[100],
    borderRadius: "4px",
    display: "flex",
    padding: "5px 10px",
    width: "100%",
}));

export default StyledSearchInput;
