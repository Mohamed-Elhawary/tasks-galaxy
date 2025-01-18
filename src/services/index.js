import { axios } from "utils";

export const getData = async (apiUrl, id, params, config) => {
    const fullApiUrl = id ? `${apiUrl}${"/"}${id}` : apiUrl;

    return axios(params).get(
        fullApiUrl,
        {
            headers: {
                Authorization: `Bearer ${config?.token}`,
                "Content-Type": "application/json",
            },

        },
    );
};

export const postData = async (apiUrl, id, data, config) => {
    const fullApiUrl = id ? `${apiUrl}/${id}` : apiUrl;

    return axios(
        null,
        config?.isFormData,
    ).post(
        fullApiUrl,
        data,
        {
            headers: { Authorization: `Bearer ${config?.token}` },
        },
    );
};

export const patchData = async (
    apiUrl,
    id,
    data,
    params,
    config,
) => {
    const fullApiUrl = id ? `${apiUrl}/${id}` : apiUrl;

    return axios(params).patch(
        fullApiUrl,
        data,
        {
            headers: { Authorization: `Bearer ${config?.token}` },
        },
    );
};

export const updateData = async (
    apiUrl,
    id,
    data,
    params,
    config,
) => {
    const fullApiUrl = id ? `${apiUrl}/${id}` : apiUrl;

    return axios(params).put(
        fullApiUrl,
        data,
        {
            headers: { Authorization: `Bearer ${config?.token}` },
        },
    );
};

export const deleteData = async (apiUrl, id, config) => axios(null)["delete"](
    `${apiUrl}${id ? `/${id}` : ""}`,
    {
        headers: { Authorization: `Bearer ${config?.token}` },
    },
)["catch"]((err) => {
    if (err?.response?.status === 401 && config?.logoutAction) config?.logoutAction();
});
