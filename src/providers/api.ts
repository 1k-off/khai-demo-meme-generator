import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.APP_BASE_URL,
});

export const postRequest = (url: string, data: object, options?: object) => {
  return axiosInstance({
    method: "post",
    url,
    data,
    ...options,
  });
};

export const putRequest = (url: string, data?: object) => {
  return axiosInstance({
    method: "put",
    url,
    data,
  });
};

export const patchRequest = (url: string, data?: object) => {
  return axiosInstance({
    method: "patch",
    url,
    data,
  });
};

export const deleteRequest = (url: string, data?: object) => {
  return axiosInstance({
    method: "delete",
    url,
    data,
  });
};

export const getRequest = (url: string, params?: object) => {
  return axiosInstance({
    method: "get",
    url,
    params,
    paramsSerializer: {
      indexes: true,
    },
  });
};

export const downloadFile = (url: string, params?: object) => {
  return axiosInstance({
    method: "get",
    url,
    params,
    responseType: "blob",
    paramsSerializer: {
      indexes: true,
    },
  });
};
