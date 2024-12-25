import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useApiHelperProps } from "../types";
import { apiRequest } from "../utils";
import { useApiHelperContext } from "./useApiHelperContext";

export function useApiHelper<responseType = unknown, errorType = unknown>({
  url,
  params,
  queryKey,
  axiosOptions,
  method,
  ...rest
}: useApiHelperProps<responseType, errorType>): UseQueryResult<responseType, errorType> {
  const { axiosInstance } = useApiHelperContext();

  return useQuery<responseType, errorType>({
    queryKey: queryKey,
    queryFn: async () =>
      await apiRequest<responseType, errorType>(axiosInstance, method, url, {
        params,
        ...axiosOptions,
      }),
    ...rest,
  });
}
