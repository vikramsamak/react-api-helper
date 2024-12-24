import React, { createContext } from "react";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
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
      cacheTime: 10 * 60 * 1000,
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

  return (
    <APIHelperContext.Provider value={{ axiosInstance }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </APIHelperContext.Provider>
  );
};

export default APIHelperProvider;
