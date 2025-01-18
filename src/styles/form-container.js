import styled from "@emotion/styled";
import { Card } from "@mui/material";

const StyledFormContainer = styled(Card)(({ theme }) => ({
    "& .MuiCardContent-root": { padding: 0 },
    borderRadius: "16px",
    boxShadow: theme?.shape?.boxShadow,
    marginBlock: "16px",
    paddingBlock: "20px",
    paddingInline: "16px",
    position: "relative",
}));

export default StyledFormContainer;
