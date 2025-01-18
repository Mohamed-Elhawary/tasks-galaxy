import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledPageHead = styled(Box)(() => ({
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
}));

export const StyledPageHeadTitle = styled(Box)(() => ({
    alignItems: "center",
    display: "flex",
    gap: 3,
    justifyContent: "start",
}));
