import { constantsData } from "data";
import { PropTypes } from "prop-types";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Meta = ({ title }) => {
    const { t } = useTranslation();

    const location = useLocation();

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
                {t("labels.cmsTitle")}
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
            <meta
                content={`${process.env.REACT_APP_HOST}/logo.png`} // eslint-disable-line
                property="og:image"
            />
            <meta
                content={process.env.REACT_APP_HOST + location.pathname + location.search} // eslint-disable-line
                property="og:url"
            />
        </Helmet>
    );
};

export default Meta;

Meta.propTypes = { title: PropTypes.string };
