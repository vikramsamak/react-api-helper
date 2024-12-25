import { UseQueryOptions } from "@tanstack/react-query";

export interface UseFetchProps<TData, TError>
  extends Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn"> {
  url: string; 
  params?: Record<string, unknown>; 
  queryKey: string | string[]; 
}
