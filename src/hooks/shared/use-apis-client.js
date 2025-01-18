import { constantsData } from "data";
import Cookies from "js-cookie";
import {
    deleteData,
    getData,
    patchData,
    postData,
    updateData,
} from "services";

const { token: tokenConstant } = constantsData;

const useApisClient = () => ({
    delete: (apiUrl, id, config) => deleteData(
        apiUrl,
        id,
        {
            token: Cookies.get(tokenConstant),
            ...config,
        },
    ),
    get: (apiUrl, id, params, config) => getData(
        apiUrl,
        id,
        params,
        {
            token: Cookies.get(tokenConstant),
            ...config,
        },
    ),
    patch: (
        apiUrl,
        id,
        data,
        params,
        config,
    ) => patchData(
        apiUrl,
        id,
        data,
        params,
        {
            token: Cookies.get(tokenConstant),
            ...config,
        },
    ),
    post: (apiUrl, id, data, config) => postData(
        apiUrl,
        id,
        data,
        {
            token: Cookies.get(tokenConstant),
            ...config,
        },
    ),
    update: (
        apiUrl,
        id,
        data,
        params,
        config,
    ) => updateData(
        apiUrl,
        id,
        data,
        params,
        {
            token: Cookies.get(tokenConstant),
            ...config,
        },
    ),
});

export default useApisClient;
