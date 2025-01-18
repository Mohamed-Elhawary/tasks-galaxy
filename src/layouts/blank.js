import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { StyledBlankLayout } from "styles";

const BlankLayout = ({ children }) => <StyledBlankLayout>{children || <Outlet />}</StyledBlankLayout>;

export default BlankLayout;

BlankLayout.propTypes = { children: PropTypes.any };
