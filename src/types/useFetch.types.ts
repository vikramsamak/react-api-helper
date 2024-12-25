import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

export interface useFetchProps<TData, TError>
  extends Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn"> {
  url: string;
  params?: Record<string, unknown>;
  queryKey: QueryKey;
}
