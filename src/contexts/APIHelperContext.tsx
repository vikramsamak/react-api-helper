import React, { createContext } from "react";
import { QueryClient, QueryClientConfig } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { APIHelperProviderProps } from "../types";

interface APIHelperContextProps {
  axiosInstance: AxiosInstance;
}

// eslint-disable-next-line react-refresh/only-export-components
export const APIHelperContext = createContext<APIHelperContextProps | null>(
  null
);

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

const APIHelperProvider: React.FC<APIHelperProviderProps> = ({
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
    <APIHelperContext.Provider value={{ axiosInstance }}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        {children}
      </PersistQueryClientProvider>
    </APIHelperContext.Provider>
  );
};

export default APIHelperProvider;
