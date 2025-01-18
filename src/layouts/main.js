import { Box, CssBaseline } from "@mui/material";
import { Content } from "components";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
    <Box display="flex">
        <CssBaseline />
        <Content>
            <Outlet />
        </Content>
    </Box>
);

export default MainLayout;
