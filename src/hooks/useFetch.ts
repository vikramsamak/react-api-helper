import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useAPIHelperContext } from "./useAPIHelperContext";
import { useFetchProps } from "../types";

export function useFetch<TData = unknown, TError = unknown>({
  url,
  params,
  queryKey,
  ...rest
}: useFetchProps<TData, TError>): UseQueryResult<TData, TError> {
  const { axiosInstance } = useAPIHelperContext();

  return useQuery<TData, TError>({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<TData>(url, { params });
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
    },
    ...rest,
  });
}
