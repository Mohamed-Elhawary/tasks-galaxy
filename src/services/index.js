import { axios } from "utils";

export const getData = async (apiUrl, id, params) => {
    const fullApiUrl = id ? `${apiUrl}${"/"}${id}` : apiUrl;

    return axios(params).get(fullApiUrl);
};

export const postData = async (apiUrl, id, data, config) => {
    const fullApiUrl = id ? `${apiUrl}/${id}` : apiUrl;

    return axios(
        null,
        config?.isFormData,
    ).post(
        fullApiUrl,
        data,
    );
};

export const patchData = async (
    apiUrl,
    id,
    data,
    params,
) => {
    const fullApiUrl = id ? `${apiUrl}/${id}` : apiUrl;

    return axios(params).patch(
        fullApiUrl,
        data,
    );
};

export const updateData = async (
    apiUrl,
    id,
    data,
    params,
) => {
    const fullApiUrl = id ? `${apiUrl}/${id}` : apiUrl;

    return axios(params).put(
        fullApiUrl,
        data,
    );
};

export const deleteData = async (apiUrl, id) => axios(null)["delete"](`${apiUrl}${id ? `/${id}` : ""}`);
