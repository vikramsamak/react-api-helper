import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useApiHelperProps } from "../types";
import { apiRequest } from "../utils";
import { useApiHelperContext } from "./useApiHelperContext";

export function useApiHelper<TData = unknown, TError = unknown>({
  url,
  params,
  queryKey,
  axiosOptions,
  method,
  ...rest
}: useApiHelperProps<TData, TError>): UseQueryResult<TData, TError> {
  const { axiosInstance } = useApiHelperContext();

  return useQuery<TData, TError>({
    queryKey: queryKey,
    queryFn: async () =>
      await apiRequest<TData, TError>(axiosInstance, method, url, {
        params,
        ...axiosOptions,
      }),
    ...rest,
  });
}
