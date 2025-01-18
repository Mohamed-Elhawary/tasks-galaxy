import { Blank } from "components";
import { constantsData, urlsData } from "data";
import { useNavigate } from "react-router-dom";

const NotFoundView = () => {
    const navigate = useNavigate();

    const {
        buttons: { backToHome: backToHomeBtnConstant },
        titles: { notFound: notFoundTitleConstant },
    } = constantsData;

    return (
        <Blank
            buttonText={backToHomeBtnConstant}
            title={notFoundTitleConstant}
            onClickButton={() => navigate(urlsData.routes.home)}
        />
    );
};

export default NotFoundView;
