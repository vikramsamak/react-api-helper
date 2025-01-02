import { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { HTTPMethod } from './GenericTypes';

/**
 * @interface useApiHelperProps
 *
 * This interface defines the configuration options for the `useApiHelper` hook, which handles both
 * API requests via React Query's `useQuery` and `useMutation`. It provides flexibility for making GET,
 * POST, PUT, PATCH, and DELETE requests.
 *
 * @typeParam responseType - The expected data type returned by the API request (e.g., the shape of the response data).
 * @typeParam errorType - The expected error type (e.g., error object or string).
 * @typeParam payloadType - The type of the data to be sent with POST, PUT, PATCH, or DELETE requests.
 *
 * @property {string} url - The URL of the API endpoint.
 * @property {Record<string, unknown>} [params] - Optional query parameters for GET requests.
 * @property {payloadType} [data] - Optional data (payload) for POST, PUT, PATCH, or DELETE requests.
 * @property {QueryKey} [queryKey] - Optional key used for caching and refetching data in `useQuery` (not needed for mutations).
 * @property {AxiosRequestConfig} [axiosOptions] - Optional additional axios configuration such as headers.
 * @property {HTTPMethod} method - The HTTP method (GET, POST, PUT, PATCH, DELETE).
 * @property {(data: responseType) => void} [onSuccess] - Optional callback for successful API requests.
 * @property {(error: errorType) => void} [onError] - Optional callback for failed API requests.
 *
 * @example
 * // Example of GET request:
 * const { data, error } = useApiHelper({
 *   method: 'GET',
 *   url: '/todos',
 *   queryKey: ['todos'],
 *   onSuccess: (data) => console.log(data),
 *   onError: (error) => console.error(error),
 * });
 *
 * @example
 * // Example of POST request:
 * const { mutate, isPending, isError } = useApiHelper({
 *   method: 'POST',
 *   url: '/todos',
 *   data: { title: 'New Todo', completed: false },
 *   onSuccess: (data) => console.log('Data posted:', data),
 *   onError: (error) => console.error('Error posting data:', error),
 * });
 *
 * const handlePost = (payload) => {
 *   mutate(payload);
 * };
 */
export interface useApiHelperProps<
  responseType,
  errorType,
  payloadType = unknown,
> extends Omit<
    UseQueryOptions<responseType, errorType, responseType>,
    'queryKey' | 'queryFn'
  > {
  url: string;
  params?: Record<string, unknown>;
  data?: payloadType;
  queryKey?: QueryKey;
  axiosOptions?: AxiosRequestConfig;
  method: HTTPMethod;
  onSuccess?: (data: responseType) => void;
  onError?: (error: errorType) => void;
}
