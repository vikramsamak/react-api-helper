import React from 'react';
import { QueryClientConfig } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

/**
 * @interface ApiHelperProviderProps
 *
 * Props for the `ApiHelperProvider` component which provides the necessary configurations
 * for setting up API requests and managing query states using React Query.
 *
 * @property {string} baseURL - The base URL for the API requests. This is required to configure the Axios instance.
 * @property {AxiosRequestConfig} [axiosConfig] - Optional custom Axios configuration. If not provided, the default configuration will be used.
 * @property {QueryClientConfig} [queryClientConfig] - Optional configuration for React Query client. If not provided, default settings will be used.
 * @property {React.ReactNode} children - The children components that will be wrapped by the `ApiHelperProvider`.
 *
 * @example
 * // Example of using ApiHelperProvider with default configurations:
 * <ApiHelperProvider baseURL="https://api.example.com">
 *   <YourComponent />
 * </ApiHelperProvider>
 *
 * @example
 * // Example with custom Axios and Query Client configurations:
 * <ApiHelperProvider
 *   baseURL="https://api.example.com"
 *   axiosConfig={{ timeout: 5000 }}
 *   queryClientConfig={{ defaultOptions: { queries: { retry: 2 } } }}
 * >
 *   <YourComponent />
 * </ApiHelperProvider>
 *
 *
 */
export interface ApiHelperProviderProps {
  baseURL: string;
  axiosConfig?: AxiosRequestConfig;
  queryClientConfig?: QueryClientConfig;
  children: React.ReactNode;
}
