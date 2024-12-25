import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { HTTPMethod } from "../types";

export const apiRequest = async <responseType = unknown, errorType = unknown>(
  axiosInstance: AxiosInstance,
  method: HTTPMethod,
  url: string,
  options?: AxiosRequestConfig
): Promise<responseType> => {
  try {
    const response = await axiosInstance.request<responseType>({
      url,
      method,
      ...options,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw {
        message:
          (axiosError.response?.data as { message?: string })?.message ||
          axiosError.message,
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || null,
      } as errorType;
    }

    throw {
      message: (error as Error).message || "An unknown error occurred",
      status: 500,
    } as errorType;
  }
};
