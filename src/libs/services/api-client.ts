import axios, { AxiosError, AxiosResponse } from "axios";

export const apiClient = axios.create({
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<unknown>) => {
    if (error.response) console.error(`API 에러`, error);
  }
);
