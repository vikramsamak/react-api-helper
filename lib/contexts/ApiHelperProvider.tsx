import React, { createContext, useContext } from 'react';
import { QueryClient, QueryClientConfig } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiHelperProviderProps } from '../types';

interface ApiHelperContextProps {
  axiosInstance: AxiosInstance;
}

const ApiHelperContext = createContext<ApiHelperContextProps | null>(null);

const defaultAxiosConfig: AxiosRequestConfig = {
  timeout: 10000,
};

const defaultQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
};

/**
 * Context provider for providing Axios instance and Query Client for API requests.
 * This provider wraps your app to ensure that the API helper context is accessible and
 * queries can be persisted using AsyncStorage.
 *
 *
 * @example
 * import {ApiHelperProvider} from 'react-api-utils';
 *
 * function App() {
 *   return (
 *     <ApiHelperProvider baseURL="https://api.example.com">
 *       <YourComponent />
 *     </ApiHelperProvider>
 *   );
 * }
 *
 * @param {string} baseURL - The base URL for all API requests.
 * @param {AxiosRequestConfig} [axiosConfig={}] - Optional configuration to extend or override the default Axios config.
 * @param {QueryClientConfig} [queryClientConfig={}] - Optional configuration to extend or override the default React Query client config.
 * @param {ReactNode} children - The children components that can access the API context.
 */

const ApiHelperProvider: React.FC<ApiHelperProviderProps> = ({
  baseURL,
  axiosConfig = {},
  queryClientConfig = {},
  children,
}) => {
  const axiosInstance = axios.create({
    baseURL,
    ...defaultAxiosConfig,
    ...axiosConfig,
  });

  const queryClient = new QueryClient({
    ...defaultQueryClientConfig,
    ...queryClientConfig,
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  return (
    <ApiHelperContext.Provider value={{ axiosInstance }}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        {children}
      </PersistQueryClientProvider>
    </ApiHelperContext.Provider>
  );
};

export default ApiHelperProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useApiHelperContext = () => {
  const context = useContext(ApiHelperContext);
  if (!context) {
    throw new Error('useAPIHelper must be used within APIHelperProvider');
  }
  return context;
};
