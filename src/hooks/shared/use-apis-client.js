import {
    deleteData,
    getData,
    patchData,
    postData,
    updateData,
} from "services";

const useApisClient = () => ({
    delete: (apiUrl, id) => deleteData(
        apiUrl,
        id,
    ),
    get: (apiUrl, id, params) => getData(
        apiUrl,
        id,
        params,
    ),
    patch: (
        apiUrl,
        id,
        data,
        params,
    ) => patchData(
        apiUrl,
        id,
        data,
        params,
    ),
    post: (apiUrl, id, data, config) => postData(
        apiUrl,
        id,
        data,
        { ...config },
    ),
    update: (
        apiUrl,
        id,
        data,
        params,
    ) => updateData(
        apiUrl,
        id,
        data,
        params,
    ),
});

export default useApisClient;
