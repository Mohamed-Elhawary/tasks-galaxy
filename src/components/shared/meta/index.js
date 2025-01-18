import { constantsData } from "data";
import { PropTypes } from "prop-types";
import { Helmet } from "react-helmet";

const Meta = ({ title }) => {
    const {
        metaDescription: metaDescriptionConstant,
        metaKeywords: metaKeywordsConstant,
        titles: { tasksGalaxy: tasksGalaxyTitleConstant },
    } = constantsData;

    return (
        <Helmet>
            <title>
                {title}
                {" "}
                |
                {" "}
                {tasksGalaxyTitleConstant}
            </title>
            <meta
                content={tasksGalaxyTitleConstant}
                name="description"
            />
            <meta
                content={metaKeywordsConstant}
                name="keywords"
            />
            <meta
                content={`${title} | ${tasksGalaxyTitleConstant}}`}
                property="og:title"
            />
            <meta
                content={metaDescriptionConstant}
                property="og:description"
            />
        </Helmet>
    );
};

export default Meta;

Meta.propTypes = { title: PropTypes.string };
