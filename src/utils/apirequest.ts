import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { HTTPMethod } from "../types";

export const apiRequest = async <TData = unknown, TError = unknown>(
  axiosInstance: AxiosInstance,
  method: HTTPMethod,
  url: string,
  options?: AxiosRequestConfig
): Promise<TData> => {
  try {
    const response = await axiosInstance.request<TData>({
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
      } as TError;
    }

    throw {
      message: (error as Error).message || "An unknown error occurred",
      status: 500,
    } as TError;
  }
};
