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
