import { urlsData } from "data";
import { useApisClient } from "hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTasksList } from "redux/actions";

const useTasksList = () => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const { get } = useApisClient();

    useEffect(
        () => {
            setLoading(true);

            if (!localStorage.getItem("tasks")) { //eslint-disable-line
                get(
                    urlsData.apis.tasks.url,
                    null,
                ).
                    then(({ data: responseData }) => {
                        dispatch(setTasksList(responseData));
                    })["catch"]((err) => {
                        console.log(err);
                    })["finally"](() => {
                        setLoading(false);
                    });
            } else {
                dispatch(setTasksList(JSON.parse(localStorage.getItem("tasks")), true)); // eslint-disable-line

                setTimeout(
                    () => {
                        setLoading(false);
                    },
                    2000,
                );
            }
        },
        [], // eslint-disable-line
    );

    return { loading };
};

export default useTasksList;
