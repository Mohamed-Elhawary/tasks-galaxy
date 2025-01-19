import { Box, CssBaseline } from "@mui/material";
import { Content, Footer, Navbar } from "components";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
    <Box
        display="flex"
        flexDirection="column"
    >
        <CssBaseline />
        <Navbar />
        <Content maxWidth={false}>
            <Outlet />
        </Content>
        <Footer />
    </Box>
);

export default MainLayout;
