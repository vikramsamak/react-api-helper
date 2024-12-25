import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { HTTPMethod } from "./GenericTypes";

export interface useApiHelperProps<responseType, errorType>
  extends Omit<UseQueryOptions<responseType, errorType, responseType>, "queryKey" | "queryFn"> {
  url: string;
  params?: Record<string, unknown>;
  queryKey: QueryKey;
  axiosOptions?: AxiosRequestConfig;
  method: HTTPMethod;
}
