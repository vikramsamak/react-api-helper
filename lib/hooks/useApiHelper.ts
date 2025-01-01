import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { useApiHelperProps } from '../types';
import { apiRequest } from '../utils';
import { useApiHelperContext } from '../contexts';
import { AxiosRequestConfig } from 'axios';

export function useApiHelper<responseType, errorType>(options: {
  method: 'GET';
  url: string;
  queryKey: QueryKey;
  params?: Record<string, unknown>;
  axiosOptions?: AxiosRequestConfig;
}): UseQueryResult<responseType, errorType>;

export function useApiHelper<responseType, errorType, payloadType>(options: {
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  params?: Record<string, unknown>;
  axiosOptions?: AxiosRequestConfig;
  onSuccess?: (data: responseType) => void;
  onError?: (error: errorType) => void;
}): UseMutationResult<responseType, errorType, payloadType>;

/**
 * A custom hook for making API requests using React Query.
 *
 * @param options Configuration options for the API request.
 * @returns Either a `UseQueryResult` (for GET requests) or a `UseMutationResult` (for POST, PUT, PATCH, or DELETE requests).
 *
 * @example
 * // Usage example for a GET request:
 * const result = useApiHelper({
 *   method: 'GET',
 *   url: '/users',
 *   queryKey: 'users-query'
 * });
 *
 *
 * @example
 * // Usage example for a POST request:
 * const { mutate } = useApiHelper({
 *   method: 'POST',
 *   url: '/todos',
 *   onSuccess: (data) => console.log(data),
 *   onError: (error) => console.log(error)
 * });
 *
 * const handlePost = (payload) => {
 *   mutate(payload); // pass the payload to mutate function
 * };
 */

export function useApiHelper<
  responseType = unknown,
  errorType = unknown,
  payloadType = unknown,
>({
  url,
  params,
  queryKey,
  axiosOptions,
  method,
  onSuccess,
  onError,
  ...rest
}: useApiHelperProps<responseType, errorType, payloadType>):
  | UseQueryResult<responseType, errorType>
  | UseMutationResult<responseType, errorType, payloadType> {
  const { axiosInstance } = useApiHelperContext();

  const defaultQueryKey: QueryKey = queryKey || [
    url,
    ...(params ? Object.values(params) : []),
  ];

  const queryResult = useQuery<responseType, errorType>({
    queryKey: defaultQueryKey,
    queryFn: async () =>
      await apiRequest<responseType, errorType>(axiosInstance, 'GET', url, {
        params,
        ...axiosOptions,
      }),
    enabled: method === 'GET',
    ...rest,
  });

  const mutationResult = useMutation<responseType, errorType, payloadType>({
    mutationFn: async (payload: payloadType) =>
      await apiRequest<responseType, errorType>(axiosInstance, method, url, {
        data: payload,
        params,
        ...axiosOptions,
      }),
    onSuccess,
    onError,
  });

  return method === 'GET' ? queryResult : mutationResult;
}
