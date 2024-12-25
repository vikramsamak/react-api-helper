import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { HTTPMethod } from "./GenericTypes";

export interface useApiHelperProps<TData, TError>
  extends Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn"> {
  url: string;
  params?: Record<string, unknown>;
  queryKey: QueryKey;
  axiosOptions?: AxiosRequestConfig;
  method: HTTPMethod;
}
