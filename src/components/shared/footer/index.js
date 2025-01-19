import {
    Brush,
    Code,
    GitHub,
    LinkedIn,
} from "@mui/icons-material";
import {
    Box,
    Container,
    Grid,
    IconButton,
    Link,
    Typography,
} from "@mui/material";
import { constantsData } from "data";
import { useSelector } from "react-redux";

const Footer = () => {
    const themeMode = useSelector((state) => state.themeReducer.theme);

    const {
        allRightsReserved: allRightsReservedTitleConstant,
        author: authorTitleConstant,
        madeBy: madeByTitleConstant,
        tasksGalaxy: tasksGalaxyTitle,
    } = constantsData.titles;

    return (
        <Box
            bgcolor={themeMode === "dark" ? "primary.dark" : "primary.main"}
            color="white"
            component="footer"
            py={2}
        >
            <Container>
                <Grid
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    container
                >
                    <Grid
                        xs={12}
                        item
                    >
                        <Typography
                            align="center"
                            variant="body2"
                        >
                            {allRightsReservedTitleConstant}
                            {" "}
                            &copy;
                            {" "}
                            {new Date().getFullYear()}
                            ,
                            {" "}
                            <Link
                                color="inherit"
                                href="https://tasks-galaxy.netlify.app"
                                target="_blank"
                            >
                                {tasksGalaxyTitle}
                            </Link>
                        </Typography>
                    </Grid>

                    <Grid
                        xs={12}
                        item
                    >
                        <Typography
                            align="center"
                            variant="body2"
                        >
                            {madeByTitleConstant}
                            :
                            {" "}
                            <Link
                                color="inherit"
                                href="https://www.linkedin.com/in/mohamed-elhawary14/"
                                target="_blank"
                            >
                                <Typography
                                    color="inherit"
                                    component="span"
                                    fontStyle="italic"
                                    fontWeight={700}
                                >
                                    {authorTitleConstant}
                                </Typography>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid
                        xs={12}
                        item
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            sx={{ gap: 2 }}
                        >
                            <IconButton
                                color="inherit"
                                href="https://www.linkedin.com/in/mohamed-elhawary14/"
                                target="_blank"
                            >
                                <LinkedIn fontSize="large" />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                href="https://github.com/Mohamed-Elhawary"
                                target="_blank"
                            >
                                <GitHub fontSize="large" />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                href="https://codepen.io/Mohamed-ElHawary"
                                target="_blank"
                            >
                                <Code fontSize="large" />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                href="https://www.behance.net/mohamed-elhawary14"
                                target="_blank"
                            >
                                <Brush fontSize="large" />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
