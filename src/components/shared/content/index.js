import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { StyledContent } from "styles";

const Content = ({ children }) => (
    <StyledContent>
        <Container maxWidth={false}>
            {children}
        </Container>
    </StyledContent>
);

export default Content;

Content.propTypes = { children: PropTypes.node };
