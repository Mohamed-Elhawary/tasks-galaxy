import styled from "@emotion/styled";
import { Box } from "@mui/material";

const StyledBlankLayout = styled(Box)({
    "& > .MuiBox-root": {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        width: "100%",
    },
    display: "flex",
});

export default StyledBlankLayout;
