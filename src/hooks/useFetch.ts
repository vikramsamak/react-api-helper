import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAPIHelperContext } from "./useAPIHelperContext";
import axios, { AxiosError } from "axios";
import { useFetchProps } from "../types";

export function useFetch<TData = unknown, TError = unknown>({
  url,
  params,
  ...options
}: useFetchProps<TData, TError>): UseQueryResult<TData, TError> {
  const { axiosInstance } = useAPIHelperContext();

  return useQuery<TData, TError>(
    [url, params],
    async () => {
      try {
        const response = await axiosInstance.get<TData>(url, { params });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;

          return Promise.reject({
            message:
              (axiosError.response?.data as { message?: string })?.message ||
              axiosError.message,
            status: axiosError.response?.status || 500,
            data: axiosError.response?.data || null,
          });
        }

        return Promise.reject({
          message: (error as Error).message || "An unknown error occurred",
          status: 500,
        });
      }
    },
    options
  );
}
